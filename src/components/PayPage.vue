<script setup lang="ts">
import { ref } from 'vue'
import type { Answer, TestResult } from '@/types'
import { calculator } from '@/utils/calculator'
import { storageService } from '@/services/storage'

const props = defineProps<{
  answers: Answer[]
}>()

const emit = defineEmits<{
  (e: 'complete', id: string): void
  (e: 'back'): void
}>()

const isVerifying = ref(false)
const showSuccess = ref(false)
const payAmount = '0.99'
const isImageLoading = ref(true)
const imageError = ref(false)

const qrCodeUrl = '/qr-code.svg'

const handleImageLoad = () => {
  isImageLoading.value = false
  imageError.value = false
}

const handleImageError = () => {
  isImageLoading.value = false
  imageError.value = true
}

const retryImageLoad = () => {
  isImageLoading.value = true
  imageError.value = false
}


const handlePayConfirm = () => {
  isVerifying.value = true
  setTimeout(() => {
    const dimensions = calculator.calculateDimensions(props.answers)
    const type = calculator.determineType(dimensions)
    const result: TestResult = {
      id: calculator.generateId(),
      type,
      dimensions,
      answers: props.answers,
      createdAt: new Date().toISOString()
    }
    storageService.saveResult(result)
    storageService.clearProgress()
    showSuccess.value = true
    setTimeout(() => {
      emit('complete', result.id)
    }, 1500)
  }, 1500)
}
</script>

<template>
  <div class="pay-page">
    <div class="pay-header">
      <button class="back-btn" @click="emit('back')">
        ← 返回
      </button>
      <h1>解锁测试结果</h1>
    </div>

    <div class="pay-card">
      <div class="pay-icon">🔒</div>
      <h2>获取完整分析报告</h2>
      <p class="pay-desc">打赏后即可查看您的MBTI性格分析报告，包括性格特点、优势劣势和适合的职业方向</p>
      
      <div class="amount-section">
        <span class="amount-label">打赏金额</span>
        <div class="amount-value">
          <span class="currency">¥</span>
          <span class="amount">{{ payAmount }}</span>
        </div>
      </div>

      <div class="qr-section">
        <div class="qr-label">请使用支付宝扫码打赏</div>
        <div class="qr-container">
          <div v-if="isImageLoading && !imageError" class="image-loading">
            <div class="spinner"></div>
            <span>加载中...</span>
          </div>
          <img
            v-show="!isImageLoading && !imageError"
            :src="qrCodeUrl"
            alt="收款码"
            class="qr-code"
            @load="handleImageLoad"
            @error="handleImageError"
          />
          <div v-if="imageError" class="image-error">
            <div>📷</div>
            <span>图片加载失败</span>
            <button class="retry-btn" @click="retryImageLoad">重试</button>
          </div>
        </div>
        <div class="qr-tip">打开支付宝扫一扫</div>
      </div>

      <button 
        class="confirm-btn"
        :class="{ verifying: isVerifying, success: showSuccess }"
        :disabled="isVerifying || showSuccess"
        @click="handlePayConfirm"
      >
        <span v-if="isVerifying" class="btn-text">
          <span class="spinner"></span>
          验证中...
        </span>
        <span v-else-if="showSuccess" class="btn-text">✓ 打赏成功</span>
        <span v-else class="btn-text">我已打赏</span>
      </button>

      <p class="pay-note">打赏完成后点击上方按钮验证</p>
    </div>
  </div>
</template>

<style scoped>
.pay-page {
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pay-header {
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.back-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 8px;
  transition: background 0.3s;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.pay-header h1 {
  color: white;
  font-size: 20px;
}

.pay-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.pay-icon {
  font-size: 50px;
  margin-bottom: 16px;
}

.pay-card h2 {
  color: #333;
  font-size: 22px;
  margin-bottom: 12px;
}

.pay-desc {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 24px;
}

.amount-section {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
}

.amount-label {
  display: block;
  color: #92400e;
  font-size: 14px;
  margin-bottom: 8px;
}

.amount-value {
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.currency {
  font-size: 24px;
  color: #b45309;
  font-weight: 600;
}

.amount {
  font-size: 48px;
  color: #92400e;
  font-weight: bold;
  line-height: 1;
}

.qr-section {
  margin-bottom: 24px;
}

.qr-label {
  color: #333;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.qr-container {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  min-height: 240px;
}

.qr-code {
  border-radius: 8px;
  width: 200px;
  height: 200px;
}

.image-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #999;
  font-size: 14px;
}

.image-loading .spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #667eea;
}

.image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #dc2626;
  font-size: 14px;
}

.image-error div:first-child {
  font-size: 40px;
}

.image-error .retry-btn {
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.qr-tip {
  color: #999;
  font-size: 14px;
}

.confirm-btn {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.confirm-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.confirm-btn:disabled {
  opacity: 0.8;
}

.confirm-btn.verifying {
  background: #e5e7eb;
  color: #666;
}

.confirm-btn.success {
  background: #4ade80;
  color: white;
}

.btn-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #999;
  border-top-color: #666;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.pay-note {
  color: #999;
  font-size: 12px;
  margin-top: 16px;
}

@media (max-width: 480px) {
  .pay-card {
    padding: 20px;
  }
  
  .amount {
    font-size: 40px;
  }
  
  .qr-container {
    min-height: 200px;
  }
  
  .qr-code {
    width: 160px;
    height: 160px;
  }
}
</style>
