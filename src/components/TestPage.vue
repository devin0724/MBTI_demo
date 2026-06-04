<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { questions } from '@/data/questions'
import { storageService } from '@/services/storage'
import type { Answer, Dimension } from '@/types'

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'complete', answers: Answer[]): void
}>()

const currentIndex = ref(0)
const answers = ref<Answer[]>([])

const currentQuestion = computed(() => questions[currentIndex.value])
const progress = computed(() => ((currentIndex.value + 1) / questions.length) * 100)
const answeredCount = computed(() => answers.value.length)
const isLastQuestion = computed(() => currentIndex.value === questions.length - 1)

const getAnswerForQuestion = (questionId: number): Dimension | null => {
  const answer = answers.value.find(a => a.questionId === questionId)
  return answer ? answer.answer : null
}

const selectAnswer = (value: Dimension) => {
  const existingIndex = answers.value.findIndex(a => a.questionId === currentQuestion.value.id)
  if (existingIndex >= 0) {
    answers.value[existingIndex] = { questionId: currentQuestion.value.id, answer: value }
  } else {
    answers.value.push({ questionId: currentQuestion.value.id, answer: value })
  }
}

const nextQuestion = () => {
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
  }
}

const prevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const goToQuestion = (index: number) => {
  currentIndex.value = index
}

const submitTest = () => {
  emit('complete', answers.value)
}

const saveProgressAndExit = () => {
  storageService.saveProgress(answers.value)
  emit('back')
}

onMounted(() => {
  const savedProgress = storageService.getProgress()
  if (savedProgress.length > 0) {
    answers.value = savedProgress
    const maxId = Math.max(...savedProgress.map(a => a.questionId), 0)
    const index = questions.findIndex(q => q.id === maxId)
    currentIndex.value = index >= 0 ? index : 0
  }
})

watch(answers, () => {
  storageService.saveProgress(answers.value)
}, { deep: true })
</script>

<template>
  <div class="test-page">
    <div class="test-header">
      <button class="back-btn" @click="saveProgressAndExit">
        ← 返回
      </button>
      <div class="progress-info">
        <span>{{ currentIndex + 1 }} / {{ questions.length }}</span>
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
      <div class="progress-text">
        已完成 {{ answeredCount }} / {{ questions.length }} 题
      </div>
    </div>

    <div class="question-nav">
      <button
        v-for="(q, index) in questions"
        :key="q.id"
        class="nav-btn"
        :class="{ 
          active: currentIndex === index,
          answered: getAnswerForQuestion(q.id) !== null
        }"
        @click="goToQuestion(index)"
      >
        {{ index + 1 }}
      </button>
    </div>

    <div class="question-container">
      <div class="question-number">第 {{ currentIndex + 1 }} 题</div>
      <h2 class="question-text">{{ currentQuestion.text }}</h2>
      
      <div class="options-list">
        <button
          v-for="option in currentQuestion.options"
          :key="option.value"
          class="option-btn"
          :class="{ selected: getAnswerForQuestion(currentQuestion.id) === option.value }"
          @click="selectAnswer(option.value)"
        >
          {{ option.text }}
        </button>
      </div>
    </div>

    <div class="action-buttons">
      <button 
        class="btn btn-secondary" 
        :disabled="currentIndex === 0"
        @click="prevQuestion"
      >
        上一题
      </button>
      
      <button 
        v-if="!isLastQuestion"
        class="btn btn-primary"
        @click="nextQuestion"
      >
        下一题
      </button>
      
      <button 
        v-else
        class="btn btn-success"
        :disabled="answeredCount === 0"
        @click="submitTest"
      >
        提交测试
      </button>
    </div>
  </div>
</template>

<style scoped>
.test-page {
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
}

.test-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-btn {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.3s;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.progress-info {
  color: white;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
}

.progress-bar-container {
  margin-bottom: 20px;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: white;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  color: white;
  font-size: 14px;
  margin-top: 8px;
}

.question-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-btn.active {
  background: white;
  color: #667eea;
}

.nav-btn.answered {
  border-color: #4ade80;
  background: rgba(74, 222, 128, 0.3);
}

.question-container {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.question-number {
  color: #667eea;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.question-text {
  font-size: 20px;
  color: #333;
  margin-bottom: 24px;
  line-height: 1.5;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-btn {
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  text-align: left;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
}

.option-btn:hover {
  border-color: #667eea;
  background: #f8fafc;
}

.option-btn.selected {
  border-color: #667eea;
  background: #f0f4ff;
  color: #667eea;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
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

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-success {
  background: #4ade80;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #22c55e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 480px) {
  .question-text {
    font-size: 18px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>
