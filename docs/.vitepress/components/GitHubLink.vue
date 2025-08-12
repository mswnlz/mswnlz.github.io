<template>
  <div class="github-link-section">
    <div class="github-banner">
      <div class="github-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      </div>
      <div class="github-content">
        <h3>🌟 开源项目</h3>
        <p>本站完全开源！欢迎查看源代码、贡献代码或提出建议</p>
        <div class="github-badges">
          <span class="badge">MIT License</span>
          <span class="badge">Vue 3</span>
          <span class="badge">VitePress</span>
        </div>
      </div>
      <div class="github-action-section">
        <a 
          href="https://github.com/mswnlz" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="github-button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub 源代码
        </a>
        <div class="github-stats">
          <div class="stat-item">
            <span class="stat-label">开源协议</span>
            <span class="stat-value">MIT</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">技术栈</span>
            <span class="stat-value">Vue 3 + VitePress</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.github-link-section {
  margin: 48px 0;
  padding: 0 24px;
}

.github-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 40px 48px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  max-width: 1200px;
  margin: 0 auto;
}

.github-banner:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  transform: translateY(-3px);
}

.github-icon {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #24292e 0%, #1a1e22 100%);
  border-radius: 50%;
  color: white;
  box-shadow: 0 6px 16px rgba(36, 41, 46, 0.25);
}

.github-icon svg {
  width: 40px;
  height: 40px;
}

.github-content {
  flex: 1;
  max-width: 600px;
}

.github-content h3 {
  margin: 0 0 12px 0;
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.2;
}

.github-content p {
  margin: 0 0 20px 0;
  font-size: 18px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.github-badges {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.badge {
  display: inline-block;
  padding: 6px 16px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.github-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: #24292e;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(36, 41, 46, 0.2);
}

.github-button:hover {
  background: #1a1e22;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(36, 41, 46, 0.3);
  text-decoration: none;
  color: white;
}

.github-button svg {
  width: 18px;
  height: 18px;
}

.github-action-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  min-width: 200px;
}

.github-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid var(--vp-c-border-soft);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateX(-2px);
}

.stat-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 13px;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

/* 深色模式适配 */
html.dark .github-banner {
  background: linear-gradient(135deg, #1e1e20 0%, #2a2a2c 100%);
  border-color: var(--vp-c-border);
}

html.dark .github-content h3 {
  color: var(--vp-c-text-1);
}

html.dark .github-content p {
  color: var(--vp-c-text-2);
}

html.dark .stat-item {
  background: rgba(0, 0, 0, 0.3);
  border-color: var(--vp-c-border-soft);
}

html.dark .stat-item:hover {
  background: rgba(0, 0, 0, 0.4);
}

html.dark .stat-label {
  color: var(--vp-c-text-2);
}

html.dark .stat-value {
  color: var(--vp-c-text-1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .github-link-section {
    padding: 0 16px;
  }
  
  .github-banner {
    flex-direction: column;
    text-align: center;
    padding: 24px 16px;
    gap: 16px;
  }
  
  .github-icon {
    width: 56px;
    height: 56px;
  }
  
  .github-content h3 {
    font-size: 20px;
  }
  
  .github-content p {
    font-size: 14px;
  }
  
  .github-badges {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .github-banner {
    padding: 20px 12px;
  }
  
  .github-icon {
    width: 48px;
    height: 48px;
  }
  
  .github-content h3 {
    font-size: 18px;
  }
  
  .github-button {
    padding: 10px 20px;
    font-size: 13px;
  }
}
</style>

