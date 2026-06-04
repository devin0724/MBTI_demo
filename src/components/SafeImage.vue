<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  src: string
  alt: string
  fallbackSrc?: string
  width?: string | number
  height?: string | number
  className?: string
}>()

const emit = defineEmits<{
  (e: 'load'): void
  (e: 'error'): void
}>()

const isLoading = ref(true)
const hasError = ref(false)
const currentSrc = ref(props.src)
const hasTriedFallback = ref(false)

const imageStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  display: isLoading.value ? 'none' : 'block'
}))

const handleLoad = () => {
  isLoading.value = false
  hasError.value = false
  emit('load')
}

const handleError = () => {
  if (props.fallbackSrc && !hasTriedFallback.value) {
    hasTriedFallback.value = true
    currentSrc.value = props.fallbackSrc
    isLoading.value = true
  } else {
    isLoading.value = false
    hasError.value = true
    emit('error')
  }
}

const retryLoad = () => {
  hasError.value = false
  hasTriedFallback.value = false
  isLoading.value = true
  currentSrc.value = props.src
}
</script>

<template>
  <div class="safe-image-container" :class="{ 'has-error': hasError }">
    <div v-if="isLoading && !hasError" class="image-loading">
      <div class="spinner"></div>
      <span class="loading-text">加载中...</span>
    </div>
    
    <img
      :src="currentSrc"
      :alt="alt"
      :class="className"
      :style="imageStyle"
      @load="handleLoad"
      @error="handleError"
    />
    
    <div v-if="hasError" class="image-error">
      <div class="error-icon">📷</div>
      <span class="error-text">图片加载失败</span>
      <button class="retry-btn" @click="retryLoad">
        重试加载
      </button>
    </div>
  </div>
</template>

<style scoped>
.safe-image-container {
  position: relative;
  display: inline-block;
}

.image-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 8px;
  width: 200px;
  height: 200px;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 14px;
  color: #999;
}

.image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  width: 200px;
  height: 200px;
  padding: 16px;
}

.error-icon {
  font-size: 40px;
  margin-bottom: 8px;
}

.error-text {
  font-size: 14px;
  color: #dc2626;
  margin-bottom: 12px;
}

.retry-btn {
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.retry-btn:hover {
  background: #5a6fd6;
}
</style>
