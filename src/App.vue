<script setup lang="ts">
import { ref } from 'vue'
import HomePage from '@/components/HomePage.vue'
import TestPage from '@/components/TestPage.vue'
import PayPage from '@/components/PayPage.vue'
import ResultPage from '@/components/ResultPage.vue'
import HistoryPage from '@/components/HistoryPage.vue'
import type { Answer } from '@/types'

type PageType = 'home' | 'test' | 'pay' | 'result' | 'history'

const currentPage = ref<PageType>('home')
const resultId = ref<string>('')
const currentAnswers = ref<Answer[]>([])

const navigateTo = (page: PageType, id?: string) => {
  currentPage.value = page
  if (id) {
    resultId.value = id
  }
}

const handleTestComplete = (answers: Answer[]) => {
  currentAnswers.value = answers
  navigateTo('pay')
}

const handlePayComplete = (id: string) => {
  navigateTo('result', id)
}

const handleBack = () => {
  if (currentPage.value === 'test') {
    currentPage.value = 'home'
  } else if (currentPage.value === 'pay') {
    currentPage.value = 'test'
  } else if (currentPage.value === 'result') {
    currentPage.value = 'home'
  } else if (currentPage.value === 'history') {
    currentPage.value = 'home'
  }
}
</script>

<template>
  <div class="app-container">
    <HomePage 
      v-if="currentPage === 'home'" 
      @start-test="navigateTo('test')"
      @view-history="navigateTo('history')"
    />
    <TestPage 
      v-else-if="currentPage === 'test'"
      @back="handleBack"
      @complete="handleTestComplete"
    />
    <PayPage
      v-else-if="currentPage === 'pay'"
      :answers="currentAnswers"
      @back="handleBack"
      @complete="handlePayComplete"
    />
    <ResultPage 
      v-else-if="currentPage === 'result'"
      :result-id="resultId"
      @back="handleBack"
      @re-test="navigateTo('test')"
      @view-history="navigateTo('history')"
    />
    <HistoryPage 
      v-else-if="currentPage === 'history'"
      @back="handleBack"
      @view-result="(id: string) => navigateTo('result', id)"
    />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  width: 100%;
}
</style>
