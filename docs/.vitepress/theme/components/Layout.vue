<script setup>
import DefaultTheme from 'vitepress/theme'
import CommitHistory from './CommitHistory.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-after>
      <CommitHistory />
    </template>
  </DefaultTheme.Layout>
</template>
