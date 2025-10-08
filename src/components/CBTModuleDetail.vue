<template>
  <div class="wireframe-module-detail-page">
    <!-- Header with Navigation -->
    <div class="wireframe-module-header">
      <div class="wireframe-header-nav">
        <button class="wireframe-back-button" @click="navigateToProgram">
          ← Back to Cognitive Behavioral Therapy
        </button>
        <button class="wireframe-modules-button" @click="navigateToProgramModules">
          📚 View All CBT Modules
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
          <div class="wireframe-sidebar-title">CBT Module Contents</div>
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
            ← Previous CBT Module
          </button>
          <button 
            class="wireframe-nav-button wireframe-nav-next"
            :disabled="!nextModule"
            @click="goToNextModule"
          >
            Next CBT Module →
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
                <h3>CBT Learning Objectives</h3>
                <ul>
                  <li v-for="objective in currentSectionData.objectives" :key="objective">{{ objective }}</li>
                </ul>
                
                <h3>CBT Key Concepts</h3>
                <p>{{ currentSectionData.content }}</p>
                
                <div v-if="currentSectionData.examples" class="wireframe-examples">
                  <h4>CBT Examples</h4>
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
                <h4>CBT Practice Instructions</h4>
                <p>{{ currentSectionData.instructions }}</p>
              </div>
              
              <div class="wireframe-activity-tools">
                <h4>CBT Tools & Resources</h4>
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

// CBT Program Title
const programTitle = computed(() => 'Cognitive Behavioral Therapy')

