<template>
  <div class="wireframe-module-detail-page">
    <!-- Header with Navigation -->
    <div class="wireframe-module-header">
      <div class="wireframe-header-nav">
        <button class="wireframe-back-button" @click="navigateToProgram">
          ← Back to Anxiety Management Program
        </button>
        <div class="wireframe-module-progress">
          <div class="wireframe-progress-bar">
            <div class="wireframe-progress-fill" :style="`width: ${currentModuleData.progress}%`"></div>
          </div>
          <div class="wireframe-progress-text">{{ currentModuleData.progress }}% Complete</div>
        </div>
      </div>
      
      <div class="wireframe-module-title-section">
        <div class="wireframe-program-title">Anxiety Management Program</div>
        <div class="wireframe-program-description">A comprehensive program designed to help you understand, manage, and overcome anxiety through evidence-based techniques and practical strategies.</div>
        <div class="wireframe-program-objective">
          <strong>Program Objective:</strong> Understand anxiety disorders, learn evidence-based coping strategies, and develop practical tools for managing anxiety symptoms and improving daily functioning.
        </div>
      </div>
    </div>

    <!-- Mobile Module Navigation (Horizontal) -->
    <div class="wireframe-mobile-nav">
      <div class="wireframe-mobile-nav-header">
        <div class="wireframe-mobile-nav-title">Anxiety Management Program Modules</div>
        <div class="wireframe-mobile-nav-progress">{{ Object.keys(allModules).indexOf(activeModule) + 1 }}/{{ Object.keys(allModules).length }}</div>
      </div>
      
      <div class="wireframe-mobile-nav-items">
        <div 
          v-for="(module, moduleSlug, index) in allModules" 
          :key="moduleSlug"
          :class="['wireframe-mobile-nav-item', { 'wireframe-mobile-nav-active': activeModule === moduleSlug }]"
          @click="navigateToModule(moduleSlug)"
        >
          <div class="wireframe-mobile-nav-icon">{{ index + 1 }}</div>
          <div class="wireframe-mobile-nav-content">
            <div class="wireframe-mobile-nav-title">{{ module.title }}</div>
            <div class="wireframe-mobile-nav-duration">{{ module.duration }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="wireframe-module-layout">
      <!-- Desktop Sidebar Navigation -->
      <div class="wireframe-module-sidebar">
        <div class="wireframe-sidebar-header">
          <div class="wireframe-sidebar-title">Anxiety Management Modules</div>
          <div class="wireframe-sidebar-progress">{{ Object.keys(allModules).indexOf(activeModule) + 1 }}/{{ Object.keys(allModules).length }}</div>
        </div>
        
              <div class="wireframe-sidebar-sections">
                <div 
                  v-for="(module, moduleSlug, index) in allModules" 
                  :key="moduleSlug"
                  :class="['wireframe-sidebar-item', { 'wireframe-sidebar-active': activeModule === moduleSlug }]"
                  @click="navigateToModule(moduleSlug)"
                >
                  <div class="wireframe-sidebar-icon">{{ index + 1 }}</div>
                  <div class="wireframe-sidebar-content">
                    <div class="wireframe-sidebar-title">{{ module.title }}</div>
                    <div class="wireframe-sidebar-duration">{{ module.duration }}</div>
                  </div>
                </div>
              </div>
        
        <!-- Module Navigation -->
        <div class="wireframe-module-nav">
          <button 
            class="wireframe-nav-button wireframe-nav-prev" 
            :disabled="Object.keys(allModules).indexOf(activeModule) === 0"
            @click="goToPrevModule"
          >
            ← Previous Module
          </button>
          <button 
            class="wireframe-nav-button wireframe-nav-next" 
            :disabled="Object.keys(allModules).indexOf(activeModule) === Object.keys(allModules).length - 1"
            @click="goToNextModule"
          >
            Next Module →
          </button>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="wireframe-module-content">
        <div class="wireframe-content-section">
          <div class="wireframe-section-content">
            <div class="wireframe-learning-content">
              <div class="wireframe-content-text">
                <div class="wireframe-module-header">
                  <h2 class="wireframe-module-title">{{ currentModuleData.title }}</h2>
                  <p class="wireframe-module-description">{{ currentModuleData.description }}</p>
                </div>
                
                <h3>{{ currentModuleData.content.title }}</h3>
                <ul>
                  <li v-for="objective in currentModuleData.content.objectives" :key="objective">{{ objective }}</li>
                </ul>
                
                <h3>{{ currentModuleData.content.title }} Fundamentals</h3>
                <p>{{ currentModuleData.content.mainContent }}</p>
                
                <div class="wireframe-examples">
                  <h4>{{ currentModuleData.content.title }} Examples</h4>
                  <div class="wireframe-example-item" v-for="example in currentModuleData.content.examples" :key="example">{{ example }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="wireframe-section-nav">
            <button class="wireframe-section-button wireframe-section-prev" disabled>
              ← Previous Section
            </button>
            <button class="wireframe-section-button wireframe-section-next">
              Next Section →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Current active module
const activeModule = ref('understanding-anxiety')

// Module data for all Anxiety Management modules
const allModules = ref({
  'understanding-anxiety': {
    title: 'Understanding Anxiety',
    description: 'Learn about anxiety disorders, their causes, and evidence-based strategies for managing anxiety symptoms.',
    duration: '30 min',
    progress: 100,
    content: {
      title: 'Understanding Anxiety',
      objectives: [
        'Learn about different types of anxiety disorders',
        'Understand the causes and triggers of anxiety',
        'Recognize physical and emotional symptoms',
        'Develop evidence-based coping strategies'
      ],
      mainContent: 'This module provides comprehensive information about anxiety disorders, their causes, and evidence-based strategies for managing anxiety symptoms. You\'ll learn to recognize anxiety patterns, understand the physiological responses, and develop practical tools for managing anxiety in daily life.',
      examples: [
        'Symptom: Racing heart → Technique: Deep breathing and grounding',
        'Trigger: Social situations → Strategy: Gradual exposure and cognitive restructuring',
        'Pattern: Worry spirals → Tool: Worry time and thought challenging'
      ]
    }
  },
  'breathing-techniques': {
    title: 'Breathing Techniques',
    description: 'Learn evidence-based breathing exercises to manage anxiety and stress.',
    duration: '25 min',
    progress: 0,
    content: {
      title: 'Breathing Techniques for Anxiety',
      objectives: [
        'Learn diaphragmatic breathing techniques',
        'Practice 4-7-8 breathing method',
        'Master box breathing for stress relief',
        'Develop breathing awareness skills'
      ],
      mainContent: 'Breathing techniques are one of the most effective and immediate ways to manage anxiety. This module teaches you evidence-based breathing exercises that can be used anywhere, anytime to reduce anxiety symptoms and promote calm.',
      examples: [
        'Diaphragmatic breathing: 4 seconds in, 4 seconds hold, 6 seconds out',
        '4-7-8 technique: Inhale for 4, hold for 7, exhale for 8',
        'Box breathing: Equal count for inhale, hold, exhale, hold'
      ]
    }
  },
  'cognitive-restructuring': {
    title: 'Cognitive Restructuring',
    description: 'Learn to identify and challenge anxious thoughts using CBT techniques.',
    duration: '40 min',
    progress: 0,
    content: {
      title: 'Cognitive Restructuring for Anxiety',
      objectives: [
        'Identify automatic anxious thoughts',
        'Learn thought challenging techniques',
        'Develop balanced thinking patterns',
        'Practice cognitive restructuring exercises'
      ],
      mainContent: 'Cognitive restructuring helps you identify and change the thought patterns that contribute to anxiety. This module teaches you to recognize cognitive distortions, challenge unhelpful thoughts, and develop more balanced perspectives.',
      examples: [
        'Catastrophizing: "What if I fail?" → "What\'s the worst that could realistically happen?"',
        'Mind reading: "They think I\'m stupid" → "I don\'t actually know what they\'re thinking"',
        'Fortune telling: "I\'ll mess up" → "I can\'t predict the future, but I can prepare"'
      ]
    }
  }
})

// Current module data (reactive)
const currentModuleData = computed(() => {
  return allModules.value[activeModule.value] || allModules.value['understanding-anxiety']
})

const navigateToProgram = () => {
  router.push('/program/anxiety-management')
}

const navigateToModule = (moduleSlug) => {
  console.log('Anxiety Management: Switching to module:', moduleSlug)
  if (allModules.value[moduleSlug]) {
    activeModule.value = moduleSlug
    console.log('Anxiety Management: Switched to module:', moduleSlug)
  } else {
    console.error('Anxiety Management: No module found:', moduleSlug)
  }
}

const goToPrevModule = () => {
  const moduleKeys = Object.keys(allModules.value)
  const currentIndex = moduleKeys.indexOf(activeModule.value)
  if (currentIndex > 0) {
    activeModule.value = moduleKeys[currentIndex - 1]
  }
}

const goToNextModule = () => {
  const moduleKeys = Object.keys(allModules.value)
  const currentIndex = moduleKeys.indexOf(activeModule.value)
  if (currentIndex < moduleKeys.length - 1) {
    activeModule.value = moduleKeys[currentIndex + 1]
  }
}

// Hide main app elements when module is open
onMounted(() => {
  const sidebar = document.querySelector('.v-navigation-drawer')
  const appBar = document.querySelector('.v-app-bar')
  
  if (sidebar) {
    sidebar.style.display = 'none'
  }
  if (appBar) {
    appBar.style.display = 'none'
  }
})

onUnmounted(() => {
  const sidebar = document.querySelector('.v-navigation-drawer')
  const appBar = document.querySelector('.v-app-bar')
  
  if (sidebar) {
    sidebar.style.display = ''
  }
  if (appBar) {
    appBar.style.display = ''
  }
})
</script>

<style scoped>
.wireframe-module-detail-page {
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  background: white;
  color: black;
  font-weight: 600;
  z-index: 9999;
  overflow-y: auto;
}
.wireframe-module-header {
  background: #f0f0f0;
  border-bottom: 2px solid #000;
  padding: 20px;
  margin-bottom: 0;
  border: 2px solid #000;
  border-radius: 4px;
  background: white;
  color: black;
  font-weight: 600;
}

.wireframe-header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.wireframe-back-button {
  background: white;
  border: 2px solid #000;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: black;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.wireframe-back-button:hover {
  background: #f0f0f0;
  transform: translateY(-1px);
}

.wireframe-module-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.wireframe-progress-bar {
  width: 200px;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #000;
}

.wireframe-progress-fill {
  height: 100%;
  background: #f0f0f0;
  transition: width 0.3s ease;
}

.wireframe-progress-text {
  font-size: 14px;
  font-weight: 600;
  color: black;
}

.wireframe-program-title {
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin-bottom: 8px;
}

.wireframe-program-description {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
}

.wireframe-module-title {
  font-size: 32px;
  font-weight: 700;
  color: black;
  margin-bottom: 12px;
}

.wireframe-module-subtitle {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}

/* Mobile Module Navigation */
.wireframe-mobile-nav {
  display: none;
  border: 2px solid #000;
  border-radius: 4px;
  padding: 16px;
  background: white;
  margin: 0 16px 16px 16px;
}

.wireframe-mobile-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ccc;
}

.wireframe-mobile-nav-title {
  font-size: 16px;
  font-weight: 700;
  color: black;
}

.wireframe-mobile-nav-progress {
  font-size: 12px;
  color: #666;
}

.wireframe-mobile-nav-items {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.wireframe-mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  min-width: 120px;
  flex-shrink: 0;
}

.wireframe-mobile-nav-item:hover {
  background-color: #e0e0e0;
}

.wireframe-mobile-nav-active {
  background-color: #d0d0d0;
  border-color: #000;
}

.wireframe-mobile-nav-icon {
  font-size: 14px;
  font-weight: 700;
  color: black;
}

.wireframe-mobile-nav-content {
  flex-grow: 1;
}

.wireframe-mobile-nav-title {
  font-size: 12px;
  font-weight: 600;
  color: black;
  line-height: 1.2;
}

.wireframe-mobile-nav-duration {
  font-size: 10px;
  color: #666;
}

.wireframe-module-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  height: calc(100vh - 140px);
  padding: 24px;
}

