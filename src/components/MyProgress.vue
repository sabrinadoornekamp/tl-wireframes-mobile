<template>
  <div class="wireframe-my-progress">
    <div class="wireframe-header">
      <div class="wireframe-title">My Progress</div>
      <div class="wireframe-subtitle">Your personalized therapy journey and wellness tracking overview</div>
    </div>
    
    <div class="wireframe-content">
      <!-- Progress Overview -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Overall Progress</div>
        </div>
        
        <div class="wireframe-progress-overview">
          <div class="wireframe-progress-card">
            <div class="wireframe-progress-icon">🎯</div>
            <div class="wireframe-progress-content">
              <div class="wireframe-progress-title">Active Programs</div>
              <div class="wireframe-progress-value">{{ activeProgramsCount }}</div>
              <div class="wireframe-progress-subtitle">Currently enrolled</div>
            </div>
          </div>
          
          <div class="wireframe-progress-card">
            <div class="wireframe-progress-icon">📊</div>
            <div class="wireframe-progress-content">
              <div class="wireframe-progress-title">Completion Rate</div>
              <div class="wireframe-progress-value">{{ overallCompletionRate }}%</div>
              <div class="wireframe-progress-subtitle">Average across programs</div>
            </div>
          </div>
          
          <div class="wireframe-progress-card">
            <div class="wireframe-progress-icon">📝</div>
            <div class="wireframe-progress-content">
              <div class="wireframe-progress-title">Questionnaires</div>
              <div class="wireframe-progress-value">{{ completedQuestionnaires }}</div>
              <div class="wireframe-progress-subtitle">Completed this month</div>
            </div>
          </div>
          
          <div class="wireframe-progress-card">
            <div class="wireframe-progress-icon">📈</div>
            <div class="wireframe-progress-content">
              <div class="wireframe-progress-title">Wellness Score</div>
              <div class="wireframe-progress-value">{{ wellnessScore }}/100</div>
              <div class="wireframe-progress-subtitle">Current level</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Program Progress -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Program Progress</div>
        </div>
        
        <div class="wireframe-programs-progress">
          <div 
            v-for="program in programs" 
            :key="program.title"
            class="wireframe-program-progress-item"
            :class="program.status"
          >
            <div class="wireframe-program-info">
              <div class="wireframe-program-title">{{ program.title }}</div>
              <div class="wireframe-program-organization">{{ program.careOrganization }}</div>
            </div>
            
            <div class="wireframe-program-progress-bar">
              <div class="wireframe-progress-track">
                <div 
                  class="wireframe-progress-fill" 
                  :style="{ width: program.progress + '%' }"
                  :class="program.status"
                ></div>
              </div>
              <div class="wireframe-progress-text">{{ program.progress }}%</div>
            </div>
            
            <div class="wireframe-program-status">
              <div class="wireframe-status-badge" :class="program.status">
                {{ getStatusText(program.status) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Recent Activity</div>
        </div>
        
        <div class="wireframe-activity-timeline">
          <div 
            v-for="(activity, index) in recentActivity" 
            :key="index"
            class="wireframe-activity-item"
            :class="activity.type"
          >
            <div class="wireframe-activity-icon">
              <div v-if="activity.type === 'program'">🎯</div>
              <div v-else-if="activity.type === 'questionnaire'">📝</div>
              <div v-else-if="activity.type === 'milestone'">🏆</div>
              <div v-else>📋</div>
            </div>
            
            <div class="wireframe-activity-content">
              <div class="wireframe-activity-title">{{ activity.title }}</div>
              <div class="wireframe-activity-description">{{ activity.description }}</div>
              <div class="wireframe-activity-time">{{ activity.time }}</div>
            </div>
            
            <div class="wireframe-activity-status" :class="activity.status">
              {{ activity.statusText }}
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Quick Actions</div>
        </div>
        
        <div class="wireframe-quick-actions">
          <div class="wireframe-action-card" @click="navigateToPrograms">
            <div class="wireframe-action-icon">📋</div>
            <div class="wireframe-action-title">View All Programs</div>
            <div class="wireframe-action-description">Browse available programs and questionnaires</div>
          </div>
          
          <div class="wireframe-action-card" @click="startNewQuestionnaire">
            <div class="wireframe-action-icon">📝</div>
            <div class="wireframe-action-title">Take Assessment</div>
            <div class="wireframe-action-description">Complete a wellness questionnaire</div>
          </div>
          
          <div class="wireframe-action-card" @click="viewProgressReport">
            <div class="wireframe-action-icon">📊</div>
            <div class="wireframe-action-title">Progress Report</div>
            <div class="wireframe-action-description">View detailed progress analytics</div>
          </div>
          
          <div class="wireframe-action-card" @click="contactCareProvider">
            <div class="wireframe-action-icon">💬</div>
            <div class="wireframe-action-title">Contact Provider</div>
            <div class="wireframe-action-description">Get in touch with your care team</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mock data - in a real app, this would come from an API
const programs = [
  {
    title: 'Cognitive Behavioral Therapy',
    progress: 65,
    status: 'active',
    careOrganization: 'Mental Health Center Amsterdam'
  },
  {
    title: 'Mindfulness & Stress Reduction',
    progress: 0,
    status: 'not-started',
    careOrganization: 'Mental Health Center Amsterdam'
  },
  {
    title: 'Trauma Recovery Program',
    progress: 0,
    status: 'not-started',
    careOrganization: 'Mental Health Center Amsterdam'
  },
  {
    title: 'Anxiety Management',
    progress: 100,
    status: 'completed',
    careOrganization: 'Community Health Services'
  }
]

const recentActivity = [
  {
    title: 'Completed CBT Session 4',
    description: 'Thought challenging exercises and homework assigned',
    time: '2 hours ago',
    type: 'program',
    status: 'completed',
    statusText: 'Completed'
  },
  {
    title: 'PHQ-9 Questionnaire Submitted',
    description: 'Depression screening completed with score: 8/27',
    time: 'Yesterday',
    type: 'questionnaire',
    status: 'completed',
    statusText: 'Submitted'
  },
  {
    title: 'Program Milestone Reached',
    description: 'Completed 50% of Cognitive Behavioral Therapy program',
    time: '3 days ago',
    type: 'milestone',
    status: 'milestone',
    statusText: 'Milestone'
  },
  {
    title: 'Mindfulness Program Started',
    description: 'Week 1: Introduction to mindfulness meditation',
    time: '1 week ago',
    type: 'program',
    status: 'in-progress',
    statusText: 'In Progress'
  }
]

// Computed properties
const activeProgramsCount = computed(() => {
  return programs.filter(p => p.status === 'active').length
})

const overallCompletionRate = computed(() => {
  const totalProgress = programs.reduce((sum, program) => sum + program.progress, 0)
  return Math.round(totalProgress / programs.length)
})

const completedQuestionnaires = computed(() => {
  return recentActivity.filter(a => a.type === 'questionnaire' && a.status === 'completed').length
})

const wellnessScore = computed(() => {
  // Mock calculation based on program progress and questionnaire scores
  return Math.min(100, Math.round(overallCompletionRate.value * 0.8 + 20))
})

const getStatusText = (status) => {
  switch (status) {
    case 'active': return 'In Progress'
    case 'not-started': return 'Not Started'
    case 'completed': return 'Completed'
    default: return status
  }
}

// Navigation functions
const navigateToPrograms = () => {
  router.push('/all-assignments')
}

const startNewQuestionnaire = () => {
  // Navigate to questionnaires section
  router.push('/all-assignments')
}

const viewProgressReport = () => {
  // Navigate to progress report (could be a new page)
  console.log('Navigate to progress report')
}

const contactCareProvider = () => {
  // Navigate to contact page or open contact modal
  console.log('Contact care provider')
}
</script>

<style scoped>
/* Wireframe My Progress Styles */
.wireframe-my-progress {
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

.wireframe-progress-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.wireframe-progress-card {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 2px solid #333;
  border-radius: 4px;
  gap: 16px;
}

.wireframe-progress-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  border: 2px solid #333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.wireframe-progress-content {
  flex: 1;
}

.wireframe-progress-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.wireframe-progress-value {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.wireframe-progress-subtitle {
  font-size: 12px;
  color: #999;
}

.wireframe-programs-progress {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.wireframe-program-progress-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 2px solid #333;
  border-radius: 4px;
  gap: 20px;
}

.wireframe-program-progress-item.active {
  background: #f0f8f0;
  border-color: #4CAF50;
}

.wireframe-program-progress-item.not-started {
  background: #f8f8f8;
  border-color: #9E9E9E;
}

.wireframe-program-progress-item.completed {
  background: #e3f2fd;
  border-color: #2196F3;
}

.wireframe-program-info {
  flex: 1;
  min-width: 200px;
}

.wireframe-program-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.wireframe-program-organization {
  font-size: 12px;
  color: #666;
}

.wireframe-program-progress-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;
}

.wireframe-progress-track {
  flex: 1;
  height: 8px;
  border: 2px solid #333;
  border-radius: 4px;
  overflow: hidden;
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
  font-size: 14px;
  font-weight: 600;
  color: #333;
  min-width: 40px;
  text-align: right;
}

.wireframe-program-status {
  min-width: 100px;
}

.wireframe-status-badge {
  padding: 4px 8px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
}

.wireframe-status-badge.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.wireframe-status-badge.not-started {
  background: #9E9E9E;
  color: white;
  border-color: #9E9E9E;
}

.wireframe-status-badge.completed {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}

.wireframe-activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wireframe-activity-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 2px solid #333;
  border-radius: 4px;
  gap: 16px;
}

/* Mobile: vertical positioning for activity items */
@media (max-width: 767px) {
  .wireframe-activity-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: 12px;
  }
}

