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
            <div class="wireframe-progress-fill" :style="`width: ${currentModuleData.progress}%`"></div>
          </div>
          <div class="wireframe-progress-text">{{ currentModuleData.progress }}% Complete</div>
        </div>
      </div>
      
      <div class="wireframe-module-title-section">
        <div class="wireframe-program-title">Cognitive Behavioral Therapy Program</div>
        <div class="wireframe-program-description">A comprehensive program that teaches you evidence-based techniques to identify and challenge negative thought patterns, develop healthier thinking habits, and improve your emotional well-being.</div>
        <div class="wireframe-program-objective">
          <strong>Program Objective:</strong> Learn evidence-based CBT techniques to identify and challenge negative thought patterns, develop healthier thinking habits, and improve emotional well-being through structured cognitive and behavioral interventions.
        </div>
      </div>
    </div>

    <!-- Mobile Module Navigation (Horizontal) -->
    <div class="wireframe-mobile-nav">
      <div class="wireframe-mobile-nav-header">
        <div class="wireframe-mobile-nav-title">CBT Program Modules</div>
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
          <div class="wireframe-sidebar-title">CBT Program Modules</div>
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
            ← Previous CBT Module
          </button>
          <button 
            class="wireframe-nav-button wireframe-nav-next" 
            :disabled="Object.keys(allModules).indexOf(activeModule) === Object.keys(allModules).length - 1"
            @click="goToNextModule"
          >
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
const activeModule = ref('introduction-to-cbt')

// Module data for all CBT modules
const allModules = ref({
  'introduction-to-cbt': {
    title: 'Introduction to CBT',
    description: 'Learn the fundamentals of Cognitive Behavioral Therapy and how it can help you manage your thoughts, feelings, and behaviors.',
    duration: '45 min',
    progress: 100,
    content: {
      title: 'Introduction to Cognitive Behavioral Therapy',
      objectives: [
        'Understand the core principles of CBT',
        'Learn how thoughts, feelings, and behaviors are connected',
        'Identify automatic thoughts and cognitive distortions',
        'Develop skills for challenging unhelpful thinking patterns'
      ],
      mainContent: 'Cognitive Behavioral Therapy (CBT) is one of the most researched and effective forms of psychotherapy available today. This module introduces you to the fundamental concepts and techniques that form the foundation of CBT.',
      examples: [
        'Situation: Job interview → Thought: "I\'ll fail" → Feeling: Anxious → Behavior: Avoid applying',
        'CBT Response: Challenge the thought → "What evidence do I have?" → Develop balanced perspective',
        'Result: Reduced anxiety and increased confidence in applying for jobs'
      ]
    }
  },
  'identifying-negative-thoughts': {
    title: 'Identifying Negative Thoughts',
    description: 'Learn to recognize and identify automatic negative thoughts that contribute to emotional distress.',
    duration: '60 min',
    progress: 0,
    content: {
      title: 'Identifying Negative Thoughts',
      objectives: [
        'Recognize automatic negative thoughts as they occur',
        'Learn to identify common thought patterns',
        'Understand the impact of negative thinking on emotions',
        'Develop awareness of your thought processes'
      ],
      mainContent: 'One of the first steps in CBT is learning to identify the automatic thoughts that pop into your mind throughout the day. These thoughts often happen so quickly that we don\'t notice them, but they have a powerful impact on our emotions and behaviors.',
      examples: [
        'Automatic thought: "I\'m not good enough" → Emotion: Sadness → Behavior: Withdraw from social situations',
        'Pattern recognition: All-or-nothing thinking, catastrophizing, mind reading',
        'Awareness building: Keep a thought record to track patterns'
      ]
    }
  },
  'thought-challenging-techniques': {
    title: 'Thought Challenging Techniques',
    description: 'Master evidence-based techniques for challenging and changing unhelpful thoughts.',
    duration: '50 min',
    progress: 0,
    content: {
      title: 'Thought Challenging Techniques',
      objectives: [
        'Learn evidence-based thought challenging methods',
        'Practice questioning the accuracy of your thoughts',
        'Develop balanced and realistic perspectives',
        'Build skills for long-term thought management'
      ],
      mainContent: 'Thought challenging is a core CBT skill that helps you examine the accuracy and helpfulness of your automatic thoughts. This module teaches you systematic techniques for questioning your thoughts and developing more balanced perspectives.',
      examples: [
        'Challenge: "What evidence do I have for this thought?"',
        'Alternative: "What would I tell a friend in this situation?"',
        'Reality check: "What\'s the worst that could realistically happen?"'
      ]
    }
  },
  'behavioral-experiments': {
    title: 'Behavioral Experiments',
    description: 'Design and conduct experiments to test your thoughts and beliefs in real-world situations.',
    duration: '55 min',
    progress: 0,
    content: {
      title: 'Behavioral Experiments',
      objectives: [
        'Learn to design effective behavioral experiments',
        'Test your thoughts and beliefs in real situations',
        'Gather evidence to challenge unhelpful beliefs',
        'Build confidence through gradual exposure'
      ],
      mainContent: 'Behavioral experiments are a powerful way to test your thoughts and beliefs in real-world situations. They help you gather evidence about whether your thoughts are accurate and provide opportunities to develop new, more helpful beliefs.',
      examples: [
        'Experiment: "If I speak up in meetings, people will think I\'m stupid"',
        'Test: Speak up once and observe reactions',
        'Result: People actually asked for my input and seemed interested'
      ]
    }
  },
  'relapse-prevention': {
    title: 'Relapse Prevention',
    description: 'Develop strategies to maintain your progress and prevent setbacks in your mental health journey.',
    duration: '40 min',
    progress: 0,
    content: {
      title: 'Relapse Prevention',
      objectives: [
        'Identify early warning signs of setbacks',
        'Develop strategies for maintaining progress',
        'Create a personalized relapse prevention plan',
        'Build long-term resilience and coping skills'
      ],
      mainContent: 'Maintaining progress in CBT requires ongoing practice and awareness. This module helps you develop strategies for recognizing early warning signs and maintaining the skills you\'ve learned.',
      examples: [
        'Warning signs: Increased negative thinking, social withdrawal, sleep changes',
        'Prevention strategies: Regular thought challenging practice, social connection, healthy routines',
        'Action plan: Create a personalized toolkit for difficult times'
      ]
    }
  }
})

