<template>
  <div class="wireframe-program-detail">
    <div class="wireframe-header">
      <div class="wireframe-title">{{ program.title }}</div>
      <div class="wireframe-subtitle">{{ program.description }}</div>
    </div>

    
    <div class="wireframe-content">
      <!-- Program Overview -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Program Overview</div>
          <div class="wireframe-program-status-badge" :class="program.status">
            {{ getStatusText(program.status) }}
          </div>
        </div>
        
        <div class="wireframe-overview-grid">
          <div class="wireframe-overview-item">
            <div class="wireframe-overview-label">Progress</div>
            <div class="wireframe-progress-container">
              <div class="wireframe-progress-bar">
                <div class="wireframe-progress-fill" :style="{ width: program.progress + '%' }"></div>
              </div>
              <div class="wireframe-progress-text">{{ program.progress }}% Complete</div>
            </div>
          </div>
          
          <div class="wireframe-overview-item">
            <div class="wireframe-overview-label">Duration</div>
            <div class="wireframe-overview-value">{{ program.duration }}</div>
          </div>
          
          <div class="wireframe-overview-item">
            <div class="wireframe-overview-label">Next Session</div>
            <div class="wireframe-overview-value">{{ program.nextSession }}</div>
          </div>
          
          <div class="wireframe-overview-item">
            <div class="wireframe-overview-label">Care Organization</div>
            <div class="wireframe-overview-value">{{ program.careOrganization }}</div>
          </div>
        </div>
      </div>

      <!-- Program Modules -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Program Modules</div>
        </div>
        
        <div class="wireframe-modules-list">
          <div 
            v-for="(module, index) in program.modules" 
            :key="index"
            class="wireframe-module-item"
            :class="{ 
              'wireframe-module-completed': module.completed, 
              'wireframe-module-current': module.current
            }"
            @click="selectModule(module)"
          >
            <div class="wireframe-module-icon">
              <div v-if="module.completed" class="wireframe-checkmark">✓</div>
              <div v-else-if="module.current" class="wireframe-current">→</div>
              <div v-else class="wireframe-pending">○</div>
            </div>
            <div class="wireframe-module-content">
              <div class="wireframe-module-title">{{ module.title }}</div>
              <div class="wireframe-module-description">{{ module.description }}</div>
              <div class="wireframe-module-duration">{{ module.duration }}</div>
              <div class="wireframe-module-progress">
                <div class="wireframe-progress-track">
                  <div 
                    class="wireframe-progress-fill" 
                    :style="{ width: getModuleProgress(module) + '%' }"
                    :class="getModuleStatus(module)"
                  ></div>
                </div>
                <div class="wireframe-progress-text">{{ getModuleProgress(module) }}%</div>
              </div>
            </div>
            <div class="wireframe-module-actions">
              <div v-if="module.completed" class="wireframe-button wireframe-button-small wireframe-button-secondary">Review</div>
              <div v-else-if="module.current" class="wireframe-button wireframe-button-small">Continue</div>
              <div v-else class="wireframe-button wireframe-button-small">Start</div>
            </div>
          </div>
        </div>

      </div>

      <!-- Program Resources -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Resources & Materials</div>
        </div>
        
        <div class="wireframe-resources-grid">
          <div class="wireframe-resource-card" v-for="(resource, index) in program.resources" :key="index">
            <div class="wireframe-resource-icon"></div>
            <div class="wireframe-resource-content">
              <div class="wireframe-resource-title">{{ resource.title }}</div>
              <div class="wireframe-resource-type">{{ resource.type }}</div>
              <div class="wireframe-resource-description">{{ resource.description }}</div>
            </div>
            <div class="wireframe-resource-actions">
              <div class="wireframe-button wireframe-button-small">Download</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Program Actions -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Actions</div>
        </div>
        
        <div class="wireframe-actions-grid">
          <div class="wireframe-button wireframe-button-primary" v-if="program.status === 'not-started'">Start Program</div>
          <div class="wireframe-button wireframe-button-primary" v-else-if="program.status === 'active'">Continue Program</div>
          <div class="wireframe-button wireframe-button-secondary">View Progress Report</div>
          <div class="wireframe-button wireframe-button-secondary">Contact Care Provider</div>
          <div class="wireframe-button wireframe-button-secondary">Program Settings</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const selectedModule = ref(null)

