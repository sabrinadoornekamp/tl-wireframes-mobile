<template>
  <div class="wireframe-module-detail-page">
    <!-- Header with Navigation -->
    <div class="wireframe-module-header">
      <div class="wireframe-header-nav">
        <button class="wireframe-back-button" @click="navigateToProgram">
          ← Back to {{ programTitle }}
        </button>
        <button class="wireframe-modules-button" @click="navigateToProgramModules">
          📚 View All Modules
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
        <!-- Debug info -->
        <div style="background: #f0f0f0; padding: 10px; margin: 10px 0; border: 1px solid #ccc;">
          <strong>Debug Info:</strong><br>
          Route Params: {{ JSON.stringify(route.params) }}<br>
          Program ID: {{ programId }}<br>
          Module ID: {{ moduleId }}<br>
          Module Title: {{ module.title }}<br>
          Module Description: {{ module.description }}<br>
          Module Sections: {{ moduleSections.length }}<br>
          Current Module Data: {{ currentModuleData ? currentModuleData.title : 'Not found' }}<br>
          All Modules Count: {{ allModules.length }}<br>
          Available Programs: cognitive-behavioral-therapy, mindfulness-stress-reduction
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="wireframe-module-layout">
      <!-- Sidebar Navigation -->
      <div class="wireframe-module-sidebar">
        <div class="wireframe-sidebar-header">
          <div class="wireframe-sidebar-title">Module Contents</div>
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
            ← Previous Module
          </button>
          <button 
            class="wireframe-nav-button wireframe-nav-next"
            :disabled="!nextModule"
            @click="goToNextModule"
          >
            Next Module →
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
                <h3>Learning Objectives</h3>
                <ul>
                  <li v-for="objective in currentSectionData.objectives" :key="objective">{{ objective }}</li>
                </ul>
                
                <h3>Key Concepts</h3>
                <p>{{ currentSectionData.content }}</p>
                
                <div v-if="currentSectionData.examples" class="wireframe-examples">
                  <h4>Examples</h4>
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
                <h4>Instructions</h4>
                <p>{{ currentSectionData.instructions }}</p>
              </div>
              
              <div class="wireframe-activity-tools">
                <h4>Tools & Resources</h4>
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
          <div class="wireframe-section-navigation">
            <button 
              class="wireframe-section-button wireframe-section-prev"
              :disabled="currentSectionIndex === 0"
              @click="previousSection"
            >
              ← Previous
            </button>
            <button 
              class="wireframe-section-button wireframe-section-next"
              @click="nextSection"
            >
              {{ currentSectionIndex === moduleSections.length - 1 ? 'Complete Module' : 'Next →' }}
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

// Route parameters

// Current section and question for Uxcel-style layout
const currentSection = ref(0)
const currentQuestion = ref(0)

// Get program title based on program ID
const programTitle = computed(() => {
  const titles = {
    'cognitive-behavioral-therapy': 'Cognitive Behavioral Therapy',
    'mindfulness-stress-reduction': 'Mindfulness & Stress Reduction'
  }
  return titles[programId.value] || 'Program'
})

// Get current module data from program modules
const currentModuleData = computed(() => {
  const found = allModules.value.find(m => m.id === moduleId.value)
  return found || allModules.value[0]
})

const module = ref({
  id: moduleId.value,
  title: 'Module',
  description: 'Module description',
  fullDescription: 'Module full description',
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
          title: `${newModuleData.title} Guide PDF`,
          type: 'PDF',
          size: '2.3 MB',
          url: '#'
        },
        {
          id: 2,
          title: 'Guided Practice Audio',
          type: 'Audio',
          size: '15 MB',
          url: '#'
        },
        {
          id: 3,
          title: 'Practice Worksheet',
          type: 'Worksheet',
          size: '1.1 MB',
          url: '#'
        }
      ]
    }
  }
}, { immediate: true })

