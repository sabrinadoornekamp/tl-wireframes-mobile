<template>
  <div class="ontspannen-app">
    <!-- Program Overview -->
    <OntspannenProgram 
      v-if="currentView === 'program'"
      @navigate-to-session="navigateToSession"
      @show-message="showMessage"
    />
    
    <!-- Session Detail -->
    <OntspannenSession 
      v-else-if="currentView === 'session'"
      :session="currentSession"
      @navigate-back="navigateBack"
      @session-completed="onSessionCompleted"
      @navigate-to-next-session="navigateToNextSession"
      @show-message="showMessage"
    />
    
    <!-- Message Toast -->
    <div v-if="showToast" class="toast" :class="toastType">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script>
import OntspannenProgram from './OntspannenProgram.vue'
import OntspannenSession from './OntspannenSession.vue'
import programData from '../data/ontspannen-program.json'

export default {
  name: 'OntspannenApp',
  components: {
    OntspannenProgram,
    OntspannenSession
  },
  data() {
    return {
      currentView: 'program', // 'program' or 'session'
      currentSession: null,
      showToast: false,
      toastMessage: '',
      toastType: 'info'
    }
  },
  methods: {
    navigateToSession(session) {
      this.currentSession = session
      this.currentView = 'session'
    },
    
    navigateBack() {
      this.currentView = 'program'
      this.currentSession = null
    },
    
    onSessionCompleted(sessionId) {
      // Update user progress
      this.updateUserProgress(sessionId)
      
      // Show completion message
      this.showMessage('Session completed successfully!', 'success')
    },
    
    navigateToNextSession() {
      if (!this.currentSession) return
      
      // Find next session
      const allSessions = programData.modules.flatMap(module => module.sessions)
      const currentIndex = allSessions.findIndex(s => s.id === this.currentSession.id)
      const nextSession = allSessions[currentIndex + 1]
      
      if (nextSession) {
        this.currentSession = nextSession
        this.showMessage(`Starting next session: ${nextSession.name}`, 'info')
      } else {
        // All sessions completed
        this.navigateBack()
        this.showMessage('Congratulations! You have completed the entire program!', 'success')
      }
    },
    
    updateUserProgress(sessionId) {
      // Load current progress
      const progress = JSON.parse(localStorage.getItem('ontspannen-progress') || '{"completedSessions": []}')
      
      // Add completed session
      if (!progress.completedSessions.includes(sessionId)) {
        progress.completedSessions.push(sessionId)
        localStorage.setItem('ontspannen-progress', JSON.stringify(progress))
      }
    },
    
    showMessage(message, type = 'info') {
      this.toastMessage = message
      this.toastType = type
      this.showToast = true
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        this.showToast = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.ontspannen-app {
  min-height: 100vh;
  background: #f9f9f9;
}

.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border: 2px solid #000;
  border-radius: 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  font-weight: 500;
  z-index: 1001;
  animation: slideIn 0.3s ease;
}

.toast.info {
  background: #e3f2fd;
  color: #1976d2;
  border-color: #1976d2;
}

.toast.success {
  background: #e8f5e8;
  color: #388e3c;
  border-color: #388e3c;
}

.toast.error {
  background: #ffebee;
  color: #d32f2f;
  border-color: #d32f2f;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