.wireframe-activity-item.program {
  background: #f0f8f0;
  border-color: #4CAF50;
}

.wireframe-activity-item.questionnaire {
  background: #fff8e1;
  border-color: #FF9800;
}

.wireframe-activity-item.milestone {
  background: #e8f5e8;
  border-color: #4CAF50;
}

.wireframe-activity-icon {
  width: 32px;
  height: 32px;
  border: 2px solid #333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.wireframe-activity-content {
  flex: 1;
}

.wireframe-activity-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.wireframe-activity-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.wireframe-activity-time {
  font-size: 12px;
  color: #999;
}

.wireframe-activity-status {
  padding: 4px 8px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.wireframe-activity-status.completed {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.wireframe-activity-status.in-progress {
  background: #FF9800;
  color: white;
  border-color: #FF9800;
}

.wireframe-activity-status.milestone {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.wireframe-quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.wireframe-action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  border: 2px solid #333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.wireframe-action-card:hover {
  border-color: #666;
  background: #f8f8f8;
}

.wireframe-action-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.wireframe-action-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.wireframe-action-description {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

/* Responsive */
@media (max-width: 768px) {
  .wireframe-progress-overview,
  .wireframe-quick-actions {
    grid-template-columns: 1fr;
  }
  
  .wireframe-program-progress-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .wireframe-program-progress-bar {
    width: 100%;
    min-width: auto;
  }
}
</style>