// Module sections for Uxcel-style layout
const moduleSections = computed(() => {
  const currentModule = currentModuleData.value
  console.log('ModuleDetail: moduleSections computed, currentModule:', currentModule)
  if (!currentModule) return []
  
  const sections = []
  
  // Learning section with objectives and key concepts
  if (currentModule.objectives && currentModule.objectives.length > 0) {
    sections.push({
      title: 'Learning Objectives',
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
      title: 'Activities & Exercises',
      type: 'activity',
      duration: '20 min',
      completed: false,
      instructions: `Complete the following activities to practice the concepts you've learned. Each activity is designed to help you apply the knowledge in real-world situations.`,
      tools: currentModule.activities.map(activity => `${activity.title} (${activity.duration})`),
      activities: currentModule.activities
    })
  }
  
  // Key concepts section
  if (currentModule.keyConcepts && currentModule.keyConcepts.length > 0) {
    sections.push({
      title: 'Key Concepts',
      type: 'learning',
      duration: '15 min',
      completed: false,
      content: 'Understanding these core concepts will help you apply the techniques effectively in your daily life.',
      objectives: currentModule.keyConcepts,
      examples: currentModule.examples || []
    })
  }
  
  // Examples and applications
  if (currentModule.examples && currentModule.examples.length > 0) {
    sections.push({
      title: 'Examples & Applications',
      type: 'learning',
      duration: '10 min',
      completed: false,
      content: 'These real-world examples will help you understand how to apply the concepts in various situations.',
      objectives: currentModule.examples,
      examples: currentModule.examples
    })
  }
  
  // Knowledge check quiz
  sections.push({
    title: 'Knowledge Check',
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
        question: 'How long should you practice the techniques from this module?',
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
    // Complete module
    console.log('Module completed!')
  }
}

const previousSection = () => {
  if (currentSection.value > 0) {
    currentSection.value--
  }
}

// Get all modules for the current program - matching ProgramDetail structure
const allModules = computed(() => {
  console.log('ModuleDetail: allModules computed, programId:', programId.value)
  const programs = {
    'cognitive-behavioral-therapy': {
      modules: [
        {
          id: 'introduction-to-cbt',
          title: 'Introduction to CBT',
          description: 'Understanding the basics of cognitive behavioral therapy and the CBT model',
          fullDescription: 'This foundational module introduces you to the core principles of Cognitive Behavioral Therapy. You\'ll learn about the CBT triangle (thoughts, feelings, behaviors), understand how they interact, and begin to identify your own patterns. The module includes interactive exercises to help you recognize automatic thoughts and understand the connection between your thinking and emotional responses.',
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
          fullDescription: 'This module focuses on developing your ability to identify negative thought patterns and cognitive distortions. You\'ll learn about common thinking errors like all-or-nothing thinking, catastrophizing, and mind reading. Through practical exercises, you\'ll start to recognize these patterns in your own thinking and understand their impact on your mood and behavior.',
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
            'Mind reading: "They\'re probably thinking I\'m incompetent" without evidence',
            'Personalization: "It\'s all my fault that the team project failed"'
          ],
          keyConcepts: [
            'Cognitive distortions are systematic errors in thinking that affect our emotions',
            'All-or-nothing thinking sees things in black and white, with no middle ground',
            'Catastrophizing involves imagining the worst possible outcomes',
            'Mind reading assumes we know what others are thinking without evidence'
          ]
        },
        {
          id: 'thought-challenging-techniques',
          title: 'Thought Challenging Techniques',
          description: 'Practical exercises for challenging unhelpful thoughts',
          fullDescription: 'This module teaches you evidence-based techniques for challenging and restructuring negative thoughts. You\'ll learn to ask yourself key questions like "What evidence do I have for this thought?" and "What would I tell a friend in this situation?" Through guided exercises, you\'ll practice developing more balanced and realistic perspectives.',
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
            'Alternative explanations: "What other reasons could explain this situation?"',
            'Probability testing: "What\'s the realistic likelihood of the worst-case scenario?"'
          ],
          keyConcepts: [
            'Evidence-based thinking involves gathering facts to support or challenge thoughts',
            'The friend test helps us be more compassionate with ourselves',
            'Alternative explanations broaden our perspective on situations',
            'Probability testing helps us assess realistic outcomes'
          ]
        },
        {
          id: 'behavioral-experiments',
          title: 'Behavioral Experiments',
          description: 'Testing new behaviors and thought patterns in real situations',
          fullDescription: 'This module helps you test your thoughts and beliefs through behavioral experiments. You\'ll learn to design small experiments to challenge your assumptions and gather evidence about your thoughts. This hands-on approach helps you build confidence in new ways of thinking and behaving.',
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
            'Avoidance experiment: "If I go to the party, I\'ll have a terrible time" → Attend for 30 minutes',
            'Assertiveness experiment: "If I say no, people will be angry" → Politely decline one request'
          ],
          keyConcepts: [
            'Behavioral experiments test our beliefs through real-world actions',
            'Start with small, manageable experiments to build confidence',
            'Record both predicted and actual outcomes to learn from experience',
            'Use experiments to gather evidence that challenges negative beliefs'
          ]
        },
        {
          id: 'relapse-prevention',
          title: 'Relapse Prevention',
          description: 'Strategies for maintaining progress and preventing setbacks',
          fullDescription: 'This final module focuses on maintaining the skills you\'ve learned and preventing relapse. You\'ll develop a personalized maintenance plan, learn to recognize early warning signs, and create strategies for dealing with setbacks. The goal is to ensure long-term success and continued growth.',
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
            'Coping strategies: Deep breathing, progressive muscle relaxation, positive self-talk',
            'Support system: Regular check-ins with therapist, CBT group meetings, family support'
          ],
          keyConcepts: [
            'Relapse prevention involves recognizing early warning signs before problems escalate',
            'Maintenance plans help you continue practicing CBT skills after therapy ends',
            'Coping strategies provide immediate tools for managing difficult situations',
            'Support systems offer ongoing encouragement and accountability'
          ]
        }
      ]
    },
    'mindfulness-stress-reduction': {
      modules: [
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
      ]
    }
  }
  
  console.log('ModuleDetail: Available program keys:', Object.keys(programs))
  console.log('ModuleDetail: Looking for program:', programId.value)
  console.log('ModuleDetail: Found program:', programs[programId.value])
  const modules = programs[programId.value]?.modules || []
  console.log('ModuleDetail: Returning modules:', modules.length, 'modules')
  return modules
})

