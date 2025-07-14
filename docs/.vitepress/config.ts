// @ts-nocheck
import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'

function getSidebarItems(dir: string) {
  const files = fs.readdirSync(path.join(__dirname, '../', dir))
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .sort() // Sort files alphabetically or by date if naming convention allows

  return files.map(file => {
    const name = path.basename(file, '.md')
    return {
      text: name,
      link: `/${dir}/${name}`
    }
  })
}

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
      'meta',
      {
        name: 'google-site-verification',
        content: 'lI-wB0SQ6fXo-tUmUtTvz_9Qa65EMnPl_9PUuxhCJoI'
      }
    ],
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
        src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
      }
    ],
    [
      'script',
      {},
      `
        // 确保 busuanzi 在页面加载后执行
        (function() {
          function initBusuanzi() {
            if (window.busuanzi) {
              window.busuanzi.fetch();
            } else {
              setTimeout(initBusuanzi, 100);
            }
          }
          
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
              setTimeout(initBusuanzi, 500);
            });
          } else {
            setTimeout(initBusuanzi, 500);
          }
        })();
      `
    ]
  ],
  themeConfig: {
    nav: [
      { text: '点击加入QQ群：1041415822', link: 'https://qm.qq.com/q/59EWTaGqfu' },
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
          {
            text: 'AI 知识',
            collapsed: true,
            items: [
              { text: 'AI 知识主页', link: '/AIknowledge/' },
              ...getSidebarItems('AIknowledge')
            ]
          },
          {
            text: '书籍资料',
            collapsed: true,
            items: [
              { text: '书籍资料主页', link: '/book/' },
              ...getSidebarItems('book')
            ]
          },
          {
            text: '传统文化',
            collapsed: true,
            items: [
              { text: '传统文化主页', link: '/chinese-traditional/' },
              ...getSidebarItems('chinese-traditional')
            ]
          },
          {
            text: '跨境电商',
            collapsed: true,
            items: [
              { text: '跨境电商主页', link: '/cross-border/' },
              ...getSidebarItems('cross-border')
            ]
          },
          {
            text: '课程资料',
            collapsed: true,
            items: [
              { text: '课程资料主页', link: '/curriculum/' },
              ...getSidebarItems('curriculum')
            ]
          },
          {
            text: '教育知识',
            collapsed: true,
            items: [
              { text: '教育知识主页', link: '/edu-knowlege/' },
              ...getSidebarItems('edu-knowlege')
            ]
          },
          {
            text: '健康养生',
            collapsed: true,
            items: [
              { text: '健康养生主页', link: '/healthy/' },
              ...getSidebarItems('healthy')
            ]
          },
          {
            text: '影视媒体',
            collapsed: true,
            items: [
              { text: '影视媒体主页', link: '/movies/' },
              ...getSidebarItems('movies')
            ]
          },
          {
            text: '自媒体',
            collapsed: true,
            items: [
              { text: '自媒体主页', link: '/self-media/' },
              ...getSidebarItems('self-media')
            ]
          },
          {
            text: '工具合集',
            collapsed: true,
            items: [
              { text: '工具合集主页', link: '/tools/' },
              ...getSidebarItems('tools')
            ]
          },
        ]
      }
    ],
    footer: {
      message: '友情链接: <a href="https://869hr.uk">M\'s Blog</a> | 如有侵权，请联系删除。<br>访客数 <span id="busuanzi_value_site_uv"></span> 人次，本站总访问量 <span id="busuanzi_value_site_pv"></span> 次',
      copyright: 'Copyright © 2025-present mswnlz@gmail.com'
    }
  }
})
