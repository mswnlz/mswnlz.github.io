import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const ROOT = process.cwd()
const DOCS_DIR = path.join(ROOT, 'docs')
const GENERATED_DIR = path.join(DOCS_DIR, '.vitepress', 'generated')
const PUBLIC_DIR = path.join(DOCS_DIR, 'public')

const CATEGORIES = [
  { id: 'AIknowledge', name: 'AI 知识', description: 'AI 教程、提示词、工具、机器学习与智能体资料' },
  { id: 'book', name: '书籍资料', description: '电子书、技术文档、教材、文学与专业资料' },
  { id: 'cross-border', name: '跨境电商', description: '外贸、亚马逊、TikTok、支付、选品与运营资料' },
  { id: 'self-media', name: '自媒体运营', description: '内容创作、流量、直播、短视频与变现资料' },
  { id: 'edu-knowlege', name: '教育资源', description: '幼儿园到大学、考试、培训与学习资料' },
  { id: 'tools', name: '工具合集', description: '软件、插件、开发、办公、设计与效率工具' },
  { id: 'movies', name: '影视娱乐', description: '电影、纪录片、音乐、演唱会与综艺资料' },
  { id: 'healthy', name: '健康养生', description: '健身、营养、睡眠、心理健康与中医养生资料' },
  { id: 'curriculum', name: '课程资料', description: '综合课程、知识付费课程与系统学习材料' },
  { id: 'chinese-traditional', name: '传统文化', description: '中医、国学、传统文化课程与资料' },
  { id: 'auto', name: '自动化工具', description: '自动化脚本、效率工具与工作流资料' }
]

const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map(category => [category.id, category]))

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n?/, '')
}

function cleanTitle(title) {
  return title
    .replace(/-?超过100T资料总站网站-doc\.869hr\.uk/gi, '')
    .replace(/-?大坝的资源收集站/gi, '')
    .replace(/[「」]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeUrl(url) {
  return url.replace(/[，。),\]]+$/g, '').trim()
}

function getProvider(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '')
    if (host.includes('pan.quark.cn')) return '夸克网盘'
    if (host.includes('aliyundrive.com') || host.includes('alipan.com')) return '阿里云盘'
    if (host.includes('pan.baidu.com')) return '百度网盘'
    if (host.includes('123pan.com')) return '123 网盘'
    if (host.includes('xunlei.com')) return '迅雷云盘'
    if (host.includes('github.com')) return 'GitHub'
    if (host.includes('t.me')) return 'Telegram'
    return host
  } catch {
    return '外部链接'
  }
}

function inferTags(title, categoryId) {
  const text = title.toLowerCase()
  const tags = new Set()
  const rules = [
    ['AIknowledge', /gpt|chatgpt|deepseek|claude|提示词|prompt|大模型|llm/i, '大语言模型'],
    ['AIknowledge', /midjourney|stable diffusion|comfyui|绘画|procreate|设计/i, 'AI 创作'],
    ['AIknowledge', /机器学习|深度学习|python|tensorflow|pytorch|数据/i, '机器学习'],
    ['tools', /word|excel|ppt|office|简历|办公/i, '办公效率'],
    ['tools', /coding|开发|ide|api|脚本|自动化/i, '开发工具'],
    ['book', /pdf|电子书|书|小说|教材|文学|哲学/i, '阅读资料'],
    ['cross-border', /amazon|亚马逊|tiktok|外贸|电商|选品|支付/i, '跨境运营'],
    ['self-media', /抖音|小红书|视频|直播|流量|变现|运营/i, '内容运营'],
    ['edu-knowlege', /小学|初中|高中|大学|考试|学而思|猿辅导|课程/i, '教育学习'],
    ['healthy', /健身|营养|睡眠|健康|中医|康复|心理/i, '健康生活'],
    ['movies', /电影|纪录片|音乐|演唱会|综艺|影视/i, '影视音频']
  ]

  for (const [scope, pattern, tag] of rules) {
    if ((scope === categoryId || scope === '*') && pattern.test(text)) tags.add(tag)
  }

  if (tags.size === 0) tags.add(CATEGORY_BY_ID[categoryId]?.name || '资源')
  return [...tags].slice(0, 4)
}

