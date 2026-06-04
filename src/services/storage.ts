import type { TestResult, Answer } from '@/types'

const RESULTS_KEY = 'mbti_results'
const PROGRESS_KEY = 'mbti_progress'

export const storageService = {
  saveResult(result: TestResult): void {
    const results = this.getResults()
    results.unshift(result)
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results))
  },

  getResults(): TestResult[] {
    const data = localStorage.getItem(RESULTS_KEY)
    return data ? JSON.parse(data) : []
  },

  getResultById(id: string): TestResult | undefined {
    const results = this.getResults()
    return results.find(r => r.id === id)
  },

  deleteResult(id: string): void {
    const results = this.getResults().filter(r => r.id !== id)
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results))
  },

  clearResults(): void {
    localStorage.removeItem(RESULTS_KEY)
  },

  saveProgress(answers: Answer[]): void {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(answers))
  },

  getProgress(): Answer[] {
    const data = localStorage.getItem(PROGRESS_KEY)
    return data ? JSON.parse(data) : []
  },

  clearProgress(): void {
    localStorage.removeItem(PROGRESS_KEY)
  },

  hasProgress(): boolean {
    return localStorage.getItem(PROGRESS_KEY) !== null
  }
}
