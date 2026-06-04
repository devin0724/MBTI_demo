<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storageService } from '@/services/storage'
import { analyses } from '@/data/analyses'
import type { TestResult } from '@/types'

const props = defineProps<{
  resultId: string
}>()

const emit = defineEmits<{
  (e: 'back'): void
  (e: 're-test'): void
  (e: 'view-history'): void
}>()

const result = ref<TestResult | null>(null)
const isLoading = ref(true)

const analysis = computed(() => {
  if (!result.value) return null
  return analyses[result.value.type]
})

const dimensionResults = computed(() => {
  if (!result.value) return []
  const dims = result.value.dimensions
  return [
    { name: '外向(E)', value: dims.E, opposite: '内向(I)', oppositeValue: dims.I },
    { name: '感觉(S)', value: dims.S, opposite: '直觉(N)', oppositeValue: dims.N },
    { name: '思维(T)', value: dims.T, opposite: '情感(F)', oppositeValue: dims.F },
    { name: '判断(J)', value: dims.J, opposite: '感知(P)', oppositeValue: dims.P }
  ]
})

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  const data = storageService.getResultById(props.resultId)
  if (data) {
    result.value = data
  }
  isLoading.value = false
})
</script>

<template>
  <div class="result-page">
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <template v-else-if="result && analysis">
      <div class="result-header">
        <button class="back-btn" @click="emit('back')">
          ← 返回
        </button>
      </div>

      <div class="result-card type-card">
        <div class="type-badge">{{ result.type }}</div>
        <h1 class="type-name">{{ analysis.typeName }}</h1>
        <p class="type-description">{{ analysis.description }}</p>
      </div>

      <div class="result-card dimensions-card">
        <h2>维度分析</h2>
        <div class="dimensions-grid">
          <div v-for="dim in dimensionResults" :key="dim.name" class="dimension-item">
            <div class="dimension-labels">
              <span :class="{ active: dim.value >= dim.oppositeValue }">{{ dim.name }}</span>
              <span :class="{ active: dim.oppositeValue > dim.value }">{{ dim.opposite }}</span>
            </div>
            <div class="dimension-bar">
              <div 
                class="dimension-fill left" 
                :style="{ width: `${(dim.value / (dim.value + dim.oppositeValue)) * 100}%` }"
              ></div>
              <div 
                class="dimension-fill right" 
                :style="{ width: `${(dim.oppositeValue / (dim.value + dim.oppositeValue)) * 100}%` }"
              ></div>
            </div>
            <div class="dimension-scores">
              <span>{{ dim.value }}</span>
              <span>{{ dim.oppositeValue }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="result-card strengths-card">
        <h2>🌟 你的优势</h2>
        <div class="tags">
          <span v-for="strength in analysis.strengths" :key="strength" class="tag strength">
            {{ strength }}
          </span>
        </div>
      </div>

      <div class="result-card weaknesses-card">
        <h2>💡 需要注意</h2>
        <div class="tags">
          <span v-for="weakness in analysis.weaknesses" :key="weakness" class="tag weakness">
            {{ weakness }}
          </span>
        </div>
      </div>

      <div class="result-card careers-card">
        <h2>💼 适合的职业方向</h2>
        <div class="careers-list">
          <div v-for="career in analysis.suitableCareers" :key="career" class="career-item">
            ✓ {{ career }}
          </div>
        </div>
      </div>

      <div class="result-card info-card">
        <p>测试时间：{{ formatDate(result.createdAt) }}</p>
      </div>

      <div class="action-buttons">
        <button class="btn btn-primary" @click="emit('re-test')">
          再测一次
        </button>
        <button class="btn btn-secondary" @click="emit('view-history')">
          查看历史记录
        </button>
      </div>
    </template>

    <div v-else class="not-found">
      <h2>测试结果未找到</h2>
      <button class="btn btn-primary" @click="emit('back')">
        返回首页
      </button>
    </div>
  </div>
</template>

<style scoped>
.result-page {
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 50px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.result-header {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.back-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background 0.3s;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.result-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.type-card {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.type-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 24px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 16px;
}

.type-name {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 12px;
}

.type-description {
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.6;
}

.dimensions-card h2 {
  color: #333;
  margin-bottom: 20px;
}

.dimensions-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dimension-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dimension-labels {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.dimension-labels span.active {
  font-weight: 600;
  color: #667eea;
}

.dimension-bar {
  height: 12px;
  background: #e5e7eb;
  border-radius: 6px;
  display: flex;
  overflow: hidden;
}

.dimension-fill {
  height: 100%;
  transition: width 0.5s ease;
}

.dimension-fill.left {
  background: #667eea;
}

.dimension-fill.right {
  background: #a78bfa;
}

.dimension-scores {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.strengths-card h2,
.weaknesses-card h2,
.careers-card h2 {
  color: #333;
  margin-bottom: 16px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
}

.tag.strength {
  background: #dcfce7;
  color: #166534;
}

.tag.weakness {
  background: #fef3c7;
  color: #92400e;
}

.careers-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.career-item {
  padding: 10px 16px;
  background: #f3f4f6;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
}

.info-card {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 600px;
}

.btn {
  flex: 1;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
}

.not-found {
  background: white;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.not-found h2 {
  color: #333;
  margin-bottom: 20px;
}

@media (max-width: 480px) {
  .type-name {
    font-size: 26px;
  }
  
  .careers-list {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>
