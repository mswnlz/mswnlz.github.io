<script setup>
import DefaultTheme from 'vitepress/theme'
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-footer-before>
      <div class="busuanzi-container">
        <span id="busuanzi_container_site_pv">
          本站总访问量<span id="busuanzi_value_site_pv"></span>次
        </span>
        <span id="busuanzi_container_site_uv">
          本站访客数<span id="busuanzi_value_site_uv"></span>人
        </span>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

<style>
.busuanzi-container {
  text-align: center;
  margin-top: 20px;
  color: var(--vp-c-text-2);
  font-size: 0.9em;
}
.busuanzi-container span {
  margin: 0 5px;
}
</style>
