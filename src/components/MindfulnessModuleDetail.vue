<template>
  <div class="wireframe-module-detail-page">
    <!-- Header with Navigation -->
    <div class="wireframe-module-header">
      <div class="wireframe-header-nav">
        <button class="wireframe-back-button" @click="navigateToProgram">
          ← Back to Mindfulness & Stress Reduction
        </button>
        <button class="wireframe-modules-button" @click="navigateToProgramModules">
          🧘 View All Mindfulness Modules
        </button>
        <div class="wireframe-module-progress">
          <div class="wireframe-progress-bar">
            <div 
              class="wireframe-progress-fill" 
              :style="{ width: getModuleProgress(module) + '%' }"
            ></div>
          </div>
          <div class="wireframe-progress-text">{{ getModuleProgress(module) }}% Complete</div>
        </div>
      </div>
      
      <div class="wireframe-module-title-section">
        <div class="wireframe-module-title">{{ module.title }}</div>
        <div class="wireframe-module-subtitle">{{ module.fullDescription }}</div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="wireframe-module-layout">
      <!-- Sidebar Navigation -->
      <div class="wireframe-module-sidebar">
        <div class="wireframe-sidebar-header">
          <div class="wireframe-sidebar-title">Mindfulness Module Contents</div>
          <div class="wireframe-sidebar-progress">{{ getModuleProgress(module) }}%</div>
        </div>
        
        <div class="wireframe-sidebar-sections">
          <div 
            v-for="(section, index) in moduleSections" 
            :key="index"
            class="wireframe-sidebar-item"
            :class="{ 
              'wireframe-sidebar-active': currentSection === index,
              'wireframe-sidebar-completed': section.completed
            }"
            @click="setCurrentSection(index)"
          >
            <div class="wireframe-sidebar-icon">
              <div v-if="section.completed">✓</div>
              <div v-else-if="currentSection === index">→</div>
              <div v-else>{{ index + 1 }}</div>
            </div>
            <div class="wireframe-sidebar-content">
              <div class="wireframe-sidebar-title">{{ section.title }}</div>
              <div class="wireframe-sidebar-duration">{{ section.duration }}</div>
            </div>
          </div>
        </div>
        
        <!-- Module Navigation -->
        <div class="wireframe-module-nav">
          <button 
            class="wireframe-nav-button wireframe-nav-prev"
            :disabled="!previousModule"
            @click="goToPreviousModule"
          >
            ← Previous Mindfulness Module
          </button>
          <button 
            class="wireframe-nav-button wireframe-nav-next"
            :disabled="!nextModule"
            @click="goToNextModule"
          >
            Next Mindfulness Module →
          </button>
        </div>
        
      </div>

      <!-- Main Content Area -->
      <div class="wireframe-module-content">
        <!-- Current Section Content -->
        <div class="wireframe-content-section">
          <div class="wireframe-section-header">
            <div class="wireframe-section-title">{{ currentSectionData.title }}</div>
            <div class="wireframe-section-meta">
              <span class="wireframe-section-duration">{{ currentSectionData.duration }}</span>
              <span class="wireframe-section-progress">{{ currentSectionIndex + 1 }} of {{ moduleSections.length }}</span>
            </div>
          </div>
          
          <div class="wireframe-section-content">
            <!-- Learning Content -->
            <div v-if="currentSectionData.type === 'learning'" class="wireframe-learning-content">
              <div class="wireframe-content-text">
                <h3>Mindfulness Learning Objectives</h3>
                <ul>
                  <li v-for="objective in currentSectionData.objectives" :key="objective">{{ objective }}</li>
                </ul>
                
                <h3>Mindfulness Key Concepts</h3>
                <p>{{ currentSectionData.content }}</p>
                
                <div v-if="currentSectionData.examples" class="wireframe-examples">
                  <h4>Mindfulness Examples</h4>
                  <div class="wireframe-example-item" v-for="example in currentSectionData.examples" :key="example">
                    {{ example }}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Activity Content -->
            <div v-else-if="currentSectionData.type === 'activity'" class="wireframe-activity-content">
              <div class="wireframe-activity-header">
                <h3>{{ currentSectionData.title }}</h3>
                <div class="wireframe-activity-status" :class="{ 'wireframe-activity-completed': currentSectionData.completed }">
                  {{ currentSectionData.completed ? 'Completed' : 'In Progress' }}
                </div>
              </div>
              
              <div class="wireframe-activity-instructions">
                <h4>Mindfulness Practice Instructions</h4>
                <p>{{ currentSectionData.instructions }}</p>
              </div>
              
              <div class="wireframe-activity-tools">
                <h4>Mindfulness Tools & Resources</h4>
                <div class="wireframe-tool-list">
                  <div v-for="tool in currentSectionData.tools" :key="tool" class="wireframe-tool-item">
                    {{ tool }}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Quiz Content -->
            <div v-else-if="currentSectionData.type === 'quiz'" class="wireframe-quiz-content">
              <div class="wireframe-quiz-header">
                <h3>{{ currentSectionData.title }}</h3>
                <div class="wireframe-quiz-progress">{{ currentQuestion + 1 }} of {{ currentSectionData.questions.length }}</div>
              </div>
              
              <div class="wireframe-quiz-question">
                <h4>{{ currentSectionData.questions[currentQuestion].question }}</h4>
                <div class="wireframe-quiz-options">
                  <label 
                    v-for="(option, index) in currentSectionData.questions[currentQuestion].options" 
                    :key="index"
                    class="wireframe-quiz-option"
                  >
                    <input type="radio" :name="'question-' + currentQuestion" :value="index">
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section Navigation -->
          <div class="wireframe-section-nav">
            <button 
              class="wireframe-section-button wireframe-section-prev"
              :disabled="currentSection === 0"
              @click="previousSection"
            >
              ← Previous Section
            </button>
            <button 
              class="wireframe-section-button wireframe-section-next"
              :disabled="currentSection === moduleSections.length - 1"
              @click="nextSection"
            >
              Next Section →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Get module data based on route parameters
