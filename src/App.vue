<template>
  <div class="mobile-app">
    <div class="mobile-header">
      <div class="header-content">
        <h1 class="app-title">Therapieland</h1>
        <div class="header-actions">
          <button class="header-btn" @click="openNotifications">🔔</button>
          <button class="header-btn" @click="openAccount">👤</button>
        </div>
      </div>
    </div>

    <div class="mobile-container">
      <!-- Dashboard Section -->
      <div v-if="currentSection === 'dashboard'" class="mobile-section">
        <h2 class="section-title">Dashboard</h2>
        
        <!-- Widget: Working On -->
        <div class="mobile-widget" @click="showSection('care-plan')">
          <div class="widget-header">
            <h3 class="widget-title">Working On</h3>
          </div>
          <div class="widget-content">
            <p class="widget-description">Current assignments and tasks</p>
          </div>
          
          <!-- Cognitive Behavioral Therapy -->
          <div class="program-item">
            <div class="program-header">
              <h4 class="program-name">Cognitive Behavioral Therapy</h4>
              <p class="program-description">Learn to identify and challenge negative thoughts</p>
            </div>
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" style="width: 65%"></div>
              </div>
              <span class="progress-text">65% Complete</span>
            </div>
          </div>

          <!-- Mindfulness & Stress Reduction -->
          <div class="program-item">
            <div class="program-header">
              <h4 class="program-name">Mindfulness & Stress Reduction</h4>
              <p class="program-description">Develop mindfulness techniques for stress management</p>
            </div>
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" style="width: 30%"></div>
              </div>
              <span class="progress-text">30% Complete</span>
            </div>
          </div>

          <!-- Ontspannen Program -->
          <div class="program-item ontspannen-item" @click.stop="showOntspannenProgram">
            <div class="program-header">
              <h4 class="program-name">Ontspannen</h4>
              <p class="program-description">Relaxation techniques and stress relief exercises</p>
            </div>
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" style="width: 20%"></div>
              </div>
              <span class="progress-text">20% Complete</span>
            </div>
            <div class="program-meta">4 Modules • 7 Sessions</div>
          </div>
        </div>

        <!-- Monitor Widget -->
        <div class="mobile-widget">
          <div class="widget-header">
            <h3 class="widget-title">Monitor</h3>
          </div>
          <div class="widget-content">
            <p class="widget-description">Health and progress tracking</p>
          </div>
        </div>
      </div>

      <!-- My Therapieland Section -->
      <div v-if="currentSection === 'care-plan'" class="mobile-section">
        <h2 class="section-title">My Therapieland</h2>
        
        <div class="mobile-widget">
          <div class="widget-header">
            <h3 class="widget-title">GGZ Drenthe</h3>
          </div>
          <div class="widget-content">
            <p class="widget-description">Status: Active</p>
            <p class="widget-meta">Assigned by: GGZ Drenthe</p>
          </div>
          
          <div class="assigned-programs">
            <h4 class="programs-title">Assigned Programs:</h4>
            
            <!-- Cognitive Behavioral Therapy -->
            <div class="program-item">
              <div class="program-header">
                <h4 class="program-name">Cognitive Behavioral Therapy</h4>
                <p class="program-description">Learn to identify and challenge negative thoughts</p>
              </div>
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 65%"></div>
                </div>
                <span class="progress-text">65% Complete</span>
              </div>
            </div>

            <!-- Mindfulness & Stress Reduction -->
            <div class="program-item">
              <div class="program-header">
                <h4 class="program-name">Mindfulness & Stress Reduction</h4>
                <p class="program-description">Develop mindfulness techniques for stress management</p>
              </div>
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 30%"></div>
                </div>
                <span class="progress-text">30% Complete</span>
              </div>
            </div>

            <!-- Ontspannen Program -->
            <div class="program-item ontspannen-item" @click="showOntspannenProgram">
              <div class="program-header">
                <h4 class="program-name">Ontspannen</h4>
                <p class="program-description">Relaxation techniques and stress relief exercises</p>
              </div>
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 20%"></div>
                </div>
                <span class="progress-text">20% Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ontspannen Program Section -->
      <div v-if="currentSection === 'ontspannen-program'" class="mobile-section">
        <div class="test-section">
          <h2>Ontspannen Program Test</h2>
          <p>If you can see this, the navigation is working!</p>
          <button @click="showSection('dashboard')" class="btn">Back to Dashboard</button>
        </div>
        <OntspannenApp />
      </div>

      <!-- Chat Section -->
      <div v-if="currentSection === 'chat'" class="mobile-section">
        <h2 class="section-title">Chat</h2>
        <div class="mobile-widget">
          <div class="widget-content">
            <p class="widget-description">Chat functionality would go here</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="bottom-navigation">
      <button 
        class="nav-btn" 
        :class="{ active: currentSection === 'dashboard' }"
        @click="showSection('dashboard')"
      >
        <span class="nav-icon">📊</span>
        <span class="nav-label">Dashboard</span>
      </button>
      
      <button 
        class="nav-btn" 
        :class="{ active: currentSection === 'care-plan' }"
        @click="showSection('care-plan')"
      >
        <span class="nav-icon">📋</span>
        <span class="nav-label">My Therapieland</span>
      </button>
      
      <button 
        class="nav-btn" 
        :class="{ active: currentSection === 'chat' }"
        @click="showSection('chat')"
      >
        <span class="nav-icon">💬</span>
        <span class="nav-label">Chat</span>
      </button>
    </div>

    <!-- Floating Action Button -->
    <button class="fab" @click="openHelp">❓</button>
  </div>