// Get program data based on route parameter
const programId = computed(() => route.params.id)

const program = computed(() => {
  // This would normally fetch from an API or store
  // For now, return mock data based on programId
  const programs = {
    'cognitive-behavioral-therapy': {
      title: 'Cognitive Behavioral Therapy',
      description: '8-week program focusing on thought patterns and behavior modification',
      progress: 65,
      duration: '8 weeks',
      nextSession: 'Tomorrow 2:00 PM',
      status: 'active',
      careOrganization: 'Mental Health Center Amsterdam',
      organizationType: 'Specialized Clinic',
      modules: [
        {
          title: 'Introduction to CBT',
          description: 'Understanding the basics of cognitive behavioral therapy and the CBT model',
          fullDescription: 'This foundational module introduces you to the core principles of Cognitive Behavioral Therapy. You\'ll learn about the CBT triangle (thoughts, feelings, behaviors), understand how they interact, and begin to identify your own patterns. The module includes interactive exercises to help you recognize automatic thoughts and understand the connection between your thinking and emotional responses.',
          duration: '45 min',
          completed: true,
          current: false,
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
          ]
        },
        {
          title: 'Identifying Negative Thoughts',
          description: 'Learning to recognize and challenge negative thought patterns',
          fullDescription: 'This module focuses on developing your ability to identify negative thought patterns and cognitive distortions. You\'ll learn about common thinking errors like all-or-nothing thinking, catastrophizing, and mind reading. Through practical exercises, you\'ll start to recognize these patterns in your own thinking and understand their impact on your mood and behavior.',
          duration: '60 min',
          completed: true,
          current: false,
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
          ]
        },
        {
          title: 'Thought Challenging Techniques',
          description: 'Practical exercises for challenging unhelpful thoughts',
          fullDescription: 'This module teaches you evidence-based techniques for challenging and restructuring negative thoughts. You\'ll learn to ask yourself key questions like "What evidence do I have for this thought?" and "What would I tell a friend in this situation?" Through guided exercises, you\'ll practice developing more balanced and realistic perspectives.',
          duration: '50 min',
          completed: false,
          current: true,
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
          ]
        },
        {
          title: 'Behavioral Experiments',
          description: 'Testing new behaviors and thought patterns in real situations',
          fullDescription: 'This module helps you test your thoughts and beliefs through behavioral experiments. You\'ll learn to design small experiments to challenge your assumptions and gather evidence about your thoughts. This hands-on approach helps you build confidence in new ways of thinking and behaving.',
          duration: '55 min',
          completed: false,
          current: false,
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
          ]
        },
        {
          title: 'Relapse Prevention',
          description: 'Strategies for maintaining progress and preventing setbacks',
          fullDescription: 'This final module focuses on maintaining the skills you\'ve learned and preventing relapse. You\'ll develop a personalized maintenance plan, learn to recognize early warning signs, and create strategies for dealing with setbacks. The goal is to ensure long-term success and continued growth.',
          duration: '40 min',
          completed: false,
          current: false,
          objectives: [
            'Develop maintenance strategies',
            'Create relapse prevention plan',
            'Identify early warning signs',
            'Build long-term coping skills'
          ],
          activities: [
            { title: 'Maintenance Plan Creation', duration: '20 min', completed: false },
            { title: 'Warning Signs Identification', duration: '10 min', completed: false },
            { title: 'Coping Strategy Development', duration: '10 min', completed: false }
          ]
        }
      ],
      resources: [
        {
          title: 'CBT Workbook',
          type: 'PDF',
          description: 'Complete workbook with exercises and worksheets'
        },
        {
          title: 'Thought Record Template',
          type: 'PDF',
          description: 'Template for recording and analyzing thoughts'
        },
        {
          title: 'Relaxation Techniques Guide',
          type: 'PDF',
          description: 'Step-by-step guide to relaxation exercises'
        }
      ]
    },
    'mindfulness--stress-reduction': {
      title: 'Mindfulness & Stress Reduction',
      description: '6-week mindfulness-based stress reduction program',
      progress: 0,
      duration: '6 weeks',
      nextSession: 'Start anytime',
      status: 'not-started',
      careOrganization: 'Mental Health Center Amsterdam',
      organizationType: 'Specialized Clinic',
      modules: [
        {
          id: 'introduction-to-mindfulness',
          title: 'Introduction to Mindfulness',
          description: 'Understanding mindfulness and its benefits',
          duration: '30 min',
          completed: false,
          current: false
        },
        {
          id: 'body-scan-meditation',
          title: 'Body Scan Meditation',
          description: 'Learning the body scan technique for relaxation',
          duration: '45 min',
          completed: false,
          current: false
        },
        {
          id: 'breathing-exercises',
          title: 'Breathing Exercises',
          description: 'Various breathing techniques for stress reduction',
          duration: '35 min',
          completed: false,
          current: false
        },
        {
          id: 'mindful-movement',
          title: 'Mindful Movement',
          description: 'Gentle yoga and movement practices',
          duration: '40 min',
          completed: false,
          current: false
        }
      ],
      resources: [
        {
          title: 'Mindfulness Guide',
          type: 'PDF',
          description: 'Comprehensive guide to mindfulness practices'
        },
        {
          title: 'Meditation Audio Files',
          type: 'Audio',
          description: 'Guided meditation recordings'
        }
      ]
    },
    'anxiety-management': {
      title: 'Anxiety Management',
      description: '10-week comprehensive anxiety management program',
      progress: 0,
      duration: '10 weeks',
      nextSession: 'Start anytime',
      status: 'not-started',
      careOrganization: 'Mental Health Center Amsterdam',
      organizationType: 'Specialized Clinic',
      modules: [
        {
          id: 'understanding-anxiety',
          title: 'Understanding Anxiety',
          description: 'Learn about anxiety, its causes, and how it affects your body and mind',
          duration: '30 min',
          completed: false,
          current: false
        },
        {
          id: 'breathing-techniques',
          title: 'Breathing Techniques',
          description: 'Learn effective breathing exercises to manage anxiety',
          duration: '25 min',
          completed: false,
          current: false
        },
        {
          id: 'cognitive-restructuring',
          title: 'Cognitive Restructuring',
          description: 'Challenge and change anxious thought patterns',
          duration: '40 min',
          completed: false,
          current: false
        }
      ],
      resources: [
        {
          title: 'Anxiety Management Guide',
          type: 'PDF',
          description: 'Comprehensive guide to managing anxiety'
        },
        {
          title: 'Breathing Exercise Audio',
          type: 'Audio',
          description: 'Guided breathing exercises'
        }
      ]
    },
    'trauma-recovery-program': {
      title: 'Trauma Recovery Program',
      description: '12-week evidence-based trauma therapy using EMDR and CBT techniques',
      progress: 0,
      duration: '12 weeks',
      nextSession: 'Start anytime',
      status: 'not-started',
      careOrganization: 'Mental Health Center Amsterdam',
      organizationType: 'Specialized Clinic',
      modules: [
        {
          id: 'understanding-trauma',
          title: 'Understanding Trauma',
          description: 'Learn about trauma, its effects, and the healing process',
          duration: '35 min',
          completed: false,
          current: false
        },
        {
          id: 'grounding-techniques',
          title: 'Grounding Techniques',
          description: 'Learn grounding exercises to manage trauma responses',
          duration: '30 min',
          completed: false,
          current: false
        },
        {
          id: 'processing-trauma',
          title: 'Processing Trauma',
          description: 'Safe techniques for processing traumatic experiences',
          duration: '45 min',
          completed: false,
          current: false
        }
      ],
      resources: [
        {
          title: 'Trauma Recovery Guide',
          type: 'PDF',
          description: 'Comprehensive trauma recovery resources'
        },
        {
          title: 'Grounding Exercise Audio',
          type: 'Audio',
          description: 'Guided grounding exercises'
        }
      ]
    },
    'depression-treatment-program': {
      title: 'Depression Treatment Program',
      description: '8-week cognitive behavioral therapy program for depression management',
      progress: 0,
      duration: '8 weeks',
      nextSession: 'Start anytime',
      status: 'not-started',
      careOrganization: 'Mental Health Center Amsterdam',
      organizationType: 'Specialized Clinic',
      modules: [
        {
          id: 'understanding-depression',
          title: 'Understanding Depression',
          description: 'Learn about depression, its symptoms, and treatment approaches',
          duration: '30 min',
          completed: false,
          current: false
        },
        {
          id: 'behavioral-activation',
          title: 'Behavioral Activation',
          description: 'Increase positive activities to improve mood',
          duration: '35 min',
          completed: false,
          current: false
        },
        {
          id: 'cognitive-therapy',
          title: 'Cognitive Therapy',
          description: 'Challenge negative thought patterns',
          duration: '40 min',
          completed: false,
          current: false
        }
      ],
      resources: [
        {
          title: 'Depression Treatment Guide',
          type: 'PDF',
          description: 'Comprehensive depression treatment resources'
        },
        {
          title: 'Mood Tracking Worksheet',
          type: 'PDF',
          description: 'Daily mood tracking template'
        }
      ]
    },
    'social-skills-training': {
      title: 'Social Skills Training',
      description: '6-week group therapy program for improving social interactions and communication',
      progress: 0,
      duration: '6 weeks',
      nextSession: 'Start anytime',
      status: 'not-started',
      careOrganization: 'Mental Health Center Amsterdam',
      organizationType: 'Specialized Clinic',
      modules: [
        {
          id: 'introduction-to-social-skills',
          title: 'Introduction to Social Skills',
          description: 'Learn the fundamentals of effective social interaction',
          duration: '25 min',
          completed: false,
          current: false
        },
        {
          id: 'active-listening',
          title: 'Active Listening',
          description: 'Develop better listening and communication skills',
          duration: '30 min',
          completed: false,
          current: false
        },
        {
          id: 'assertiveness-training',
          title: 'Assertiveness Training',
          description: 'Learn to express yourself confidently and respectfully',
          duration: '35 min',
          completed: false,
          current: false
        }
      ],
      resources: [
        {
          title: 'Social Skills Guide',
          type: 'PDF',
          description: 'Comprehensive social skills development guide'
        },
        {
          title: 'Communication Practice Exercises',
          type: 'PDF',
          description: 'Practice exercises for social interactions'
        }
      ]
    },
    'anger-management-program': {
      title: 'Anger Management Program',
      description: '8-week program focusing on emotional regulation and conflict resolution skills',
      progress: 0,
      duration: '8 weeks',
      nextSession: 'Start anytime',
      status: 'not-started',
      careOrganization: 'Mental Health Center Amsterdam',
      organizationType: 'Specialized Clinic',
      modules: [
        {
          id: 'understanding-anger',
          title: 'Understanding Anger',
          description: 'Learn about anger, its triggers, and healthy management strategies',
          duration: '30 min',
          completed: false,
          current: false
        },
        {
          id: 'anger-triggers',
          title: 'Anger Triggers',
          description: 'Identify personal anger triggers and warning signs',
          duration: '25 min',
          completed: false,
          current: false
        },
        {
          id: 'relaxation-techniques',
          title: 'Relaxation Techniques',
          description: 'Learn calming strategies for managing anger',
          duration: '35 min',
          completed: false,
          current: false
        }
      ],
      resources: [
        {
          title: 'Anger Management Guide',
          type: 'PDF',
          description: 'Comprehensive anger management resources'
        },
        {
          title: 'Relaxation Exercise Audio',
          type: 'Audio',
          description: 'Guided relaxation exercises'
        }
      ]
    }
  }
  
  return programs[programId.value] || programs['cognitive-behavioral-therapy']
})

