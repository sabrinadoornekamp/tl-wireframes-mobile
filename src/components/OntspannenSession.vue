<template>
  <div class="ontspannen-session">
    <!-- Breadcrumb Navigation -->
    <Breadcrumb 
      :current-session="session"
      @navigate="handleBreadcrumbNavigation"
    />
    
    <!-- Session Header -->
    <div class="session-header">
      <button class="back-button" @click="goBack">
        ← Terug naar Programma
      </button>
      <div class="session-info">
        <h1 class="session-title">{{ session.name }}</h1>
        <p class="session-description">{{ session.description }}</p>
        <div class="session-meta">
          <span class="session-time">{{ session.estimatedTime }}</span>
          <span class="session-progress">{{ currentStepIndex + 1 }} / {{ session.steps.length }}</span>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="session-progress-bar">
      <div class="progress-fill" :style="{ width: sessionProgress + '%' }"></div>
    </div>

    <!-- Current Step Content -->
    <div class="step-content" v-if="currentStep">
      <div class="step-header">
        <h2 class="step-title">{{ currentStep.title }}</h2>
        <div class="step-type-badge" :class="currentStep.type">
          {{ getStepTypeLabel(currentStep.type) }}
        </div>
      </div>

      <!-- Video Content -->
      <div v-if="currentStep.contentType.includes('video')" class="video-container">
        <div class="video-placeholder">
          <div class="play-button">▶</div>
          <div class="video-title">{{ getVideoTitle(currentStep) }}</div>
          <div class="video-duration">{{ getVideoDuration(currentStep) }}</div>
        </div>
      </div>

      <!-- Text Content -->
      <div v-if="currentStep.contentType.includes('text')" class="text-content">
        <div class="content-text" v-html="getStepContent(currentStep)"></div>
        <div class="word-count" v-if="currentStep.maxWords">
          Max {{ currentStep.maxWords }} words
        </div>
      </div>

      <!-- Audio Exercise -->
      <div v-if="currentStep.contentType.includes('audio')" class="audio-exercise">
        <div class="audio-player">
          <button class="play-audio-btn" @click="playAudio">
            {{ isPlaying ? '⏸️' : '▶️' }} Play Audio Exercise
          </button>
          <div class="audio-duration">{{ getAudioDuration(currentStep) }}</div>
        </div>
        <div class="audio-description">{{ currentStep.description }}</div>
      </div>

      <!-- Exercise Video -->
      <div v-if="currentStep.contentType.includes('exercise') && currentStep.contentType.includes('video')" class="exercise-video">
        <div class="exercise-placeholder">
          <div class="exercise-icon">🏃‍♀️</div>
          <div class="exercise-title">{{ currentStep.title }}</div>
          <div class="exercise-description">{{ currentStep.description }}</div>
        </div>
      </div>

      <!-- Assignment -->
      <div v-if="currentStep.contentType === 'assignment'" class="assignment-content">
        <div class="assignment-description">{{ currentStep.description }}</div>
        <div class="assignment-input">
          <textarea 
            v-model="assignmentResponse" 
            placeholder="Schrijf je antwoord hier..."
            class="assignment-textarea"
          ></textarea>
        </div>
      </div>

      <!-- Reflection Assignment -->
      <div v-if="currentStep.type === 'reflection'" class="reflection-content">
        <div class="reflection-prompt">{{ getReflectionPrompt(currentStep) }}</div>
        <div class="reflection-input">
          <textarea 
            v-model="reflectionResponse" 
            placeholder="Denk na over je ervaring..."
            class="reflection-textarea"
          ></textarea>
        </div>
      </div>

      <!-- Step Navigation -->
      <div class="step-navigation">
        <button 
          v-if="currentStepIndex > 0"
          class="btn-secondary" 
          @click="previousStep"
        >
          ← Vorige
        </button>
        <button 
          class="btn-primary" 
          @click="nextStep"
          :disabled="!canProceed"
        >
          {{ isLastStep ? 'Sessie Voltooien' : 'Volgende Stap' }} →
        </button>
      </div>
    </div>

    <!-- Library Links -->
    <div v-if="session.libraryLinks && session.libraryLinks.length > 0" class="library-links">
      <h3>Aanvullende Bronnen</h3>
      <div class="library-list">
        <div 
          v-for="(link, index) in session.libraryLinks" 
          :key="index"
          class="library-item"
          @click="openLibraryLink(link)"
        >
          <div class="library-icon">📚</div>
          <div class="library-text">{{ link }}</div>
        </div>
      </div>
    </div>

    <!-- Session Completion Modal -->
    <div v-if="showCompletionModal" class="modal-overlay" @click="closeCompletionModal">
      <div class="modal-content" @click.stop>
        <div class="completion-content">
          <div class="completion-icon">🎉</div>
          <h3>Sessie Voltooid!</h3>
          <p>Geweldig werk! Je hebt "{{ session.name }}" voltooid. Je maakt uitstekende voortgang op je ontspanningsreis.</p>
          
          <div class="completion-stats">
            <div class="stat">
              <span class="stat-number">{{ session.steps.length }}</span>
              <span class="stat-label">Stappen Voltooid</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ session.estimatedTime }}</span>
              <span class="stat-label">Tijd Besteed</span>
            </div>
          </div>
          
          <div class="completion-actions">
            <button class="btn-secondary" @click="closeCompletionModal">
              Later Doorgaan
            </button>
            <button class="btn-primary" @click="goToNextSession">
              Volgende Sessie
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue'

