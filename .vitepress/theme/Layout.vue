<template>
  <DefaultTheme.Layout>
    <template #doc-after>
      <footer class="custom-footer">
        <p>友情链接: <a href="https://869hr.uk">"M's Blog"</a> | 如有侵权，请联系删除。</p>
        <p>Copyright © 2025-present mswnlz</p>
      </footer>
    </template>
  </DefaultTheme.Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
</script>

<style scoped>
.custom-footer {
  text-align: center;
  padding: 2rem 0;
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 2rem;
}
</style>