const programId = computed(() => route.params.programId)
const moduleId = computed(() => route.params.moduleId)

// Current section and question for Uxcel-style layout
const currentSection = ref(0)
const currentQuestion = ref(0)

// Mindfulness Program Title
const programTitle = computed(() => 'Mindfulness & Stress Reduction')

// Mindfulness Modules Data
const mindfulnessModules = ref([
  {
    id: 'introduction-to-mindfulness',
    title: 'Introduction to Mindfulness',
    description: 'Understanding mindfulness and its benefits',
    fullDescription: 'This foundational module introduces you to the core principles of mindfulness and its benefits for stress reduction. You\'ll learn what mindfulness is, how it works, and why it\'s effective for managing stress and improving well-being.',
    duration: '30 min',
    completed: false,
    current: false,
    status: 'not-started',
    examples: [
      'Mindful breathing: Notice the sensation of air entering and leaving your nostrils',
      'Body awareness: Feel the weight of your body against the chair or floor',
      'Present moment: When your mind wanders to the past or future, gently return to now',
      'Non-judgmental observation: Notice thoughts as "just thoughts" without labeling them good or bad'
    ],
    keyConcepts: [
      'Mindfulness is paying attention to the present moment with curiosity and without judgment',
      'The mind naturally wanders - the practice is in gently returning to the present',
      'Mindfulness can be practiced during any activity, not just formal meditation',
      'Regular practice helps develop awareness and reduces automatic reactions'
    ]
  },
  {
    id: 'body-scan-meditation',
    title: 'Body Scan Meditation',
    description: 'Learning the body scan technique for relaxation',
    fullDescription: 'This module teaches you the body scan meditation technique, a powerful practice for developing body awareness and deep relaxation. You\'ll learn to systematically scan your body from head to toe, noticing sensations without judgment.',
    duration: '45 min',
    completed: false,
    current: false,
    status: 'not-started',
    examples: [
      'Body scan: Systematically notice sensations from head to toe without trying to change them',
      'Progressive relaxation: Tense and release each muscle group to build awareness',
      'Sensation awareness: Notice warmth, coolness, tension, or relaxation in each body part',
      'Non-striving attitude: Simply observe what is present without trying to change anything'
    ],
    keyConcepts: [
      'The body is always present and can serve as a reliable anchor for mindfulness',
      'Physical sensations are often the first indicators of stress or emotions',
      'Body awareness helps us recognize tension and stress before they escalate',
      'Regular body scans improve our ability to notice subtle physical changes'
    ]
  },
  {
    id: 'breathing-exercises',
    title: 'Breathing Exercises',
    description: 'Various breathing techniques for stress reduction',
    fullDescription: 'This module focuses on breathing as a foundation for mindfulness practice. You\'ll learn various breathing techniques that can be used anywhere, anytime to reduce stress and increase present-moment awareness.',
    duration: '35 min',
    completed: false,
    current: false,
    status: 'not-started',
    examples: [
      '4-7-8 breathing: Inhale for 4 counts, hold for 7, exhale for 8 - helps with anxiety',
      'Box breathing: Inhale 4, hold 4, exhale 4, hold 4 - used by Navy SEALs for focus',
      'Diaphragmatic breathing: Breathe into belly, not chest - activates relaxation response',
      'Counting breaths: Count each exhale from 1-10, then start over - builds concentration'
    ],
    keyConcepts: [
      'Controlled breathing activates the parasympathetic nervous system, promoting calm',
      'Different breathing patterns serve different purposes (calm, focus, energy)',
      'Breathing is always available as a mindfulness anchor, no matter where you are',
      'Regular breathing practice builds the skill for use during stressful situations'
    ]
  },
  {
    id: 'mindful-movement',
    title: 'Mindful Movement',
    description: 'Gentle yoga and movement practices',
    fullDescription: 'This module introduces mindful movement practices, including gentle yoga and walking meditation. You\'ll learn to bring mindfulness to physical movement, developing greater body awareness and reducing stress through gentle exercise.',
    duration: '40 min',
    completed: false,
    current: false,
    status: 'not-started',
    examples: [
      'Walking meditation: Feel each foot lifting, moving, and touching the ground',
      'Gentle yoga: Move slowly and mindfully through basic poses',
      'Mindful stretching: Notice sensations as you stretch different muscle groups',
      'Movement with breath: Coordinate breathing with gentle movements'
    ],
    keyConcepts: [
      'Movement can be a form of meditation when done with mindful awareness',
      'Gentle movement helps release physical tension and stress',
      'Mindful movement improves body awareness and reduces mental chatter',
      'Regular mindful movement builds strength, flexibility, and mental clarity'
    ]
  }
])

