import { createRouter, createWebHistory } from 'vue-router'
import MobileDashboard from '../components/MobileDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'MobileDashboard',
    component: MobileDashboard
  },
  {
    path: '/care-plan',
    name: 'MobileCarePlan',
    component: () => import('../components/MobileCarePlan.vue')
  },
  {
    path: '/chat',
    name: 'MobileChat',
    component: () => import('../components/MobileChat.vue')
  },
  {
    path: '/progress',
    name: 'MobileProgress',
    component: () => import('../components/MobileProgress.vue')
  },
  {
    path: '/programs',
    name: 'MobilePrograms',
    component: () => import('../components/MobilePrograms.vue')
  },
  {
    path: '/assignments',
    name: 'MobileAssignments',
    component: () => import('../components/MobileAssignments.vue')
  },
  {
    path: '/monitors',
    name: 'MobileMonitors',
    component: () => import('../components/MobileMonitors.vue')
  },
  {
    path: '/questionnaires',
    name: 'MobileQuestionnaires',
    component: () => import('../components/MobileQuestionnaires.vue')
  },
  {
    path: '/profile',
    name: 'MobileProfile',
    component: () => import('../components/MobileProfile.vue')
  },
  {
    path: '/settings',
    name: 'MobileSettings',
    component: () => import('../components/MobileSettings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