const currentModuleIndex = computed(() => {
  return allModules.value.findIndex(m => m.id === moduleId.value)
})

const previousModule = computed(() => {
  if (currentModuleIndex.value > 0) {
    return allModules.value[currentModuleIndex.value - 1]
  }
  return null
})

const nextModule = computed(() => {
  if (currentModuleIndex.value < allModules.value.length - 1) {
    return allModules.value[currentModuleIndex.value + 1]
  }
  return null
})

const navigateToModule = (targetModuleId) => {
  router.push(`/program/${programId.value}/module/${targetModuleId}`)
}

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

const getModuleProgress = (module) => {
  if (!module.activities || module.activities.length === 0) return 0
  const completed = module.activities.filter(activity => activity.completed).length
  return Math.round((completed / module.activities.length) * 100)
}

const getModuleStatus = (module) => {
  const progress = getModuleProgress(module)
  if (progress === 0) return 'not-started'
  if (progress === 100) return 'completed'
  return 'in-progress'
}

const getModuleStatusText = (status) => {
  const statusMap = {
    'not-started': 'Not Started',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  }
  return statusMap[status] || 'Unknown'
}

const navigateToProgram = () => {
  router.push(`/program/${programId.value}`)
}

const navigateToProgramModules = () => {
  // Navigate to program detail page and scroll to modules section
  router.push(`/program/${programId.value}#modules`)
}

