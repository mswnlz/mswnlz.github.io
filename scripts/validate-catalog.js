import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const catalogPath = path.join(ROOT, 'docs', 'public', 'resource-catalog.json')
const sitemapPath = path.join(ROOT, 'docs', '.vitepress', 'dist', 'sitemap.xml')

function fail(message) {
  console.error(message)
  process.exitCode = 1
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
