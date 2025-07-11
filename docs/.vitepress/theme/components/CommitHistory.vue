<template>
  <div class="commit-history-wrapper">
    <div class="container">
      <div class="commit-history-container">
        <h2>最新动态</h2>
        <div class="debug-info">
          <p>组件已加载 - 提交数量: {{ commits.length }}</p>
        </div>
        <div v-if="commits.length === 0" class="loading-message">
          正在加载最新动态...
        </div>
        <div v-else class="scroller">
          <ul>
            <li v-for="(commit, index) in commits" :key="`${commit.repo}-${index}`">
              <a :href="commit.url" class="commit-link">
                <span class="repo-name">{{ getRepoChineseName(commit.repo) }}</span>
                <span class="commit-date">{{ formatDate(commit.date) }}</span>
                <span class="commit-message">{{ commit.message }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useData } from 'vitepress';

const { theme } = useData();
const commits = ref([]);

const getRepoChineseName = (repo) => {
  const sidebar = theme.value.sidebar;
  if (sidebar && sidebar[0] && sidebar[0].items) {
    const item = sidebar[0].items.find(i => i.link.includes(`/${repo}/`));
    return item ? item.text : repo;
  }
  return repo;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('zh-CN', options);
};

onMounted(async () => {
  console.log('CommitHistory component mounted');
  try {
    const response = await fetch('/commits.json');
    console.log('Fetch response:', response);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Commit data loaded:', data);
    
    if (data && data.length > 0) {
      commits.value = [...data, ...data];
      console.log('Commits set:', commits.value.length);
    } else {
      commits.value = [];
      console.log('No commits data found');
    }
  } catch (error) {
    console.error('Failed to load commit history:', error);
    commits.value = [];
  }
});
</script>

<style scoped>
.commit-history-wrapper {
  position: relative;
  padding: 0 24px;
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.commit-history-container {
  margin-top: 16px;
  margin-bottom: 48px;
  padding: 20px 24px;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.debug-info {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.loading-message {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  padding: 20px;
}

.scroller {
  height: 150px;
  overflow: hidden;
  position: relative;
}

.scroller ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  animation: scroll-up 20s linear infinite;
}

.scroller li {
  border-bottom: 1px solid var(--vp-c-divider);
}

.commit-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  color: inherit;
  text-decoration: none;
  transition: background-color 0.25s;
}

.commit-link:hover {
  background-color: var(--vp-c-bg-soft-up);
}

.repo-name {
  font-weight: 600;
  width: 120px;
  text-align: left;
}

.commit-date {
  width: 150px;
  text-align: center;
  color: var(--vp-c-text-2);
}

.commit-message {
  flex-grow: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 20px;
}

@keyframes scroll-up {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50%);
  }
}
</style>
