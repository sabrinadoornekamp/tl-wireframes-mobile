<template>
  <div class="wireframe-breadcrumb">
    <div class="wireframe-breadcrumb-item" @click="navigateTo('/')">
      <div class="wireframe-breadcrumb-icon">🏠</div>
      <div class="wireframe-breadcrumb-text">Dashboard</div>
    </div>
    
    <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
      <div class="wireframe-breadcrumb-separator">></div>
      <div 
        class="wireframe-breadcrumb-item"
        :class="{ 'wireframe-breadcrumb-current': index === breadcrumbs.length - 1 }"
        @click="navigateToBreadcrumb(breadcrumb, index)"
      >
        <div class="wireframe-breadcrumb-icon" v-if="breadcrumb.icon">{{ breadcrumb.icon }}</div>
        <div class="wireframe-breadcrumb-text">{{ breadcrumb.text }}</div>
      </div>
    </template>
    
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const breadcrumbs = computed(() => {
  const crumbs = []
  
  // Handle My therapieland submenu pages
  if (route.path === '/my-progress') {
    crumbs.push({
      text: 'My therapieland',
      path: '/my-therapieland',
      icon: '🏠'
    })
    crumbs.push({
      text: 'My progress',
      path: '/my-progress',
      icon: '📊'
    })
  } else if (route.path === '/all-assignments') {
    crumbs.push({
      text: 'My therapieland',
      path: '/my-therapieland',
      icon: '🏠'
    })
    crumbs.push({
      text: 'All assignments',
      path: '/all-assignments',
      icon: '📋'
    })
  } else if (route.path === '/library') {
    crumbs.push({
      text: 'My therapieland',
      path: '/my-therapieland',
      icon: '🏠'
    })
    crumbs.push({
      text: 'Library',
      path: '/library',
      icon: '📚'
    })
  } else if (route.path === '/monitors') {
    crumbs.push({
      text: 'My therapieland',
      path: '/my-therapieland',
      icon: '🏠'
    })
    crumbs.push({
      text: 'Monitors',
      path: '/monitors',
      icon: '📈'
    })
  }
  
  // Handle program pages
  if (route.path.includes('/program/')) {
    // Extract program ID from path
    const pathParts = route.path.split('/')
    const programIndex = pathParts.indexOf('program')
    if (programIndex !== -1 && pathParts[programIndex + 1]) {
      const programId = pathParts[programIndex + 1]
      const programName = getProgramName(programId)
      
      crumbs.push({
        text: 'My therapieland',
        path: '/my-therapieland',
        icon: '🏠'
      })
      crumbs.push({
        text: 'All assignments',
        path: '/all-assignments',
        icon: '📋'
      })
      crumbs.push({
        text: programName,
        path: `/program/${programId}`,
        icon: '🎯'
      })
      
      // Add module if we're on a module page
      if (pathParts.length > programIndex + 3 && pathParts[programIndex + 2] === 'module') {
        const moduleName = getModuleName(pathParts[programIndex + 3])
        crumbs.push({
          text: moduleName,
          path: route.path,
          icon: '📖'
        })
      }
    }
  }
  
  // Handle questionnaire pages
  if (route.path.includes('/questionnaire/')) {
    const questionnaireId = route.params.id
    const questionnaireName = getQuestionnaireName(questionnaireId)
    
    crumbs.push({
      text: 'My therapieland',
      path: '/my-therapieland',
      icon: '🏠'
    })
    crumbs.push({
      text: 'All assignments',
      path: '/all-assignments',
      icon: '📋'
    })
    crumbs.push({
      text: questionnaireName,
      path: route.path,
      icon: '📝'
    })
  }
  
  return crumbs
})

const getProgramName = (programId) => {
  const programNames = {
    'cognitive-behavioral-therapy': 'Cognitive Behavioral Therapy',
    'mindfulness--stress-reduction': 'Mindfulness & Stress Reduction',
    'trauma-recovery-program': 'Trauma Recovery Program',
    'depression-treatment-program': 'Depression Treatment Program',
    'social-skills-training': 'Social Skills Training',
    'anger-management-program': 'Anger Management Program'
  }
  return programNames[programId] || 'Program'
}

const getModuleName = (moduleId) => {
  const moduleNames = {
    'introduction-to-cbt': 'Introduction to CBT',
    'identifying-negative-thoughts': 'Identifying Negative Thoughts',
    'thought-challenging-techniques': 'Thought Challenging Techniques',
    'behavioral-experiments': 'Behavioral Experiments',
    'relapse-prevention': 'Relapse Prevention',
    'introduction-to-mindfulness': 'Introduction to Mindfulness',
    'body-scan-meditation': 'Body Scan Meditation',
    'breathing-exercises': 'Breathing Exercises',
    'mindful-movement': 'Mindful Movement',
    'understanding-anxiety': 'Understanding Anxiety',
    'understanding-trauma': 'Understanding Trauma',
    'understanding-depression': 'Understanding Depression',
    'introduction-to-social-skills': 'Introduction to Social Skills',
    'understanding-anger': 'Understanding Anger',
    'anger-triggers': 'Anger Triggers',
    'relaxation-techniques': 'Relaxation Techniques'
  }
  return moduleNames[moduleId] || 'Module'
}

