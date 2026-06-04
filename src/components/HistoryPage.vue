<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storageService } from '@/services/storage'
import { analyses } from '@/data/analyses'
import type { TestResult } from '@/types'

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'view-result', id: string): void
}>()

const results = ref<TestResult[]>([])

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getTypeName = (type: string) => {
  const analysis = analyses[type as keyof typeof analyses]
  return analysis ? analysis.typeName : type
}

const deleteResult = (id: string) => {
  if (confirm('确定要删除这条记录吗？')) {
    storageService.deleteResult(id)
    results.value = storageService.getResults()
  }
}

onMounted(() => {
  results.value = storageService.getResults()
})
</script>

<template>
  <div class="history-page">
    <div class="history-header">
      <button class="back-btn" @click="emit('back')">
        ← 返回
      </button>
      <h1>历史记录</h1>
    </div>

    <div v-if="results.length === 0" class="empty-state">
      <div class="empty-icon">📋</div>
      <h2>暂无测试记录</h2>
      <p>完成测试后，结果将保存在这里</p>
      <button class="btn btn-primary" @click="emit('back')">
        返回首页
      </button>
    </div>

    <div v-else class="results-list">
      <div 
        v-for="result in results" 
        :key="result.id" 
        class="result-card"
      >
        <div class="result-info" @click="emit('view-result', result.id)">
          <div class="type-badge">{{ result.type }}</div>
          <div class="type-name">{{ getTypeName(result.type) }}</div>
          <div class="result-date">{{ formatDate(result.createdAt) }}</div>
        </div>
        <button 
          class="delete-btn" 
          @click.stop="deleteResult(result.id)"
          title="删除记录"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-page {
  min-height: 100vh;
  padding: 20px;
}

.history-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
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

.history-header h1 {
  color: white;
  font-size: 24px;
}

.empty-state {
  background: white;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.empty-state h2 {
  color: #333;
  margin-bottom: 10px;
}

.empty-state p {
  color: #666;
  margin-bottom: 20px;
}

.btn {
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a6fd6;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.result-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.type-badge {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  width: fit-content;
}

.type-name {
  color: #333;
  font-weight: 600;
  font-size: 16px;
}

.result-date {
  color: #999;
  font-size: 13px;
}

.delete-btn {
  background: #fee2e2;
  border: none;
  color: #dc2626;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.delete-btn:hover {
  background: #fecaca;
}

@media (max-width: 480px) {
  .history-header h1 {
    font-size: 20px;
  }
}
</style>
