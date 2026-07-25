import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const catalogPath = path.join(ROOT, 'docs', 'public', 'resource-catalog.json')
const distPath = path.join(ROOT, 'docs', '.vitepress', 'dist')
const sitemapPath = path.join(ROOT, 'docs', '.vitepress', 'dist', 'sitemap.xml')
const socialImagePath = path.join(ROOT, 'docs', 'public', 'og-image.png')
const socialImageUrl = 'https://doc.869hr.uk/og-image.png'

function fail(message) {
  console.error(message)
  process.exitCode = 1
}

function walkHtmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walkHtmlFiles(entryPath)
    return entry.name.endsWith('.html') ? [entryPath] : []
  })
}

function parseAttributes(tag) {
  const attributes = {}
  for (const match of tag.matchAll(/([:\w-]+)="([^"]*)"/g)) {
    attributes[match[1]] = match[2]
  }
  return attributes
}

function findTag(html, tagName, attribute, value) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'g')) || []
  return tags
    .map(parseAttributes)
    .find(attributes => attributes[attribute] === value)
}

function readPngDimensions(filePath) {
  const image = fs.readFileSync(filePath)
  const pngSignature = '89504e470d0a1a0a'
  if (image.length < 24 || image.subarray(0, 8).toString('hex') !== pngSignature) return null
  return {
    width: image.readUInt32BE(16),
    height: image.readUInt32BE(20),
    bytes: image.length
  }
}

if (!fs.existsSync(catalogPath)) {
  fail('Missing docs/public/resource-catalog.json. Run npm run build:catalog first.')
} else {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'))
  const resourceCount = catalog.resources?.length || 0
  const categoryCount = catalog.categories?.length || 0
  const invalidUrls = catalog.resources.filter(resource => !/^https?:\/\//.test(resource.url))
  const missingTitles = catalog.resources.filter(resource => !resource.title || resource.title.length < 2)

  if (resourceCount < 1) fail('Catalog has no resources.')
  if (categoryCount < 1) fail('Catalog has no categories.')
  if (invalidUrls.length) fail(`Catalog has ${invalidUrls.length} invalid URLs.`)
  if (missingTitles.length) fail(`Catalog has ${missingTitles.length} resources without usable titles.`)

  console.log(`Catalog OK: ${resourceCount} resources across ${categoryCount} categories.`)
}

if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8')
  const publicUrls = sitemap.match(/\/public\//g) || []
  if (publicUrls.length) fail(`Sitemap contains ${publicUrls.length} /public/ URLs.`)
  console.log('Sitemap OK: no /public/ URLs.')
}

if (!fs.existsSync(socialImagePath)) {
  fail('Missing docs/public/og-image.png for social cards.')
} else {
  const image = readPngDimensions(socialImagePath)
  if (!image) {
    fail('Social card image is not a valid PNG.')
  } else {
    if (image.width !== 1200 || image.height !== 630) {
      fail(`Social card image must be 1200x630, found ${image.width}x${image.height}.`)
    }
    if (image.bytes > 5 * 1024 * 1024) {
      fail(`Social card image exceeds 5 MB (${image.bytes} bytes).`)
    }
  }
}

if (!fs.existsSync(distPath)) {
  fail('Missing docs/.vitepress/dist. Run npm run build before validation.')
} else {
  const htmlFiles = walkHtmlFiles(distPath)
  const socialCardErrors = []

  for (const filePath of htmlFiles) {
    const html = fs.readFileSync(filePath, 'utf8')
    const page = path.relative(distPath, filePath)
    const canonical = findTag(html, 'link', 'rel', 'canonical')
    const ogUrl = findTag(html, 'meta', 'property', 'og:url')
    const robots = findTag(html, 'meta', 'name', 'robots')
    const requiredMeta = [
      ['twitter:card', 'summary_large_image'],
      ['twitter:image', socialImageUrl],
      ['og:image', socialImageUrl],
      ['og:image:width', '1200'],
      ['og:image:height', '630'],
      ['og:image:type', 'image/png']
    ]

    for (const [name, content] of requiredMeta) {
      const key = name.startsWith('og:') ? 'property' : 'name'
      const meta = findTag(html, 'meta', key, name)
      if (!meta || meta.content !== content) socialCardErrors.push(`${page}: invalid ${name}`)
    }

    for (const name of ['twitter:title', 'twitter:description', 'twitter:image:alt']) {
      const meta = findTag(html, 'meta', 'name', name)
      if (!meta?.content?.trim()) socialCardErrors.push(`${page}: missing ${name}`)
    }

    if (!canonical?.href?.startsWith('https://doc.869hr.uk/')) {
      socialCardErrors.push(`${page}: invalid canonical URL`)
    }
    if (!ogUrl?.content || ogUrl.content !== canonical?.href) {
      socialCardErrors.push(`${page}: og:url does not match canonical`)
    }
    if (!robots?.content?.includes('max-image-preview:large')) {
      socialCardErrors.push(`${page}: robots does not allow large image previews`)
    }
  }

  if (!htmlFiles.length) fail('No generated HTML pages found for social card validation.')
  if (socialCardErrors.length) {
    fail(`Social card validation failed:\n${socialCardErrors.slice(0, 20).join('\n')}`)
  } else {
    console.log(`Social cards OK: ${htmlFiles.length} pages use a valid 1200x630 Twitter/OG image.`)
  }
}
