import DefaultTheme from 'vitepress/theme'
import CommitHistory from './CommitHistory.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('CommitHistory', CommitHistory)
  }
}
