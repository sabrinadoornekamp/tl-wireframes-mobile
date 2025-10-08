<template>
  <div class="wireframe-dashboard">
    <div class="wireframe-header">
      <div class="wireframe-title">Therapieland Dashboard</div>
      <div class="wireframe-subtitle">Your personalized therapy journey and wellness tracking</div>
    </div>
    
    <div class="wireframe-content">
      <div class="wireframe-main-section">
        <div class="wireframe-card wireframe-overview">
          <div class="wireframe-card-header">
            <div class="wireframe-card-title">Widget</div>
            <div class="wireframe-card-icon"></div>
          </div>
          <div class="wireframe-card-content">
            <div class="wireframe-metric">
              <div class="wireframe-metric-label">Active Programs</div>
              <div class="wireframe-metric-value">3</div>
            </div>
            <div class="wireframe-metric">
              <div class="wireframe-metric-label">Completed Sessions</div>
              <div class="wireframe-metric-value">24/30</div>
            </div>
            <div class="wireframe-metric">
              <div class="wireframe-metric-label">Progress Rate</div>
              <div class="wireframe-metric-value">80%</div>
            </div>
          </div>
        </div>
        
        <div class="wireframe-charts">
          <div class="wireframe-chart wireframe-chart-large">
            <div class="wireframe-chart-header">
              <div class="wireframe-chart-title">Widget</div>
              <div class="wireframe-chart-controls">
                <div class="wireframe-button">Week</div>
                <div class="wireframe-button">Month</div>
                <div class="wireframe-button">Year</div>
              </div>
            </div>
            <div class="wireframe-chart-content">
              <div class="wireframe-chart-placeholder"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="wireframe-side-section">
        <div class="wireframe-card wireframe-tasks">
          <div class="wireframe-card-header">
            <div class="wireframe-card-title">Widget</div>
            <div class="wireframe-card-icon"></div>
          </div>
          <div class="wireframe-card-content">
            <div class="wireframe-task-list">
              <div class="wireframe-task" v-for="(task, i) in tasks" :key="i">
                <div class="wireframe-task-icon"></div>
                <div class="wireframe-task-content">
                  <div class="wireframe-task-title">{{ task.title }}</div>
                  <div class="wireframe-task-subtitle">{{ task.subtitle }}</div>
                </div>
                <div class="wireframe-task-status"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="wireframe-card wireframe-notifications">
          <div class="wireframe-card-header">
            <div class="wireframe-card-title">Widget</div>
            <div class="wireframe-card-icon"></div>
          </div>
          <div class="wireframe-card-content">
            <div class="wireframe-notification-list">
              <div class="wireframe-notification">
                <div class="wireframe-notification-icon"></div>
                <div class="wireframe-notification-content">
                  <div class="wireframe-notification-title">Therapy session reminder</div>
                  <div class="wireframe-notification-time">Tomorrow 2:00 PM</div>
                </div>
              </div>
              <div class="wireframe-notification">
                <div class="wireframe-notification-icon"></div>
                <div class="wireframe-notification-content">
                  <div class="wireframe-notification-title">New exercise program available</div>
                  <div class="wireframe-notification-time">1 hour ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const tasks = [
  { title: 'Complete daily mood check-in', subtitle: 'Due today' },
  { title: 'Practice breathing exercises', subtitle: '2 sessions pending' },
  { title: 'Review therapy homework', subtitle: 'Tomorrow 3 PM' },
]
</script>

<style scoped>
/* Wireframe Dashboard Styles */
.wireframe-dashboard {
  padding: 24px;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
}

/* Dashboard specific styles */

.wireframe-header {
  margin-bottom: 32px;
  border: 2px solid #333;
  padding: 20px;
  border-radius: 4px;
  background: white;
  color: #333;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
}

.wireframe-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
}

.wireframe-subtitle {
  color: #666;
  font-size: 16px;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
}

.wireframe-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.wireframe-main-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.wireframe-side-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.wireframe-card {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 20px;
}

.wireframe-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #333;
}

.wireframe-card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.wireframe-card-icon {
  width: 24px;
  height: 24px;
  border: 2px solid #333;
  border-radius: 2px;
}

.wireframe-card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.wireframe-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid #333;
  border-radius: 4px;
}

.wireframe-metric-label {
  color: #666;
  font-size: 14px;
}

.wireframe-metric-value {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.wireframe-chart {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 20px;
}

.wireframe-chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #333;
}

.wireframe-chart-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.wireframe-chart-controls {
  display: flex;
  gap: 8px;
}

.wireframe-button {
  padding: 6px 12px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  color: #333;
}

.wireframe-button:hover {
  border-width: 3px;
}

.wireframe-chart-content {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wireframe-chart-placeholder {
  width: 100%;
  height: 160px;
  border: 2px dashed #999;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-style: italic;
}

.wireframe-task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wireframe-task {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #333;
  border-radius: 4px;
  gap: 12px;
}

.wireframe-task-icon {
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-radius: 2px;
}

.wireframe-task-content {
  flex: 1;
}

.wireframe-task-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.wireframe-task-subtitle {
  font-size: 12px;
  color: #666;
}

.wireframe-task-status {
  width: 16px;
  height: 16px;
  border: 2px solid #333;
  border-radius: 50%;
}

.wireframe-notification-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wireframe-notification {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #333;
  border-radius: 4px;
  gap: 12px;
}

.wireframe-notification-icon {
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-radius: 50%;
}

.wireframe-notification-content {
  flex: 1;
}

.wireframe-notification-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.wireframe-notification-time {
  font-size: 12px;
  color: #666;
}

/* Responsive */
@media (max-width: 768px) {
  .wireframe-content {
    grid-template-columns: 1fr;
  }
}
</style>