export default {
  name: 'OntspannenSession',
  components: {
    Breadcrumb
  },
  props: {
    session: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentStepIndex: 0,
      assignmentResponse: '',
      reflectionResponse: '',
      isPlaying: false,
      showCompletionModal: false,
      completedSteps: []
    }
  },
  computed: {
    currentStep() {
      return this.session.steps[this.currentStepIndex]
    },
    isLastStep() {
      return this.currentStepIndex === this.session.steps.length - 1
    },
    sessionProgress() {
      return ((this.currentStepIndex + 1) / this.session.steps.length) * 100
    },
    canProceed() {
      // Check if current step requirements are met
      if (this.currentStep.type === 'assignment' && !this.assignmentResponse.trim()) {
        return false
      }
      if (this.currentStep.type === 'reflection' && !this.reflectionResponse.trim()) {
        return false
      }
      return true
    }
  },
  methods: {
    getStepTypeLabel(type) {
      const labels = {
        'introduction': 'Introduction',
        'core_explanation': 'Core Learning',
        'exercise': 'Practice',
        'assignment': 'Assignment',
        'reflection': 'Reflection'
      }
      return labels[type] || type
    },
    
    getVideoTitle(step) {
      return step.title
    },
    
    getVideoDuration(step) {
      // Mock duration based on content type
      if (step.contentType === 'video_coach') return '2:30'
      if (step.contentType === 'video_text') return '3:45'
      if (step.contentType === 'video_exercise') return '4:20'
      return '3:00'
    },
    
    getAudioDuration(step) {
      return '5:30'
    },
    
    getStepContent(step) {
      // Return the content from the step data if available, otherwise use focus-based content
      if (step.content) {
        return step.content
      }
      
      // Fallback content based on step type and focus
      const contentMap = {
        'ownership': 'Welkom bij je ontspanningsreis. Dit is jouw persoonlijke ruimte om veerkracht en innerlijke kracht te ontwikkelen.',
        'scientific_understanding': 'Spanning is een natuurlijke reactie die is geëvolueerd om ons te beschermen. Dit begrijpen helpt ons ermee te werken in plaats van ertegen.',
        'expectations': 'Ontspanning is een vaardigheid die kan worden geleerd en verbeterd met oefening. Stel realistische verwachtingen voor je voortgang.',
        'early_recognition': 'Leer je persoonlijke spanningssignalen vroeg herkennen, voordat ze overweldigend worden.',
        'balance_understanding': 'Begrijpen van de balans tussen je vermogen om stress te hanteren en de werkelijke last die je draagt.',
        'choice_model': 'Het Hoofd-Hart-Hand model helpt je de juiste ontspanningstechniek te kiezen voor je huidige situatie.',
        'progressive_relaxation': 'Progressieve relaxatie helpt fysieke spanning systematisch los te laten.',
        'movement_discharge': 'Beweging kan helpen opgebouwde energie en stress af te voeren.',
        'breathing_anchor': 'Ademhalingsoefeningen bieden een betrouwbaar anker tijdens stressvolle momenten.',
        'mental_calm': 'Visualisatie en mindfulness technieken helpen de geest te kalmeren.',
        'social_creative': 'Sociale verbindingen en creatieve activiteiten geven oxytocine vrij, het bindingshormoon.',
        'exercise_selection': 'Kies de oefeningen die het beste voor je werken.',
        'routine_automation': 'Bouw ontspanning in je dagelijkse routine voor blijvende voordelen.'
      }
      
      return contentMap[step.focus] || step.description
    },
    
    getReflectionPrompt(step) {
      return 'Neem een moment om na te denken over wat je hebt geleerd en hoe je dit kunt toepassen in je dagelijks leven.'
    },
    
    playAudio() {
      this.isPlaying = !this.isPlaying
      // Mock audio playback
      setTimeout(() => {
        this.isPlaying = false
      }, 5000)
    },
    
    openLibraryLink(link) {
      // Mock library link opening
      this.$emit('show-message', `Opening: ${link}`)
    },
    
    nextStep() {
      if (this.isLastStep) {
        this.completeSession()
      } else {
        this.currentStepIndex++
      }
    },
    
    previousStep() {
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--
      }
    },
    
    completeSession() {
      this.showCompletionModal = true
      this.$emit('session-completed', this.session.id)
    },
    
    closeCompletionModal() {
      this.showCompletionModal = false
    },
    
    goToNextSession() {
      this.closeCompletionModal()
      this.$emit('navigate-to-next-session')
    },
    
    goBack() {
      this.$emit('navigate-back')
    },
    
    handleBreadcrumbNavigation(route) {
      if (route === 'program') {
        this.$emit('navigate-back')
      }
    }
  },
  
  mounted() {
    // Load session progress from localStorage
    const savedProgress = localStorage.getItem(`session-${this.session.id}-progress`)
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      this.currentStepIndex = progress.currentStepIndex || 0
      this.assignmentResponse = progress.assignmentResponse || ''
      this.reflectionResponse = progress.reflectionResponse || ''
    }
  },
  
  watch: {
    currentStepIndex() {
      this.saveProgress()
    },
    assignmentResponse() {
      this.saveProgress()
    },
    reflectionResponse() {
      this.saveProgress()
    }
  },
  
  methods: {
    saveProgress() {
      const progress = {
        currentStepIndex: this.currentStepIndex,
        assignmentResponse: this.assignmentResponse,
        reflectionResponse: this.reflectionResponse
      }
      localStorage.setItem(`session-${this.session.id}-progress`, JSON.stringify(progress))
    }
  }
}
</script>