/* Mobile responsive layout */
@media (max-width: 768px) {
  .wireframe-mobile-nav {
    display: block;
  }
  
  .wireframe-module-sidebar {
    display: none;
  }
  
  .wireframe-module-layout {
    display: block;
    grid-template-columns: none;
    height: auto;
    padding: 16px;
    gap: 0;
  }
  
  .wireframe-module-content {
    width: 100%;
    margin: 0;
  }
}

.wireframe-module-sidebar {
  border: 2px solid #000;
  border-radius: 4px;
  padding: 20px;
  background: white;
  height: fit-content;
}

.wireframe-sidebar-header {
  border-bottom: 2px solid #000;
  padding-bottom: 16px;
  margin-bottom: 20px;
}

.wireframe-sidebar-title {
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin-bottom: 8px;
}

.wireframe-sidebar-progress {
  font-size: 14px;
  color: #666;
}

.wireframe-sidebar-sections {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wireframe-sidebar-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border: 2px solid #000;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.wireframe-sidebar-item:hover {
  background: #f0f0f0;
  border-color: #000;
}

.wireframe-sidebar-item.wireframe-sidebar-completed {
  background: #f0f0f0;
  border-color: #000;
}

.wireframe-sidebar-item.wireframe-sidebar-current {
  background: #f0f0f0;
  border-color: #000;
  font-weight: bold;
}

.wireframe-sidebar-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-weight: 700;
  color: black;
  background: white;
  border: 1px solid #000;
  border-radius: 50%;
}

.wireframe-sidebar-content {
  flex: 1;
}

.wireframe-sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: black;
  margin-bottom: 4px;
}

.wireframe-sidebar-duration {
  font-size: 12px;
  color: #666;
}

.wireframe-module-content {
  border: 2px solid #000;
  border-radius: 4px;
  padding: 24px;
  background: white;
  overflow-y: auto;
}

.wireframe-content-text {
  color: black;
  font-weight: 600;
  line-height: 1.6;
}

.wireframe-module-header {
  border-bottom: 2px solid #000;
  padding-bottom: 20px;
  margin-bottom: 30px;
}

.wireframe-module-header .wireframe-module-title {
  font-size: 28px;
  font-weight: 700;
  color: black;
  margin-bottom: 12px;
}

.wireframe-module-header .wireframe-module-description {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin: 0;
}

</style>
