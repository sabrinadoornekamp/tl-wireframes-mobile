<template>
  <div class="wireframe-all-assignments">
    <div class="wireframe-header">
      <div class="wireframe-title">All Assignments</div>
      <div class="wireframe-subtitle">Manage your therapy programs and assessment questionnaires</div>
    </div>
    
    <div class="wireframe-content">
      <!-- Progress Overview Section -->
      <div class="wireframe-section wireframe-progress-overview">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Your Progress Overview</div>
        </div>
        <div class="wireframe-progress-stats">
          <div class="wireframe-stat-card">
            <div class="wireframe-stat-number">{{ overallProgress }}%</div>
            <div class="wireframe-stat-label">Overall Progress</div>
            <div class="wireframe-stat-description">Across all active programs</div>
          </div>
          <div class="wireframe-stat-card">
            <div class="wireframe-stat-number">{{ completedPrograms }}</div>
            <div class="wireframe-stat-label">Programs Completed</div>
            <div class="wireframe-stat-description">Out of {{ totalPrograms }} total</div>
          </div>
          <div class="wireframe-stat-card">
            <div class="wireframe-stat-number">{{ upcomingDeadlines }}</div>
            <div class="wireframe-stat-label">Upcoming Deadlines</div>
            <div class="wireframe-stat-description">This week</div>
          </div>
          <div class="wireframe-stat-card">
            <div class="wireframe-stat-number">{{ streakDays }}</div>
            <div class="wireframe-stat-label">Day Streak</div>
            <div class="wireframe-stat-description">Keep it up!</div>
          </div>
        </div>
      </div>

      <!-- Programs Section -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Active Programs</div>
          <div class="wireframe-button wireframe-button-primary">+ Add Program</div>
        </div>
        
        <div class="wireframe-programs-grid">
          <div class="wireframe-program-card" v-for="(program, index) in programs" :key="index" @click="navigateToLastModule(program)">
            <div class="wireframe-program-header">
              <div class="wireframe-program-icon"></div>
              <div class="wireframe-program-status" :class="program.status"></div>
            </div>
            <div class="wireframe-program-organization">
              <div class="wireframe-org-name">{{ program.careOrganization }}</div>
              <div class="wireframe-org-type">{{ program.organizationType }}</div>
            </div>
            <div class="wireframe-program-content">
              <div class="wireframe-program-title">{{ program.title }}</div>
              <div class="wireframe-program-description">{{ program.description }}</div>
              
              <!-- Progress Section -->
              <div class="wireframe-program-progress">
                <div class="wireframe-progress-header">
                  <div class="wireframe-progress-text">{{ program.progress }}% Complete</div>
                  <div class="wireframe-progress-motivation" v-if="program.progress > 0">
                    {{ getProgressMotivation(program.progress) }}
                  </div>
                </div>
                <div class="wireframe-progress-bar">
                  <div class="wireframe-progress-fill" :style="{ width: program.progress + '%' }"></div>
                </div>
              </div>

              <!-- Deadline Warning -->
              <div v-if="program.deadline && isDeadlineApproaching(program.deadline)" class="wireframe-deadline-warning">
                <div class="wireframe-deadline-icon">⚠️</div>
                <div class="wireframe-deadline-text">
                  <div class="wireframe-deadline-label">Deadline Approaching</div>
                  <div class="wireframe-deadline-date">Due: {{ formatDeadline(program.deadline) }}</div>
                </div>
              </div>

              <!-- Motivational Message -->
              <div v-if="program.status === 'not-started'" class="wireframe-motivation-message">
                <div class="wireframe-motivation-icon">🚀</div>
                <div class="wireframe-motivation-text">
                  <div class="wireframe-motivation-title">Ready to Start?</div>
                  <div class="wireframe-motivation-description">{{ program.motivationMessage }}</div>
                </div>
              </div>

              <div class="wireframe-program-meta">
                <div class="wireframe-meta-item">
                  <div class="wireframe-meta-label">Duration</div>
                  <div class="wireframe-meta-value">{{ program.duration }}</div>
                </div>
                <div class="wireframe-meta-item">
                  <div class="wireframe-meta-label">Next Session</div>
                  <div class="wireframe-meta-value">{{ program.nextSession }}</div>
                </div>
                <div v-if="program.deadline" class="wireframe-meta-item">
                  <div class="wireframe-meta-label">Deadline</div>
                  <div class="wireframe-meta-value" :class="{ 'wireframe-deadline-urgent': isDeadlineUrgent(program.deadline) }">
                    {{ formatDeadline(program.deadline) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="wireframe-program-actions">
              <div class="wireframe-button wireframe-button-small" v-if="program.status === 'not-started'">Start</div>
              <div class="wireframe-button wireframe-button-small" v-else-if="program.status === 'active'">Continue</div>
              <div class="wireframe-button wireframe-button-small" v-else>View Results</div>
              <div class="wireframe-button wireframe-button-small wireframe-button-secondary" @click="viewProgramDetail(program)">View Details</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Questionnaires Section -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Available Questionnaires</div>
          <div class="wireframe-button wireframe-button-primary">+ Add Questionnaire</div>
        </div>
        
        <div class="wireframe-questionnaires-grid">
          <div class="wireframe-questionnaire-card" v-for="(questionnaire, index) in questionnaires" :key="index" @click="startQuestionnaire(questionnaire)">
            <div class="wireframe-questionnaire-header">
              <div class="wireframe-questionnaire-icon">📝</div>
              <div class="wireframe-questionnaire-status" :class="questionnaire.status"></div>
            </div>
            <div class="wireframe-questionnaire-content">
              <div class="wireframe-questionnaire-title">{{ questionnaire.title }}</div>
              <div class="wireframe-questionnaire-description">{{ questionnaire.description }}</div>
              
              <!-- Deadline Warning for Questionnaires -->
              <div v-if="questionnaire.deadline && isDeadlineApproaching(questionnaire.deadline)" class="wireframe-deadline-warning">
                <div class="wireframe-deadline-icon">⚠️</div>
                <div class="wireframe-deadline-text">
                  <div class="wireframe-deadline-label">Deadline Approaching</div>
                  <div class="wireframe-deadline-date">Due: {{ formatDeadline(questionnaire.deadline) }}</div>
                </div>
              </div>

              <!-- Motivational Message for Questionnaires -->
              <div v-if="questionnaire.status === 'available'" class="wireframe-motivation-message">
                <div class="wireframe-motivation-icon">📊</div>
                <div class="wireframe-motivation-text">
                  <div class="wireframe-motivation-title">Assessment Ready</div>
                  <div class="wireframe-motivation-description">{{ questionnaire.motivationMessage }}</div>
                </div>
              </div>

              <div class="wireframe-questionnaire-meta">
                <div class="wireframe-meta-item">
                  <div class="wireframe-meta-label">Type</div>
                  <div class="wireframe-meta-value">{{ questionnaire.type }}</div>
                </div>
                <div class="wireframe-meta-item">
                  <div class="wireframe-meta-label">Duration</div>
                  <div class="wireframe-meta-value">{{ questionnaire.duration }}</div>
                </div>
                <div class="wireframe-meta-item">
                  <div class="wireframe-meta-label">Last Taken</div>
                  <div class="wireframe-meta-value">{{ questionnaire.lastTaken }}</div>
                </div>
                <div v-if="questionnaire.deadline" class="wireframe-meta-item">
                  <div class="wireframe-meta-label">Deadline</div>
                  <div class="wireframe-meta-value" :class="{ 'wireframe-deadline-urgent': isDeadlineUrgent(questionnaire.deadline) }">
                    {{ formatDeadline(questionnaire.deadline) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="wireframe-questionnaire-actions">
              <div class="wireframe-button wireframe-button-small" v-if="questionnaire.status === 'available'">Take Now</div>
              <div class="wireframe-button wireframe-button-small" v-else-if="questionnaire.status === 'completed'">Retake</div>
              <div class="wireframe-button wireframe-button-small" v-else>View Results</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Progress overview data
const overallProgress = ref(11) // 65% of 1 program out of 6 total
const completedPrograms = ref(0)
const totalPrograms = ref(6)
const upcomingDeadlines = ref(2)
const streakDays = ref(7)

// Mock data for programs
const programs = ref([
  {
    title: 'Cognitive Behavioral Therapy',
    description: 'A structured program to help you identify and change negative thought patterns',
    progress: 65,
    status: 'active',
    careOrganization: 'Mental Health Center Amsterdam',
    organizationType: 'Mental Health Clinic',
    duration: '12 weeks',
    nextSession: 'Tomorrow, 2:00 PM',
    lastModule: 'thought-challenging-techniques',
    deadline: '2024-02-15',
    motivationMessage: 'You\'re making great progress! Keep up the momentum with your CBT journey.'
  },
  {
    title: 'Mindfulness & Stress Reduction',
    description: 'Learn mindfulness techniques to reduce stress and improve well-being',
    progress: 0,
    status: 'not-started',
    careOrganization: 'Mental Health Center Amsterdam',
    organizationType: 'Mental Health Clinic',
    duration: '8 weeks',
    nextSession: 'Not scheduled',
    lastModule: 'introduction-to-mindfulness',
    deadline: '2024-01-31',
    motivationMessage: 'Start your mindfulness journey today and discover the power of present-moment awareness.'
  },
  {
    title: 'Trauma Recovery Program',
    description: 'Specialized program for processing and healing from traumatic experiences',
    progress: 0,
    status: 'not-started',
    careOrganization: 'Mental Health Center Amsterdam',
    organizationType: 'Mental Health Clinic',
    duration: '16 weeks',
    nextSession: 'Not scheduled',
    lastModule: 'understanding-trauma',
    motivationMessage: 'Take the first step towards healing. This program is designed to support your recovery journey.'
  },
  {
    title: 'Depression Treatment Program',
    description: 'Comprehensive approach to managing depression symptoms and building resilience',
    progress: 0,
    status: 'not-started',
    careOrganization: 'Mental Health Center Amsterdam',
    organizationType: 'Mental Health Clinic',
    duration: '10 weeks',
    nextSession: 'Not scheduled',
    lastModule: 'understanding-depression',
    deadline: '2024-02-28',
    motivationMessage: 'You\'re not alone in this journey. This program can help you build the tools you need.'
  },
  {
    title: 'Social Skills Training',
    description: 'Develop interpersonal skills and confidence in social situations',
    progress: 0,
    status: 'not-started',
    careOrganization: 'Mental Health Center Amsterdam',
    organizationType: 'Mental Health Clinic',
    duration: '6 weeks',
    nextSession: 'Not scheduled',
    lastModule: 'introduction-to-social-skills',
    motivationMessage: 'Build confidence in social situations with proven techniques and practice exercises.'
  },
  {
    title: 'Anger Management Program',
    description: 'Learn healthy ways to manage and express anger constructively',
    progress: 0,
    status: 'not-started',
    careOrganization: 'Mental Health Center Amsterdam',
    organizationType: 'Mental Health Clinic',
    duration: '8 weeks',
    nextSession: 'Not scheduled',
    lastModule: 'understanding-anger',
    deadline: '2024-02-10',
    motivationMessage: 'Learn to channel your emotions constructively and build healthier relationships.'
  }
])

// Mock data for questionnaires
const questionnaires = ref([
  {
    title: 'PHQ-9 Depression Screening',
    description: 'A 9-item questionnaire to assess depression severity',
    type: 'Depression Assessment',
    duration: '5-10 minutes',
    lastTaken: 'Never',
    status: 'available',
    deadline: '2024-01-25',
    motivationMessage: 'Help us understand your current state so we can provide the best support.'
  },
  {
    title: 'GAD-7 Anxiety Assessment',
    description: '7-item scale to measure anxiety symptoms',
    type: 'Anxiety Assessment',
    duration: '3-5 minutes',
    lastTaken: '2 weeks ago',
    status: 'completed'
  },
  {
    title: 'PTSD Checklist (PCL-5)',
    description: '20-item self-report measure for PTSD symptoms',
    type: 'Trauma Assessment',
    duration: '10-15 minutes',
    lastTaken: 'Never',
    status: 'available',
    deadline: '2024-02-05',
    motivationMessage: 'Your honest responses help us tailor your treatment plan effectively.'
  },
  {
    title: 'Social Anxiety Scale',
    description: 'Assessment of social anxiety and avoidance behaviors',
    type: 'Social Assessment',
    duration: '5-8 minutes',
    lastTaken: '1 month ago',
    status: 'completed'
  },
  {
    title: 'Weekly Mood Check-in',
    description: 'Quick assessment of your emotional state this week',
    type: 'Weekly Assessment',
    duration: '2-3 minutes',
    lastTaken: '3 days ago',
    status: 'available',
    deadline: '2024-01-28',
    motivationMessage: 'Regular check-ins help track your progress and identify patterns.'
  }
])

// Navigation functions
const navigateToLastModule = (program) => {
  const programRouteMap = {
    'Cognitive Behavioral Therapy': 'cognitive-behavioral-therapy',
    'Mindfulness & Stress Reduction': 'mindfulness--stress-reduction',
    'Trauma Recovery Program': 'trauma-recovery-program',
    'Depression Treatment Program': 'depression-treatment-program',
    'Social Skills Training': 'social-skills-training',
    'Anger Management Program': 'anger-management-program'
  }
  
  const programId = programRouteMap[program.title] || program.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')
  router.push(`/program/${programId}/module/${program.lastModule}`)
}

const viewProgramDetail = (program) => {
  const programRouteMap = {
    'Cognitive Behavioral Therapy': 'cognitive-behavioral-therapy',
    'Mindfulness & Stress Reduction': 'mindfulness--stress-reduction',
    'Trauma Recovery Program': 'trauma-recovery-program',
    'Depression Treatment Program': 'depression-treatment-program',
    'Social Skills Training': 'social-skills-training',
    'Anger Management Program': 'anger-management-program'
  }
  
  const programId = programRouteMap[program.title] || program.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')
  router.push(`/program/${programId}`)
}

const startQuestionnaire = (questionnaire) => {
  console.log('Starting questionnaire:', questionnaire.title)
  // Navigate to questionnaire detail page
  router.push(`/questionnaire/${questionnaire.title.toLowerCase().replace(/\s+/g, '-')}`)
}

// Utility functions for deadlines and progress
const formatDeadline = (deadline) => {
  const date = new Date(deadline)
  const now = new Date()
  const diffTime = date - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) {
    return 'Overdue'
  } else if (diffDays === 0) {
    return 'Today'
  } else if (diffDays === 1) {
    return 'Tomorrow'
  } else if (diffDays <= 7) {
    return `In ${diffDays} days`
  } else {
    return date.toLocaleDateString()
  }
}

const isDeadlineApproaching = (deadline) => {
  const date = new Date(deadline)
  const now = new Date()
  const diffTime = date - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 7 && diffDays >= 0
}

const isDeadlineUrgent = (deadline) => {
  const date = new Date(deadline)
  const now = new Date()
  const diffTime = date - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 3 && diffDays >= 0
}

const getProgressMotivation = (progress) => {
  if (progress === 0) {
    return 'Ready to start your journey!'
  } else if (progress < 25) {
    return 'Great start! Keep going!'
  } else if (progress < 50) {
    return 'You\'re making progress!'
  } else if (progress < 75) {
    return 'You\'re more than halfway there!'
  } else if (progress < 100) {
    return 'Almost there! You\'re doing great!'
  } else {
    return 'Congratulations! You\'ve completed this program!'
  }
}
</script>

<style scoped>
/* Wireframe All Assignments Styles */
.wireframe-all-assignments {
  padding: 24px;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
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

/* Progress Overview Styles */
.wireframe-progress-overview {
  background: #f8f8f8;
  border: 2px solid #333;
}

.wireframe-progress-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.wireframe-stat-card {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  background: white;
}

.wireframe-stat-number {
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.wireframe-stat-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.wireframe-stat-description {
  font-size: 12px;
  color: #666;
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

.wireframe-programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.wireframe-program-card {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.wireframe-program-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #666;
}

.wireframe-program-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.wireframe-program-icon {
  width: 40px;
  height: 40px;
  border: 2px solid #333;
  border-radius: 4px;
  background: #f0f0f0;
}

.wireframe-program-status {
  padding: 4px 8px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.wireframe-program-status.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.wireframe-program-status.not-started {
  background: #9E9E9E;
  color: white;
  border-color: #9E9E9E;
}

.wireframe-program-status.completed {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}

.wireframe-program-organization {
  margin-bottom: 16px;
}

.wireframe-org-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.wireframe-org-type {
  font-size: 12px;
  color: #666;
}

.wireframe-program-content {
  margin-bottom: 20px;
}

.wireframe-program-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.wireframe-program-description {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 16px;
}

.wireframe-program-progress {
  margin-bottom: 16px;
}

.wireframe-progress-bar {
  width: 100%;
  height: 8px;
  border: 2px solid #333;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.wireframe-progress-fill {
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s ease;
}

.wireframe-progress-text {
  font-size: 12px;
  color: #666;
  text-align: right;
}

.wireframe-progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.wireframe-progress-motivation {
  font-size: 12px;
  color: #4CAF50;
  font-weight: 600;
}

/* Deadline Warning Styles */
.wireframe-deadline-warning {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 2px solid #FF9800;
  border-radius: 4px;
  background: #FFF3E0;
  margin: 12px 0;
}

.wireframe-deadline-icon {
  font-size: 20px;
}

.wireframe-deadline-text {
  flex: 1;
}

.wireframe-deadline-label {
  font-size: 14px;
  font-weight: 600;
  color: #E65100;
  margin-bottom: 2px;
}

.wireframe-deadline-date {
  font-size: 12px;
  color: #E65100;
}

.wireframe-deadline-urgent {
  color: #D32F2F !important;
  font-weight: 600;
}

/* Motivational Message Styles */
.wireframe-motivation-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 2px solid #4CAF50;
  border-radius: 4px;
  background: #E8F5E8;
  margin: 12px 0;
}

.wireframe-motivation-icon {
  font-size: 20px;
}

.wireframe-motivation-text {
  flex: 1;
}

.wireframe-motivation-title {
  font-size: 14px;
  font-weight: 600;
  color: #2E7D32;
  margin-bottom: 2px;
}

.wireframe-motivation-description {
  font-size: 12px;
  color: #2E7D32;
  line-height: 1.4;
}

.wireframe-program-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.wireframe-meta-item {
  flex: 1;
}

.wireframe-meta-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.wireframe-meta-value {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.wireframe-program-actions {
  display: flex;
  gap: 8px;
}

.wireframe-questionnaires-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.wireframe-questionnaire-card {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.wireframe-questionnaire-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #666;
}

.wireframe-questionnaire-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.wireframe-questionnaire-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  border: 2px solid #333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
}

.wireframe-questionnaire-status {
  padding: 4px 8px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.wireframe-questionnaire-status.available {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.wireframe-questionnaire-status.completed {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}

.wireframe-questionnaire-content {
  margin-bottom: 20px;
}

.wireframe-questionnaire-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.wireframe-questionnaire-description {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 16px;
}

.wireframe-questionnaire-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wireframe-questionnaire-actions {
  display: flex;
  gap: 8px;
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
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  font-weight: 600;
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

/* Mobile: vertical positioning for activity items */
@media (max-width: 767px) {
  .wireframe-program-actions,
  .wireframe-questionnaire-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .wireframe-program-meta {
    flex-direction: column;
    gap: 8px;
  }

  .wireframe-progress-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .wireframe-stat-card {
    padding: 16px;
  }

  .wireframe-stat-number {
    font-size: 24px;
  }

  .wireframe-deadline-warning,
  .wireframe-motivation-message {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .wireframe-programs-grid,
  .wireframe-questionnaires-grid {
    grid-template-columns: 1fr;
  }
}
</style>
