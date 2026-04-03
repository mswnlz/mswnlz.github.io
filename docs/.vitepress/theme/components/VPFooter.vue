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
      <div class="social-links">
        <a href="https://youtube.com/@gxjdian" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          <span>YouTube</span>
        </a>
        <a href="https://x.com/gxjdian" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          <span>X</span>
        </a>
        <a href="https://t.me/tgmShareAI" target="_blank" rel="noopener noreferrer" aria-label="Telegram" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          <span>Telegram</span>
        </a>
        <a href="https://qr.869hr.uk/aitech" target="_blank" rel="noopener noreferrer" aria-label="微信群" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.11.24-.245 0-.06-.024-.12-.04-.178l-.325-1.233a.49.49 0 0 1 .177-.554C23.016 18.414 24 16.658 24 14.735c0-3.343-3.157-5.684-7.062-5.877zM14.53 13.39c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z"/></svg>
          <span>微信群</span>
        </a>
        <a href="https://869hr.uk" target="_blank" rel="noopener noreferrer" aria-label="博客" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          <span>博客</span>
        </a>
        <a href="https://doc.869hr.uk" target="_blank" rel="noopener noreferrer" aria-label="资源站" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>
          <span>资源站</span>
        </a>
      </div>
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

.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--vp-c-text-2);
  text-decoration: none !important;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.25s ease;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider-light);
}

.social-link:hover {
  color: var(--vp-c-brand-1) !important;
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.social-link svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.social-link span {
  text-decoration: none !important;
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

@media (max-width: 640px) {
  .social-links {
    gap: 10px;
  }
  .social-link {
    padding: 5px 8px;
    font-size: 12px;
  }
  .social-link svg {
    width: 16px;
    height: 16px;
  }
}
</style>
