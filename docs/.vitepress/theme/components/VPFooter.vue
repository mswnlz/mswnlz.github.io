<script setup lang="ts">
import { useData } from 'vitepress'
import { useSidebar } from 'vitepress/theme'
import { onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vitepress'

const { theme, frontmatter } = useData()
const { hasSidebar } = useSidebar()
const router = useRouter()

// 使用全局的不蒜子刷新函数
const refreshBusuanzi = () => {
  if (typeof window !== 'undefined' && window.refreshBusuanzi) {
    window.refreshBusuanzi()
  }
}

// 页面加载时刷新统计
onMounted(() => {
  nextTick(() => {
    // 延迟执行以确保 DOM 完全加载
    setTimeout(refreshBusuanzi, 1500)
  })
})

// 监听路由变化，每次切换页面时刷新统计
const route = router.route
watch(() => route.path, () => {
  nextTick(() => {
    setTimeout(refreshBusuanzi, 800)
  })
})
</script>

<template>
  <footer v-if="theme.footer && frontmatter.footer !== false" class="VPFooter" :class="{ 'has-sidebar': hasSidebar }">
    <div class="container">
      <p v-if="theme.footer.message" class="message" v-html="theme.footer.message"></p>
      <p v-if="theme.footer.copyright" class="copyright" v-html="theme.footer.copyright"></p>
    </div>
  </footer>
</template>

<style scoped>
.VPFooter {
  position: relative;
  z-index: var(--vp-z-index-footer);
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);
}

/* 移除原来的 has-sidebar 隐藏逻辑，让页脚在所有页面都显示 */
.VPFooter.has-sidebar {
  display: block;
}

.VPFooter :deep(a) {
  text-decoration-line: underline;
  text-underline-offset: 2px;
  transition: color 0.25s;
}

.VPFooter :deep(a:hover) {
  color: var(--vp-c-text-1);
}

@media (min-width: 768px) {
  .VPFooter {
    padding: 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
}

.message,
.copyright {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

/* 确保 busuanzi 统计数据的样式 */
.message :deep(#busuanzi_value_site_uv),
.message :deep(#busuanzi_value_site_pv) {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
</style>
