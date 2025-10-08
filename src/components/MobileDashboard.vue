<template>
  <div class="mobile-dashboard">
    <!-- Mobile Content Header -->
    <div class="mobile-content-header">
      <h1 class="mobile-page-title">Dashboard</h1>
      <div class="mobile-date">{{ currentDate }}</div>
    </div>

    <!-- Mobile Dashboard Widgets -->
    <div class="mobile-widgets-grid">
      <!-- Widget: Working On -->
      <div class="mobile-widget working-on-widget" @click="navigateToCarePlan">
        <div class="mobile-widget-header">
          <v-icon color="#4a90e2">mdi-clipboard-list</v-icon>
          <span class="mobile-widget-title">Working On</span>
        </div>
        <div class="mobile-widget-content">
          <div class="mobile-widget-description">Current assignments and tasks</div>
          <div class="mobile-widget-action">View Care Plan →</div>
        </div>
      </div>

      <!-- Widget: Monitor -->
      <div class="mobile-widget monitor-widget" @click="navigateToMonitors">
        <div class="mobile-widget-header">
          <v-icon color="#4caf50">mdi-monitor</v-icon>
          <span class="mobile-widget-title">Monitor</span>
        </div>
        <div class="mobile-widget-content">
          <div class="mobile-widget-description">Health and progress tracking</div>
          <div class="mobile-widget-action">View Monitors →</div>
        </div>
      </div>

      <!-- Widget: Therapieland Video -->
      <div class="mobile-widget video-widget" @click="playVideo">
        <div class="mobile-widget-header">
          <v-icon color="#ff9800">mdi-play-circle</v-icon>
          <span class="mobile-widget-title">Therapieland Video</span>
        </div>
        <div class="mobile-widget-content">
          <div class="mobile-widget-description">Educational content and guidance</div>
          <div class="mobile-widget-action">Watch Video →</div>
        </div>
      </div>

      <!-- Widget: Therapieland Overview -->
      <div class="mobile-widget overview-widget" @click="navigateToOverview">
        <div class="mobile-widget-header">
          <v-icon color="#9c27b0">mdi-information</v-icon>
          <span class="mobile-widget-title">Therapieland Overview</span>
        </div>
        <div class="mobile-widget-content">
          <div class="mobile-widget-description">Platform introduction and features</div>
          <div class="mobile-widget-action">Learn More →</div>
        </div>
      </div>

      <!-- Widget: Coaching -->
      <div class="mobile-widget coaching-widget" @click="navigateToCoaching">
        <div class="mobile-widget-header">
          <v-icon color="#f44336">mdi-account-heart</v-icon>
          <span class="mobile-widget-title">Coaching</span>
        </div>
        <div class="mobile-widget-content">
          <div class="mobile-widget-description">Professional guidance and support</div>
          <div class="mobile-widget-action">Get Coaching →</div>
        </div>
      </div>

      <!-- Help Avatar -->
      <div class="mobile-widget help-widget" @click="openHelp">
        <div class="mobile-widget-header">
          <v-icon color="#607d8b">mdi-help-circle</v-icon>
          <span class="mobile-widget-title">Help Avatar</span>
        </div>
        <div class="mobile-widget-content">
          <div class="mobile-widget-description">Get assistance and support</div>
          <div class="mobile-widget-action">Ask for Help →</div>
        </div>
      </div>
    </div>

    <!-- Mobile Progress Section -->
    <div class="mobile-progress-card">
      <div class="mobile-card-header">
        <h3 class="mobile-card-title">Today's Progress</h3>
        <v-btn size="small" variant="text" class="mobile-card-action">
          View All
          <v-icon size="16">mdi-arrow-right</v-icon>
        </v-btn>
      </div>
      
      <div class="mobile-progress-item" v-for="progress in todayProgress" :key="progress.name">
        <div class="mobile-progress-info">
          <div class="mobile-progress-name">{{ progress.name }}</div>
          <div class="mobile-progress-status">{{ progress.status }}</div>
        </div>
        <div class="mobile-progress-bar-container">
          <v-progress-linear
            :model-value="progress.percentage"
            :color="progress.color"
            height="6"
            rounded
            class="mobile-progress-bar"
          ></v-progress-linear>
          <div class="mobile-progress-percentage">{{ progress.percentage }}%</div>
        </div>
      </div>
    </div>

    <!-- Mobile Quick Actions -->
    <div class="mobile-quick-actions">
      <h3 class="mobile-section-title">Quick Actions</h3>
      <div class="mobile-actions-grid">
        <v-btn
          v-for="action in quickActions"
          :key="action.name"
          :color="action.color"
          variant="outlined"
          class="mobile-action-btn"
          @click="handleAction(action.route)"
        >
          <v-icon>{{ action.icon }}</v-icon>
          <span class="mobile-action-label">{{ action.label }}</span>
        </v-btn>
      </div>
    </div>

    <!-- Mobile Recent Activity -->
    <div class="mobile-activity-card">
      <div class="mobile-card-header">
        <h3 class="mobile-card-title">Recent Activity</h3>
        <v-btn size="small" variant="text" class="mobile-card-action">
          See All
          <v-icon size="16">mdi-arrow-right</v-icon>
        </v-btn>
      </div>
      
      <div class="mobile-activity-list">
        <div class="mobile-activity-item" v-for="activity in recentActivity" :key="activity.id">
          <div class="mobile-activity-icon">
            <v-icon :color="activity.color">{{ activity.icon }}</v-icon>
          </div>
          <div class="mobile-activity-content">
            <div class="mobile-activity-title">{{ activity.title }}</div>
            <div class="mobile-activity-time">{{ activity.time }}</div>
          </div>
          <div class="mobile-activity-status" :class="activity.status">
            {{ activity.statusText }}
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Spacing for Navigation -->
    <div class="mobile-bottom-spacing"></div>
  </div>
