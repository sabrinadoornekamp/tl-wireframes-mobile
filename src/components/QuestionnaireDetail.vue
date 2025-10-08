<template>
  <div class="wireframe-questionnaire-detail">
    <div class="wireframe-header">
      <div class="wireframe-title">{{ questionnaire.title }}</div>
      <div class="wireframe-subtitle">{{ questionnaire.description }}</div>
    </div>
    
    <div class="wireframe-content">
      <!-- Questionnaire Overview -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Questionnaire Overview</div>
          <div class="wireframe-questionnaire-type-badge">{{ questionnaire.type }}</div>
        </div>
        
        <div class="wireframe-overview-grid">
          <div class="wireframe-overview-item">
            <div class="wireframe-overview-label">Questions</div>
            <div class="wireframe-overview-value">{{ questionnaire.questions }}</div>
          </div>
          
          <div class="wireframe-overview-item">
            <div class="wireframe-overview-label">Estimated Duration</div>
            <div class="wireframe-overview-value">{{ questionnaire.duration }}</div>
          </div>
          
          <div class="wireframe-overview-item">
            <div class="wireframe-overview-label">Responses</div>
            <div class="wireframe-overview-value">{{ questionnaire.responses }}</div>
          </div>
          
          <div class="wireframe-overview-item">
            <div class="wireframe-overview-label">Care Organization</div>
            <div class="wireframe-overview-value">{{ questionnaire.careOrganization }}</div>
          </div>
        </div>
      </div>

      <!-- Questionnaire Instructions -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Instructions</div>
        </div>
        
        <div class="wireframe-instructions">
          <div class="wireframe-instruction-item">
            <div class="wireframe-instruction-icon">1</div>
            <div class="wireframe-instruction-text">Read each question carefully and select the response that best describes your experience</div>
          </div>
          <div class="wireframe-instruction-item">
            <div class="wireframe-instruction-icon">2</div>
            <div class="wireframe-instruction-text">Be honest and accurate in your responses for the most helpful results</div>
          </div>
          <div class="wireframe-instruction-item">
            <div class="wireframe-instruction-icon">3</div>
            <div class="wireframe-instruction-text">Take your time - there's no rush to complete the questionnaire</div>
          </div>
          <div class="wireframe-instruction-item">
            <div class="wireframe-instruction-icon">4</div>
            <div class="wireframe-instruction-text">Your responses are confidential and will be shared only with your care team</div>
          </div>
        </div>
      </div>

      <!-- Sample Questions -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Sample Questions</div>
        </div>
        
        <div class="wireframe-sample-questions">
          <div class="wireframe-question-item" v-for="(question, index) in questionnaire.sampleQuestions" :key="index">
            <div class="wireframe-question-number">{{ index + 1 }}</div>
            <div class="wireframe-question-content">
              <div class="wireframe-question-text">{{ question.text }}</div>
              <div class="wireframe-question-options">
                <div v-for="option in question.options" :key="option" class="wireframe-option">
                  <div class="wireframe-option-radio"></div>
                  <div class="wireframe-option-text">{{ option }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Previous Responses -->
      <div class="wireframe-section" v-if="questionnaire.previousResponses && questionnaire.previousResponses.length > 0">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Previous Responses</div>
        </div>
        
        <div class="wireframe-responses-list">
          <div class="wireframe-response-item" v-for="(response, index) in questionnaire.previousResponses" :key="index">
            <div class="wireframe-response-date">{{ response.date }}</div>
            <div class="wireframe-response-score">Score: {{ response.score }}/{{ response.maxScore }}</div>
            <div class="wireframe-response-status" :class="response.status">{{ response.statusText }}</div>
            <div class="wireframe-response-actions">
              <div class="wireframe-button wireframe-button-small">View Details</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Questionnaire Actions -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Actions</div>
        </div>
        
        <div class="wireframe-actions-grid">
          <div class="wireframe-button wireframe-button-primary">Start Questionnaire</div>
          <div class="wireframe-button wireframe-button-secondary">Preview Questions</div>
          <div class="wireframe-button wireframe-button-secondary">View Instructions</div>
          <div class="wireframe-button wireframe-button-secondary">Contact Care Provider</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Get questionnaire data based on route parameter
const questionnaireId = computed(() => route.params.id)

const questionnaire = computed(() => {
  // This would normally fetch from an API or store
  // For now, return mock data based on questionnaireId
  const questionnaires = {
    'phq-9-depression-scale': {
      title: 'PHQ-9 Depression Scale',
      description: 'Standard 9-item depression screening questionnaire',
      type: 'Assessment',
      questions: 9,
      duration: '5-10 min',
      responses: 12,
      careOrganization: 'Mental Health Center Amsterdam',
      organizationType: 'Specialized Clinic',
      sampleQuestions: [
        {
          text: 'Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?',
          options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
        },
        {
          text: 'Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?',
          options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
        },
        {
          text: 'Over the last 2 weeks, how often have you been bothered by trouble falling or staying asleep, or sleeping too much?',
          options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
        }
      ],
      previousResponses: [
        {
          date: '2 weeks ago',
          score: 8,
          maxScore: 27,
          status: 'moderate',
          statusText: 'Moderate Depression'
        },
        {
          date: '1 month ago',
          score: 12,
          maxScore: 27,
          status: 'moderate',
          statusText: 'Moderate Depression'
        }
      ]
    },
    'gad-7-anxiety-scale': {
      title: 'GAD-7 Anxiety Scale',
      description: '7-item generalized anxiety disorder assessment',
      type: 'Screening',
      questions: 7,
      duration: '3-5 min',
      responses: 8,
      careOrganization: 'Anxiety Treatment Center',
      organizationType: 'Private Practice',
      sampleQuestions: [
        {
          text: 'Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?',
          options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
        },
        {
          text: 'Over the last 2 weeks, how often have you been bothered by not being able to stop or control worrying?',
          options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
        }
      ],
      previousResponses: [
        {
          date: '1 week ago',
          score: 10,
          maxScore: 21,
          status: 'moderate',
          statusText: 'Moderate Anxiety'
        }
      ]
    },
    'daily-mood-check-in': {
      title: 'Daily Mood Check-in',
      description: 'Quick daily mood and energy level assessment',
      type: 'Daily',
      questions: 5,
      duration: '2-3 min',
      responses: 45,
      careOrganization: 'Digital Health Platform',
      organizationType: 'Digital Health',
      sampleQuestions: [
        {
          text: 'How would you rate your overall mood today?',
          options: ['Very poor', 'Poor', 'Fair', 'Good', 'Excellent']
        },
        {
          text: 'How is your energy level today?',
          options: ['Very low', 'Low', 'Moderate', 'High', 'Very high']
        }
      ],
      previousResponses: []
    }
  }
  
  return questionnaires[questionnaireId.value] || questionnaires['phq-9-depression-scale']
})
</script>

<style scoped>
/* Wireframe Questionnaire Detail Styles */
.wireframe-questionnaire-detail {
  padding: 24px;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
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

.wireframe-questionnaire-type-badge {
  padding: 6px 12px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: #f0f0f0;
}

.wireframe-overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.wireframe-overview-item {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 16px;
}

.wireframe-overview-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 600;
}

.wireframe-overview-value {
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.wireframe-instructions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.wireframe-instruction-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.wireframe-instruction-icon {
  width: 24px;
  height: 24px;
  border: 2px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.wireframe-instruction-text {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
}

.wireframe-sample-questions {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.wireframe-question-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  border: 2px solid #333;
  border-radius: 4px;
}

.wireframe-question-number {
  width: 32px;
  height: 32px;
  border: 2px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.wireframe-question-content {
  flex: 1;
}

.wireframe-question-text {
  font-size: 16px;
  color: #333;
  margin-bottom: 16px;
  line-height: 1.5;
}

.wireframe-question-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wireframe-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border: 1px solid #333;
  border-radius: 4px;
}

.wireframe-option-radio {
  width: 16px;
  height: 16px;
  border: 2px solid #333;
  border-radius: 50%;
  flex-shrink: 0;
}

.wireframe-option-text {
  font-size: 14px;
  color: #333;
}

.wireframe-responses-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wireframe-response-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 2px solid #333;
  border-radius: 4px;
  gap: 16px;
}

.wireframe-response-date {
  font-size: 14px;
  color: #666;
  min-width: 100px;
}

.wireframe-response-score {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  min-width: 120px;
}

.wireframe-response-status {
  padding: 4px 8px;
  border: 1px solid #333;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.wireframe-response-status.moderate {
  background: #fff3cd;
  color: #856404;
  border-color: #ffeaa7;
}

.wireframe-response-status.mild {
  background: #d1ecf1;
  color: #0c5460;
  border-color: #bee5eb;
}

.wireframe-response-status.severe {
  background: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
}

.wireframe-actions-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
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

/* Responsive */
@media (max-width: 768px) {
  .wireframe-overview-grid {
    grid-template-columns: 1fr;
  }
  
  .wireframe-actions-grid {
    flex-direction: column;
  }
  
  .wireframe-response-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