// CBT Modules Data
const cbtModules = ref([
  {
    id: 'introduction-to-cbt',
    title: 'Introduction to CBT',
    description: 'Understanding the basics of cognitive behavioral therapy and the CBT model',
    fullDescription: 'This foundational module introduces you to the core principles of Cognitive Behavioral Therapy. You\'ll learn about the CBT triangle (thoughts, feelings, behaviors), understand how they interact, and begin to identify your own patterns.',
    duration: '45 min',
    completed: true,
    current: false,
    status: 'completed',
    objectives: [
      'Understand the CBT model and its applications',
      'Learn to identify automatic thoughts',
      'Recognize the connection between thoughts, feelings, and behaviors',
      'Begin practicing thought monitoring'
    ],
    activities: [
      { title: 'Welcome Video', duration: '10 min', completed: true },
      { title: 'CBT Model Worksheet', duration: '15 min', completed: true },
      { title: 'Thought Monitoring Exercise', duration: '20 min', completed: true }
    ],
    examples: [
      'CBT Triangle: "I think I\'m not good enough" → Feel anxious → Avoid social situations',
      'Automatic thoughts: "I always mess things up" when making a small mistake',
      'Behavioral pattern: Feeling overwhelmed → Procrastinating → Feeling more overwhelmed'
    ],
    keyConcepts: [
      'The CBT Triangle: Thoughts, Feelings, and Behaviors are interconnected',
      'Automatic thoughts are rapid, unconscious thoughts that influence emotions',
      'Cognitive distortions are biased ways of thinking that can lead to negative emotions'
    ]
  },
  {
    id: 'identifying-negative-thoughts',
    title: 'Identifying Negative Thoughts',
    description: 'Learning to recognize and challenge negative thought patterns',
    fullDescription: 'This module focuses on developing your ability to identify negative thought patterns and cognitive distortions. You\'ll learn about common thinking errors like all-or-nothing thinking, catastrophizing, and mind reading.',
    duration: '60 min',
    completed: true,
    current: false,
    status: 'completed',
    objectives: [
      'Identify common cognitive distortions',
      'Recognize personal thinking patterns',
      'Understand the impact of negative thoughts',
      'Practice thought identification techniques'
    ],
    activities: [
      { title: 'Distortion Identification Quiz', duration: '20 min', completed: true },
      { title: 'Personal Pattern Analysis', duration: '25 min', completed: true },
      { title: 'Thought Record Practice', duration: '15 min', completed: true }
    ],
    examples: [
      'All-or-nothing thinking: "If I can\'t do this perfectly, I\'m a complete failure"',
      'Catastrophizing: "If I make one mistake, my whole career will be ruined"',
      'Mind reading: "They\'re probably thinking I\'m incompetent" without evidence'
    ],
    keyConcepts: [
      'Cognitive distortions are systematic errors in thinking that affect our emotions',
      'All-or-nothing thinking sees things in black and white, with no middle ground',
      'Catastrophizing involves imagining the worst possible outcomes'
    ]
  },
  {
    id: 'thought-challenging-techniques',
    title: 'Thought Challenging Techniques',
    description: 'Practical exercises for challenging unhelpful thoughts',
    fullDescription: 'This module teaches you evidence-based techniques for challenging and restructuring negative thoughts. You\'ll learn to ask yourself key questions like "What evidence do I have for this thought?" and "What would I tell a friend in this situation?"',
    duration: '50 min',
    completed: false,
    current: true,
    status: 'active',
    objectives: [
      'Learn thought challenging questions',
      'Practice evidence evaluation',
      'Develop alternative perspectives',
      'Build thought restructuring skills'
    ],
    activities: [
      { title: 'Thought Challenging Worksheet', duration: '20 min', completed: true },
      { title: 'Evidence Evaluation Exercise', duration: '15 min', completed: true },
      { title: 'Alternative Perspective Practice', duration: '15 min', completed: false }
    ],
    examples: [
      'Evidence gathering: "What proof do I have that I\'m a failure?" → List past successes',
      'Friend perspective: "What would I tell my best friend if they had this thought?"',
      'Alternative explanations: "What other reasons could explain this situation?"'
    ],
    keyConcepts: [
      'Evidence-based thinking involves gathering facts to support or challenge thoughts',
      'The friend test helps us be more compassionate with ourselves',
      'Alternative explanations broaden our perspective on situations'
    ]
  },
  {
    id: 'behavioral-experiments',
    title: 'Behavioral Experiments',
    description: 'Testing new behaviors and thought patterns in real situations',
    fullDescription: 'This module helps you test your thoughts and beliefs through behavioral experiments. You\'ll learn to design small experiments to challenge your assumptions and gather evidence about your thoughts.',
    duration: '55 min',
    completed: false,
    current: false,
    status: 'not-started',
    objectives: [
      'Design behavioral experiments',
      'Test negative predictions',
      'Gather evidence for new thoughts',
      'Build confidence through action'
    ],
    activities: [
      { title: 'Experiment Planning Worksheet', duration: '20 min', completed: false },
      { title: 'Prediction Testing Exercise', duration: '20 min', completed: false },
      { title: 'Evidence Collection Practice', duration: '15 min', completed: false }
    ],
    examples: [
      'Social anxiety experiment: "If I speak up in meetings, people will judge me" → Test by asking one question',
      'Perfectionism experiment: "If I don\'t check my work 5 times, I\'ll make mistakes" → Check only twice',
      'Avoidance experiment: "If I go to the party, I\'ll have a terrible time" → Attend for 30 minutes'
    ],
    keyConcepts: [
      'Behavioral experiments test our beliefs through real-world actions',
      'Start with small, manageable experiments to build confidence',
      'Record both predicted and actual outcomes to learn from experience'
    ]
  },
  {
    id: 'relapse-prevention',
    title: 'Relapse Prevention',
    description: 'Strategies for maintaining progress and preventing setbacks',
    fullDescription: 'This final module focuses on maintaining the skills you\'ve learned and preventing relapse. You\'ll develop a personalized maintenance plan, learn to recognize early warning signs, and create strategies for dealing with setbacks.',
    duration: '40 min',
    completed: false,
    current: false,
    status: 'not-started',
    objectives: [
      'Develop maintenance strategies',
      'Create relapse prevention plan',
      'Identify early warning signs',
      'Build long-term coping skills'
    ],
    activities: [
      { title: 'Maintenance Plan Worksheet', duration: '15 min', completed: false },
      { title: 'Warning Signs Checklist', duration: '10 min', completed: false },
      { title: 'Coping Strategy Toolkit', duration: '15 min', completed: false }
    ],
    examples: [
      'Early warning signs: Increased negative self-talk, avoiding social activities, poor sleep',
      'Maintenance plan: Daily thought records, weekly behavioral experiments, monthly skill review',
      'Coping strategies: Deep breathing, progressive muscle relaxation, positive self-talk'
    ],
    keyConcepts: [
      'Relapse prevention involves recognizing early warning signs before problems escalate',
      'Maintenance plans help you continue practicing CBT skills after therapy ends',
      'Coping strategies provide immediate tools for managing difficult situations'
    ]
  }
])

// Get current module data
const currentModuleData = computed(() => {
  return cbtModules.value.find(m => m.id === moduleId.value) || cbtModules.value[0]
})

const module = ref({
  id: moduleId.value,
  title: 'CBT Module',
  description: 'CBT module description',
  fullDescription: 'CBT module full description',
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
          title: `${newModuleData.title} CBT Guide PDF`,
          type: 'PDF',
          size: '2.3 MB',
          url: '#'
        },
        {
          id: 2,
          title: 'CBT Practice Audio',
          type: 'Audio',
          size: '15 MB',
          url: '#'
        },
        {
          id: 3,
          title: 'CBT Worksheet',
          type: 'Worksheet',
          size: '1.1 MB',
          url: '#'
        }
      ]
    }
  }
}, { immediate: true })

