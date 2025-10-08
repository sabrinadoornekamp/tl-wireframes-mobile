<template>
  <div class="wireframe-module-detail-page">
    <!-- Header with Navigation -->
    <div class="wireframe-module-header">
      <div class="wireframe-header-nav">
        <button class="wireframe-back-button" @click="navigateToProgram">
          ← Back to Anger Management Program
        </button>
        <div class="wireframe-module-progress">
          <div class="wireframe-progress-bar">
            <div class="wireframe-progress-fill" :style="`width: ${currentModuleData.progress}%`"></div>
          </div>
          <div class="wireframe-progress-text">{{ currentModuleData.progress }}% Complete</div>
        </div>
      </div>
      
      <div class="wireframe-module-title-section">
        <div class="wireframe-program-title">Anger Management Program</div>
        <div class="wireframe-program-description">A comprehensive program that teaches you to understand anger, learn healthy expression techniques, and develop practical tools for managing anger triggers and improving emotional regulation.</div>
        <div class="wireframe-program-objective">
          <strong>Program Objective:</strong> Understand anger management, learn healthy expression techniques, and develop practical tools for managing anger triggers and improving emotional regulation.
        </div>
      </div>
    </div>

    <!-- Mobile Module Navigation (Horizontal) -->
    <div class="wireframe-mobile-nav">
      <div class="wireframe-mobile-nav-header">
        <div class="wireframe-mobile-nav-title">Anger Management Program Modules</div>
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
          <div class="wireframe-sidebar-title">Anger Management Modules</div>
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
const activeModule = ref('understanding-anger')

// Module data for all Anger Management modules
const allModules = ref({
  'understanding-anger': {
    title: 'Understanding Anger',
    description: 'Learn about anger management, its triggers, and healthy strategies for expressing and managing anger effectively.',
    duration: '30 min',
    progress: 100,
    content: {
      title: 'Understanding Anger',
      objectives: [
        'Understand what anger is and how it affects your life',
        'Learn to recognize anger triggers and warning signs',
        'Understand the difference between healthy and unhealthy anger',
        'Develop awareness of your personal anger patterns'
      ],
      mainContent: 'Anger is a normal, healthy emotion that everyone experiences. However, when anger becomes overwhelming or is expressed in harmful ways, it can damage relationships and negatively impact your life. Understanding anger is the first step toward managing it effectively.',
      examples: [
        'Healthy anger: Expressing frustration calmly and assertively',
        'Unhealthy anger: Yelling, physical aggression, or holding grudges',
        'Warning signs: Increased heart rate, muscle tension, racing thoughts'
      ]
    }
  },
  'anger-triggers': {
    title: 'Anger Triggers',
    description: 'Identify your personal anger triggers and learn strategies for managing them effectively.',
    duration: '35 min',
    progress: 0,
    content: {
      title: 'Identifying and Managing Anger Triggers',
      objectives: [
        'Learn to identify your personal anger triggers',
        'Understand the connection between thoughts and anger',
        'Develop strategies for managing trigger situations',
        'Build skills for preventing anger escalation'
      ],
      mainContent: 'Anger triggers are specific situations, thoughts, or events that cause you to feel angry. By identifying your triggers, you can develop strategies to manage them and prevent anger from escalating into harmful behavior.',
      examples: [
        'Common triggers: Feeling disrespected, being criticized, traffic delays',
        'Personal triggers: Specific people, situations, or memories',
        'Prevention strategies: Deep breathing, time-outs, reframing thoughts'
      ]
    }
  },
  'relaxation-techniques': {
    title: 'Relaxation Techniques',
    description: 'Master relaxation techniques to calm your mind and body when anger arises.',
    duration: '40 min',
    progress: 0,
    content: {
      title: 'Relaxation Techniques for Anger Management',
      objectives: [
        'Learn various relaxation techniques for anger management',
        'Practice techniques for immediate anger relief',
        'Develop skills for long-term stress management',
        'Build a toolkit of calming strategies'
      ],
      mainContent: 'Relaxation techniques are powerful tools for managing anger and stress. They help calm your mind and body, reduce tension, and provide you with healthy ways to cope with difficult emotions.',
      examples: [
        'Deep breathing: Slow, deep breaths to calm the nervous system',
        'Progressive muscle relaxation: Tense and release different muscle groups',
        'Mindfulness meditation: Focus on the present moment without judgment'
      ]
    }
  }
})

// Current module data (reactive)
const currentModuleData = computed(() => {
  return allModules.value[activeModule.value] || allModules.value['understanding-anger']
})

const navigateToProgram = () => {
  router.push('/program/anger-management-program')
}

const navigateToModule = (moduleSlug) => {
  console.log('Anger Management: Switching to module:', moduleSlug)
  if (allModules.value[moduleSlug]) {
    activeModule.value = moduleSlug
    console.log('Anger Management: Switched to module:', moduleSlug)
  } else {
    console.error('Anger Management: No module found:', moduleSlug)
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

.wireframe-content-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wireframe-section-content {
  flex: 1;
}

.wireframe-learning-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wireframe-content-text {
  color: black;
  font-weight: 600;
  line-height: 1.6;
}

.wireframe-content-text p {
  color: black;
  font-weight: 600;
  margin: 20px 0;
  line-height: 1.6;
}

.wireframe-content-text h3 {
  color: black;
  font-weight: 600;
  margin: 30px 0 15px 0;
}

.wireframe-content-text h4 {
  color: black;
  font-weight: 600;
  margin: 25px 0 10px 0;
}

.wireframe-content-text ul {
  color: black;
  font-weight: 600;
  margin: 20px 0;
  padding-left: 20px;
}

.wireframe-content-text li {
  color: black;
  font-weight: 600;
  margin: 10px 0;
}

.wireframe-examples {
  background: #f0f0f0;
  border: 2px solid #000;
  border-radius: 4px;
  padding: 20px;
  margin: 20px 0;
}

.wireframe-examples h4 {
  color: black;
  font-weight: 600;
  margin: 0 0 15px 0;
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

.wireframe-program-description {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
}

.wireframe-section-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-top: 2px solid #000;
}

.wireframe-section-button {
  background: white;
  border: 2px solid #000;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  color: black;
  font-size: 14px;
  transition: all 0.2s;
}

.wireframe-section-button:hover:not(:disabled) {
  background: #f0f0f0;
  transform: translateY(-1px);
}

.wireframe-section-button:disabled {
  background: #f0f0f0;
  color: #666;
  cursor: not-allowed;
  opacity: 0.6;
}

.wireframe-section-prev {
  margin-right: auto;
}

.wireframe-section-next {
  margin-left: auto;
}

.wireframe-module-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-top: 2px solid #000;
  margin-top: 20px;
}

.wireframe-nav-button {
  background: white;
  border: 2px solid #000;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  color: black;
  font-size: 14px;
  transition: all 0.2s;
}

.wireframe-nav-button:hover:not(:disabled) {
  background: #f0f0f0;
  transform: translateY(-1px);
}

.wireframe-nav-button:disabled {
  background: #f0f0f0;
  color: #666;
  cursor: not-allowed;
  opacity: 0.6;
}

.wireframe-nav-prev {
  margin-right: auto;
}

.wireframe-nav-next {
  margin-left: auto;
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
