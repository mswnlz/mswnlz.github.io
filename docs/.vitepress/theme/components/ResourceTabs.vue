<template>
  <section class="resource-directory" :aria-labelledby="`${category}-directory-title`">
    <header class="directory-header">
      <div>
        <p class="directory-kicker">资源目录</p>
        <h2 :id="`${category}-directory-title`">{{ categoryMeta?.name || category }}资源索引</h2>
        <p class="directory-summary">
          默认按最新收录排序。月份保留为归档入口，主要浏览方式改为搜索、平台和主题筛选。
        </p>
      </div>
      <div class="directory-metrics" aria-label="资源统计">
        <strong>{{ filteredResources.length }}</strong>
        <span>当前匹配</span>
        <strong>{{ categoryResources.length }}</strong>
        <span>分类总数</span>
      </div>
    </header>

    <div class="directory-toolbar">
      <label class="filter-field filter-search">
        <span>搜索资源</span>
        <input v-model.trim="query" type="search" placeholder="输入关键词，例如 ChatGPT、Excel、电影" />
      </label>

      <label class="filter-field">
        <span>收录月份</span>
        <select v-model="selectedMonth">
          <option value="">全部月份</option>
          <option v-for="month in months" :key="month" :value="month">{{ formatMonth(month) }}</option>
        </select>
      </label>

      <label class="filter-field">
        <span>资源平台</span>
        <select v-model="selectedProvider">
          <option value="">全部平台</option>
          <option v-for="provider in providers" :key="provider" :value="provider">{{ provider }}</option>
        </select>
      </label>

      <label class="filter-field">
        <span>排序</span>
        <select v-model="sortMode">
          <option value="latest">最新收录</option>
          <option value="title">标题排序</option>
          <option value="provider">平台排序</option>
        </select>
      </label>
    </div>

    <nav v-if="months.length" class="archive-strip" aria-label="月份归档">
      <a v-for="month in months" :key="month" :href="`/${category}/${month}`">
        {{ formatMonth(month) }}
      </a>
    </nav>

    <div class="resource-list" aria-live="polite">
      <article v-for="resource in visibleResources" :key="resource.id" class="resource-card">
        <div class="resource-main">
          <a class="resource-title" :href="resource.url" target="_blank" rel="noopener noreferrer nofollow ugc">
            {{ resource.title }}
          </a>
          <div class="resource-meta">
            <span>{{ resource.provider }}</span>
            <span>{{ formatMonth(resource.month) }}</span>
            <a :href="resource.archivePath">查看归档</a>
          </div>
        </div>
        <div class="resource-tags" aria-label="资源标签">
          <span v-for="tag in resource.tags" :key="tag">{{ tag }}</span>
        </div>
      </article>
    </div>

    <div v-if="filteredResources.length > pageSize" class="directory-actions">
      <button type="button" class="load-more" @click="increaseLimit">
        显示更多资源，已显示 {{ visibleResources.length }} / {{ filteredResources.length }}
      </button>
    </div>

    <div v-if="filteredResources.length === 0" class="empty-state">
      <strong>没有找到匹配资源</strong>
      <p>可以减少关键词，或切换到全部月份和全部平台。</p>
    </div>

    <aside class="related-categories" aria-label="相关分类">
      <span>继续浏览</span>
      <a v-for="item in relatedCategories" :key="item.id" :href="`/${item.id}/`">{{ item.name }}</a>
    </aside>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { resourceCatalog } from '../../generated/resourceCatalog'

const props = defineProps({
  category: {
    type: String,
    required: true
  },
  months: {
    type: Array,
    default: () => []
  }
})

const pageSize = 24
const query = ref('')
const selectedMonth = ref('')
const selectedProvider = ref('')
const sortMode = ref('latest')
const visibleLimit = ref(pageSize)

const catalog = resourceCatalog
const categoryStats = computed(() => catalog.stats.categories)
const categoryMeta = computed(() => categoryStats.value.find(item => item.id === props.category))

const categoryResources = computed(() => {
  return catalog.resources.filter(resource => resource.category === props.category)
})

const months = computed(() => {
  const monthSet = new Set(categoryResources.value.map(resource => resource.month))
  for (const month of props.months || []) monthSet.add(month)
  return [...monthSet].sort().reverse()
})

const providers = computed(() => {
  return [...new Set(categoryResources.value.map(resource => resource.provider))].sort((a, b) => a.localeCompare(b, 'zh-CN'))
})

