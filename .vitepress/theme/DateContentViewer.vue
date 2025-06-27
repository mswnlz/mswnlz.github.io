<template>
  <div class="date-content-viewer">
    <div class="tabs">
      <button
        v-for="dateFile in dateFiles"
        :key="dateFile.name"
        :class="{ active: activeFile === dateFile.name }"
        @click="loadContent(dateFile.name)"
      >
        {{ dateFile.name.replace('.md', '') }}
      </button>
    </div>
    <div v-if="activeContent" class="content" v-html="activeContent"></div>
    <div v-else>
      <p>点击日期标签查看内容。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import MarkdownIt from 'markdown-it'

const props = defineProps({
  repoName: {
    type: String,
    required: true
  }
})

const md = new MarkdownIt()
const route = useRoute()
const dateFiles = ref([])
const activeFile = ref(null)
const activeContent = ref('')

// New: Use import.meta.glob to import all date MD files
const modules = import.meta.glob('../../docs/**/??????.md', { as: 'raw', eager: true })

const loadContent = async (fileName) => {
  const fullPath = `../../docs/${props.repoName}/${fileName}`
  if (modules[fullPath]) {
    const rawContent = modules[fullPath]
    activeContent.value = md.render(rawContent)
    activeFile.value = fileName
  } else {
    console.error(`File not found in modules: ${fullPath}`)
    activeContent.value = '内容加载失败：文件未找到。'
  }
}

const fetchDateFiles = async () => {
  const files = []
  // Filter modules to only include files for the current repo and matching date pattern
  for (const path in modules) {
    if (path.startsWith(`../../docs/${props.repoName}/`) && path.match(/\/\d{6}\.md$/)) {
      const fileName = path.split('/').pop()
      files.push({ name: fileName })
    }
  }
  dateFiles.value = files.sort((a, b) => b.name.localeCompare(a.name))
  if (dateFiles.value.length > 0) {
    loadContent(dateFiles.value[0].name) // Load the latest content by default
  }
}

onMounted(fetchDateFiles)
watch(() => props.repoName, fetchDateFiles)
</script>

<style scoped>
.date-content-viewer {
  margin-top: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
}
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}
.tabs button {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}
.tabs button.active {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}
.tabs button:hover:not(.active) {
  background-color: var(--vp-c-brand-2);
  color: var(--vp-c-white);
}
.content {
  background-color: var(--vp-c-bg-alt);
  border-radius: 4px;
  padding: 16px;
}
</style>