const getStatusText = (status) => {
  switch (status) {
    case 'active': return 'In Progress'
    case 'not-started': return 'Not Started'
    case 'completed': return 'Completed'
    default: return status
  }
}

const selectModule = (module) => {
  // Navigate to individual module page based on program and module
  const programSlug = programId.value
  const moduleSlug = module.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')
  
  // Map program and module combinations to specific routes
  const moduleRoutes = {
    'cognitive-behavioral-therapy': {
      'introduction-to-cbt': '/program/cognitive-behavioral-therapy/module/introduction-to-cbt',
      'identifying-negative-thoughts': '/program/cognitive-behavioral-therapy/module/identifying-negative-thoughts'
    },
    'mindfulness--stress-reduction': {
      'introduction-to-mindfulness': '/program/mindfulness--stress-reduction/module/introduction-to-mindfulness',
      'body-scan-meditation': '/program/mindfulness--stress-reduction/module/body-scan-meditation',
      'breathing-exercises': '/program/mindfulness--stress-reduction/module/breathing-exercises',
      'mindful-movement': '/program/mindfulness--stress-reduction/module/mindful-movement'
    },
    'anxiety-management': {
      'understanding-anxiety': '/program/anxiety-management/module/understanding-anxiety'
    },
    'trauma-recovery-program': {
      'understanding-trauma': '/program/trauma-recovery-program/module/understanding-trauma'
    },
    'depression-treatment-program': {
      'understanding-depression': '/program/depression-treatment-program/module/understanding-depression'
    },
    'social-skills-training': {
      'introduction-to-social-skills': '/program/social-skills-training/module/introduction-to-social-skills'
    },
    'anger-management-program': {
      'understanding-anger': '/program/anger-management-program/module/understanding-anger'
    }
  }
  
  const route = moduleRoutes[programSlug]?.[moduleSlug]
  if (route) {
    router.push(route)
  } else {
    console.log(`No specific route found for ${programSlug}/${moduleSlug}`)
    // Fallback to generic route
    router.push(`/program/${programId.value}/module/${moduleSlug}`)
  }
}

