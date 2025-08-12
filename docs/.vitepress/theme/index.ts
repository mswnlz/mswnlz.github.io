import DefaultTheme from 'vitepress/theme'
import Layout from './components/Layout.vue'
import CommitHistory from './components/CommitHistory.vue'
import VPFooter from './components/VPFooter.vue'
import UpdateTime from './components/UpdateTime.vue'
import ResourceTabs from './components/ResourceTabs.vue'
import SupportSection from '../components/SupportSection.vue'
import './style.css'

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    app.component('CommitHistory', CommitHistory)
    app.component('UpdateTime', UpdateTime)
    app.component('ResourceTabs', ResourceTabs)
    app.component('SupportSection', SupportSection)
    // 覆盖默认的 VPFooter 组件
    app.component('VPFooter', VPFooter)
  }
}
