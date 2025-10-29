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
        
        <!-- Healthcare Provider: GGZ Drenthe -->
        <div class="mobile-widget provider-widget">
            <div class="widget-header">
            <h3 class="widget-title">🏥 GGZ Drenthe</h3>
            <div class="status-badge active">Active</div>
            </div>
            <div class="widget-content">
              <p class="widget-meta">Assigned by: GGZ Drenthe</p>
            <p class="widget-description">Your primary mental health care provider</p>
            </div>
            
          <!-- Assigned Programs Section -->
            <div class="assigned-programs">
            <h4 class="programs-title">📚 Assigned Programs</h4>
              
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

              <!-- Trauma Recovery Program -->
              <div class="program-item">
                <div class="program-header">
                  <h4 class="program-name">Trauma Recovery Program</h4>
                  <p class="program-description">Specialized program for trauma recovery</p>
                </div>
                <div class="progress-container">
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                  </div>
                  <span class="progress-text">0% Complete</span>
              </div>
            </div>

            </div>

          <!-- Assigned Questionnaires Section -->
          <div class="assigned-questionnaires">
            <h4 class="programs-title">📋 Assigned Questionnaires</h4>
            
            <div class="questionnaire-item">
              <div class="questionnaire-header">
                <h5 class="questionnaire-name">Anxiety Assessment</h5>
                <span class="questionnaire-status pending">Pending</span>
            </div>
              <p class="questionnaire-description">Weekly anxiety level assessment</p>
          </div>

            <div class="questionnaire-item">
              <div class="questionnaire-header">
                <h5 class="questionnaire-name">Mood Tracking</h5>
                <span class="questionnaire-status completed">Completed</span>
              </div>
              <p class="questionnaire-description">Daily mood and emotional state tracking</p>
            </div>
          </div>
        </div>

        <!-- Healthcare Provider: Spoor30 -->
        <div class="mobile-widget provider-widget">
            <div class="widget-header">
            <h3 class="widget-title">🏥 Spoor30</h3>
            <div class="status-badge active">Active</div>
            </div>
            <div class="widget-content">
              <p class="widget-meta">Assigned by: Spoor30</p>
            <p class="widget-description">Additional specialized care provider</p>
            </div>
            
          <!-- Assigned Programs Section -->
            <div class="assigned-programs">
            <h4 class="programs-title">📚 Assigned Programs</h4>
              
              <!-- Depression Treatment Program -->
              <div class="program-item">
                <div class="program-header">
                  <h4 class="program-name">Depression Treatment Program</h4>
                  <p class="program-description">Comprehensive treatment for depression management</p>
                </div>
                <div class="progress-container">
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 25%"></div>
                  </div>
                  <span class="progress-text">25% Complete</span>
                </div>
              </div>

              <!-- Sleep Hygiene Program -->
              <div class="program-item">
                <div class="program-header">
                  <h4 class="program-name">Sleep Hygiene Program</h4>
                  <p class="program-description">Improve sleep quality and establish healthy sleep patterns</p>
                </div>
                <div class="progress-container">
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 10%"></div>
                  </div>
                  <span class="progress-text">10% Complete</span>
                </div>
              </div>

              <!-- Ontspannen Program -->
              <div class="program-item ontspannen-item" @click="showOntspannenProgram">
                <div class="program-header">
                  <h4 class="program-name">🧘‍♀️ Ontspannen</h4>
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

          <!-- Assigned Questionnaires Section -->
            <div class="assigned-questionnaires">
            <h4 class="programs-title">📋 Assigned Questionnaires</h4>
              
              <div class="questionnaire-item">
              <div class="questionnaire-header">
                <h5 class="questionnaire-name">PHQ-9 Depression Scale</h5>
                <span class="questionnaire-status pending">Pending</span>
              </div>
              <p class="questionnaire-description">Weekly depression assessment</p>
              </div>

              <div class="questionnaire-item">
              <div class="questionnaire-header">
                <h5 class="questionnaire-name">Sleep Quality Assessment</h5>
                <span class="questionnaire-status completed">Completed</span>
              </div>
              <p class="questionnaire-description">Daily sleep quality tracking</p>
            </div>
              </div>
            </div>

        <!-- Self-Care Programs Organization -->
        <div class="mobile-widget provider-widget">
            <div class="widget-header">
            <h3 class="widget-title">🧘 Self-Care Programs</h3>
            <div class="status-badge active">Available</div>
            </div>
            <div class="widget-content">
              <p class="widget-meta">Self-directed programs</p>
            <p class="widget-description">Programs you can access independently</p>
            </div>
            
          <!-- Assigned Programs Section -->
            <div class="assigned-programs">
            <h4 class="programs-title">📚 Available Programs</h4>
              
              <!-- Mindfulness Meditation -->
              <div class="program-item">
                <div class="program-header">
                  <h4 class="program-name">Mindfulness Meditation</h4>
                  <p class="program-description">Daily meditation practices for stress relief</p>
                </div>
                <div class="progress-container">
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 40%"></div>
                  </div>
                  <span class="progress-text">40% Complete</span>
                </div>
              </div>

              <!-- Breathing Exercises -->
              <div class="program-item">
                <div class="program-header">
                  <h4 class="program-name">Breathing Exercises</h4>
                  <p class="program-description">Guided breathing techniques for anxiety management</p>
                </div>
                <div class="progress-container">
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 15%"></div>
                  </div>
                  <span class="progress-text">15% Complete</span>
                </div>
              </div>

              <!-- Ontspannen Program -->
              <div class="program-item ontspannen-item clickable" @click="showOntspannenProgram">
                <div class="program-header">
                  <h4 class="program-name">🧘‍♀️ Ontspannen</h4>
                  <p class="program-description">Relaxation techniques and stress relief exercises</p>
                </div>
                <div class="progress-container">
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 20%"></div>
                  </div>
                  <span class="progress-text">20% Complete</span>
                </div>
                <div class="program-meta">4 Modules • 7 Sessions • 45-50 Minutes</div>
                <div class="program-action">Tap to continue →</div>
              </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="mobile-widget actions-widget">
            <div class="widget-header">
            <h3 class="widget-title">⚡ Quick Actions</h3>
            </div>
          <div class="quick-actions">
            <button class="action-btn" @click="showSection('monitors')">
              <span class="action-icon">📊</span>
              <span class="action-text">View Progress</span>
            </button>
            <button class="action-btn" @click="showSection('chat')">
              <span class="action-icon">💬</span>
              <span class="action-text">Contact Support</span>
            </button>
            <button class="action-btn" @click="openNotifications">
              <span class="action-icon">🔔</span>
              <span class="action-text">Notifications</span>
            </button>
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
      this.currentSection = 'notifications'
    },
    
    openAccount() {
      this.currentSection = 'account'
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

/* My Therapieland specific styles */
.provider-widget {
  margin-bottom: 20px;
  background: white;
  border: 3px solid #000;
  border-radius: 0;
  padding: 20px;
  cursor: default;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  position: relative;
}

.provider-widget::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border: 2px solid #007bff;
  border-radius: 0;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.provider-widget:hover {
  background: #f9f9f9;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.25);
}

.provider-widget:hover::before {
  opacity: 1;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.status-badge.active {
  background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
  color: #2e7d32;
  border: 1px solid #4caf50;
}

.programs-title {
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin: 20px 0 16px 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f0f0;
  position: relative;
}

.programs-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 30px;
  height: 2px;
  background: #007bff;
}

.assigned-programs {
  margin-bottom: 16px;
}

.assigned-programs .program-item {
  background: linear-gradient(135deg, #fafafa, #f5f5f5);
  border: 2px solid #000;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.assigned-programs .program-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #007bff, #0056b3);
}

.assigned-programs .program-item:hover {
  background: linear-gradient(135deg, #f0f8ff, #e6f3ff);
  border-color: #007bff;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0,123,255,0.15);
}

.assigned-questionnaires {
  margin-bottom: 16px;
}

.questionnaire-item {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #fafafa, #f5f5f5);
  transition: all 0.3s ease;
  position: relative;
}

.questionnaire-item:hover {
  background: linear-gradient(135deg, #f0f8ff, #e6f3ff);
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,123,255,0.1);
}

.questionnaire-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.questionnaire-name {
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin: 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.questionnaire-status {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
}

.questionnaire-status.pending {
  background: linear-gradient(135deg, #fff3e0, #ffe0b2);
  color: #f57c00;
  border: 1px solid #ffb74d;
  box-shadow: 0 2px 4px rgba(245,124,0,0.2);
}

.questionnaire-status.completed {
  background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
  color: #2e7d32;
  border: 1px solid #4caf50;
  box-shadow: 0 2px 4px rgba(46,125,50,0.2);
}

.questionnaire-description {
  font-size: 12px;
  color: #666;
  margin: 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.self-care-widget {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border: 2px solid #007bff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  cursor: default;
  box-shadow: 0 4px 8px rgba(0,123,255,0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.self-care-widget::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #0056b3, #007bff);
}

.self-care-widget:hover {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0,123,255,0.2);
}

.ontspannen-item.clickable {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #007bff;
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  position: relative;
  overflow: hidden;
}

.ontspannen-item.clickable::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #007bff, #0056b3);
}

.ontspannen-item.clickable:hover {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0,123,255,0.25);
  border-color: #0056b3;
}

.program-meta {
  font-size: 12px;
  color: #666;
  margin: 8px 0;
  font-style: italic;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.program-action {
  font-size: 13px;
  color: #007bff;
  font-weight: 700;
  margin-top: 12px;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  text-align: center;
  padding: 8px 16px;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-radius: 20px;
  border: 1px solid #007bff;
  transition: all 0.3s ease;
}

.ontspannen-item.clickable:hover .program-action {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  transform: scale(1.05);
}

.actions-widget {
  background: linear-gradient(135deg, #f0f8ff, #e6f3ff);
  border: 2px solid #007bff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  cursor: default;
  box-shadow: 0 4px 8px rgba(0,123,255,0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.actions-widget::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #0056b3, #007bff);
}

.actions-widget:hover {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0,123,255,0.2);
}

.quick-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 100px;
  padding: 16px 12px;
  border: 2px solid #007bff;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0,123,255,0.1), transparent);
  transition: left 0.5s ease;
}

.action-btn:hover {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 16px rgba(0,123,255,0.3);
}

.action-btn:hover::before {
  left: 100%;
}

.action-icon {
  font-size: 24px;
  transition: all 0.3s ease;
}

.action-btn:hover .action-icon {
  transform: scale(1.2);
}

.action-text {
  font-size: 12px;
  font-weight: 700;
  color: #000;
  text-align: center;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  transition: all 0.3s ease;
}
</style>