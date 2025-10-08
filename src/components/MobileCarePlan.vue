<template>
  <div class="mobile-care-plan">
    <!-- Mobile Content Header -->
    <div class="mobile-content-header">
      <h1 class="mobile-page-title">My Care Plan</h1>
      <div class="mobile-subtitle">Your personalized therapy journey</div>
    </div>

    <!-- Care Plan Name -->
    <div class="mobile-care-plan-name">
      <h2 class="mobile-plan-title">{{ carePlanName }}</h2>
      <div class="mobile-plan-status">{{ carePlanStatus }}</div>
    </div>

    <!-- Assigned Programs -->
    <div class="mobile-assigned-programs">
      <h3 class="mobile-section-title">Assigned Programs</h3>
      <div class="mobile-program-list">
        <div 
          class="mobile-program-item" 
          v-for="program in assignedPrograms" 
          :key="program.id"
          @click="viewProgram(program.id)"
        >
          <div class="mobile-program-header">
            <div class="mobile-program-icon">
              <v-icon :color="program.color">{{ program.icon }}</v-icon>
            </div>
            <div class="mobile-program-info">
              <div class="mobile-program-name">{{ program.name }}</div>
              <div class="mobile-program-description">{{ program.description }}</div>
            </div>
            <div class="mobile-program-status" :class="program.statusClass">
              {{ program.status }}
            </div>
          </div>
          <div class="mobile-program-progress">
            <v-progress-linear
              :model-value="program.progress"
              :color="program.color"
              height="4"
              rounded
              class="mobile-progress-bar"
            ></v-progress-linear>
            <div class="mobile-progress-text">{{ program.progress }}% Complete</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Assigned Questionnaires -->
    <div class="mobile-assigned-questionnaires">
      <h3 class="mobile-section-title">Assigned Questionnaires</h3>
      <div class="mobile-questionnaire-list">
        <div 
          class="mobile-questionnaire-item" 
          v-for="questionnaire in assignedQuestionnaires" 
          :key="questionnaire.id"
          @click="startQuestionnaire(questionnaire.id)"
        >
          <div class="mobile-questionnaire-header">
            <div class="mobile-questionnaire-icon">
              <v-icon color="#ff9800">mdi-clipboard-text</v-icon>
            </div>
            <div class="mobile-questionnaire-info">
              <div class="mobile-questionnaire-name">{{ questionnaire.name }}</div>
              <div class="mobile-questionnaire-description">{{ questionnaire.description }}</div>
            </div>
            <div class="mobile-questionnaire-status" :class="questionnaire.statusClass">
              {{ questionnaire.status }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Access Management -->
    <div class="mobile-access-section">
      <h3 class="mobile-section-title">Access</h3>
      <div class="mobile-access-card">
        <div class="mobile-access-info">
          <div class="mobile-access-title">Professional Access</div>
          <div class="mobile-access-description">Manage who can view your progress</div>
        </div>
        <v-btn 
          color="primary" 
          variant="outlined" 
          class="mobile-access-btn"
          @click="manageAccess"
        >
          <v-icon>mdi-account-group</v-icon>
          Manage Access
        </v-btn>
      </div>
    </div>

    <!-- Invite Professional Button -->
    <div class="mobile-invite-section">
      <v-btn 
        color="primary" 
        size="large" 
        class="mobile-invite-btn"
        @click="inviteProfessional"
      >
        <v-icon>mdi-account-plus</v-icon>
        Invite Professional
      </v-btn>
    </div>

    <!-- Mobile Bottom Spacing -->
    <div class="mobile-bottom-spacing"></div>
  </div>
</template>

<script>
export default {
  name: 'MobileCarePlan',
  data() {
    return {
      carePlanName: 'Anxiety Management Plan',
      carePlanStatus: 'Active',
      assignedPrograms: [
        {
          id: 1,
          name: 'Cognitive Behavioral Therapy',
          description: 'Learn to identify and challenge negative thoughts',
          progress: 65,
          status: 'In Progress',
          statusClass: 'in-progress',
          icon: 'mdi-brain',
          color: '#4a90e2'
        },
        {
          id: 2,
          name: 'Mindfulness & Stress Reduction',
          description: 'Develop mindfulness techniques for stress management',
          progress: 30,
          status: 'Started',
          statusClass: 'started',
          icon: 'mdi-meditation',
          color: '#4caf50'
        },
        {
          id: 3,
          name: 'Trauma Recovery Program',
          description: 'Specialized program for trauma recovery',
          progress: 0,
          status: 'Not Started',
          statusClass: 'not-started',
          icon: 'mdi-heart',
          color: '#ff9800'
        }
      ],
      assignedQuestionnaires: [
        {
          id: 1,
          name: 'Anxiety Assessment',
          description: 'Weekly anxiety level assessment',
          status: 'Pending',
          statusClass: 'pending'
        },
        {
          id: 2,
          name: 'Mood Tracking',
          description: 'Daily mood and emotional state tracking',
          status: 'Completed',
          statusClass: 'completed'
        }
      ]
    }
  },
  methods: {
    viewProgram(programId) {
      this.$router.push(`/programs/${programId}`)
    },
    startQuestionnaire(questionnaireId) {
      this.$router.push(`/questionnaires/${questionnaireId}`)
    },
    manageAccess() {
      this.$router.push('/access-management')
    },
    inviteProfessional() {
      this.$router.push('/invite-professional')
    }
  }
}
</script>

<style scoped>
.mobile-care-plan {
  padding: 16px;
  padding-bottom: 100px;
  background: #f5f5f5;
  min-height: 100vh;
}

.mobile-content-header {
  margin-bottom: 24px;
  text-align: center;
}

.mobile-page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.mobile-subtitle {
  font-size: 14px;
  color: #666;
}

.mobile-care-plan-name {
  background: white;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  text-align: center;
}

.mobile-plan-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.mobile-plan-status {
  font-size: 14px;
  color: #4caf50;
  font-weight: 500;
}

.mobile-assigned-programs,
.mobile-assigned-questionnaires,
.mobile-access-section {
  margin-bottom: 24px;
}

.mobile-section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.mobile-program-list,
.mobile-questionnaire-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-program-item,
.mobile-questionnaire-item {
  background: white;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-program-item:hover,
.mobile-questionnaire-item:hover {
  border-color: #4a90e2;
  background: #f8f9ff;
}

.mobile-program-header,
.mobile-questionnaire-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.mobile-program-icon,
.mobile-questionnaire-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #333;
  border-radius: 50%;
}

.mobile-program-info,
.mobile-questionnaire-info {
  flex: 1;
}

.mobile-program-name,
.mobile-questionnaire-name {
  font-weight: 500;
  color: #333;
  font-size: 14px;
  margin-bottom: 4px;
}

.mobile-program-description,
.mobile-questionnaire-description {
  font-size: 12px;
  color: #666;
}

.mobile-program-status,
.mobile-questionnaire-status {
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
  text-transform: uppercase;
}

.mobile-program-status.in-progress,
.mobile-questionnaire-status.pending {
  background: #e3f2fd;
  color: #4a90e2;
}

.mobile-program-status.started {
  background: #e8f5e8;
  color: #4caf50;
}

.mobile-program-status.not-started {
  background: #fff3e0;
  color: #ff9800;
}

.mobile-questionnaire-status.completed {
  background: #e8f5e8;
  color: #4caf50;
}

.mobile-program-progress {
  margin-top: 8px;
}

.mobile-progress-bar {
  margin-bottom: 4px;
}

.mobile-progress-text {
  font-size: 12px;
  color: #666;
  text-align: right;
}

.mobile-access-card {
  background: white;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-access-info {
  flex: 1;
}

.mobile-access-title {
  font-weight: 500;
  color: #333;
  font-size: 14px;
  margin-bottom: 4px;
}

.mobile-access-description {
  font-size: 12px;
  color: #666;
}

.mobile-access-btn {
  border: 2px solid #333 !important;
  text-transform: none !important;
}

.mobile-invite-section {
  margin-bottom: 24px;
}

.mobile-invite-btn {
  width: 100%;
  height: 48px !important;
  border: 2px solid #333 !important;
  text-transform: none !important;
  font-weight: 500 !important;
}

.mobile-bottom-spacing {
  height: 20px;
}

/* Wireframe styling */
.mobile-care-plan * {
  box-sizing: border-box;
}

.mobile-care-plan {
  font-family: 'Roboto', sans-serif;
}
</style>
