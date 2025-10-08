<template>
  <div class="wireframe-programs-page">
    <div class="wireframe-header">
      <div class="wireframe-title">Programs & Questionnaires</div>
      <div class="wireframe-subtitle">Manage your therapy programs and assessment questionnaires</div>
    </div>
    
    <div class="wireframe-content">
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
              <div class="wireframe-program-progress">
                <div class="wireframe-progress-bar">
                  <div class="wireframe-progress-fill" :style="{ width: program.progress + '%' }"></div>
                </div>
                <div class="wireframe-progress-text">{{ program.progress }}% Complete</div>
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
          <div class="wireframe-button wireframe-button-primary">+ Create Questionnaire</div>
        </div>
        
        <div class="wireframe-questionnaires-grid">
          <div class="wireframe-questionnaire-card" v-for="(questionnaire, index) in questionnaires" :key="index">
            <div class="wireframe-questionnaire-header">
              <div class="wireframe-questionnaire-icon"></div>
              <div class="wireframe-questionnaire-type">{{ questionnaire.type }}</div>
            </div>
            <div class="wireframe-questionnaire-organization">
              <div class="wireframe-org-name">{{ questionnaire.careOrganization }}</div>
              <div class="wireframe-org-type">{{ questionnaire.organizationType }}</div>
            </div>
            <div class="wireframe-questionnaire-content">
              <div class="wireframe-questionnaire-title">{{ questionnaire.title }}</div>
              <div class="wireframe-questionnaire-description">{{ questionnaire.description }}</div>
              <div class="wireframe-questionnaire-stats">
                <div class="wireframe-stat">
                  <div class="wireframe-stat-label">Questions</div>
                  <div class="wireframe-stat-value">{{ questionnaire.questions }}</div>
                </div>
                <div class="wireframe-stat">
                  <div class="wireframe-stat-label">Duration</div>
                  <div class="wireframe-stat-value">{{ questionnaire.duration }}</div>
                </div>
                <div class="wireframe-stat">
                  <div class="wireframe-stat-label">Responses</div>
                  <div class="wireframe-stat-value">{{ questionnaire.responses }}</div>
                </div>
              </div>
            </div>
            <div class="wireframe-questionnaire-actions">
              <div class="wireframe-button wireframe-button-small">Start</div>
              <div class="wireframe-button wireframe-button-small wireframe-button-secondary" @click="viewQuestionnaireDetail(questionnaire)">View Details</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity Section -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Recent Activity</div>
        </div>
        
        <div class="wireframe-activity-list">
          <div class="wireframe-activity-item" v-for="(activity, index) in recentActivity" :key="index">
            <div class="wireframe-activity-icon"></div>
            <div class="wireframe-activity-content">
              <div class="wireframe-activity-title">{{ activity.title }}</div>
              <div class="wireframe-activity-description">{{ activity.description }}</div>
              <div class="wireframe-activity-time">{{ activity.time }}</div>
            </div>
            <div class="wireframe-activity-status" :class="activity.status"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const viewProgramDetail = (program) => {
  // Create a mapping for program titles to their correct IDs
  const programIdMap = {
    'Cognitive Behavioral Therapy': 'cognitive-behavioral-therapy',
    'Mindfulness & Stress Reduction': 'mindfulness--stress-reduction',
    'Anxiety Management': 'anxiety-management',
    'Trauma Recovery Program': 'trauma-recovery-program',
    'Depression Treatment Program': 'depression-treatment-program',
    'Social Skills Training': 'social-skills-training',
    'Anger Management Program': 'anger-management-program'
  }
  
  const programId = programIdMap[program.title] || program.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').replace(/--+/g, '-')
  router.push(`/program/${programId}`)
}

const viewQuestionnaireDetail = (questionnaire) => {
  const questionnaireId = questionnaire.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')
  router.push(`/questionnaire/${questionnaireId}`)
}

const navigateToLastModule = (program) => {
  // Create a mapping for program titles to their correct IDs
  const programIdMap = {
    'Cognitive Behavioral Therapy': 'cognitive-behavioral-therapy',
    'Mindfulness & Stress Reduction': 'mindfulness--stress-reduction',
    'Anxiety Management': 'anxiety-management',
    'Trauma Recovery Program': 'trauma-recovery-program',
    'Depression Treatment Program': 'depression-treatment-program',
    'Social Skills Training': 'social-skills-training',
    'Anger Management Program': 'anger-management-program'
  }
  
  const programId = programIdMap[program.title] || program.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').replace(/--+/g, '-')
  
  // Navigate to the last active module for this program
  // For now, we'll navigate to the first module, but this could be enhanced to track last viewed module
  const lastActiveModule = getLastActiveModule(program.title)
  router.push(`/program/${programId}/module/${lastActiveModule}`)
}