// CBT Module sections
const moduleSections = computed(() => {
  const currentModule = currentModuleData.value
  if (!currentModule) return []
  
  const sections = []
  
  // Learning section with objectives and key concepts
  if (currentModule.objectives && currentModule.objectives.length > 0) {
    sections.push({
      title: 'CBT Learning Objectives',
      type: 'learning',
      duration: '10 min',
      completed: true,
      content: currentModule.fullDescription,
      objectives: currentModule.objectives,
      examples: currentModule.examples || [],
      keyConcepts: currentModule.keyConcepts || []
    })
  }
  
  // Activities section
  if (currentModule.activities && currentModule.activities.length > 0) {
    sections.push({
      title: 'CBT Activities & Exercises',
      type: 'activity',
      duration: '20 min',
      completed: false,
      instructions: `Complete the following CBT activities to practice the concepts you've learned. Each activity is designed to help you apply CBT knowledge in real-world situations.`,
      tools: currentModule.activities.map(activity => `${activity.title} (${activity.duration})`),
      activities: currentModule.activities
    })
  }
  
  // Key concepts section
  if (currentModule.keyConcepts && currentModule.keyConcepts.length > 0) {
    sections.push({
      title: 'CBT Key Concepts',
      type: 'learning',
      duration: '15 min',
      completed: false,
      content: 'Understanding these core CBT concepts will help you apply the techniques effectively in your daily life.',
      objectives: currentModule.keyConcepts,
      examples: currentModule.examples || []
    })
  }
  
  // Examples and applications
  if (currentModule.examples && currentModule.examples.length > 0) {
    sections.push({
      title: 'CBT Examples & Applications',
      type: 'learning',
      duration: '10 min',
      completed: false,
      content: 'These real-world CBT examples will help you understand how to apply the concepts in various situations.',
      objectives: currentModule.examples,
      examples: currentModule.examples
    })
  }
  
  // Knowledge check quiz
  sections.push({
    title: 'CBT Knowledge Check',
    type: 'quiz',
    duration: '10 min',
    completed: false,
    questions: [
      {
        question: `What is the main focus of ${currentModule.title}?`,
        options: [
          currentModule.description,
          'General wellness practices',
          'Advanced techniques only',
          'Theoretical concepts only'
        ],
        correct: 0
      },
      {
        question: 'How long should you practice CBT techniques from this module?',
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
    console.log('CBT Module completed!')
  }
}

const previousSection = () => {
  if (currentSection.value > 0) {
    currentSection.value--
  }
}

// Module navigation
const currentModuleIndex = computed(() => {
  return cbtModules.value.findIndex(m => m.id === moduleId.value)
})

const previousModule = computed(() => {
  const index = currentModuleIndex.value
  return index > 0 ? cbtModules.value[index - 1] : null
})

const nextModule = computed(() => {
  const index = currentModuleIndex.value
  return index < cbtModules.value.length - 1 ? cbtModules.value[index + 1] : null
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
/* CBT Module Specific Styles */
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
  background: #f8f9fa;
  border-bottom: 2px solid #333;
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
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.wireframe-back-button:hover,
.wireframe-modules-button:hover {
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
  color: #333;
}

.wireframe-module-title-section {
  text-align: center;
}

.wireframe-module-title {
  font-size: 32px;
  font-weight: 600;
  color: #333;
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
  background: #f8f9fa;
  border-right: 2px solid #333;
  padding: 20px;
  overflow-y: auto;
}

.wireframe-sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #333;
}

.wireframe-sidebar-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
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
  background: #f0f0f0;
  border-color: #333;
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
  color: #333;
}

.wireframe-sidebar-content {
  flex: 1;
}

.wireframe-sidebar-item .wireframe-sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
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
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.wireframe-nav-button:hover:not(:disabled) {
  background: #f0f0f0;
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
  border-bottom: 2px solid #333;
}

.wireframe-section-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
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
  color: #333;
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
  background: #f8f9fa;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
}

.wireframe-examples h4 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.wireframe-example-item {
  padding: 10px;
  margin-bottom: 8px;
  background: white;
  border: 1px solid #e0e0e0;
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
  color: #333;
  margin-bottom: 10px;
}

.wireframe-tool-list {
  display: grid;
  gap: 8px;
}

.wireframe-tool-item {
  padding: 10px;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
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
  color: #333;
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
  background: #f0f0f0;
  border-color: #333;
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
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.wireframe-section-button:hover:not(:disabled) {
  background: #f0f0f0;
  transform: translateY(-1px);
}

.wireframe-section-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