// Lifecycle hooks to manage global styles
onMounted(() => {
  // Hide sidebar and topbar when module detail page is mounted
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
  // Restore sidebar and topbar when module detail page is unmounted
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
/* Uxcel-style Layout Styles */
.wireframe-module-detail-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  z-index: 9999;
  overflow: hidden;
}

.wireframe-module-header {
  border: 2px solid #333;
  border-bottom: 1px solid #333;
  background: white;
  padding: 16px 24px;
}

.wireframe-header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.wireframe-back-button {
  padding: 8px 16px;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.wireframe-back-button:hover {
  background: #f0f0f0;
}

.wireframe-modules-button {
  padding: 8px 16px;
  border: 2px solid #333;
  border-radius: 4px;
  background: #f8f8f8;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 12px;
}

.wireframe-modules-button:hover {
  background: #e0e0e0;
}

.wireframe-module-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.wireframe-progress-bar {
  width: 200px;
  height: 8px;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
  overflow: hidden;
}

.wireframe-progress-fill {
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s ease;
}

.wireframe-progress-text {
  font-size: 12px;
  font-weight: 600;
  color: #333;
}

.wireframe-module-title-section {
  text-align: left;
}

.wireframe-module-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.wireframe-module-subtitle {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}

.wireframe-module-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.wireframe-module-sidebar {
  width: 300px;
  border-right: 2px solid #333;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.wireframe-sidebar-header {
  padding: 16px;
  border-bottom: 2px solid #333;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wireframe-sidebar-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.wireframe-sidebar-progress {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  padding: 4px 8px;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
}

.wireframe-sidebar-sections {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.wireframe-sidebar-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 4px;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  gap: 12px;
}

.wireframe-sidebar-item:hover {
  background: #f0f0f0;
}

.wireframe-sidebar-item.wireframe-sidebar-active {
  background: #e3f2fd;
  border-color: #2196F3;
}

.wireframe-sidebar-item.wireframe-sidebar-completed {
  background: #f0f8f0;
  border-color: #4CAF50;
}

.wireframe-sidebar-icon {
  width: 24px;
  height: 24px;
  border: 2px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.wireframe-sidebar-completed .wireframe-sidebar-icon {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.wireframe-sidebar-active .wireframe-sidebar-icon {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}

.wireframe-sidebar-content {
  flex: 1;
}

.wireframe-sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
}

.wireframe-sidebar-duration {
  font-size: 12px;
  color: #666;
}

.wireframe-module-nav {
  padding: 16px;
  border-top: 2px solid #333;
  background: white;
  display: flex;
  gap: 8px;
}

.wireframe-nav-button {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.wireframe-nav-button:hover:not(:disabled) {
  background: #f0f0f0;
}

.wireframe-nav-button:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
  border-color: #ccc;
}

.wireframe-nav-next {
  background: #333;
  color: white;
}

.wireframe-nav-next:hover:not(:disabled) {
  background: #666;
}


.wireframe-module-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.wireframe-content-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.wireframe-section-header {
  padding: 24px;
  border-bottom: 2px solid #333;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wireframe-section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.wireframe-section-meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
}

.wireframe-section-duration {
  font-weight: 600;
}

.wireframe-section-progress {
  font-weight: 600;
}

.wireframe-section-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background: white;
}

.wireframe-learning-content h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  border-bottom: 2px solid #333;
  padding-bottom: 8px;
}

.wireframe-learning-content ul {
  margin: 12px 0;
  padding-left: 20px;
}

.wireframe-learning-content li {
  margin: 8px 0;
  color: #333;
}

.wireframe-learning-content p {
  margin: 16px 0;
  line-height: 1.6;
  color: #333;
}

.wireframe-examples {
  margin-top: 20px;
  padding: 16px;
  border: 2px solid #333;
  border-radius: 4px;
  background: #f8f8f8;
}

.wireframe-examples h4 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.wireframe-example-item {
  padding: 8px 12px;
  margin: 8px 0;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
  font-size: 14px;
  color: #333;
}

.wireframe-activity-content {
  max-width: 800px;
}

.wireframe-activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  border: 2px solid #333;
  border-radius: 4px;
  background: #f8f8f8;
}

.wireframe-activity-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.wireframe-activity-status {
  padding: 6px 12px;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
  font-size: 12px;
  font-weight: 600;
  color: #333;
}

.wireframe-activity-status.wireframe-activity-completed {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.wireframe-activity-instructions,
.wireframe-activity-tools {
  margin: 20px 0;
  padding: 16px;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
}

.wireframe-activity-instructions h4,
.wireframe-activity-tools h4 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.wireframe-activity-instructions p {
  margin: 0;
  line-height: 1.6;
  color: #333;
}

.wireframe-tool-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wireframe-tool-item {
  padding: 8px 12px;
  border: 2px solid #333;
  border-radius: 4px;
  background: #f8f8f8;
  font-size: 14px;
  color: #333;
}

.wireframe-quiz-content {
  max-width: 600px;
}

.wireframe-quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  border: 2px solid #333;
  border-radius: 4px;
  background: #f8f8f8;
}

.wireframe-quiz-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.wireframe-quiz-progress {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  padding: 6px 12px;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
}

.wireframe-quiz-question {
  padding: 20px;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
}

.wireframe-quiz-question h4 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.wireframe-quiz-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wireframe-quiz-option {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  gap: 12px;
}

.wireframe-quiz-option:hover {
  background: #f0f0f0;
}

.wireframe-quiz-option input[type="radio"] {
  margin: 0;
  width: 16px;
  height: 16px;
}

.wireframe-section-navigation {
  padding: 20px 24px;
  border-top: 2px solid #333;
  background: white;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.wireframe-section-button {
  padding: 12px 24px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  color: #333;
}

.wireframe-section-button:hover:not(:disabled) {
  background: #f0f0f0;
}

.wireframe-section-button:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
  border-color: #ccc;
}

.wireframe-section-next {
  background: #333;
  color: white;
}

.wireframe-section-next:hover:not(:disabled) {
  background: #666;
}

/* Global styles to ensure full screen overlay */
:global(.v-application) {
  overflow: hidden !important;
}

:global(.v-main) {
  overflow: hidden !important;
}
</style>