</template>

<script>
export default {
  name: 'MobileDashboard',
  data() {
    return {
      currentDate: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      todayProgress: [
        {
          name: 'Cognitive Behavioral Therapy',
          status: 'In Progress',
          percentage: 65,
          color: '#4a90e2'
        },
        {
          name: 'Mindfulness Exercise',
          status: 'Completed',
          percentage: 100,
          color: '#4caf50'
        },
        {
          name: 'Daily Reflection',
          status: 'Pending',
          percentage: 0,
          color: '#ff9800'
        }
      ],
      quickActions: [
        {
          name: 'start-session',
          label: 'Start Session',
          icon: 'mdi-play',
          color: 'primary',
          route: '/session'
        },
        {
          name: 'add-note',
          label: 'Add Note',
          icon: 'mdi-note-plus',
          color: 'secondary',
          route: '/notes'
        },
        {
          name: 'view-progress',
          label: 'View Progress',
          icon: 'mdi-chart-line',
          color: 'success',
          route: '/progress'
        },
        {
          name: 'emergency',
          label: 'Emergency',
          icon: 'mdi-phone',
          color: 'error',
          route: '/emergency'
        }
      ],
      recentActivity: [
        {
          id: 1,
          title: 'Completed CBT Module 2',
          time: '2 hours ago',
          icon: 'mdi-check-circle',
          color: '#4caf50',
          status: 'completed',
          statusText: 'Done'
        },
        {
          id: 2,
          title: 'New assignment received',
          time: '1 day ago',
          icon: 'mdi-assignment',
          color: '#ff9800',
          status: 'pending',
          statusText: 'New'
        },
        {
          id: 3,
          title: 'Progress report generated',
          time: '2 days ago',
          icon: 'mdi-file-chart',
          color: '#4a90e2',
          status: 'completed',
          statusText: 'Ready'
        }
      ]
    }
  },
  methods: {
    navigateToCarePlan() {
      this.$router.push('/care-plan')
    },
    navigateToMonitors() {
      this.$router.push('/monitors')
    },
    playVideo() {
      // Handle video playback
      console.log('Playing Therapieland video')
    },
    navigateToOverview() {
      this.$router.push('/overview')
    },
    navigateToCoaching() {
      this.$router.push('/coaching')
    },
    openHelp() {
      // Handle help avatar interaction
      console.log('Opening help avatar')
    },
    handleAction(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.mobile-dashboard {
  padding: 16px;
  padding-bottom: 100px; /* Space for bottom navigation */
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

.mobile-date {
  font-size: 14px;
  color: #666;
}

.mobile-widgets-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.mobile-widget {
  background: white;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-widget:hover {
  border-color: #4a90e2;
  background: #f8f9ff;
  transform: translateY(-2px);
}

.mobile-widget-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.mobile-widget-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.mobile-widget-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-widget-description {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.mobile-widget-action {
  font-size: 12px;
  color: #4a90e2;
  font-weight: 500;
  text-align: right;
}

.mobile-progress-card,
.mobile-activity-card {
  background: white;
  border: 2px solid #333;
  border-radius: 8px;
  margin-bottom: 24px;
}

.mobile-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 2px solid #333;
}

.mobile-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.mobile-card-action {
  color: #4a90e2 !important;
  font-size: 12px;
  text-transform: none;
}

.mobile-progress-item {
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.mobile-progress-item:last-child {
  border-bottom: none;
}

.mobile-progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.mobile-progress-name {
  font-weight: 500;
  color: #333;
}

.mobile-progress-status {
  font-size: 12px;
  color: #666;
}

.mobile-progress-bar-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mobile-progress-bar {
  flex: 1;
}

.mobile-progress-percentage {
  font-size: 12px;
  font-weight: 500;
  color: #333;
  min-width: 35px;
}

.mobile-quick-actions {
  margin-bottom: 24px;
}

.mobile-section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.mobile-actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.mobile-action-btn {
  height: 48px !important;
  border: 2px solid #333 !important;
  border-radius: 8px !important;
  text-transform: none !important;
  font-weight: 500 !important;
}

.mobile-action-label {
  margin-left: 8px;
  font-size: 12px;
}

.mobile-activity-list {
  padding: 0;
}

.mobile-activity-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
  gap: 12px;
}

.mobile-activity-item:last-child {
  border-bottom: none;
}

.mobile-activity-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #333;
  border-radius: 50%;
}

.mobile-activity-content {
  flex: 1;
}

.mobile-activity-title {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.mobile-activity-time {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

.mobile-activity-status {
  font-size: 10px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
  text-transform: uppercase;
}

.mobile-activity-status.completed {
  background: #e8f5e8;
  color: #4caf50;
}

.mobile-activity-status.pending {
  background: #fff3e0;
  color: #ff9800;
}

.mobile-bottom-spacing {
  height: 20px;
}

/* Wireframe styling */
.mobile-dashboard * {
  box-sizing: border-box;
}

.mobile-dashboard {
  font-family: 'Roboto', sans-serif;
}

/* Mobile-specific adjustments */
@media (max-width: 480px) {
  .mobile-stats-grid {
    grid-template-columns: 1fr;
  }
  
  .mobile-actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
