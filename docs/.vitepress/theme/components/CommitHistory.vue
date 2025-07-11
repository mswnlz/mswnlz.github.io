<template>
  <div class="commit-history-wrapper">
    <div class="container">
      <div class="commit-history-container">
        <h2>最新动态</h2>
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
  
  // 立即设置fallback数据，确保组件有内容显示
  commits.value = [
    {
      repo: 'book',
      message: '增加 《结绳手册 手把手教你打绳结》史上最全的绳结打法',
      date: '2025-07-11T11:40:40Z',
      url: '/book/202507'
    },
    {
      repo: 'tools',
      message: '增加 【PS素材】字体+图标+图表+图片包',
      date: '2025-07-11T11:41:07Z',
      url: '/tools/202507'
    },
    {
      repo: 'healthy',
      message: '增加 塑身操全集视频课',
      date: '2025-07-11T11:39:49Z',
      url: '/healthy/202507'
    },
    {
      repo: 'curriculum',
      message: '增加 阳台种植课程',
      date: '2025-07-06T11:57:57Z',
      url: '/curriculum/202507'
    }
  ];
  
  try {
    // 尝试获取最新数据
    const possiblePaths = ['/commits.json', '../commits.json', './commits.json'];
    let data = null;
    
    for (const path of possiblePaths) {
      try {
        console.log(`Trying to fetch from: ${path}`);
        const response = await fetch(path);
        if (response.ok) {
          data = await response.json();
          console.log(`Successfully loaded data from ${path}:`, data);
          break;
        }
      } catch (e) {
        console.log(`Failed to fetch from ${path}:`, e);
      }
    }
    
    if (data && data.length > 0) {
      commits.value = [...data, ...data];
      console.log('Updated with real data:', commits.value.length);
    } else {
      console.log('Using fallback data');
    }
  } catch (error) {
    console.error('Failed to load commit history:', error);
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
