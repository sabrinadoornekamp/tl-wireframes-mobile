<template>
  <div class="wireframe-module-detail-page">
    <!-- Header with Navigation -->
    <div class="wireframe-module-header">
      <div class="wireframe-header-nav">
        <button class="wireframe-back-button" @click="navigateToProgram">
          ← Back to Mindfulness & Stress Reduction Program
        </button>
        <div class="wireframe-module-progress">
          <div class="wireframe-progress-bar">
            <div class="wireframe-progress-fill" :style="`width: ${currentModuleData.progress}%`"></div>
          </div>
          <div class="wireframe-progress-text">{{ currentModuleData.progress }}% Complete</div>
        </div>
      </div>
      
      <div class="wireframe-module-title-section">
        <div class="wireframe-program-title">Mindfulness & Stress Reduction Program</div>
        <div class="wireframe-program-description">A comprehensive program that teaches you mindfulness techniques to reduce stress, improve emotional regulation, and enhance your present-moment awareness through meditation and mindful living practices.</div>
        <div class="wireframe-program-objective">
          <strong>Program Objective:</strong> Develop mindfulness skills to reduce stress, improve emotional regulation, and enhance present-moment awareness through meditation practices and mindful living techniques.
        </div>
      </div>
    </div>

    <!-- Mobile Module Navigation (Horizontal) -->
    <div class="wireframe-mobile-nav">
      <div class="wireframe-mobile-nav-header">
        <div class="wireframe-mobile-nav-title">Mindfulness Program Modules</div>
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
          <div class="wireframe-sidebar-title">Mindfulness Program Modules</div>
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
            ← Previous Mindfulness Module
          </button>
          <button 
            class="wireframe-nav-button wireframe-nav-next" 
            :disabled="Object.keys(allModules).indexOf(activeModule) === Object.keys(allModules).length - 1"
            @click="goToNextModule"
          >
            Next Mindfulness Module →
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
const activeModule = ref('breathing-exercises')

// Module data for all Mindfulness modules
const allModules = ref({
  'introduction-to-mindfulness': {
    title: 'Introduction to Mindfulness',
    description: 'Learn the fundamentals of mindfulness practice and how it can help you manage stress and improve your mental well-being.',
    duration: '30 min',
    progress: 100,
    content: {
      title: 'Introduction to Mindfulness',
      objectives: [
        'Understand what mindfulness is and how it works',
        'Learn the benefits of mindfulness practice',
        'Discover different types of mindfulness techniques',
        'Develop a foundation for your mindfulness journey'
      ],
      mainContent: 'Mindfulness is the practice of paying attention to the present moment with openness, curiosity, and acceptance. It\'s about being fully present in your life, rather than being lost in thoughts about the past or worries about the future.',
      examples: [
        'Mindful breathing: Focus on your breath for 5 minutes',
        'Body scan: Notice sensations throughout your body',
        'Mindful walking: Pay attention to each step and your surroundings'
      ]
    }
  },
  'body-scan-meditation': {
    title: 'Body Scan Meditation',
    description: 'Learn to practice body scan meditation to develop body awareness and reduce stress.',
    duration: '45 min',
    progress: 100,
    content: {
      title: 'Body Scan Meditation',
      objectives: [
        'Learn the body scan meditation technique',
        'Develop greater body awareness',
        'Practice releasing tension and stress',
        'Cultivate a sense of relaxation and calm'
      ],
      mainContent: 'Body scan meditation is a powerful practice that helps you develop awareness of your body and release physical tension. It involves systematically moving your attention through different parts of your body, noticing sensations without judgment.',
      examples: [
        'Start at the top of your head and work down to your toes',
        'Notice any tension or discomfort without trying to change it',
        'Breathe into areas of tightness and allow them to soften'
      ]
    }
  },
  'breathing-exercises': {
    title: 'Breathing Exercises',
    description: 'Master various breathing techniques to calm your mind and reduce stress.',
    duration: '35 min',
    progress: 100,
    content: {
      title: 'Breathing Exercises for Mindfulness',
      objectives: [
        'Learn different breathing techniques',
        'Practice using breath as an anchor for attention',
        'Develop skills for managing stress and anxiety',
        'Build a foundation for deeper meditation practice'
      ],
      mainContent: 'Breathing is one of the most accessible and powerful tools for mindfulness practice. By learning to focus on your breath, you can develop greater awareness, reduce stress, and cultivate a sense of calm and centeredness.',
      examples: [
        '4-7-8 breathing: Inhale for 4, hold for 7, exhale for 8',
        'Box breathing: Equal count for inhale, hold, exhale, hold',
        'Natural breathing: Simply observe your natural breath without changing it'
      ]
    }
  },
  'mindful-movement': {
    title: 'Mindful Movement',
    description: 'Explore mindful movement practices to connect with your body and reduce stress.',
    duration: '40 min',
    progress: 0,
    content: {
      title: 'Mindful Movement',
      objectives: [
        'Learn to practice mindfulness while moving',
        'Develop body awareness through gentle movement',
        'Reduce stress and tension through mindful exercise',
        'Cultivate a sense of embodiment and presence'
      ],
      mainContent: 'Mindful movement combines physical activity with mindfulness practice. It helps you develop greater body awareness, reduce stress, and cultivate a sense of presence and embodiment.',
      examples: [
        'Mindful walking: Pay attention to each step and your surroundings',
        'Gentle stretching: Move slowly and notice how your body feels',
        'Mindful yoga: Practice yoga poses with full awareness of your body'
      ]
    }
  }
})