const getLastActiveModule = (programTitle) => {
  // This function would typically get the last active module from localStorage or a store
  // For now, we'll return the first module for each program
  const moduleMap = {
    'Cognitive Behavioral Therapy': 'introduction-to-cbt',
    'Mindfulness & Stress Reduction': 'introduction-to-mindfulness',
    'Anxiety Management': 'understanding-anxiety',
    'Trauma Recovery Program': 'understanding-trauma',
    'Depression Treatment Program': 'understanding-depression',
    'Social Skills Training': 'introduction-to-social-skills',
    'Anger Management Program': 'understanding-anger'
  }
  
  return moduleMap[programTitle] || 'introduction'
}

const programs = [
  {
    title: 'Cognitive Behavioral Therapy',
    description: '8-week program focusing on thought patterns and behavior modification',
    progress: 65,
    duration: '8 weeks',
    nextSession: 'Tomorrow 2:00 PM',
    status: 'active',
    careOrganization: 'Mental Health Center Amsterdam',
    organizationType: 'Specialized Clinic'
  },
  {
    title: 'Mindfulness & Stress Reduction',
    description: '6-week mindfulness-based stress reduction program',
    progress: 0,
    duration: '6 weeks',
    nextSession: 'Start anytime',
    status: 'not-started',
    careOrganization: 'Mental Health Center Amsterdam',
    organizationType: 'Specialized Clinic'
  },
  {
    title: 'Anxiety Management',
    description: '10-week comprehensive anxiety management program',
    progress: 100,
    duration: '10 weeks',
    nextSession: 'Completed',
    status: 'completed',
    careOrganization: 'Community Health Services',
    organizationType: 'Public Health'
  },
  {
    title: 'Trauma Recovery Program',
    description: '12-week evidence-based trauma therapy using EMDR and CBT techniques',
    progress: 0,
    duration: '12 weeks',
    nextSession: 'Start anytime',
    status: 'not-started',
    careOrganization: 'Mental Health Center Amsterdam',
    organizationType: 'Specialized Clinic'
  },
  {
    title: 'Depression Treatment Program',
    description: '8-week cognitive behavioral therapy program for depression management',
    progress: 0,
    duration: '8 weeks',
    nextSession: 'Start anytime',
    status: 'not-started',
    careOrganization: 'Mental Health Center Amsterdam',
    organizationType: 'Specialized Clinic'
  },
  {
    title: 'Social Skills Training',
    description: '6-week group therapy program for improving social interactions and communication',
    progress: 0,
    duration: '6 weeks',
    nextSession: 'Start anytime',
    status: 'not-started',
    careOrganization: 'Mental Health Center Amsterdam',
    organizationType: 'Specialized Clinic'
  },
  {
    title: 'Anger Management Program',
    description: '8-week program focusing on emotional regulation and conflict resolution skills',
    progress: 0,
    duration: '8 weeks',
    nextSession: 'Start anytime',
    status: 'not-started',
    careOrganization: 'Mental Health Center Amsterdam',
    organizationType: 'Specialized Clinic'
  }
]

const questionnaires = [
  {
    title: 'PHQ-9 Depression Scale',
    description: 'Standard 9-item depression screening questionnaire',
    type: 'Assessment',
    questions: 9,
    duration: '5-10 min',
    responses: 12,
    careOrganization: 'Mental Health Center Amsterdam',
    organizationType: 'Specialized Clinic'
  },
  {
    title: 'GAD-7 Anxiety Scale',
    description: '7-item generalized anxiety disorder assessment',
    type: 'Screening',
    questions: 7,
    duration: '3-5 min',
    responses: 8,
    careOrganization: 'Anxiety Treatment Center',
    organizationType: 'Private Practice'
  },
  {
    title: 'Daily Mood Check-in',
    description: 'Quick daily mood and energy level assessment',
    type: 'Daily',
    questions: 5,
    duration: '2-3 min',
    responses: 45,
    careOrganization: 'Digital Health Platform',
    organizationType: 'Digital Health'
  },
  {
    title: 'Sleep Quality Assessment',
    description: 'Comprehensive sleep pattern and quality evaluation',
    type: 'Assessment',
    questions: 15,
    duration: '10-15 min',
    responses: 6,
    careOrganization: 'Sleep Medicine Clinic',
    organizationType: 'Specialized Clinic'
  }
]