// Get current module data
const currentModuleData = computed(() => {
  return mindfulnessModules.value.find(m => m.id === moduleId.value) || mindfulnessModules.value[0]
})

const module = ref({
  id: moduleId.value,
  title: 'Mindfulness Module',
  description: 'Mindfulness module description',
  fullDescription: 'Mindfulness module full description',
  duration: '45 minutes',
  progress: 0,
  status: 'not-started',
  difficulty: 'Beginner',
  recommendedFor: 'All participants',
  prerequisites: 'None',
  certificate: 'Available upon completion',
  objectives: [],
  activities: [],
  resources: []
})

// Update module data when currentModuleData changes
watch(currentModuleData, (newModuleData) => {
  if (newModuleData) {
    module.value = {
      id: newModuleData.id,
      title: newModuleData.title,
      description: newModuleData.description,
      fullDescription: newModuleData.fullDescription,
      duration: newModuleData.duration,
      progress: newModuleData.completed ? 100 : (newModuleData.current ? 60 : 0),
      status: newModuleData.status,
      difficulty: 'Beginner',
      recommendedFor: 'All participants',
      prerequisites: 'None',
      certificate: 'Available upon completion',
      objectives: newModuleData.objectives || [],
      activities: newModuleData.activities || [],
      resources: [
        {
          id: 1,
          title: `${newModuleData.title} Mindfulness Guide PDF`,
          type: 'PDF',
          size: '2.3 MB',
          url: '#'
        },
        {
          id: 2,
          title: 'Guided Meditation Audio',
          type: 'Audio',
          size: '15 MB',
          url: '#'
        },
        {
          id: 3,
          title: 'Mindfulness Practice Worksheet',
          type: 'Worksheet',
          size: '1.1 MB',
          url: '#'
        }
      ]
    }
  }
}, { immediate: true })