const getModuleProgress = (module) => {
  if (module.completed) return 100
  if (module.current) {
    const completedActivities = module.activities.filter(activity => activity.completed).length
    return Math.round((completedActivities / module.activities.length) * 100)
  }
  return 0
}

const getModuleStatus = (module) => {
  if (module.completed) return 'completed'
  if (module.current) return 'active'
  return 'not-started'
}

</script>

<style scoped>
/* Wireframe Program Detail Styles */
.wireframe-program-detail {
  padding: 24px;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
}

.wireframe-header {
  margin-bottom: 32px;
  border: 2px solid #333;
  padding: 20px;
  border-radius: 4px;
  background: white;
  color: #333;
}

.wireframe-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.wireframe-subtitle {
  color: #666;
  font-size: 16px;
}


.wireframe-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.wireframe-section {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 24px;
}

.wireframe-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #333;
}

.wireframe-section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.wireframe-program-status-badge {
  padding: 6px 12px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.wireframe-program-status-badge.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.wireframe-program-status-badge.not-started {
  background: #9E9E9E;
  color: white;
  border-color: #9E9E9E;
}

.wireframe-program-status-badge.completed {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}

.wireframe-overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.wireframe-overview-item {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 16px;
}

.wireframe-overview-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 600;
}

.wireframe-overview-value {
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.wireframe-progress-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wireframe-progress-bar {
  width: 100%;
  height: 8px;
  border: 2px solid #333;
  border-radius: 4px;
  overflow: hidden;
}

.wireframe-progress-fill {
  height: 100%;
  background: #333;
  transition: width 0.3s ease;
}

.wireframe-progress-text {
  font-size: 12px;
  color: #666;
  text-align: right;
}

.wireframe-modules-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wireframe-module-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 2px solid #333;
  border-radius: 4px;
  gap: 16px;
}

