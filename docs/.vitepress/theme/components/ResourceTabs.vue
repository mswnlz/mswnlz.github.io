<template>
  <div class="resource-tabs">
    <!-- Tab导航栏 -->
    <div class="tabs-nav">
      <button
        v-for="tab in sortedTabs"
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        @click="switchTab(tab.id)"
      >
        <span class="tab-icon">📅</span>
        <span class="tab-text">{{ tab.name }}</span>
        <span v-if="tab.loading" class="loading-dot">⏳</span>
      </button>
    </div>

    <!-- Tab内容区域 -->
    <div class="tabs-content">
      <div
        v-for="tab in sortedTabs"
        :key="tab.id"
        v-show="activeTab === tab.id"
        :class="['tab-panel', { active: activeTab === tab.id }]"
      >
        <div v-if="tab.loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>正在加载资源内容...</p>
        </div>
        
        <div v-else-if="tab.error" class="error-state">
          <div class="error-icon">❌</div>
          <p>加载失败：{{ tab.error }}</p>
          <button @click="retryLoad(tab.id)" class="retry-button">重试</button>
        </div>
        
        <div v-else-if="tab.content" class="tab-content">
          <div class="content-header">
            <h3>{{ tab.name }} 月资源</h3>
            <span class="resource-count">共 {{ tab.resourceCount }} 个资源</span>
          </div>
          <div class="markdown-content" v-html="tab.renderedContent"></div>
        </div>
        
        <div v-else class="empty-state">
          <div class="empty-icon">📭</div>
          <p>暂无资源内容</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue'

