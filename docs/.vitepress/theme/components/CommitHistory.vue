<template>
  <div class="commit-history-wrapper">
    <div class="container">
      <div class="commit-history-container">
        <h2>最新动态</h2>
        <div class="scroller">
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
const commits = ref([
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
]);

const getRepoChineseName = (repo) => {
  const repoNames = {
    'AIknowledge': 'AI 知识',
    'auto': '自动化工具',
    'book': '书籍资料',
    'chinese-traditional': '传统文化',
    'cross-border': '跨境电商',
    'curriculum': '课程资料',
    'edu-knowlege': '教育资源',
    'healthy': '健康养生',
    'movies': '影视媒体',
    'self-media': '自媒体',
    'tools': '工具合集'
  };
  return repoNames[repo] || repo;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('zh-CN', options);
};

onMounted(async () => {
  console.log('CommitHistory component mounted');
  
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
      console.log('Using default data');
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
  margin-top: 32px;
  margin-bottom: 48px;
  padding: 32px 28px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg-alt) 100%);
  border: 1px solid var(--vp-c-divider-light);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
}

.commit-history-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3451b2, #5672cd, #3a5ccc);
  border-radius: 20px 20px 0 0;
}

h2 {
  text-align: center;
  margin-bottom: 28px;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  position: relative;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  border-radius: 2px;
}

.loading-message {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  padding: 20px;
}

.scroller {
  height: 200px;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

.scroller::before,
.scroller::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 30px;
  pointer-events: none;
  z-index: 2;
}

.scroller::before {
  top: 0;
  background: linear-gradient(to bottom, var(--vp-c-bg), transparent);
}

.scroller::after {
  bottom: 0;
  background: linear-gradient(to top, var(--vp-c-bg), transparent);
}

.scroller ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  animation: scroll-up 45s linear infinite;
}

.scroller:hover ul {
  animation-play-state: paused;
}

.scroller li {
  border-bottom: 1px solid var(--vp-c-divider-light);
  transition: all 0.3s ease;
}

.scroller li:hover {
  background-color: var(--vp-c-bg-soft);
  transform: scale(1.01);
}

.commit-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  color: inherit;
  text-decoration: none;
  transition: all 0.25s ease;
  position: relative;
}

.commit-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--vp-c-brand-1);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.commit-link:hover::before {
  opacity: 1;
}

.commit-link:hover {
  background-color: var(--vp-c-bg-soft-up);
  padding-left: 24px;
}

.repo-name {
  font-weight: 600;
  width: 120px;
  text-align: center;
  color: var(--vp-c-brand-1);
  font-size: 0.9rem;
  background: var(--vp-c-brand-soft);
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-brand-2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.commit-date {
  width: 150px;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  font-weight: 500;
}

.commit-message {
  flex-grow: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 20px;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

@keyframes scroll-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .commit-history-container {
    padding: 24px 16px;
    margin-top: 24px;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  .scroller {
    height: 160px;
  }
  
  .commit-link {
    padding: 12px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .repo-name {
    width: auto;
  }
  
  .commit-date {
    width: auto;
    text-align: left;
    font-size: 0.8rem;
  }
  
  .commit-message {
    padding-left: 0;
    white-space: normal;
    overflow: visible;
    text-overflow: initial;
    line-height: 1.4;
  }
}
</style>