// Current module data (reactive)
const currentModuleData = computed(() => {
  return allModules.value[activeModule.value] || allModules.value['breathing-exercises']
})

const navigateToProgram = () => {
  router.push('/program/mindfulness--stress-reduction')
}

const navigateToModule = (moduleSlug) => {
  console.log('Mindfulness: Switching to module:', moduleSlug)
  if (allModules.value[moduleSlug]) {
    activeModule.value = moduleSlug
    console.log('Mindfulness: Switched to module:', moduleSlug)
  } else {
    console.error('Mindfulness: No module found:', moduleSlug)
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
  // Restore main app elements when leaving module
  try {
    const sidebar = document.querySelector('.v-navigation-drawer')
    const appBar = document.querySelector('.v-app-bar')
    
    if (sidebar) {
      sidebar.style.display = ''
    }
    if (appBar) {
      appBar.style.display = ''
    }
  } catch (error) {
    console.log('Error restoring app elements:', error)
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
  color: black;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  font-weight: 600;
}

.wireframe-back-button:hover {
  background: #f0f0f0;
}

.wireframe-module-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.wireframe-progress-bar {
  width: 200px;
  height: 8px;
  background: #e0e0e0;
  border: 1px solid #000;
  border-radius: 4px;
  overflow: hidden;
}

.wireframe-progress-fill {
  height: 100%;
  background: #000;
  transition: width 0.3s ease;
}

.wireframe-progress-text {
  font-size: 12px;
  color: #666;
  font-weight: 600;
}

.wireframe-module-title-section {
  text-align: left;
}

.wireframe-program-title {
  font-size: 24px;
  font-weight: 700;
  color: black;
  margin-bottom: 8px;
}

.wireframe-program-description {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
}

.wireframe-program-objective {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
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
  overflow-y: auto;
}

.wireframe-sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #000;
}

.wireframe-sidebar-title {
  font-size: 16px;
  font-weight: 700;
  color: black;
}

.wireframe-sidebar-progress {
  font-size: 12px;
  color: #666;
  font-weight: 600;
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
  border: 2px solid #000;
  border-radius: 4px;
  cursor: pointer;
  background: white;
  transition: all 0.2s ease;
}

.wireframe-sidebar-item:hover {
  background: #f0f0f0;
}

.wireframe-sidebar-active {
  background: #e0e0e0;
  font-weight: 700;
}

.wireframe-sidebar-icon {
  width: 24px;
  height: 24px;
  border: 2px solid #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  margin-right: 12px;
  background: white;
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

.wireframe-module-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #000;
}

.wireframe-nav-button {
  background: white;
  border: 2px solid #000;
  color: black;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  font-weight: 600;
  font-size: 12px;
}

.wireframe-nav-button:hover:not(:disabled) {
  background: #f0f0f0;
}

.wireframe-nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.wireframe-module-content {
  border: 2px solid #000;
  border-radius: 4px;
  padding: 24px;
  background: white;
  overflow-y: auto;
}

.wireframe-program-description {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
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

.wireframe-examples {
  margin-top: 24px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 4px;
  background: #f9f9f9;
}

.wireframe-examples h4 {
  font-size: 18px;
  font-weight: 700;
  color: black;
  margin-bottom: 16px;
}

.wireframe-example-item {
  color: black;
  font-weight: 600;
  margin: 10px 0;
  padding: 10px;
  background: white;
  border: 1px solid #000;
  border-radius: 4px;
}

.wireframe-section-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #000;
}

.wireframe-section-button {
  background: white;
  border: 2px solid #000;
  color: black;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  font-weight: 600;
  font-size: 12px;
}

.wireframe-section-button:hover:not(:disabled) {
  background: #f0f0f0;
}

.wireframe-section-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.wireframe-nav-prev {
  margin-right: auto;
}

.wireframe-nav-next {
  margin-left: auto;
}
</style>
