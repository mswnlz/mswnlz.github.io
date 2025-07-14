<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import CommitHistory from './CommitHistory.vue'

const { frontmatter } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-after>
      <CommitHistory />
    </template>
  </DefaultTheme.Layout>
</template>

<style>
:root {
  --vp-home-hero-image-filter: blur(0);
}

.VPHomeHero {
  padding-bottom: 48px !important;
}

</style>
