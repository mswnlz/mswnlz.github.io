<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import CommitHistory from './CommitHistory.vue'

const { frontmatter } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-after>
      <CommitHistory />
    </template>
  </DefaultTheme.Layout>
</template>

<style>
:root {
  --vp-home-hero-image-filter: blur(0);
  --vp-c-brand-1: #3451b2;
  --vp-c-brand-2: #3a5ccc;
  --vp-c-brand-3: #5672cd;
  --vp-c-brand-soft: rgba(52, 81, 178, 0.1);
  --vp-button-brand-border: var(--vp-c-brand-1);
  --vp-button-brand-text: var(--vp-c-white);
  --vp-button-brand-bg: var(--vp-c-brand-1);
  --vp-button-brand-hover-border: var(--vp-c-brand-2);
  --vp-button-brand-hover-text: var(--vp-c-white);
  --vp-button-brand-hover-bg: var(--vp-c-brand-2);
  --vp-button-brand-active-border: var(--vp-c-brand-1);
  --vp-button-brand-active-text: var(--vp-c-white);
  --vp-button-brand-active-bg: var(--vp-button-brand-bg);
}

/* Enhanced Hero Section */
.VPHome .VPHomeHero {
  padding: 80px 24px 64px !important;
  background: linear-gradient(135deg, 
    rgba(52, 81, 178, 0.05) 0%, 
    rgba(58, 92, 204, 0.03) 50%, 
    rgba(86, 114, 205, 0.05) 100%);
  position: relative;
  overflow: hidden;
}

