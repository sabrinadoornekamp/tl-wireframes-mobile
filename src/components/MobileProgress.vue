<template>
  <div class="mobile-progress">
    <!-- Mobile Content Header -->
    <div class="mobile-content-header">
      <h1 class="mobile-page-title">My Progress</h1>
      <div class="mobile-subtitle">Track your therapy journey</div>
    </div>

    <!-- Overall Progress Card -->
    <div class="mobile-overall-progress">
      <div class="mobile-progress-header">
        <h3 class="mobile-card-title">Overall Progress</h3>
        <div class="mobile-progress-percentage">{{ overallProgress }}%</div>
      </div>
      <v-progress-linear
        :model-value="overallProgress"
        color="primary"
        height="12"
        rounded
        class="mobile-progress-bar"
      ></v-progress-linear>
    </div>

    <!-- Program Progress Cards -->
    <div class="mobile-programs-progress">
      <h3 class="mobile-section-title">Program Progress</h3>
      <div class="mobile-program-cards">
        <div 
          class="mobile-program-card" 
          v-for="program in programs" 
          :key="program.id"
          @click="viewProgram(program.id)"
        >
          <div class="mobile-program-header">
            <div class="mobile-program-icon">
              <v-icon :color="program.color">{{ program.icon }}</v-icon>
            </div>
            <div class="mobile-program-info">
              <div class="mobile-program-name">{{ program.name }}</div>
              <div class="mobile-program-status">{{ program.status }}</div>
            </div>
            <div class="mobile-program-percentage">{{ program.progress }}%</div>
          </div>
          <v-progress-linear
            :model-value="program.progress"
            :color="program.color"
            height="6"
            rounded
            class="mobile-program-bar"
          ></v-progress-linear>
        </div>
      </div>
    </div>

    <!-- Weekly Progress Chart -->
    <div class="mobile-weekly-progress">
      <h3 class="mobile-section-title">This Week</h3>
      <div class="mobile-chart-container">
        <div class="mobile-chart-placeholder">
          <v-icon size="48" color="#ccc">mdi-chart-line</v-icon>
          <div class="mobile-chart-text">Progress Chart</div>
        </div>
      </div>
    </div>

    <!-- Achievements -->
    <div class="mobile-achievements">
      <h3 class="mobile-section-title">Recent Achievements</h3>
      <div class="mobile-achievement-list">
        <div 
          class="mobile-achievement-item" 
          v-for="achievement in achievements" 
          :key="achievement.id"
        >
          <div class="mobile-achievement-icon">
            <v-icon :color="achievement.color">{{ achievement.icon }}</v-icon>
          </div>
          <div class="mobile-achievement-content">
            <div class="mobile-achievement-title">{{ achievement.title }}</div>
            <div class="mobile-achievement-date">{{ achievement.date }}</div>
          </div>
          <div class="mobile-achievement-badge">
            <v-icon size="16" color="#ffd700">mdi-trophy</v-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Spacing -->
    <div class="mobile-bottom-spacing"></div>
  </div>
</template>

<script>
export default {
  name: 'MobileProgress',
  data() {
    return {
      overallProgress: 65,
      programs: [
        {
          id: 1,
          name: 'Cognitive Behavioral Therapy',
          status: 'In Progress',
          progress: 65,
          icon: 'mdi-brain',
          color: '#4a90e2'
        },
        {
          id: 2,
          name: 'Mindfulness & Stress Reduction',
          status: 'Completed',
          progress: 100,
          icon: 'mdi-meditation',
          color: '#4caf50'
        },
        {
          id: 3,
          name: 'Trauma Recovery Program',
          status: 'Not Started',
          progress: 0,
          icon: 'mdi-heart',
          color: '#ff9800'
        }
      ],
      achievements: [
        {
          id: 1,
          title: 'Completed 7-day streak',
          date: '2 days ago',
          icon: 'mdi-fire',
          color: '#f44336'
        },
        {
          id: 2,
          title: 'Finished CBT Module 2',
          date: '1 week ago',
          icon: 'mdi-book-check',
          color: '#4caf50'
        },
        {
          id: 3,
          title: 'First meditation session',
          date: '2 weeks ago',
          icon: 'mdi-meditation',
          color: '#9c27b0'
        }
      ]
    }
  },
  methods: {
    viewProgram(programId) {
      this.$router.push(`/programs/${programId}`)
    }
  }
}
</script>

<style scoped>
.mobile-progress {
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

.mobile-overall-progress {
  background: white;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.mobile-progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.mobile-card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.mobile-progress-percentage {
  font-size: 24px;
  font-weight: 600;
  color: #4a90e2;
}

.mobile-progress-bar {
  margin-bottom: 8px;
}

.mobile-programs-progress {
  margin-bottom: 24px;
}

.mobile-section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.mobile-program-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-program-card {
  background: white;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-program-card:hover {
  border-color: #4a90e2;
  background: #f8f9ff;
}

.mobile-program-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.mobile-program-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #333;
  border-radius: 50%;
}

.mobile-program-info {
  flex: 1;
}

.mobile-program-name {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.mobile-program-status {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

.mobile-program-percentage {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.mobile-program-bar {
  margin-top: 8px;
}

.mobile-weekly-progress {
  margin-bottom: 24px;
}

.mobile-chart-container {
  background: white;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 20px;
}

.mobile-chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  color: #ccc;
}

.mobile-chart-text {
  margin-top: 8px;
  font-size: 14px;
  color: #999;
}

.mobile-achievements {
  margin-bottom: 24px;
}

.mobile-achievement-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-achievement-item {
  background: white;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-achievement-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #333;
  border-radius: 50%;
}

.mobile-achievement-content {
  flex: 1;
}

.mobile-achievement-title {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.mobile-achievement-date {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

.mobile-achievement-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #fff3cd;
  border: 2px solid #ffd700;
  border-radius: 50%;
}

.mobile-bottom-spacing {
  height: 20px;
}

/* Wireframe styling */
.mobile-progress * {
  box-sizing: border-box;
}

.mobile-progress {
  font-family: 'Roboto', sans-serif;
}
</style>
