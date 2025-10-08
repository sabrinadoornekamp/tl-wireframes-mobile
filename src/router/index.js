import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import DashboardContent from '@/components/DashboardContent.vue'
import ProgramsQuestionnaires from '@/components/ProgramsQuestionnaires.vue'
import ProgramDetail from '@/components/ProgramDetail.vue'
import QuestionnaireDetail from '@/components/QuestionnaireDetail.vue'
import TherapielandOverview from '@/components/TherapielandOverview.vue'
import MyProgress from '@/components/MyProgress.vue'
import AllAssignments from '@/components/AllAssignments.vue'
import CBTIntroductionModule from '@/components/CBTIntroductionModule.vue'
import CBTNegativeThoughtsModule from '@/components/CBTNegativeThoughtsModule.vue'
import CBTThoughtChallengingModule from '@/components/CBTThoughtChallengingModule.vue'
import CBTBehavioralExperimentsModule from '@/components/CBTBehavioralExperimentsModule.vue'
import CBTRelapsePreventionModule from '@/components/CBTRelapsePreventionModule.vue'
import MindfulnessIntroductionModule from '@/components/MindfulnessIntroductionModule.vue'
import MindfulnessBodyScanModule from '@/components/MindfulnessBodyScanModule.vue'
import MindfulnessBreathingModule from '@/components/MindfulnessBreathingModule.vue'
import MindfulnessMovementModule from '@/components/MindfulnessMovementModule.vue'
import AnxietyUnderstandingModule from '@/components/AnxietyUnderstandingModule.vue'
import TraumaUnderstandingModule from '@/components/TraumaUnderstandingModule.vue'
import DepressionUnderstandingModule from '@/components/DepressionUnderstandingModule.vue'
import SocialSkillsIntroductionModule from '@/components/SocialSkillsIntroductionModule.vue'
import AngerUnderstandingModule from '@/components/AngerUnderstandingModule.vue'
import AngerTriggersModule from '@/components/AngerTriggersModule.vue'
import RelaxationTechniquesModule from '@/components/RelaxationTechniquesModule.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardContent
  },
  {
    path: '/my-therapieland',
    name: 'My therapieland',
    component: TherapielandOverview
  },
  {
    path: '/my-progress',
    name: 'My progress',
    component: MyProgress
  },
  {
    path: '/all-assignments',
    name: 'All assignments',
    component: AllAssignments
  },
  {
    path: '/programs-questionnaires',
    name: 'Programs & Questionnaires',
    component: ProgramsQuestionnaires
  },
  {
    path: '/program/cognitive-behavioral-therapy/module/introduction-to-cbt',
    name: 'CBT Introduction Module',
    component: CBTIntroductionModule
  },
  {
    path: '/program/cognitive-behavioral-therapy/module/identifying-negative-thoughts',
    name: 'CBT Negative Thoughts Module',
    component: CBTNegativeThoughtsModule
  },
  {
    path: '/program/cognitive-behavioral-therapy/module/thought-challenging-techniques',
    name: 'CBT Thought Challenging Module',
    component: CBTThoughtChallengingModule
  },
  {
    path: '/program/cognitive-behavioral-therapy/module/behavioral-experiments',
    name: 'CBT Behavioral Experiments Module',
    component: CBTBehavioralExperimentsModule
  },
  {
    path: '/program/cognitive-behavioral-therapy/module/relapse-prevention',
    name: 'CBT Relapse Prevention Module',
    component: CBTRelapsePreventionModule
  },
  {
    path: '/program/mindfulness--stress-reduction/module/introduction-to-mindfulness',
    name: 'Mindfulness Introduction Module',
    component: MindfulnessIntroductionModule
  },
  {
    path: '/program/mindfulness--stress-reduction/module/body-scan-meditation',
    name: 'Mindfulness Body Scan Module',
    component: MindfulnessBodyScanModule
  },
  {
    path: '/program/mindfulness--stress-reduction/module/breathing-exercises',
    name: 'Mindfulness Breathing Module',
    component: MindfulnessBreathingModule
  },
  {
    path: '/program/mindfulness--stress-reduction/module/mindful-movement',
    name: 'Mindfulness Movement Module',
    component: MindfulnessMovementModule
  },
  {
    path: '/program/anxiety-management/module/understanding-anxiety',
    name: 'Anxiety Understanding Module',
    component: AnxietyUnderstandingModule
  },
  {
    path: '/program/anxiety-management/module/breathing-techniques',
    name: 'Anxiety Breathing Module',
    component: AnxietyUnderstandingModule
  },
  {
    path: '/program/anxiety-management/module/cognitive-restructuring',
    name: 'Anxiety Cognitive Module',
    component: AnxietyUnderstandingModule
  },
  {
    path: '/program/trauma-recovery-program/module/understanding-trauma',
    name: 'Trauma Understanding Module',
    component: TraumaUnderstandingModule
  },
  {
    path: '/program/trauma-recovery-program/module/grounding-techniques',
    name: 'Trauma Grounding Module',
    component: TraumaUnderstandingModule
  },
  {
    path: '/program/trauma-recovery-program/module/processing-trauma',
    name: 'Trauma Processing Module',
    component: TraumaUnderstandingModule
  },
  {
    path: '/program/depression-treatment-program/module/understanding-depression',
    name: 'Depression Understanding Module',
    component: DepressionUnderstandingModule
  },
  {
    path: '/program/depression-treatment-program/module/behavioral-activation',
    name: 'Depression Behavioral Module',
    component: DepressionUnderstandingModule
  },
  {
    path: '/program/depression-treatment-program/module/thought-challenging',
    name: 'Depression Thought Module',
    component: DepressionUnderstandingModule
  },
  {
    path: '/program/social-skills-training/module/introduction-to-social-skills',
    name: 'Social Skills Introduction Module',
    component: SocialSkillsIntroductionModule
  },
  {
    path: '/program/social-skills-training/module/communication-skills',
    name: 'Social Skills Communication Module',
    component: SocialSkillsIntroductionModule
  },
  {
    path: '/program/social-skills-training/module/assertiveness-training',
    name: 'Social Skills Assertiveness Module',
    component: SocialSkillsIntroductionModule
  },
  {
    path: '/program/anger-management-program/module/understanding-anger',
    name: 'Anger Understanding Module',
    component: AngerUnderstandingModule
  },
  {
    path: '/program/anger-management-program/module/anger-triggers',
    name: 'Anger Triggers Module',
    component: AngerTriggersModule
  },
  {
    path: '/program/anger-management-program/module/relaxation-techniques',
    name: 'Relaxation Techniques Module',
    component: RelaxationTechniquesModule
  },
  {
    path: '/program/:id',
    name: 'Program Detail',
    component: ProgramDetail
  },
  {
    path: '/questionnaire/:id',
    name: 'Questionnaire Detail',
    component: QuestionnaireDetail
  }
]

// Use hash routing for GitHub Pages to avoid 404 errors
const isGitHubPages = window.location.hostname === 'sabrinadoornekamp.github.io'
console.log('Router setup:', { 
  hostname: window.location.hostname, 
  isGitHubPages, 
  currentPath: window.location.pathname,
  currentHash: window.location.hash 
})

const router = createRouter({
  history: isGitHubPages ? createWebHashHistory() : createWebHistory('/tl-wireframes/'),
  routes
})

// Handle direct access to GitHub Pages URLs
router.beforeEach((to, from, next) => {
  console.log('Router navigation:', { to: to.path, from: from.path, hostname: window.location.hostname })
  
  // If on GitHub Pages and trying to access a path that doesn't exist, redirect to hash version
  if (isGitHubPages && to.matched.length === 0) {
    console.log('No route matched, redirecting to hash version')
    window.location.href = window.location.origin + window.location.pathname + '#' + to.path
    return
  }
  
  next()
})

export default router
