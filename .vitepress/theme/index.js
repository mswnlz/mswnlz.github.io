import DefaultTheme from 'vitepress/theme'
import DateContentViewer from './DateContentViewer.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('DateContentViewer', DateContentViewer)
  }
}