// Mindfulness Module sections
const moduleSections = computed(() => {
  const currentModule = currentModuleData.value
  if (!currentModule) return []
  
  const sections = []
  
  // Learning section with objectives and key concepts
  if (currentModule.keyConcepts && currentModule.keyConcepts.length > 0) {
    sections.push({
      title: 'Mindfulness Learning Objectives',
      type: 'learning',
      duration: '10 min',
      completed: true,
      content: currentModule.fullDescription,
      objectives: currentModule.keyConcepts,
      examples: currentModule.examples || [],
      keyConcepts: currentModule.keyConcepts || []
    })
  }
  
  // Activities section
  sections.push({
    title: 'Mindfulness Practice Activities',
    type: 'activity',
    duration: '20 min',
    completed: false,
    instructions: `Complete the following mindfulness activities to practice the concepts you've learned. Each activity is designed to help you develop present-moment awareness and reduce stress.`,
    tools: [
      'Quiet space for meditation',
      'Comfortable cushion or chair',
      'Timer or meditation app',
      'Journal for reflection'
    ],
    activities: [
      { title: 'Guided Meditation', duration: '10 min', completed: false },
      { title: 'Breathing Exercise', duration: '5 min', completed: false },
      { title: 'Body Awareness Practice', duration: '5 min', completed: false }
    ]
  })
  
  // Key concepts section
  if (currentModule.keyConcepts && currentModule.keyConcepts.length > 0) {
    sections.push({
      title: 'Mindfulness Key Concepts',
      type: 'learning',
      duration: '15 min',
      completed: false,
      content: 'Understanding these core mindfulness concepts will help you apply the techniques effectively in your daily life.',
      objectives: currentModule.keyConcepts,
      examples: currentModule.examples || []
    })
  }
  
  // Examples and applications
  if (currentModule.examples && currentModule.examples.length > 0) {
    sections.push({
      title: 'Mindfulness Examples & Applications',
      type: 'learning',
      duration: '10 min',
      completed: false,
      content: 'These real-world mindfulness examples will help you understand how to apply the concepts in various situations.',
      objectives: currentModule.examples,
      examples: currentModule.examples
    })
  }
  
  // Knowledge check quiz
  sections.push({
    title: 'Mindfulness Knowledge Check',
    type: 'quiz',
    duration: '10 min',
    completed: false,
    questions: [
      {
        question: `What is the main focus of ${currentModule.title}?`,
        options: [
          currentModule.description,
          'General wellness practices',
          'Advanced meditation techniques only',
          'Theoretical concepts only'
        ],
        correct: 0
      },
      {
        question: 'How long should you practice mindfulness techniques from this module?',
        options: [
          'Only during the module',
          'For a few days',
          'Regularly for ongoing benefit',
          'Only when you feel stressed'
        ],
        correct: 2
      }
    ]
  })
  
  return sections
})

const currentSectionData = computed(() => {
  return moduleSections.value[currentSection.value] || moduleSections.value[0]
})

