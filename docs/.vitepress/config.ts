// @ts-nocheck
import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  base: '/mswnlz-website/',
  title: "mswnlz's Resource Collection",
  vite: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  },
  description: "A collection of resources from mswnlz's GitHub repositories, including AI, books, traditional Chinese culture, cross-border e-commerce, self-media, education, health, movies, and tools.",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '所有资源', link: '/AIknowledge/' } // 指向第一个资源分类，用户可以通过侧边栏切换
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: '资源分类', // 侧边栏的标题
        items: [
          { text: 'AI 知识', link: '/AIknowledge/' },
          { text: '书籍资料', link: '/book/' },
          { text: '传统文化', link: '/chinese-traditional/' },
          { text: '跨境电商', link: '/cross-border/' },
          { text: '课程资料', link: '/curriculum/' },
          { text: '教育知识', link: '/edu-knowlege/' },
          { text: '健康养生', link: '/healthy/' },
          { text: '影视媒体', link: '/movies/' },
          { text: '自媒体', link: '/self-media/' },
          { text: '工具合集', link: '/tools/' },
        ]
      }
    ]
  }
})
