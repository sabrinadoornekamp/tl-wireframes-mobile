<template>
  <div class="wireframe-module-detail-page">
    <!-- Header with Navigation -->
    <div class="wireframe-module-header">
      <div class="wireframe-header-nav">
        <button class="wireframe-back-button" @click="navigateToProgram">
          ← Back to Cognitive Behavioral Therapy
        </button>
        <div class="wireframe-module-progress">
          <div class="wireframe-progress-bar">
            <div class="wireframe-progress-fill" style="width: 100%"></div>
          </div>
          <div class="wireframe-progress-text">100% Complete</div>
        </div>
      </div>
      
      <div class="wireframe-module-title-section">
        <div class="wireframe-program-title">Cognitive Behavioral Therapy Program</div>
        <div class="wireframe-module-title">{{ currentModuleData.title }}</div>
        <div class="wireframe-module-subtitle">{{ currentModuleData.description }}</div>
        <div class="wireframe-program-objective">
          <strong>Program Objective:</strong> Learn evidence-based CBT techniques to identify and challenge negative thought patterns, develop healthier thinking habits, and improve emotional well-being through structured cognitive and behavioral interventions.
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="wireframe-module-layout">
      <!-- Sidebar Navigation -->
      <div class="wireframe-module-sidebar">
        <div class="wireframe-sidebar-header">
          <div class="wireframe-sidebar-title">CBT Program Modules</div>
          <div class="wireframe-sidebar-progress">2/6</div>
        </div>
        
              <div class="wireframe-sidebar-sections">
                <div class="wireframe-sidebar-item wireframe-sidebar-completed" @click="navigateToModule('introduction-to-cbt')">
                  <div class="wireframe-sidebar-icon">✓</div>
                  <div class="wireframe-sidebar-content">
                    <div class="wireframe-sidebar-title">Introduction to CBT</div>
                    <div class="wireframe-sidebar-duration">45 min</div>
                  </div>
                </div>
                <div class="wireframe-sidebar-item wireframe-sidebar-completed" @click="navigateToModule('identifying-negative-thoughts')">
                  <div class="wireframe-sidebar-icon">✓</div>
                  <div class="wireframe-sidebar-content">
                    <div class="wireframe-sidebar-title">Identifying Negative Thoughts</div>
                    <div class="wireframe-sidebar-duration">60 min</div>
                  </div>
                </div>
                <div class="wireframe-sidebar-item" @click="navigateToModule('thought-challenging-techniques')">
                  <div class="wireframe-sidebar-icon">3</div>
                  <div class="wireframe-sidebar-content">
                    <div class="wireframe-sidebar-title">Thought Challenging Techniques</div>
                    <div class="wireframe-sidebar-duration">50 min</div>
                  </div>
                </div>
                <div class="wireframe-sidebar-item" @click="navigateToModule('behavioral-experiments')">
                  <div class="wireframe-sidebar-icon">4</div>
                  <div class="wireframe-sidebar-content">
                    <div class="wireframe-sidebar-title">Behavioral Experiments</div>
                    <div class="wireframe-sidebar-duration">55 min</div>
                  </div>
                </div>
                <div class="wireframe-sidebar-item" @click="navigateToModule('relapse-prevention')">
                  <div class="wireframe-sidebar-icon">5</div>
                  <div class="wireframe-sidebar-content">
                    <div class="wireframe-sidebar-title">Relapse Prevention</div>
                    <div class="wireframe-sidebar-duration">40 min</div>
                  </div>
                </div>
              </div>
        
        <!-- Module Navigation -->
        <div class="wireframe-module-nav">
          <button class="wireframe-nav-button wireframe-nav-prev" disabled>
            ← Previous CBT Module
          </button>
          <button class="wireframe-nav-button wireframe-nav-next" @click="goToNextModule">
            Next CBT Module →
          </button>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="wireframe-module-content">
        <div class="wireframe-content-section">
          <div class="wireframe-section-content">
            <div class="wireframe-learning-content">
              <div class="wireframe-content-text">
                <h3>CBT Dynamic Techniques</h3>
                <ul>
                  <li>Learn advanced CBT techniques for complex situations</li>
                  <li>Develop skills for managing multiple emotional patterns</li>
                  <li>Practice integrated cognitive and behavioral strategies</li>
                  <li>Build long-term coping mechanisms</li>
                </ul>
                
                <h3>Advanced CBT Applications</h3>
                <p>This module covers advanced CBT techniques for managing complex emotional patterns and developing long-term coping strategies. You'll learn to integrate multiple CBT skills, handle challenging situations, and build resilience. These advanced techniques help you maintain progress and continue growing in your mental health journey.</p>
                
                <div class="wireframe-examples">
                  <h4>Dynamic Technique Examples</h4>
                  <div class="wireframe-example-item">Complex situation: Multiple stressors → Strategy: Integrated thought challenging + behavioral activation</div>
                  <div class="wireframe-example-item">Pattern: Chronic worry → Technique: Worry time + thought stopping</div>
                  <div class="wireframe-example-item">Challenge: Perfectionism → Approach: Behavioral experiments + cognitive restructuring</div>
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
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Module data
const currentModuleData = ref({
  title: 'CBT Dynamic Techniques',
  description: 'Learn advanced CBT techniques for managing complex emotional patterns and developing long-term coping strategies.',
  duration: '70 minutes',
  progress: 100
})

const navigateToProgram = () => {
  router.push('/program/cognitive-behavioral-therapy')
}

const navigateToModule = (moduleSlug) => {
  console.log('CBT: Navigating to module:', moduleSlug)
  const moduleRoutes = {
    'introduction-to-cbt': '/program/cognitive-behavioral-therapy/module/introduction-to-cbt',
    'identifying-negative-thoughts': '/program/cognitive-behavioral-therapy/module/identifying-negative-thoughts',
    'thought-challenging-techniques': '/program/cognitive-behavioral-therapy/module/thought-challenging-techniques',
    'behavioral-experiments': '/program/cognitive-behavioral-therapy/module/behavioral-experiments',
    'relapse-prevention': '/program/cognitive-behavioral-therapy/module/relapse-prevention'
  }
  
  const route = moduleRoutes[moduleSlug]
  console.log('CBT: Route found:', route)
  if (route) {
    router.push(route)
  } else {
    console.error('CBT: No route found for module:', moduleSlug)
  }
}

const goToNextModule = () => {
  router.push('/program/cognitive-behavioral-therapy/module/behavioral-experiments')
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

.wireframe-module-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  height: calc(100vh - 140px);
  padding: 24px;
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

</style>
