<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import CommitHistory from './CommitHistory.vue'
import VPFooter from './VPFooter.vue'

const { frontmatter } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-after>
      <CommitHistory />
    </template>
    <template #layout-bottom>
      <VPFooter />
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