// Current module data (reactive)
const currentModuleData = computed(() => {
  return allModules.value[activeModule.value] || allModules.value['introduction-to-cbt']
})

const navigateToProgram = () => {
  router.push('/program/cognitive-behavioral-therapy')
}

const navigateToModule = (moduleSlug) => {
  console.log('CBT: Switching to module:', moduleSlug)
  if (allModules.value[moduleSlug]) {
    activeModule.value = moduleSlug
    console.log('CBT: Switched to module:', moduleSlug)
  } else {
    console.error('CBT: No module found:', moduleSlug)
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
  // Ensure cleanup happens even if there are errors
  try {
    const sidebar = document.querySelector('.v-navigation-drawer')
    const appBar = document.querySelector('.v-app-bar')
    
    if (sidebar) {
      sidebar.style.display = ''
      sidebar.style.visibility = ''
    }
    if (appBar) {
      appBar.style.display = ''
      appBar.style.visibility = ''
    }
  } catch (error) {
    console.error('Error during module cleanup:', error)
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
  gap: 16px;
}

/* Mobile: Stack header nav vertically for better spacing */
@media (max-width: 768px) {
  .wireframe-header-nav {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .wireframe-back-button {
    width: 100%;
    text-align: left;
    padding: 12px 16px;
    font-size: 16px;
  }
  
  .wireframe-module-progress {
    width: 100%;
  }
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
  color: #666;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

.wireframe-program-objective {
  font-size: 14px;
  color: black;
  margin-top: 12px;
  padding: 12px;
  background: #f0f0f0;
  border: 2px solid #000;
  border-radius: 4px;
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

/* Mobile Module Navigation */
.wireframe-mobile-nav {
  display: none;
  border: 2px solid #000;
  border-radius: 4px;
  padding: 16px;
  background: white;
  margin: 0 16px 20px 16px;
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
  gap: 12px;
  overflow-x: auto;
  padding: 8px 0 12px 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
}

.wireframe-mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-width: 140px;
  flex-shrink: 0;
  background: white;
}

.wireframe-mobile-nav-item:hover {
  background-color: #f0f0f0;
  border-color: #999;
  transform: translateY(-1px);
}

.wireframe-mobile-nav-active {
  background-color: #e0e0e0;
  border-color: #000;
  font-weight: 600;
}

.wireframe-mobile-nav-icon {
  font-size: 16px;
  font-weight: 700;
  color: black;
  min-width: 24px;
  text-align: center;
}

.wireframe-mobile-nav-content {
  flex-grow: 1;
  min-width: 0;
}

.wireframe-mobile-nav-title {
  font-size: 13px;
  font-weight: 600;
  color: black;
  line-height: 1.3;
  margin-bottom: 2px;
}

.wireframe-mobile-nav-duration {
  font-size: 11px;
  color: #666;
  font-weight: 500;
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
    padding: 20px;
    border: 2px solid #000;
    border-radius: 4px;
    background: white;
    margin-top: 8px;
  }
  
  .wireframe-module-header {
    padding: 16px;
    margin-bottom: 8px;
  }
  
  .wireframe-module-title-section {
    margin-top: 16px;
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

</style>