export default {
  name: 'ResourceTabs',
  props: {
    // 资源类别（如 AIknowledge, tools 等）
    category: {
      type: String,
      required: true
    },
    // 年月列表，格式：['202508', '202507', '202506']
    months: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const activeTab = ref('')
    const tabs = reactive({})

    // 按时间倒序排列的Tab列表
    const sortedTabs = computed(() => {
      return Object.values(tabs).sort((a, b) => b.id.localeCompare(a.id))
    })

    // 初始化tabs数据
    const initTabs = () => {
      props.months.forEach(month => {
        tabs[month] = {
          id: month,
          name: formatMonthName(month),
          content: '',
          loading: false,
          error: null,
          resourceCount: 0
        }
      })
      // 设置默认激活的tab（最新的月份）
      if (props.months.length > 0) {
        const latestMonth = [...props.months].sort().reverse()[0]
        activeTab.value = latestMonth
      }
    }

    // 格式化月份名称
    const formatMonthName = (month) => {
      if (month.length === 6) {
        const year = month.substring(0, 4)
        const monthNum = month.substring(4, 6)
        return `${year}年${parseInt(monthNum)}月`
      }
      return month
    }

    // 切换Tab
    const switchTab = (tabId) => {
      activeTab.value = tabId
      loadTabContent(tabId)
    }

    // 加载Tab内容
    const loadTabContent = async (tabId) => {
      if (tabs[tabId].content || tabs[tabId].loading) {
        return // 已加载或正在加载中
      }

      tabs[tabId].loading = true
      tabs[tabId].error = null

      try {
        // 从public目录访问静态markdown文件
        const response = await fetch(`/${props.category}/${tabId}.md`)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const text = await response.text()
        
        // 处理Markdown内容
        const processedContent = await processMarkdownContent(text)
        tabs[tabId].content = processedContent.html
        tabs[tabId].renderedContent = processedContent.renderedHtml
        tabs[tabId].resourceCount = processedContent.resourceCount
        
      } catch (error) {
        console.error(`Failed to load ${tabId}:`, error)
        tabs[tabId].error = error.message
      } finally {
        tabs[tabId].loading = false
      }
    }

    // 处理Markdown内容 - 渲染为HTML
    const processMarkdownContent = async (markdown) => {
      // 计算资源数量（包含http链接的行数）
      const resourceCount = (markdown.match(/https?:\/\/\S+/g) || []).length
      
      // 简单的markdown转换为HTML
      const renderedHtml = renderMarkdownToHtml(markdown)
      
      return { 
        html: renderedHtml,
        renderedHtml: renderedHtml,
        resourceCount 
      }
    }

    // 简单的markdown渲染器
    const renderMarkdownToHtml = (markdown) => {
      let html = markdown
        // 标题
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        // 加粗
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // 斜体
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // 链接 - markdown格式 [text](url)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        // 行内代码
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // 水平线
        .replace(/^---+$/gm, '<hr>')
      
      // 先处理换行，防止URL跨行处理问题
      html = html
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
      
      // 处理各种URL格式，使其变为可点击链接
      html = html
        // 处理 "链接：URL" 格式 - 确保链接文本显示完整URL
        .replace(/链接[：:]\s*(https?:\/\/[^\s<br>]+)/g, '链接：<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
        // 处理纯URL（不在链接标签内的）- 避免重复处理已经在a标签内的URL
        .replace(/(^|\s|>|<br>)(https?:\/\/[^\s<>"]+)(?!.*<\/a>)($|\s|<br>|<)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>$3')
      
      // 包装段落
      html = '<p>' + html + '</p>'
      // 清理空段落和标签重叠问题
      html = html.replace(/<p><\/p>/g, '')
      html = html.replace(/<p><h([1-6])>/g, '<h$1>')
      html = html.replace(/<\/h([1-6])><\/p>/g, '</h$1>')
      html = html.replace(/<p><hr><\/p>/g, '<hr>')
      
      return html
    }

    // 解析资源行，支持多种格式
const parseResourceLine = (line) => {
  // 格式1: - [标题](链接)
  let match = line.match(/^-\s*\[(.*?)\]\((.*?)\)$/)
  if (match) {
    return {
      title: match[1].trim(),
      url: match[2].trim(),
      icon: '🔗'
    }
  }

  // 格式2: [标题](链接)
  match = line.match(/^\[(.*?)\]\((.*?)\)$/)
  if (match) {
    return {
      title: match[1].trim(),
      url: match[2].trim(),
      icon: '📎'
    }
  }

  // 格式3: 「标题」链接：URL
  match = line.match(/^「(.*?)」.*?链接[：:]\s*(https?:\/\/\S+)/)
  if (match) {
    return {
      title: match[1].trim(),
      url: match[2].trim(),
      icon: '🔗'
    }
  }

  // 格式4: 数字 | 标题 | URL
  match = line.match(/^\d+\s*\|\s*(.*?)\s*\|\s*(https?:\/\/\S+)$/)
  if (match) {
    return {
      title: match[1].trim(),
      url: match[2].trim(),
      icon: '🔢'
    }
  }

  // 格式5: 标题 | URL (无数字)
  match = line.match(/^(.*?)\s*\|\s*(https?:\/\/\S+)$/)
  if (match && !match[1].match(/^\d+$/)) {
    return {
      title: match[1].trim(),
      url: match[2].trim(),
      icon: '📎'
    }
  }

  // 格式6: 标题 链接：URL
  match = line.match(/^(.+?)\s+链接[：:]\s*(https?:\/\/\S+)/)
  if (match) {
    return {
      title: match[1].trim(),
      url: match[2].trim(),
      icon: '🔗'
    }
  }

  // 格式7: 标题 https://... (改进判断逻辑)
  match = line.match(/^(.+?)\s+(https?:\/\/\S+)$/)
  if (match) {
    const title = match[1].trim()
    const url = match[2].trim()
    // 确保标题不是纯数字，且有一定长度，避免误匹配
    if (!title.match(/^\d+$/) && title.length > 2 && !title.includes('|')) {
      return {
        title: title,
        url: url,
        icon: '🌐'
      }
    }
  }

  // 格式8: 链接：URL
  match = line.match(/^链接[：:]\s*(https?:\/\/\S+)/)
  if (match) {
    return {
      title: '点击访问资源',
      url: match[1].trim(),
      icon: '🔗'
    }
  }

  // 格式9: 纯URL行
  match = line.match(/^(https?:\/\/\S+)$/)
  if (match) {
    return {
      title: '点击访问资源',
      url: match[1].trim(),
      icon: '🔗'
    }
  }

  return null
}

    // 生成资源HTML
    const generateResourceHTML = (resource) => {
      const safeTitle = escapeHtml(resource.title)
      const safeUrl = escapeHtml(resource.url)
      
      return `
        <div class="resource-item">
          <div class="resource-icon">${resource.icon}</div>
          <div class="resource-content">
            <div class="resource-title">${safeTitle}</div>
            <div class="resource-url">${safeUrl}</div>
            <div class="resource-actions">
              <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="resource-link">
                <span class="link-icon">🚀</span>
                <span>立即获取</span>
              </a>
              <button class="copy-button" onclick="navigator.clipboard.writeText('${safeUrl}'); this.innerHTML='✅ 已复制'; setTimeout(() => this.innerHTML='📋 复制链接', 2000)">
                📋 复制链接
              </button>
            </div>
          </div>
        </div>
      `
    }

    // HTML转义函数
    const escapeHtml = (text) => {
      const div = document.createElement('div')
      div.textContent = text
      return div.innerHTML
    }

    // 重试加载
    const retryLoad = (tabId) => {
      tabs[tabId].error = null
      loadTabContent(tabId)
    }

    onMounted(() => {
      initTabs()
      // 延迟加载激活tab的内容
      setTimeout(() => {
        if (activeTab.value) {
          loadTabContent(activeTab.value)
        }
      }, 100)
    })

    return {
      activeTab,
      tabs,
      sortedTabs,
      switchTab,
      retryLoad
    }
  }
}
</script>

<style scoped>
.resource-tabs {
  margin: 2rem 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

/* Tab导航栏样式 */
.tabs-nav {
  display: flex;
  flex-wrap: wrap;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-border);
  padding: 0.5rem;
  gap: 0.5rem;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
}

.tab-button:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.tab-button.active {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.3);
}

.tab-icon {
  font-size: 1rem;
}

.loading-dot {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Tab内容区域样式 */
.tabs-content {
  min-height: 300px;
}

.tab-panel {
  padding: 2rem;
  display: none;
}

.tab-panel.active {
  display: block;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 内容头部 */
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.content-header h3 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  font-weight: 600;
}

.resource-count {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* 资源项样式 */
.resource-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.resource-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.resource-icon {
  font-size: 1.25rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-soft);
  border-radius: 8px;
  flex-shrink: 0;
}

.resource-content {
  flex: 1;
}

.resource-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.resource-url {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 1rem;
  word-break: break-all;
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-border);
}

.resource-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.resource-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.resource-link:hover {
  background: var(--vp-c-brand-2);
  transform: scale(1.05);
}

.copy-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.copy-button:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.resource-text {
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  color: var(--vp-c-text-2);
}

.no-resources {
  text-align: center;
  padding: 3rem;
  color: var(--vp-c-text-3);
  font-size: 1.1rem;
}

/* 状态样式 */
.loading-state, .error-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

.loading-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid var(--vp-c-border);
  border-top: 3px solid var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon, .empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background: var(--vp-c-brand-2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tabs-nav {
    justify-content: flex-start;
    overflow-x: auto;
    padding: 0.5rem;
  }

  .tab-button {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  .tab-panel {
    padding: 1.5rem;
  }

  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .resource-item {
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
  }

  .resource-actions {
    flex-direction: column;
    gap: 0.75rem;
  }

  .resource-actions > * {
    width: 100%;
    justify-content: center;
  }
}

/* 暗黑模式适配 */
.dark .resource-tabs {
  background: var(--vp-c-bg-soft);
}

.dark .resource-item {
  background: var(--vp-c-bg-elv);
}

.dark .resource-item:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

/* Markdown内容样式 */
.markdown-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 1.5rem;
  font-family: var(--vp-font-family-base);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3 {
  margin: 1.5rem 0 1rem 0;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.markdown-content h1 {
  font-size: 1.8rem;
  border-bottom: 2px solid var(--vp-c-border);
  padding-bottom: 0.5rem;
}

.markdown-content h2 {
  font-size: 1.4rem;
  border-bottom: 1px solid var(--vp-c-border-soft);
  padding-bottom: 0.3rem;
}

.markdown-content h3 {
  font-size: 1.2rem;
}

.markdown-content p {
  margin: 0.8rem 0;
}

.markdown-content a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  word-break: break-all;
  display: inline-block;
  max-width: 100%;
  overflow-wrap: break-word;
}

.markdown-content a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.markdown-content strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.markdown-content em {
  font-style: italic;
  color: var(--vp-c-text-2);
}

.markdown-content code {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-code);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-family: var(--vp-font-family-mono);
}

.markdown-content hr {
  margin: 2rem 0;
  border: none;
  border-top: 1px solid var(--vp-c-border);
}

.dark .markdown-content {
  background: var(--vp-c-bg-elv);
}
</style>
