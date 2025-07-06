import DefaultTheme from 'vitepress/theme'
import Layout from './components/Layout.vue'
import CommitHistory from './components/CommitHistory.vue'

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    app.component('CommitHistory', CommitHistory)
  }
}