function parseResources(markdown, categoryId, month, sourceFile) {
  const body = stripFrontmatter(markdown)
  const resources = []
  const linkRegex = /\[([^\]\n]+)\]\((https?:\/\/[^)\s]+)\)/g
  const pipeRegex = /^\s*-?\s*(.+?)\s*\|\s*(https?:\/\/\S+)\s*$/gm
  const bareRegex = /(?:^|\s)(https?:\/\/[^\s<>)]+)/g
  let match

  while ((match = linkRegex.exec(body))) {
    const title = cleanTitle(match[1])
    const url = normalizeUrl(match[2])
    if (!title || !url) continue
    resources.push({ title, url })
  }

  while ((match = pipeRegex.exec(body))) {
    const title = cleanTitle(match[1].replace(/^-/, ''))
    const url = normalizeUrl(match[2])
    if (!title || !url) continue
    resources.push({ title, url })
  }

  if (resources.length === 0) {
    while ((match = bareRegex.exec(body))) {
      const url = normalizeUrl(match[1])
      const line = body.slice(0, match.index).split('\n').pop() || ''
      const title = cleanTitle(line.replace(/链接[：:]?/, '').replace(url, '')) || getProvider(url)
      resources.push({ title, url })
    }
  }

  return resources.map((resource, index) => {
    const key = `${categoryId}:${month}:${resource.url}:${index}`
    return {
      id: crypto.createHash('sha1').update(key).digest('hex').slice(0, 12),
      title: resource.title,
      url: resource.url,
      provider: getProvider(resource.url),
      category: categoryId,
      categoryName: CATEGORY_BY_ID[categoryId]?.name || categoryId,
      month,
      archivePath: `/${categoryId}/${month}`,
      sourceFile,
      tags: inferTags(resource.title, categoryId)
    }
  })
}

function listMonths(categoryId) {
  const categoryDir = path.join(DOCS_DIR, categoryId)
  if (!fs.existsSync(categoryDir)) return []
  return fs.readdirSync(categoryDir)
    .filter(file => /^\d{6}\.md$/.test(file))
    .sort()
}

function buildCatalog() {
  const records = []
  const duplicateAliases = []
  const seen = new Map()

  for (const category of CATEGORIES) {
    for (const monthFile of listMonths(category.id)) {
      const month = path.basename(monthFile, '.md')
      const sourcePath = path.join(DOCS_DIR, category.id, monthFile)
      const markdown = fs.readFileSync(sourcePath, 'utf8')
      const parsed = parseResources(markdown, category.id, month, `docs/${category.id}/${monthFile}`)

      for (const resource of parsed) {
        const duplicateKey = `${resource.category}:${resource.url}`
        const existing = seen.get(duplicateKey)
        if (existing) {
          existing.aliasMonths.push(resource.month)
          duplicateAliases.push({ id: existing.id, month: resource.month, sourceFile: resource.sourceFile })
          continue
        }
        resource.aliasMonths = [resource.month]
        seen.set(duplicateKey, resource)
        records.push(resource)
      }
    }
  }

  records.sort((a, b) => b.month.localeCompare(a.month) || a.category.localeCompare(b.category) || a.title.localeCompare(b.title, 'zh-CN'))

  const stats = {
    generatedAt: new Date().toISOString(),
    categoryCount: CATEGORIES.length,
    resourceCount: records.length,
    duplicateAliasCount: duplicateAliases.length,
    categories: CATEGORIES.map(category => {
      const categoryRecords = records.filter(record => record.category === category.id)
      const months = [...new Set(categoryRecords.map(record => record.month))].sort().reverse()
      return {
        ...category,
        count: categoryRecords.length,
        months,
        latestMonth: months[0] || null
      }
    })
  }

  fs.mkdirSync(GENERATED_DIR, { recursive: true })
  fs.mkdirSync(PUBLIC_DIR, { recursive: true })

  const catalog = { stats, categories: CATEGORIES, resources: records, duplicateAliases }
  fs.writeFileSync(path.join(PUBLIC_DIR, 'resource-catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`)
  fs.writeFileSync(
    path.join(GENERATED_DIR, 'resourceCatalog.ts'),
    `// This file is generated by scripts/build-catalog.js. Do not edit manually.\nexport const resourceCatalog = ${JSON.stringify(catalog, null, 2)} as const\n`
  )

  console.log(`Generated resource catalog: ${records.length} resources, ${duplicateAliases.length} aliases`)
}

buildCatalog()
