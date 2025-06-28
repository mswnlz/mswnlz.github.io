<template>
  <div class="commit-history">
    <h3>最新提交记录</h3>
    <ul>
      <li v-for="commit in commits" :key="commit.repo">
        <strong>{{ commit.repo }}</strong>: {{ commit.message }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const commits = ref([])

onMounted(async () => {
  const response = await fetch('/commits.json')
  commits.value = await response.json()
})
</script>

<style scoped>
.commit-history {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
</style>
