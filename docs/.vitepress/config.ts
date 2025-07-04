// @ts-nocheck
import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  base: '/',
  title: "超过 100T 的资源",
  vite: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  },
  description: "A collection of resources from mswnlz's GitHub repositories, including AI, books, traditional Chinese culture, cross-border e-commerce, self-media, education, health, movies, and tools.",
  head: [
    [
      'script',
      {
        async: true,
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2634092855285462',
        crossorigin: 'anonymous'
      },
    ],
    [
      'script',
      {
        async: true,
        src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
      }
    ]
  ],
  themeConfig: {
    nav: [
      { text: '加入分享QQ群：1041415822', link: 'https://qm.qq.com/q/59EWTaGqfu' },
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
    ],
    footer: {
      message: '友情链接: <a href="https://869hr.uk">M\'s Blog</a> | 如有侵权，请联系删除。<br>访客数 <span id="busuanzi_value_site_uv"></span> 人次，本站总访问量 <span id="busuanzi_value_site_pv"></span> 次',
      copyright: 'Copyright © 2025-present mswnlz@gmail.com'
    }
  }
})