const currentSectionIndex = computed(() => currentSection.value)

const setCurrentSection = (index) => {
  currentSection.value = index
}

const nextSection = () => {
  if (currentSection.value < moduleSections.value.length - 1) {
    currentSection.value++
  } else {
    console.log('Mindfulness Module completed!')
  }
}

const previousSection = () => {
  if (currentSection.value > 0) {
    currentSection.value--
  }
}

// Module navigation
const currentModuleIndex = computed(() => {
  return mindfulnessModules.value.findIndex(m => m.id === moduleId.value)
})

const previousModule = computed(() => {
  const index = currentModuleIndex.value
  return index > 0 ? mindfulnessModules.value[index - 1] : null
})

const nextModule = computed(() => {
  const index = currentModuleIndex.value
  return index < mindfulnessModules.value.length - 1 ? mindfulnessModules.value[index + 1] : null
})

const goToPreviousModule = () => {
  if (previousModule.value) {
    router.push(`/program/${programId.value}/module/${previousModule.value.id}`)
  }
}

const goToNextModule = () => {
  if (nextModule.value) {
    router.push(`/program/${programId.value}/module/${nextModule.value.id}`)
  }
}

// Navigation functions
const navigateToProgram = () => {
  router.push(`/program/${programId.value}`)
}

const navigateToProgramModules = () => {
  router.push(`/program/${programId.value}#modules`)
}

// Progress calculation
const getModuleProgress = (module) => {
  if (module.completed) return 100
  if (module.current) {
    const completedActivities = module.activities.filter(activity => activity.completed).length
    return Math.round((completedActivities / module.activities.length) * 100)
  }
  return 0
}

// Hide main app elements when module is open
onMounted(() => {
  const sidebar = document.querySelector('.v-navigation-drawer')
  const topbar = document.querySelector('.v-app-bar')
  if (sidebar) {
    sidebar.style.display = 'none'
  }
  if (topbar) {
    topbar.style.display = 'none'
  }
})

onUnmounted(() => {
  const sidebar = document.querySelector('.v-navigation-drawer')
  const topbar = document.querySelector('.v-app-bar')
  if (sidebar) {
    sidebar.style.display = ''
  }
  if (topbar) {
    topbar.style.display = ''
  }
})
</script>

<style scoped>
/* Mindfulness Module Specific Styles */
.wireframe-module-detail-page {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  overflow: hidden;
  background: white;
  font-family: 'Open Sans', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}

.wireframe-module-header {
  background: #f0f8ff;
  border-bottom: 2px solid #4CAF50;
  padding: 20px;
}

.wireframe-header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.wireframe-back-button,
.wireframe-modules-button {
  padding: 10px 20px;
  border: 2px solid #4CAF50;
  border-radius: 4px;
  background: white;
  color: #4CAF50;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.wireframe-back-button:hover,
.wireframe-modules-button:hover {
  background: #e8f5e8;
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
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.wireframe-progress-fill {
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s ease;
}

.wireframe-progress-text {
  font-size: 14px;
  font-weight: 600;
  color: #4CAF50;
}

.wireframe-module-title-section {
  text-align: center;
}

.wireframe-module-title {
  font-size: 32px;
  font-weight: 600;
  color: #2E7D32;
  margin-bottom: 12px;
}

.wireframe-module-subtitle {
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.wireframe-module-layout {
  display: flex;
  height: calc(100vh - 200px);
}

.wireframe-module-sidebar {
  width: 300px;
  background: #f0f8ff;
  border-right: 2px solid #4CAF50;
  padding: 20px;
  overflow-y: auto;
}

.wireframe-sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #4CAF50;
}

.wireframe-sidebar-title {
  font-size: 18px;
  font-weight: 600;
  color: #2E7D32;
}

.wireframe-sidebar-progress {
  font-size: 14px;
  font-weight: 600;
  color: #4CAF50;
}

.wireframe-sidebar-sections {
  margin-bottom: 30px;
}

.wireframe-sidebar-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.wireframe-sidebar-item:hover {
  background: #e8f5e8;
  border-color: #4CAF50;
}

.wireframe-sidebar-item.wireframe-sidebar-active {
  background: #e3f2fd;
  border-color: #2196F3;
}

.wireframe-sidebar-item.wireframe-sidebar-completed {
  background: #e8f5e8;
  border-color: #4CAF50;
}

.wireframe-sidebar-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-weight: 600;
  color: #2E7D32;
}

.wireframe-sidebar-content {
  flex: 1;
}

.wireframe-sidebar-item .wireframe-sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: #2E7D32;
  margin-bottom: 4px;
}

