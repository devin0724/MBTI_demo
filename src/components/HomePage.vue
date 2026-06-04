<script setup lang="ts">
import { computed } from 'vue'
import { storageService } from '@/services/storage'

const emit = defineEmits<{
  (e: 'start-test'): void
  (e: 'view-history'): void
}>()

const hasProgress = computed(() => storageService.hasProgress())
const resultCount = computed(() => storageService.getResults().length)
</script>

<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="logo-container">
        <div class="logo">
          <span class="logo-text">MBTI</span>
        </div>
        <h1 class="title">MBTI性格测试</h1>
        <p class="subtitle">探索你的性格类型，发现真实的自己</p>
      </div>
    </div>

    <div class="features-section">
      <div class="feature-card">
        <div class="feature-icon">📊</div>
        <h3>科学准确</h3>
        <p>基于MBTI理论框架，24道标准化测试题目</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📱</div>
        <h3>随时随地</h3>
        <p>支持移动端和桌面端，答题进度自动保存</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📝</div>
        <h3>详细报告</h3>
        <p>生成包含性格特点、优势劣势的分析报告</p>
      </div>
    </div>

    <div class="action-section">
      <button 
        class="btn btn-primary" 
        @click="emit('start-test')"
      >
        {{ hasProgress ? '继续测试' : '开始测试' }}
      </button>
      
      <button 
        v-if="resultCount > 0"
        class="btn btn-secondary" 
        @click="emit('view-history')"
      >
        查看历史记录 ({{ resultCount }})
      </button>
    </div>

    <div class="info-section">
      <div class="info-card">
        <h4>关于MBTI</h4>
        <p>MBTI（迈尔斯-布里格斯类型指标）是一种广泛使用的性格测试工具，通过四个维度来描述人的性格：</p>
        <ul class="dimension-list">
          <li><strong>E/I</strong> - 外向/内向</li>
          <li><strong>S/N</strong> - 感觉/直觉</li>
          <li><strong>T/F</strong> - 思维/情感</li>
          <li><strong>J/P</strong> - 判断/感知</li>
        </ul>
        <p>测试完成后，你将获得一个4字母的性格类型代码，并了解你的性格特点和适合的职业方向。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-section {
  text-align: center;
  padding: 40px 20px;
  color: white;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
}

.logo-text {
  font-size: 28px;
  font-weight: bold;
  color: white;
}

.title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 16px;
  opacity: 0.9;
}

.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.feature-card h3 {
  color: #333;
  margin-bottom: 8px;
}

.feature-card p {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.action-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

.btn {
  padding: 16px 40px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
}

.info-section {
  width: 100%;
  max-width: 600px;
}

.info-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.info-card h4 {
  color: #667eea;
  margin-bottom: 12px;
  font-size: 18px;
}

.info-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 12px;
}

.dimension-list {
  list-style: none;
  padding: 0;
  margin-bottom: 12px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.dimension-list li {
  color: #555;
  font-size: 14px;
}

@media (max-width: 480px) {
  .title {
    font-size: 28px;
  }
  
  .features-section {
    grid-template-columns: 1fr;
  }
  
  .dimension-list {
    grid-template-columns: 1fr;
  }
}
</style>
