declare global {
  interface Window {
    busuanzi: any
    bszTag: any
    busuanziReady: boolean
    refreshBusuanzi: () => void
  }
}

export {}