const getQuestionnaireName = (questionnaireId) => {
  const questionnaireNames = {
    'phq-9-depression-scale': 'PHQ-9 Depression Scale',
    'gad-7-anxiety-scale': 'GAD-7 Anxiety Scale',
    'daily-mood-check-in': 'Daily Mood Check-in',
    'sleep-quality-assessment': 'Sleep Quality Assessment'
  }
  return questionnaireNames[questionnaireId] || 'Questionnaire'
}

const navigateTo = (path) => {
  router.push(path)
}

const navigateToBreadcrumb = (breadcrumb, index) => {
  // Don't navigate if it's the current page (last breadcrumb)
  if (index === breadcrumbs.value.length - 1) return
  
  router.push(breadcrumb.path)
}
</script>

<style scoped>
.wireframe-breadcrumb {
  display: flex !important;
  align-items: center !important;
  padding: 12px 24px !important;
  border-bottom: 2px solid #333 !important;
  background: #f8f8f8 !important;
  gap: 8px !important;
  position: sticky !important;
  top: 0 !important;
  z-index: 10 !important;
  width: 100% !important;
  min-height: 48px !important;
  margin: 0 !important;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace !important;
  overflow-x: auto !important;
  overflow-y: hidden !important;
  white-space: nowrap !important;
  scrollbar-width: thin;
  scrollbar-color: #ccc #f8f8f8;
  -webkit-overflow-scrolling: touch;
}

/* Custom scrollbar for webkit browsers */
.wireframe-breadcrumb::-webkit-scrollbar {
  height: 4px;
}

.wireframe-breadcrumb::-webkit-scrollbar-track {
  background: #f8f8f8;
}

.wireframe-breadcrumb::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 2px;
}

.wireframe-breadcrumb::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.wireframe-breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 2px solid #333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  flex-shrink: 0;
  min-width: fit-content;
  max-width: 200px;
}

.wireframe-breadcrumb-item:hover {
  border-color: #666;
  background: #f0f0f0;
}

.wireframe-breadcrumb-item.wireframe-breadcrumb-current {
  background: #f0f0f0;
  cursor: default;
}

.wireframe-breadcrumb-item.wireframe-breadcrumb-current:hover {
  border-color: #333;
  background: #f0f0f0;
}

.wireframe-breadcrumb-icon {
  font-size: 14px;
  width: 16px;
  text-align: center;
}

.wireframe-breadcrumb-text {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.wireframe-breadcrumb-separator {
  font-size: 16px;
  color: #666;
  font-weight: 600;
}

/* Responsive breadcrumb layout with proper breakpoints */

/* Desktop: >= 1200px */
@media (min-width: 1200px) {
  .wireframe-breadcrumb {
    padding: 12px 24px;
    gap: 8px;
    min-height: 48px;
  }
  
  .wireframe-breadcrumb-item {
    padding: 6px 12px;
    font-size: 14px;
    max-width: 150px;
  }
  
  .wireframe-breadcrumb-text {
    font-size: 14px;
    max-width: 120px;
  }
  
  .wireframe-breadcrumb-icon {
    font-size: 14px;
    width: 16px;
  }
  
  .wireframe-breadcrumb-separator {
    font-size: 16px;
  }
}

/* Tablet: 768px - 1199px */
@media (min-width: 768px) and (max-width: 1199px) {
  .wireframe-breadcrumb {
    padding: 10px 20px;
    gap: 6px;
    min-height: 44px;
  }
  
  .wireframe-breadcrumb-item {
    padding: 5px 10px;
    font-size: 13px;
    max-width: 130px;
    flex-shrink: 0;
  }
  
  .wireframe-breadcrumb-text {
    font-size: 13px;
    max-width: 110px;
  }
  
  .wireframe-breadcrumb-icon {
    font-size: 13px;
    width: 15px;
  }
  
  .wireframe-breadcrumb-separator {
    font-size: 15px;
  }
}

/* Mobile: < 768px */
@media (max-width: 767px) {
  .wireframe-breadcrumb {
    padding: 8px 16px;
    gap: 6px;
    min-height: 40px;
  }
  
  .wireframe-breadcrumb-item {
    padding: 4px 8px;
    font-size: 12px;
    max-width: 120px;
    flex-shrink: 0;
  }
  
  .wireframe-breadcrumb-text {
    font-size: 12px;
    max-width: 100px;
  }
  
  .wireframe-breadcrumb-icon {
    font-size: 12px;
    width: 14px;
  }
  
  .wireframe-breadcrumb-separator {
    font-size: 14px;
  }
}

/* Small mobile: < 480px */
@media (max-width: 479px) {
  .wireframe-breadcrumb {
    padding: 6px 12px;
    gap: 4px;
    min-height: 36px;
  }
  
  .wireframe-breadcrumb-item {
    padding: 3px 6px;
    font-size: 11px;
    max-width: 100px;
    flex-shrink: 0;
  }
  
  .wireframe-breadcrumb-text {
    font-size: 11px;
    max-width: 80px;
  }
  
  .wireframe-breadcrumb-icon {
    font-size: 11px;
    width: 12px;
  }
  
  .wireframe-breadcrumb-separator {
    font-size: 12px;
  }
}
</style>
