declare global {
  interface Window {
    busuanzi: any
    bszTag: any
    bszCaller: any
    busuanziReady: boolean
    refreshBusuanzi: () => void
  }
}

export {}