const filteredResources = computed(() => {
  const keyword = query.value.toLowerCase()
  const filtered = categoryResources.value.filter(resource => {
    const searchText = `${resource.title} ${resource.provider} ${resource.tags.join(' ')}`.toLowerCase()
    return (!keyword || searchText.includes(keyword)) &&
      (!selectedMonth.value || resource.month === selectedMonth.value) &&
      (!selectedProvider.value || resource.provider === selectedProvider.value)
  })

  return [...filtered].sort((a, b) => {
    if (sortMode.value === 'title') return a.title.localeCompare(b.title, 'zh-CN')
    if (sortMode.value === 'provider') return a.provider.localeCompare(b.provider, 'zh-CN') || b.month.localeCompare(a.month)
    return b.month.localeCompare(a.month) || a.title.localeCompare(b.title, 'zh-CN')
  })
})

const visibleResources = computed(() => filteredResources.value.slice(0, visibleLimit.value))

const relatedCategories = computed(() => {
  return categoryStats.value
    .filter(item => item.id !== props.category && item.count > 0)
    .slice(0, 8)
})

watch([query, selectedMonth, selectedProvider, sortMode], () => {
  visibleLimit.value = pageSize
})

function increaseLimit() {
  visibleLimit.value += pageSize
}

function formatMonth(month) {
  if (!/^\d{6}$/.test(month)) return month
  return `${month.slice(0, 4)}年${Number(month.slice(4))}月`
}
</script>

<style scoped>
.resource-directory {
  margin: 28px 0 40px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 22px;
  background: var(--directory-surface, var(--vp-c-bg));
  overflow: hidden;
}

.directory-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  padding: 28px;
  border-bottom: 1px solid var(--vp-c-divider);
  background:
    linear-gradient(135deg, rgba(24, 76, 177, 0.10), transparent 42%),
    var(--vp-c-bg-soft);
}

.directory-kicker {
  margin: 0 0 8px;
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 700;
}

.directory-header h2 {
  margin: 0;
  border: 0;
  padding: 0;
  color: var(--vp-c-text-1);
  font-size: 28px;
  line-height: 1.25;
}

.directory-summary {
  margin: 10px 0 0;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.directory-metrics {
  display: grid;
  grid-template-columns: auto auto;
  gap: 4px 10px;
  align-self: start;
  min-width: 150px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg);
}

.directory-metrics strong {
  color: var(--vp-c-text-1);
  font-size: 22px;
  line-height: 1;
  font-family: var(--vp-font-family-mono);
}

.directory-metrics span {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.directory-toolbar {
  display: grid;
  grid-template-columns: minmax(220px, 1.5fr) repeat(3, minmax(140px, 1fr));
  gap: 12px;
  padding: 18px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.filter-field {
  display: grid;
  gap: 6px;
}

.filter-field span {
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 700;
}

.filter-field input,
.filter-field select {
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.filter-field input:focus,
.filter-field select:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.archive-strip {
  display: flex;
  gap: 8px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.archive-strip a {
  flex: 0 0 auto;
  padding: 7px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  text-decoration: none;
  background: var(--vp-c-bg-soft);
}

.archive-strip a:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.resource-list {
  display: grid;
  gap: 0;
}

.resource-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 18px;
  padding: 18px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.resource-card:last-child {
  border-bottom: 0;
}

.resource-card:hover {
  background: var(--vp-c-bg-soft);
}

.resource-title {
  color: var(--vp-c-text-1);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.55;
  text-decoration: none;
}

.resource-title:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.resource-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin-top: 8px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.resource-meta a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.resource-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  max-width: 260px;
}

.resource-tags span {
  padding: 5px 9px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.directory-actions {
  padding: 18px;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}

.load-more {
  min-height: 42px;
  padding: 0 18px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 999px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.load-more:hover {
  background: var(--vp-c-brand-2);
}

.load-more:active {
  transform: translateY(1px);
}

.empty-state {
  padding: 32px 18px;
  text-align: center;
}

.empty-state strong {
  color: var(--vp-c-text-1);
}

.empty-state p {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
}

.related-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 16px 18px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.related-categories span {
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.related-categories a {
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 900px) {
  .directory-header,
  .directory-toolbar,
  .resource-card {
    grid-template-columns: 1fr;
  }

  .resource-tags {
    justify-content: flex-start;
    max-width: none;
  }
}

@media (max-width: 640px) {
  .resource-directory {
    border-radius: 16px;
    margin: 20px -8px 32px;
  }

  .directory-header,
  .directory-toolbar,
  .resource-card {
    padding: 16px;
  }
}
</style>
