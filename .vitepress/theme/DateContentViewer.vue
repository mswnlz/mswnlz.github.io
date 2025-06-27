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

// Function to dynamically import markdown files
const loadMarkdownFile = async (filePath) => {
  try {
    const module = await import(/* @vite-ignore */ `../../docs/${filePath}`)
    return module.default
  } catch (error) {
    console.error(`Error loading markdown file: ${filePath}`, error)
    return '内容加载失败。'
  }
}

const loadContent = async (fileName) => {
  const fullPath = `${props.repoName}/${fileName}`
  const rawContent = await loadMarkdownFile(fullPath)
  activeContent.value = md.render(rawContent)
  activeFile.value = fileName
}

const fetchDateFiles = async () => {
  // In a real build, you would need to pre-collect these file names
  // For development, we can try to guess or use a pre-defined list
  // For now, let's hardcode for AIknowledge and edu-knowlege as examples
  // A more robust solution would involve a build step to generate a manifest of files
  const files = []
  // This part is tricky for dynamic file listing in VitePress
  // For simplicity, assuming a pattern like 202505.md, 202506.md based on user's structure
  // In a real app, you might use a glob import or a build script to generate this list
  if (props.repoName === 'AIknowledge' || props.repoName === 'edu-knowlege' || props.repoName === 'book' || props.repoName === 'healthy' || props.repoName === 'movies' || props.repoName === 'self-media' || props.repoName === 'tools' || props.repoName === 'cross-border' || props.repoName === 'curriculum' || props.repoName === 'chinese-traditional') {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1 // current month
    // Example: fetch files for current year and previous month
    for (let m = 1; m <= month; m++) {
      const fileName = `${year}${String(m).padStart(2, '0')}.md`
      // Check if file exists (this is a simplified check, full check requires server-side or build-time manifest)
      // For now, we'll assume they exist for the purpose of demonstrating the component
      files.push({ name: fileName })
    }
  }
  
  dateFiles.value = files.filter(f => f.name.match(/^\d{6}\.md$/)).sort((a, b) => b.name.localeCompare(a.name))
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