.wireframe-module-item.wireframe-module-completed {
  background: #f0f8f0;
  border-color: #4CAF50;
}

.wireframe-module-item.wireframe-module-current {
  background: #fff8e1;
  border-color: #FF9800;
}

.wireframe-module-icon {
  width: 24px;
  height: 24px;
  border: 2px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: 600;
}

.wireframe-module-completed .wireframe-module-icon {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.wireframe-module-current .wireframe-module-icon {
  background: #FF9800;
  color: white;
  border-color: #FF9800;
}

.wireframe-module-content {
  flex: 1;
}

.wireframe-module-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.wireframe-module-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.wireframe-module-duration {
  font-size: 12px;
  color: #999;
}

.wireframe-module-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.wireframe-progress-track {
  flex: 1;
  height: 4px;
  border: 1px solid #333;
  border-radius: 2px;
  overflow: hidden;
  background: #f0f0f0;
}

.wireframe-progress-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.wireframe-progress-fill.active {
  background: #4CAF50;
}

.wireframe-progress-fill.not-started {
  background: #9E9E9E;
}

.wireframe-progress-fill.completed {
  background: #2196F3;
}

.wireframe-progress-text {
  font-size: 11px;
  font-weight: 600;
  color: #333;
  min-width: 30px;
  text-align: right;
}

.wireframe-module-detail {
  margin-top: 20px;
  border: 2px solid #333;
  border-radius: 4px;
  padding: 20px;
  background: #f8f8f8;
}

.wireframe-module-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #333;
}

