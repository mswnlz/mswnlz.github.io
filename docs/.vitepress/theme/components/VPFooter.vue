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
  border-top: 1px solid var(--vp-c-divider);
  padding: 48px 24px 32px;
  background: linear-gradient(135deg, var(--vp-c-bg-alt) 0%, var(--vp-c-bg-soft) 100%);
  margin-top: 64px;
}

.VPFooter::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2), var(--vp-c-brand-3));
  border-radius: 2px;
}

/* 移除原来的 has-sidebar 隐藏逻辑，让页脚在所有页面都显示 */
.VPFooter.has-sidebar {
  display: block;
}

.VPFooter :deep(a) {
  text-decoration-line: underline;
  text-underline-offset: 2px;
  transition: all 0.25s ease;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.VPFooter :deep(a:hover) {
  color: var(--vp-c-brand-2);
  text-decoration-color: var(--vp-c-brand-2);
}

@media (min-width: 768px) {
  .VPFooter {
    padding: 56px 32px 40px;
  }
}

.container {
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
}

.message,
.copyright {
  line-height: 28px;
  font-size: 15px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.message {
  margin-bottom: 12px;
  padding: 16px 20px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider-light);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.copyright {
  opacity: 0.8;
  font-size: 13px;
}

/* 确保 busuanzi 统计数据的样式 */
.message :deep(#busuanzi_value_site_uv),
.message :deep(#busuanzi_value_site_pv) {
  font-weight: 700;
  color: var(--vp-c-brand-1);
  font-size: 16px;
  padding: 2px 6px;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
  border: 1px solid var(--vp-c-brand-2);
}

.message :deep(#busuanzi_container_site_uv),
.message :deep(#busuanzi_container_site_pv) {
  display: inline-block;
  margin: 0 8px;
  padding: 4px 0;
}
</style>