.VPHome .VPHomeHero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(52, 81, 178, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(86, 114, 205, 0.06) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.VPHome .VPHomeHero .container {
  position: relative;
  z-index: 1;
}

.VPHome .VPHomeHero .main .name {
  background: linear-gradient(135deg, #3451b2, #5672cd, #3a5ccc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.VPHome .VPHomeHero .main .text {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  line-height: 1.4;
}

.VPHome .VPHomeHero .main .tagline {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.VPHome .VPHomeHero .actions .action .VPButton {
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.875rem 2.5rem;
  border-radius: 50px;
  background: linear-gradient(45deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  border: none;
  box-shadow: 0 4px 14px 0 rgba(52, 81, 178, 0.25);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.VPHome .VPHomeHero .actions .action .VPButton::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.VPHome .VPHomeHero .actions .action .VPButton:hover::before {
  left: 100%;
}

.VPHome .VPHomeHero .actions .action .VPButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(52, 81, 178, 0.35);
}

/* Enhanced Feature Cards */
.VPHome .VPHomeFeatures {
  padding: 0 24px 64px;
}

.VPHome .VPHomeFeatures .container {
  max-width: 1300px;
  margin: 0 auto;
}

.VPHome .VPHomeFeatures .items {
  gap: 20px;
  /* 智能网格布局：固定卡片尺寸，自动适应行数 */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 320px));
  max-width: 1400px;
  margin: 0 auto;
  /* 自动调整行高以适应内容 */
  align-items: start;
  justify-content: center;
}

/* Remove specific responsive rules as auto-fit handles it automatically */

.VPHome .VPHomeFeatures .item .VPFeature {
  background: linear-gradient(135deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 14px;
  padding: 0;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.VPHome .VPHomeFeatures .item .VPFeature:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-2);
}

.VPHome .VPHomeFeatures .item .VPFeature .box {
  padding: 28px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.VPHome .VPHomeFeatures .item .VPFeature .box .icon {
  font-size: 2.8rem;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
  height: 48px;
  line-height: 1;
}

.VPHome .VPHomeFeatures .item .VPFeature .box .title {
  color: var(--vp-c-brand-1);
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 14px;
  line-height: 1.3;
  flex-shrink: 0;
  height: 36px;
  display: flex;
  align-items: center;
}

.VPHome .VPHomeFeatures .item .VPFeature .box .details {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  flex-grow: 1;
  height: 108px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-top: 2px;
}

/* 核心类别卡片增强样式 - 前4个 */
.VPHome .VPHomeFeatures .items .item:nth-child(-n+4) .VPFeature {
  border: 2px solid var(--vp-c-brand-soft);
  background: linear-gradient(135deg, var(--vp-c-bg) 0%, var(--vp-c-brand-soft) 100%);
}

.VPHome .VPHomeFeatures .items .item:nth-child(-n+4) .VPFeature:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 15px 35px rgba(52, 81, 178, 0.15);
}

.VPHome .VPHomeFeatures .items .item:nth-child(-n+4) .VPFeature .box .icon {
  color: var(--vp-c-brand-1);
  font-size: 3rem;
  height: 52px;
}

/* 特色类别卡片样式 - 第5-8个 */
.VPHome .VPHomeFeatures .items .item:nth-child(n+5):nth-child(-n+8) .VPFeature {
  border: 1px solid var(--vp-c-divider);
}

.VPHome .VPHomeFeatures .items .item:nth-child(n+5):nth-child(-n+8) .VPFeature:hover {
  border-color: var(--vp-c-brand-soft);
}

/* 补充类别卡片样式 - 第9-12个 */
.VPHome .VPHomeFeatures .items .item:nth-child(n+9) .VPFeature {
  opacity: 0.95;
  border: 1px solid var(--vp-c-divider-light);
}

.VPHome .VPHomeFeatures .items .item:nth-child(n+9) .VPFeature:hover {
  opacity: 1;
  border-color: var(--vp-c-divider);
}

/* Responsive adjustments - cards already use single column layout */

@media (max-width: 768px) {
  .VPHome .VPHomeHero {
    padding: 60px 20px 48px !important;
  }
  
  .VPHome .VPHomeHero .main .name {
    font-size: 2.5rem;
  }
  
  .VPHome .VPHomeHero .main .text {
    font-size: 1.2rem;
  }
  
  .VPHome .VPHomeHero .main .tagline {
    font-size: 1rem;
  }
  
  .VPHome .VPHomeFeatures {
    padding: 0 20px 48px;
  }
  
  .VPHome .VPHomeFeatures .item .VPFeature .box {
    padding: 20px;
    height: 200px;
  }
  
  .VPHome .VPHomeFeatures .item .VPFeature .box .icon {
    font-size: 2.5rem;
    height: 40px;
  }
  
  .VPHome .VPHomeFeatures .item .VPFeature .box .title {
    font-size: 1.2rem;
    height: 32px;
  }
  
  .VPHome .VPHomeFeatures .item .VPFeature .box .details {
    height: 96px;
    -webkit-line-clamp: 3;
  }
}

/* Content section styling */
.VPHome .vp-doc {
  background: var(--vp-c-bg-alt);
  margin-top: 32px;
  border-radius: 16px 16px 0 0;
}

.VPHome .vp-doc .container {
  padding: 48px 32px;
}

.VPHome .vp-doc h2 {
  color: var(--vp-c-brand-1);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.VPHome .vp-doc h3 {
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
}

.VPHome .vp-doc p {
  line-height: 1.7;
  margin-bottom: 1.2rem;
}

.VPHome .vp-doc ul {
  margin-bottom: 1.5rem;
}

.VPHome .vp-doc ul li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.VPHome .vp-doc code {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-weight: 500;
  margin: 0 0.25rem;
  font-size: 0.9rem;
}

/* Custom content sections styling */
.VPHome .vp-doc blockquote {
  border-left: 4px solid var(--vp-c-brand-1);
  background: linear-gradient(135deg, var(--vp-c-brand-soft), rgba(86, 114, 205, 0.05));
  padding: 16px 20px;
  margin: 2rem 0;
  border-radius: 0 12px 12px 0;
  font-style: normal;
}

.VPHome .vp-doc blockquote p {
  margin: 0;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-align: center;
}

/* Resource grid styles removed - no longer needed */

.advantages {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
  margin: 2rem 0;
}

.advantages > p {
  background: linear-gradient(135deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 14px;
  padding: 22px;
  margin: 0;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.advantages > p:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-2);
}

.advantages > p strong {
  color: var(--vp-c-brand-1);
  font-size: 1.1rem;
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
}

.keyword-tags {
  text-align: center;
  margin: 2rem 0;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider-light);
}

.keyword-tags code {
  display: inline-block;
  margin: 4px 6px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-brand-2);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.keyword-tags code:hover {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(52, 81, 178, 0.3);
}

/* Platform Stats Grid */
.platform-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 2rem 0;
}

.platform-stats > p {
  background: linear-gradient(135deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 12px;
  padding: 20px 16px;
  margin: 0;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.platform-stats > p:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-soft);
}

.platform-stats > p strong {
  color: var(--vp-c-brand-1);
  font-size: 1rem;
  font-weight: 700;
  display: block;
  margin-bottom: 8px;
}

.platform-stats > p:not(:has(strong)) {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  font-weight: 500;
}

.footer-info {
  background: linear-gradient(135deg, var(--vp-c-bg-alt) 0%, var(--vp-c-bg-soft) 100%);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 28px 32px;
  margin: 3rem 0 2rem;
  text-align: center;
  position: relative;
}

.footer-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  border-radius: 0 0 4px 4px;
}

.footer-info p {
  margin-bottom: 12px;
  line-height: 1.6;
}

.footer-info a {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;
}

.footer-info a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

/* Responsive adjustments for content */
@media (max-width: 768px) {
  .advantages {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  
  .platform-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .platform-stats > p {
    padding: 16px 12px;
  }
  
  .keyword-tags {
    padding: 20px 16px;
  }
  
  .keyword-tags code {
    margin: 3px 4px;
    padding: 6px 10px;
    font-size: 0.8rem;
  }
  
  .footer-info {
    padding: 24px 20px;
    margin: 2rem 0 1rem;
  }
}

@media (max-width: 480px) {
  .platform-stats {
    grid-template-columns: 1fr;
  }
}

</style>
