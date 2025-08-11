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
  titleTemplate: ":title - 大坝的资源收集站 | 免费资源下载",
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  sitemap: {
    hostname: 'https://doc.869hr.uk'
  },
  vite: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  },
  description: "超过100T免费资源下载站，包含AI知识、书籍资料、跨境电商、自媒体、教育、健康、影视、工具等海量资源，持续更新中",
  head: [
    // 基础网站图标配置
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    
    // Apple 设备图标
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-touch-icon-144x144.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-touch-icon-120x120.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-touch-icon-114x114.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-touch-icon-76x76.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-touch-icon-72x72.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-touch-icon-60x60.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-touch-icon-57x57.png' }],
    
    // Android Chrome 图标
    ['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/android-chrome-512x512.png' }],
    
    // PWA 相关
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'msapplication-TileColor', content: '#2d89ef' }],
    ['meta', { name: 'msapplication-TileImage', content: '/mstile-144x144.png' }],
    ['meta', { name: 'msapplication-config', content: '/browserconfig.xml' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    
    // Open Graph / 社交媒体分享图标
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '大坝的资源收集站 | 超过 100T+ 资源' }],
    ['meta', { property: 'og:description', content: 'A collection of resources including AI, books, traditional Chinese culture, cross-border e-commerce, self-media, education, health, movies, and tools.' }],
    ['meta', { property: 'og:image', content: '/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:url', content: 'https://doc.869hr.uk' }],
    
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: '大坝的资源收集站 | 超过 100T+ 资源' }],
    ['meta', { name: 'twitter:description', content: 'A collection of resources including AI, books, traditional Chinese culture, cross-border e-commerce, self-media, education, health, movies, and tools.' }],
    ['meta', { name: 'twitter:image', content: '/og-image.png' }],
    
    // SEO 关键字和其他元标签
    ['meta', { name: 'keywords', content: '免费资源下载,AI知识,书籍资料,跨境电商,自媒体,教育资源,健康养生,影视资源,工具软件,100T资源,网盘资源,夸克网盘,阿里网盘' }],
    ['meta', { name: 'author', content: '大坝的资源收集站' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    ['meta', { name: 'revisit-after', content: '1 days' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:site_name', content: '大坝的资源收集站' }],
    
    // 结构化数据 (JSON-LD)
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '大坝的资源收集站',
        description: '超过100T免费资源下载站，包含AI知识、书籍资料、跨境电商、自媒体、教育、健康、影视、工具等海量资源',
        url: 'https://doc.869hr.uk',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://doc.869hr.uk/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        },
        author: {
          '@type': 'Organization',
          name: '大坝的资源收集站',
          url: 'https://doc.869hr.uk'
        },
        publisher: {
          '@type': 'Organization',
          name: '大坝的资源收集站',
          url: 'https://doc.869hr.uk'
        }
      })
    ],
    
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
      {
        async: true,
        src: 'https://js.stripe.com/v3/buy-button.js'
      }
    ],
    [
      'script',
      {},
      `
        // 全局不蒜子统计管理
        window.busuanziReady = false;
        
        // 等待不蒜子脚本加载完成
        (function() {
          let checkCount = 0;
          const maxChecks = 50; // 最多检查5秒
          
          function checkBusuanziReady() {
            if (window.bszCaller && window.bszTag) {
              window.busuanziReady = true;
              console.log('不蒜子统计已就绪');
              return;
            }
            
            checkCount++;
            if (checkCount < maxChecks) {
              setTimeout(checkBusuanziReady, 100);
            } else {
              console.warn('不蒜子统计加载超时');
            }
          }
          
          // 开始检查
          checkBusuanziReady();
        })();
        
        // 刷新不蒜子统计的全局函数
        window.refreshBusuanzi = function() {
          if (window.busuanziReady && window.bszCaller) {
            try {
              // 设置超时处理
              const timeout = setTimeout(() => {
                console.warn('不蒜子统计请求超时，显示默认提示');
                window.showBusuanziError();
              }, 8000); // 8秒超时
              
              // 直接调用不蒜子的 fetch 方法
              window.bszCaller.fetch('//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback', function(data) {
                clearTimeout(timeout);
                if (window.bszTag && data) {
                  window.bszTag.texts(data);
                  window.bszTag.shows();
                  console.log('不蒜子统计已刷新');
                } else {
                  console.error('不蒜子数据无效');
                  window.showBusuanziError();
                }
              });
            } catch (e) {
              console.error('刷新不蒜子统计失败:', e);
              window.showBusuanziError();
            }
          } else {
            console.warn('不蒜子未就绪，稍后重试');
            setTimeout(() => window.refreshBusuanzi(), 2000);
          }
        };
        
        // 显示错误信息的函数
        window.showBusuanziError = function() {
          const uvElement = document.getElementById('busuanzi_value_site_uv');
          const pvElement = document.getElementById('busuanzi_value_site_pv');
          
          if (uvElement) uvElement.textContent = '统计服务暂时不可用';
          if (pvElement) pvElement.textContent = '统计服务暂时不可用';
          
          // 隐藏容器以避免显示奇怪的文本
          const uvContainer = document.getElementById('busuanzi_container_site_uv');
          const pvContainer = document.getElementById('busuanzi_container_site_pv');
          
          if (uvContainer) uvContainer.style.display = 'none';
          if (pvContainer) pvContainer.style.display = 'none';
        };
      `
    ]
  ],
  themeConfig: {
    nav: [
      { text: '点击加入QQ群：1041415822', link: 'https://qm.qq.com/q/59EWTaGqfu' },
      { text: '首页', link: '/' },
      { text: '所有资源', link: '/AIknowledge/' }, // 指向第一个资源分类，用户可以通过侧边栏切换
      { text: '💖 赞赏支持', link: '/support' },
      { text: '免责声明', link: '/disclaimer' }
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
      message: '友情链接: <a href="https://869hr.uk">M\'s Blog</a> | <a href="/disclaimer">免责声明</a> | 如有侵权，请联系删除。<br><span id="busuanzi_container_site_uv">访客数 <span id="busuanzi_value_site_uv"></span> 人次</span>，<span id="busuanzi_container_site_pv">本站总访问量 <span id="busuanzi_value_site_pv"></span> 次</span>',
      copyright: 'Copyright © 2025-present mswnlz@gmail.com'
    }
  }
})
