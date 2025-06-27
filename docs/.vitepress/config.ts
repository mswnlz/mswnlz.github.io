import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "mswnlz's Resource Collection",
  description: "A collection of resources from mswnlz's GitHub repositories, including AI, books, traditional Chinese culture, cross-border e-commerce, self-media, education, health, movies, and tools.",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'AI Knowledge', link: '/AIknowledge/' },
      { text: 'Books', link: '/book/' },
      { text: 'Chinese Traditional', link: '/chinese-traditional/' },
      { text: 'Cross-Border E-commerce', link: '/cross-border/' },
      { text: 'Curriculum', link: '/curriculum/' },
      { text: 'Education Knowledge', link: '/edu-knowlege/' },
      { text: 'Healthy', link: '/healthy/' },
      { text: 'Movies', link: '/movies/' },
      { text: 'Self-Media', link: '/self-media/' },
      { text: 'Tools', link: '/tools/' },
    ],
    sidebar: [
      {
        text: 'Resources',
        items: [
          { text: 'AI Knowledge', link: '/AIknowledge/' },
          { text: 'Books', link: '/book/' },
          { text: 'Chinese Traditional', link: '/chinese-traditional/' },
          { text: 'Cross-Border E-commerce', link: '/cross-border/' },
          { text: 'Curriculum', link: '/curriculum/' },
          { text: 'Education Knowledge', link: '/edu-knowlege/' },
          { text: 'Healthy', link: '/healthy/' },
          { text: 'Movies', link: '/movies/' },
          { text: 'Self-Media', link: '/self-media/' },
          { text: 'Tools', link: '/tools/' },
        ]
      }
    ]
  }
})