.wireframe-module-detail-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.wireframe-module-close {
  width: 24px;
  height: 24px;
  border: 2px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
}

.wireframe-module-close:hover {
  background: #e0e0e0;
}

.wireframe-module-detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.wireframe-module-description-full {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 20px;
}

.wireframe-module-objectives h4 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.wireframe-module-objectives ul {
  list-style: none;
  padding: 0;
}

.wireframe-module-objectives li {
  padding: 4px 0;
  padding-left: 16px;
  position: relative;
  color: #333;
}

.wireframe-module-objectives li:before {
  content: '•';
  position: absolute;
  left: 0;
  color: #333;
  font-weight: 600;
}

.wireframe-module-activities h4 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.wireframe-activities-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wireframe-activity-item {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 12px;
}

/* Mobile: vertical positioning for activity items */
@media (max-width: 767px) {
  .wireframe-activity-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: 8px;
  }
}

.wireframe-activity-item.wireframe-activity-completed {
  border-color: #4CAF50;
  background: #f0f8f0;
}

.wireframe-activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.wireframe-activity-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.wireframe-activity-duration {
  font-size: 12px;
  color: #666;
}

.wireframe-activity-status {
  font-size: 12px;
  font-weight: 600;
  color: #666;
}

.wireframe-activity-status.wireframe-activity-done {
  color: #4CAF50;
}

.wireframe-resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.wireframe-resource-card {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 2px solid #333;
  border-radius: 4px;
  gap: 16px;
}

.wireframe-resource-icon {
  width: 32px;
  height: 32px;
  border: 2px solid #333;
  border-radius: 4px;
  flex-shrink: 0;
}

.wireframe-resource-content {
  flex: 1;
}

.wireframe-resource-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.wireframe-resource-type {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.wireframe-resource-description {
  font-size: 14px;
  color: #666;
}

.wireframe-actions-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.wireframe-button {
  padding: 8px 16px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  color: #333;
  background: white;
  transition: all 0.2s;
}

.wireframe-button:hover {
  border-color: #666;
  border-width: 2px;
}

.wireframe-button-primary {
  background: #f0f0f0;
  color: #333;
  border-color: #666;
}

.wireframe-button-primary:hover {
  background: #e0e0e0;
  border-color: #333;
}

.wireframe-button-secondary {
  background: white;
  color: #333;
}

.wireframe-button-small {
  padding: 6px 12px;
  font-size: 12px;
}

.wireframe-button-disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
  border-color: #ccc;
}

/* Responsive */
@media (max-width: 768px) {
  .wireframe-overview-grid,
  .wireframe-resources-grid {
    grid-template-columns: 1fr;
  }
  
  .wireframe-actions-grid {
    flex-direction: column;
  }
  
  .wireframe-module-detail-content {
    grid-template-columns: 1fr;
  }
}
</style>
