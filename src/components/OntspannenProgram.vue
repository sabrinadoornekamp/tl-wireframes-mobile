<template>
  <div class="ontspannen-program">
    <!-- Breadcrumb Navigation -->
    <Breadcrumb 
      @navigate="handleBreadcrumbNavigation"
    />
    
    <!-- Program Header -->
    <div class="program-header">
      <h1 class="program-title">Ontspannen</h1>
      <p class="program-description">Relaxation techniques and stress relief exercises</p>
      <div class="program-stats">
        <div class="stat">
          <span class="stat-number">{{ program.totalModules }}</span>
          <span class="stat-label">Modules</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{ program.totalSessions }}</span>
          <span class="stat-label">Sessions</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{ program.estimatedDuration }}</span>
          <span class="stat-label">Duration</span>
        </div>
      </div>
    </div>

    <!-- Progress Overview -->
    <div class="progress-overview">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: overallProgress + '%' }"></div>
      </div>
      <div class="progress-text">{{ Math.round(overallProgress) }}% Complete</div>
    </div>

    <!-- Modules List -->
    <div class="modules-container">
      <div 
        v-for="module in program.modules" 
        :key="module.id"
        class="module-card"
        :class="{ 'locked': !isModuleUnlocked(module) }"
      >
        <div class="module-header">
          <h3 class="module-title">{{ module.name }}</h3>
          <div class="module-status">
            <span v-if="isModuleCompleted(module)" class="status-completed">✓</span>
            <span v-else-if="isModuleInProgress(module)" class="status-in-progress">●</span>
            <span v-else-if="isModuleUnlocked(module)" class="status-available">○</span>
            <span v-else class="status-locked">🔒</span>
          </div>
        </div>
        <p class="module-description">{{ module.description }}</p>
        
        <!-- Sessions within module -->
        <div class="sessions-list">
          <div 
            v-for="session in module.sessions" 
            :key="session.id"
            class="session-item"
            :class="{ 
              'locked': !isSessionUnlocked(session),
              'completed': isSessionCompleted(session),
              'current': isCurrentSession(session)
            }"
            @click="startSession(session)"
          >
            <div class="session-header">
              <h4 class="session-title">{{ session.name }}</h4>
              <div class="session-status">
                <span v-if="isSessionCompleted(session)" class="status-completed">✓</span>
                <span v-else-if="isCurrentSession(session)" class="status-current">▶</span>
                <span v-else-if="isSessionUnlocked(session)" class="status-available">○</span>
                <span v-else class="status-locked">🔒</span>
              </div>
            </div>
            <p class="session-description">{{ session.description }}</p>
            <div class="session-meta">
              <span class="session-time">{{ session.estimatedTime }}</span>
              <span v-if="session.steps" class="session-steps">{{ session.steps.length }} steps</span>
            </div>
            
            <!-- Special indicators -->
            <div v-if="session.isFirstSession" class="session-badge first-session">
              Start Here
            </div>
            <div v-if="session.isLastSession" class="session-badge last-session">
              Final Session
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Coach Selection Modal (for first session) -->
    <div v-if="showCoachSelection" class="modal-overlay" @click="closeCoachSelection">
      <div class="modal-content" @click.stop>
        <h3>Kies Jouw Anker Coach</h3>
        <p>Selecteer hieronder de coach die jou het meest aanspreekt. Je coach zal je door het programma leiden, stap voor stap.</p>
        
        <div class="coach-options">
          <div 
            v-for="coach in availableCoaches" 
            :key="coach.id"
            class="coach-option"
            :class="{ 'selected': selectedCoach === coach.id }"
            @click="selectCoach(coach.id)"
          >
            <div class="coach-avatar">{{ coach.avatar }}</div>
            <div class="coach-info">
              <h4>{{ coach.name }}</h4>
              <p>{{ coach.specialty }}</p>
              <p class="coach-description">{{ coach.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button 
            class="btn-secondary" 
            @click="closeCoachSelection"
          >
            Annuleren
          </button>
          <button 
            class="btn-primary" 
            @click="confirmCoachSelection"
            :disabled="!selectedCoach"
          >
            Start Programma
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import programData from '../data/ontspannen-program.json'
import Breadcrumb from './Breadcrumb.vue'

export default {
  name: 'OntspannenProgram',
  components: {
    Breadcrumb
  },
  data() {
    return {
      program: programData.program,
      modules: programData.modules,
      userProgress: {
        completedSessions: [],
        currentSession: null,
        selectedCoach: null,
        startDate: null
      },
      showCoachSelection: false,
      selectedCoach: null,
      availableCoaches: [
        {
          id: 'coach-1',
          name: 'Dr. Sarah',
          specialty: 'Mindfulness & Stress Management',
          avatar: '🧘‍♀️',
          description: 'Gespecialiseerd in mindfulness en stress management technieken'
        },
        {
          id: 'coach-2', 
          name: 'Dr. Michael',
          specialty: 'Cognitive Behavioral Therapy',
          avatar: '👨‍⚕️',
          description: 'Expert in cognitieve gedragstherapie en ontspanningstechnieken'
        },
        {
          id: 'coach-3',
          name: 'Dr. Lisa',
          specialty: 'Relaxation Techniques',
          avatar: '👩‍⚕️',
          description: 'Gespecialiseerd in progressieve relaxatie en ademhalingsoefeningen'
        }
      ]
    }
  },
  computed: {
    overallProgress() {
      const totalSessions = this.program.totalSessions
      const completedSessions = this.userProgress.completedSessions.length
      return (completedSessions / totalSessions) * 100
    }
  },
  methods: {
    isModuleUnlocked(module) {
      // First module is always unlocked
      if (module.order === 1) return true
      
      // Check if previous module is completed
      const previousModule = this.modules.find(m => m.order === module.order - 1)
      return previousModule && this.isModuleCompleted(previousModule)
    },
    
    isModuleCompleted(module) {
      return module.sessions.every(session => 
        this.userProgress.completedSessions.includes(session.id)
      )
    },
    
    isModuleInProgress(module) {
      return module.sessions.some(session => 
        this.userProgress.completedSessions.includes(session.id)
      ) && !this.isModuleCompleted(module)
    },
    
    isSessionUnlocked(session) {
      // First session is always unlocked
      if (session.order === 1) return true
      
      // Check if previous session is completed
      const allSessions = this.modules.flatMap(m => m.sessions)
      const previousSession = allSessions.find(s => s.order === session.order - 1)
      return previousSession && this.userProgress.completedSessions.includes(previousSession.id)
    },
    
    isSessionCompleted(session) {
      return this.userProgress.completedSessions.includes(session.id)
    },
    
    isCurrentSession(session) {
      return this.userProgress.currentSession === session.id
    },
    
    startSession(session) {
      if (!this.isSessionUnlocked(session)) {
        this.$emit('show-message', 'Please complete the previous session first.')
        return
      }
      
      // Check if this is the first session and show coach selection
      if (session.isFirstSession && !this.userProgress.selectedCoach) {
        this.showCoachSelection = true
        return
      }
      
      // Navigate to session
      this.$emit('navigate-to-session', session)
    },
    
    selectCoach(coachId) {
      this.selectedCoach = coachId
    },
    
    confirmCoachSelection() {
      if (!this.selectedCoach) return
      
      this.userProgress.selectedCoach = this.selectedCoach
      this.userProgress.startDate = new Date().toISOString()
      this.showCoachSelection = false
      
      // Start the first session
      const firstSession = this.modules[0].sessions[0]
      this.$emit('navigate-to-session', firstSession)
    },
    
    closeCoachSelection() {
      this.showCoachSelection = false
      this.selectedCoach = null
    },
    
    handleBreadcrumbNavigation(route) {
      // Breadcrumb navigation is handled by the parent component
      // This is just a placeholder for the breadcrumb component
    }
  },
  
  mounted() {
    // Load user progress from localStorage or API
    const savedProgress = localStorage.getItem('ontspannen-progress')
    if (savedProgress) {
      this.userProgress = { ...this.userProgress, ...JSON.parse(savedProgress) }
    }
  },
  
  watch: {
    userProgress: {
      handler(newProgress) {
        // Save progress to localStorage
        localStorage.setItem('ontspannen-progress', JSON.stringify(newProgress))
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.ontspannen-program {
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
}

.program-header {
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: white;
  border: 2px solid #000;
  border-radius: 0;
}

.program-title {
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin: 0 0 8px 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.program-description {
  color: #000;
  margin: 0 0 16px 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.program-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 20px;
  font-weight: 600;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.stat-label {
  font-size: 12px;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.progress-overview {
  margin-bottom: 24px;
  padding: 16px;
  background: white;
  border: 2px solid #000;
  border-radius: 0;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border: 1px solid #000;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: #000;
  transition: width 0.3s ease;
}

.progress-text {
  text-align: right;
  font-size: 14px;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.modules-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.module-card {
  background: white;
  border: 2px solid #000;
  border-radius: 0;
  padding: 16px;
  transition: all 0.2s ease;
}

.module-card.locked {
  opacity: 0.6;
  background: #f5f5f5;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.module-title {
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin: 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.module-status {
  font-size: 16px;
}

.status-completed { color: #4caf50; }
.status-in-progress { color: #ff9800; }
.status-available { color: #2196f3; }
.status-locked { color: #9e9e9e; }

.module-description {
  color: #000;
  margin: 0 0 16px 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.session-item {
  background: white;
  border: 2px solid #000;
  border-radius: 0;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.session-item:hover {
  background: #f5f5f5;
  transform: translateY(-1px);
}

.session-item.locked {
  opacity: 0.6;
  cursor: not-allowed;
  background: #f5f5f5;
}

.session-item.completed {
  background: #e8f5e8;
  border-color: #4caf50;
}

.session-item.current {
  background: #fff3e0;
  border-color: #ff9800;
}

.session-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.session-title {
  font-size: 16px;
  font-weight: 500;
  color: #000;
  margin: 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.session-status {
  font-size: 14px;
}

.status-current { color: #ff9800; }

.session-description {
  color: #000;
  margin: 0 0 8px 0;
  font-size: 14px;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.session-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.session-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 500;
  border-radius: 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.first-session {
  background: #4caf50;
  color: white;
}

.last-session {
  background: #ff9800;
  color: white;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border: 2px solid #000;
  border-radius: 0;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-content h3 {
  margin: 0 0 16px 0;
  font-size: 20px;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.coach-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 16px 0;
}

.coach-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 2px solid #000;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.coach-option:hover {
  background: #f5f5f5;
}

.coach-option.selected {
  background: #e3f2fd;
  border-color: #2196f3;
}

.coach-avatar {
  font-size: 24px;
}

.coach-info h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.coach-info p {
  margin: 0;
  font-size: 14px;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.coach-description {
  font-size: 12px !important;
  color: #666 !important;
  margin-top: 4px !important;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-primary, .btn-secondary {
  padding: 12px 24px;
  border: 2px solid #000;
  border-radius: 0;
  font-weight: 500;
  cursor: pointer;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #000;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #333;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: #000;
}

.btn-secondary:hover {
  background: #f5f5f5;
}
</style>
