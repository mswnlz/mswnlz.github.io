import DefaultTheme from 'vitepress/theme'
import CommitHistory from './CommitHistory.vue'
import { onMounted } from 'vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('CommitHistory', CommitHistory)

    // 动态加载不蒜子脚本
    onMounted(() => {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
      document.body.appendChild(s);
    });
  }
}