const recentActivity = [
  {
    title: 'Completed CBT Session 4',
    description: 'Thought challenging exercises and homework assigned',
    time: '2 hours ago',
    status: 'completed'
  },
  {
    title: 'PHQ-9 Questionnaire Submitted',
    description: 'Depression screening completed with score: 8/27',
    time: 'Yesterday',
    status: 'completed'
  },
  {
    title: 'Mindfulness Program Started',
    description: 'Week 1: Introduction to mindfulness meditation',
    time: '3 days ago',
    status: 'in-progress'
  },
  {
    title: 'Sleep Assessment Due',
    description: 'Weekly sleep quality questionnaire pending',
    time: 'Due tomorrow',
    status: 'pending'
  }
]
</script>

<style scoped>
/* Wireframe Programs & Questionnaires Page Styles */
.wireframe-programs-page {
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

/* Programs Grid */
.wireframe-programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.wireframe-program-card {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.wireframe-program-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  border-color: #666;
}

.wireframe-program-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wireframe-program-icon {
  width: 32px;
  height: 32px;
  border: 2px solid #333;
  border-radius: 4px;
}

.wireframe-program-status {
  width: 12px;
  height: 12px;
  border: 2px solid #333;
  border-radius: 50%;
}

.wireframe-program-status.active {
  background: #4CAF50;
  border-color: #4CAF50;
}

.wireframe-program-status.completed {
  background: #2196F3;
  border-color: #2196F3;
}

.wireframe-program-status.not-started {
  background: #9E9E9E;
  border-color: #9E9E9E;
}

.wireframe-program-organization {
  padding: 8px 12px;
  border: 1px solid #333;
  border-radius: 4px;
  background: #f8f8f8;
  margin-bottom: 12px;
}

.wireframe-org-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
}

.wireframe-org-type {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.wireframe-program-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.wireframe-program-description {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.wireframe-program-progress {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 16px 0;
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

.wireframe-program-meta {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.wireframe-meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.wireframe-meta-label {
  font-size: 12px;
  color: #666;
}

.wireframe-meta-value {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.wireframe-program-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

/* Questionnaires Grid */
.wireframe-questionnaires-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.wireframe-questionnaire-card {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.wireframe-questionnaire-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wireframe-questionnaire-icon {
  width: 28px;
  height: 28px;
  border: 2px solid #333;
  border-radius: 4px;
}

.wireframe-questionnaire-type {
  padding: 4px 8px;
  border: 1px solid #333;
  border-radius: 2px;
  font-size: 12px;
  color: #333;
}

.wireframe-questionnaire-organization {
  padding: 8px 12px;
  border: 1px solid #333;
  border-radius: 4px;
  background: #f8f8f8;
  margin-bottom: 12px;
}

.wireframe-questionnaire-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.wireframe-questionnaire-description {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.wireframe-questionnaire-stats {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.wireframe-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
}

.wireframe-stat-label {
  font-size: 11px;
  color: #666;
}

.wireframe-stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.wireframe-questionnaire-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

/* Activity List */
.wireframe-activity-list {
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

.wireframe-activity-icon {
  width: 24px;
  height: 24px;
  border: 2px solid #333;
  border-radius: 4px;
  flex-shrink: 0;
}

.wireframe-activity-content {
  flex: 1;
}

.wireframe-activity-title {
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
  width: 12px;
  height: 12px;
  border: 2px solid #333;
  border-radius: 50%;
  flex-shrink: 0;
}

.wireframe-activity-status.completed {
  background: #4CAF50;
  border-color: #4CAF50;
}

.wireframe-activity-status.in-progress {
  background: #FF9800;
  border-color: #FF9800;
}

.wireframe-activity-status.pending {
  background: #9E9E9E;
  border-color: #9E9E9E;
}

/* Responsive */
@media (max-width: 768px) {
  .wireframe-programs-grid,
  .wireframe-questionnaires-grid {
    grid-template-columns: 1fr;
  }
  
  .wireframe-program-meta,
  .wireframe-questionnaire-stats {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