</template>

<script>
import OntspannenApp from './components/OntspannenApp.vue'

export default {
  name: 'App',
  components: {
    OntspannenApp
  },
  data() {
    return {
      currentSection: 'dashboard'
    }
  },
  methods: {
    showSection(section) {
      this.currentSection = section
    },
    
    showOntspannenProgram() {
      this.currentSection = 'ontspannen-program'
    },
    
    openNotifications() {
      alert('Opening notifications...')
    },
    
    openAccount() {
      alert('Opening account...')
    },
    
    openHelp() {
      alert('Opening help...')
    }
  }
}
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  background: white;
  color: #000;
}

.mobile-app {
  min-height: 100vh;
  background: white;
}

/* Header */
.mobile-header {
  background: white;
  border: 2px solid #000;
  border-radius: 0;
  padding: 16px;
  margin-bottom: 16px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin: 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.header-btn {
  background: white;
  border: 2px solid #000;
  border-radius: 0;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.header-btn:hover {
  background: #f5f5f5;
  transform: translateY(-1px);
}

/* Container */
.mobile-container {
  padding: 8px;
  padding-bottom: 100px;
}

.mobile-section {
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin-bottom: 16px;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

/* Widgets */
.mobile-widget {
  background: white;
  border: 2px solid #000;
  border-radius: 0;
  padding: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-widget:hover {
  border-color: #000;
  background: #f5f5f5;
  transform: translateY(-2px);
}

.widget-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.widget-title {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.widget-content {
  margin-bottom: 8px;
}

.widget-description {
  font-size: 14px;
  color: #000;
  line-height: 1.4;
  margin-bottom: 8px;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.widget-meta {
  font-size: 12px;
  color: #666;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

/* Program Items */
.program-item {
  background: white;
  border: 2px solid #000;
  border-radius: 0;
  padding: 12px;
  margin: 8px 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.program-item:hover {
  background: #f5f5f5;
  transform: translateY(-1px);
}

.ontspannen-item {
  background: #f0f8ff;
  border-color: #0066cc;
}

.program-header {
  margin-bottom: 8px;
}

.program-name {
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin-bottom: 4px;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.program-description {
  font-size: 12px;
  color: #000;
  line-height: 1.4;
  margin-bottom: 8px;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.program-meta {
  font-size: 11px;
  color: #666;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

/* Progress */
.progress-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: #e0e0e0;
  border: 1px solid #000;
  border-radius: 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #000;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 11px;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

/* Assigned Programs */
.assigned-programs {
  margin-top: 16px;
}

.programs-title {
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin-bottom: 12px;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

/* Test Section */
.test-section {
  background: white;
  border: 2px solid #000;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.test-section h2 {
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  margin-bottom: 10px;
}

.test-section p {
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  margin-bottom: 15px;
}

.btn {
  background: #000;
  color: white;
  border: none;
  padding: 10px 20px;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  cursor: pointer;
}

.btn:hover {
  background: #333;
}

/* Bottom Navigation */
.bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 2px solid #000;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  z-index: 1000;
}

.nav-btn {
  background: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.nav-btn:hover {
  background: #f5f5f5;
}

.nav-btn.active {
  background: #000;
  color: white;
}

.nav-icon {
  font-size: 16px;
}

.nav-label {
  font-size: 10px;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

/* Floating Action Button */
.fab {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 48px;
  height: 48px;
  background: white;
  border: 2px solid #000;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.2s ease;
}

.fab:hover {
  background: #f5f5f5;
  transform: scale(1.1);
}
</style>