<style scoped>
.ontspannen-session {
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
}

.session-header {
  margin-bottom: 24px;
}

.back-button {
  background: white;
  color: #000;
  border: 2px solid #000;
  padding: 8px 16px;
  border-radius: 0;
  cursor: pointer;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  margin-bottom: 16px;
}

.back-button:hover {
  background: #f5f5f5;
}

.session-info {
  background: white;
  border: 2px solid #000;
  border-radius: 0;
  padding: 20px;
}

.session-title {
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin: 0 0 8px 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.session-description {
  color: #000;
  margin: 0 0 12px 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.session-meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.session-progress-bar {
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border: 1px solid #000;
  margin-bottom: 24px;
}

.progress-fill {
  height: 100%;
  background: #000;
  transition: width 0.3s ease;
}

.step-content {
  background: white;
  border: 2px solid #000;
  border-radius: 0;
  padding: 24px;
  margin-bottom: 24px;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.step-title {
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin: 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.step-type-badge {
  padding: 4px 12px;
  border: 2px solid #000;
  border-radius: 0;
  font-size: 12px;
  font-weight: 500;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.step-type-badge.introduction {
  background: #e3f2fd;
  color: #1976d2;
}

.step-type-badge.core_explanation {
  background: #f3e5f5;
  color: #7b1fa2;
}

.step-type-badge.exercise {
  background: #e8f5e8;
  color: #388e3c;
}

.step-type-badge.assignment {
  background: #fff3e0;
  color: #f57c00;
}

.step-type-badge.reflection {
  background: #fce4ec;
  color: #c2185b;
}

.video-container {
  margin: 16px 0;
}

.video-placeholder {
  width: 100%;
  height: 200px;
  background: #f5f5f5;
  border: 2px solid #000;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.video-placeholder:hover {
  background: #e0e0e0;
}

.play-button {
  font-size: 48px;
  color: #000;
  margin-bottom: 12px;
}

.video-title {
  font-size: 16px;
  font-weight: 500;
  color: #000;
  margin-bottom: 4px;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.video-duration {
  font-size: 14px;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.text-content {
  margin: 16px 0;
}

.content-text {
  color: #000;
  line-height: 1.6;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  margin-bottom: 8px;
}

.word-count {
  font-size: 12px;
  color: #666;
  font-style: italic;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.audio-exercise {
  margin: 16px 0;
  padding: 16px;
  background: #f9f9f9;
  border: 2px solid #000;
  border-radius: 0;
}

.audio-player {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.play-audio-btn {
  background: #000;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 0;
  cursor: pointer;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  font-weight: 500;
}

.play-audio-btn:hover {
  background: #333;
}

.audio-duration {
  font-size: 14px;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.audio-description {
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.exercise-video {
  margin: 16px 0;
}

.exercise-placeholder {
  width: 100%;
  height: 150px;
  background: #f0f8ff;
  border: 2px solid #000;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.exercise-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.exercise-title {
  font-size: 16px;
  font-weight: 500;
  color: #000;
  margin-bottom: 4px;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.exercise-description {
  font-size: 14px;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.assignment-content, .reflection-content {
  margin: 16px 0;
}

.assignment-description, .reflection-prompt {
  color: #000;
  margin-bottom: 12px;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.assignment-textarea, .reflection-textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 2px solid #000;
  border-radius: 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  resize: vertical;
}

.step-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #000;
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

.library-links {
  background: white;
  border: 2px solid #000;
  border-radius: 0;
  padding: 20px;
  margin-top: 24px;
}

.library-links h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.library-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.library-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #000;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.library-item:hover {
  background: #f5f5f5;
}

.library-icon {
  font-size: 16px;
}

.library-text {
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
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
}

.completion-content {
  text-align: center;
}

.completion-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.completion-content h3 {
  margin: 0 0 12px 0;
  font-size: 24px;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.completion-content p {
  color: #000;
  margin: 0 0 20px 0;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.completion-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 20px 0;
}

.completion-stats .stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.completion-stats .stat-number {
  font-size: 20px;
  font-weight: 600;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.completion-stats .stat-label {
  font-size: 12px;
  color: #000;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}

.completion-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
}
</style>
