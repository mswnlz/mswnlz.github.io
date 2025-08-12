<template>
  <div class="support-section">
    <div class="support-header">
      <h3 v-if="title">{{ title }}</h3>
      <p v-if="description" class="description">{{ description }}</p>
    </div>
    
    <div class="support-methods">
      <!-- Stripe 支付 -->
      <div class="support-method stripe-method">
        <h4>💳 国际支付</h4>
        <div class="support-button">
          <stripe-buy-button
            buy-button-id="buy_btn_1Qur4TFE3lcYYI0Qm47QfSxG"
            publishable-key="pk_live_51Quq6zFE3lcYYI0QaKgeMb4WjyVVeUGqeXlVaT12Hz14n4c0DQaw6lhn8x28usxLa15qWNQJtGDJXdl7mWEy8qs400dkwj9I0J">
          </stripe-buy-button>
        </div>
        <p class="method-desc">支持信用卡、PayPal等</p>
      </div>

      <!-- 支付宝支付 -->
      <div class="support-method alipay-method">
        <h4>💰 支付宝</h4>
        <div class="qr-code">
          <img src="/edu-knowlege/support-alipay.png" alt="支付宝赞赏二维码" />
        </div>
        <p class="method-desc">扫码使用支付宝赞赏</p>
      </div>

      <!-- 微信支付 -->
      <div class="support-method wechat-method">
        <h4>💚 微信支付</h4>
        <div class="qr-code">
          <img src="/edu-knowlege/wechat-qrcode.jpg" alt="微信赞赏二维码" />
        </div>
        <p class="method-desc">扫码使用微信赞赏</p>
      </div>
    </div>

    <div v-if="showFooter" class="support-footer">
      <p>您的支持将帮助我们提供更多优质免费资源 ❤️</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "💖 支持我们"
  },
  description: {
    type: String,
    default: "如果您觉得我们的资源对您有帮助，欢迎赞赏支持！"
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.support-section {
  text-align: center;
  margin: 2rem auto;
  max-width: 1000px;
  padding: 0 1rem;
}

.support-header {
  margin-bottom: 2rem;
}

.support-header h3 {
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.description {
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  margin-bottom: 0;
}

.support-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.support-method {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.support-method:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.support-method h4 {
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

/* Stripe 方法样式 */
.stripe-method .support-button {
  margin: 1rem 0;
}

/* 二维码样式 */
.qr-code {
  margin: 1rem 0;
}

.qr-code img {
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.method-desc {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
}

.support-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.support-footer p {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .support-methods {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .support-method {
    padding: 1.25rem;
  }
  
  .qr-code img {
    max-width: 180px;
    max-height: 180px;
  }
}

@media (max-width: 480px) {
  .support-section {
    padding: 0 0.5rem;
  }
  
  .support-method {
    padding: 1rem;
  }
  
  .qr-code img {
    max-width: 160px;
    max-height: 160px;
  }
}
</style>