.wireframe-sidebar-duration {
  font-size: 12px;
  color: #666;
}

.wireframe-module-nav {
  display: flex;
  gap: 10px;
}

.wireframe-nav-button {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #4CAF50;
  border-radius: 4px;
  background: white;
  color: #4CAF50;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.wireframe-nav-button:hover:not(:disabled) {
  background: #e8f5e8;
  transform: translateY(-1px);
}

.wireframe-nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.wireframe-module-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

.wireframe-content-section {
  max-width: 800px;
  margin: 0 auto;
}

.wireframe-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #4CAF50;
}

.wireframe-section-title {
  font-size: 28px;
  font-weight: 600;
  color: #2E7D32;
}

.wireframe-section-meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #666;
}

.wireframe-section-content {
  margin-bottom: 40px;
}

.wireframe-learning-content h3,
.wireframe-activity-content h3,
.wireframe-quiz-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #2E7D32;
  margin-bottom: 15px;
}

.wireframe-learning-content ul {
  margin: 15px 0;
  padding-left: 20px;
}

.wireframe-learning-content li {
  margin-bottom: 8px;
  color: #333;
}

.wireframe-examples {
  margin-top: 20px;
  padding: 20px;
  background: #f0f8ff;
  border: 2px solid #4CAF50;
  border-radius: 4px;
}

.wireframe-examples h4 {
  font-size: 16px;
  font-weight: 600;
  color: #2E7D32;
  margin-bottom: 15px;
}

.wireframe-example-item {
  padding: 10px;
  margin-bottom: 8px;
  background: white;
  border: 1px solid #4CAF50;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

.wireframe-activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.wireframe-activity-status {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.wireframe-activity-status.wireframe-activity-completed {
  background: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
}

.wireframe-activity-instructions,
.wireframe-activity-tools {
  margin-bottom: 20px;
}

.wireframe-activity-instructions h4,
.wireframe-activity-tools h4 {
  font-size: 16px;
  font-weight: 600;
  color: #2E7D32;
  margin-bottom: 10px;
}

.wireframe-tool-list {
  display: grid;
  gap: 8px;
}

.wireframe-tool-item {
  padding: 10px;
  background: #f0f8ff;
  border: 1px solid #4CAF50;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

.wireframe-quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.wireframe-quiz-progress {
  font-size: 14px;
  color: #666;
}

.wireframe-quiz-question h4 {
  font-size: 18px;
  font-weight: 600;
  color: #2E7D32;
  margin-bottom: 20px;
}

.wireframe-quiz-options {
  display: grid;
  gap: 10px;
}

.wireframe-quiz-option {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.wireframe-quiz-option:hover {
  background: #e8f5e8;
  border-color: #4CAF50;
}

.wireframe-quiz-option input {
  margin-right: 10px;
}

.wireframe-section-nav {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px solid #e0e0e0;
}

.wireframe-section-button {
  padding: 12px 24px;
  border: 2px solid #4CAF50;
  border-radius: 4px;
  background: white;
  color: #4CAF50;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.wireframe-section-button:hover:not(:disabled) {
  background: #e8f5e8;
  transform: translateY(-1px);
}

.wireframe-section-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
