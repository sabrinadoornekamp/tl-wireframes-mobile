<template>
  <v-navigation-drawer
    :model-value="drawer"
    :rail="rail"
    app
    color="white"
    class="wireframe-sidebar"
    :width="rail ? 80 : 280"
    :rail-width="80"
    :permanent="!isMobile"
    :temporary="isMobile"
    :overlay="isMobile"
    :touchless="false"
    :disable-resize-watcher="false"
    :disable-route-watcher="false"
    :close-on-content-click="false"
    :expand-on-hover="false"
    :floating="false"
    :right="false"
    :stateless="false"
    :mini-variant="false"
    :mini-variant-width="56"
    :mobile-breakpoint="768"
    :persistent="false"
    :tag="'nav'"
  >
    <div class="wireframe-sidebar-content">
      <div>
        <!-- Mobile Navigation Header -->
        <div v-if="isMobile && mobileCurrentLevel > 0" class="wireframe-mobile-header">
          <button @click="goBackLevel" class="wireframe-back-button">
            <div class="wireframe-icon">←</div>
            <div class="wireframe-label">Back</div>
          </button>
        </div>

        <!-- Level 0: Main Menu -->
        <div v-if="!isMobile || mobileCurrentLevel === 0" class="wireframe-menu">
          <!-- Dashboard -->
          <div
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === 'Dashboard' }"
            @click="handleMenuClick({ title: 'Dashboard', submenu: false })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div v-if="!rail" class="wireframe-label">Dashboard</div>
          </div>
          
          <!-- My therapieland (clickable on mobile) -->
          <div 
            v-if="isMobile"
            class="wireframe-menu-item"
            @click="handleMenuClick({ title: 'My therapieland', submenu: true })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div class="wireframe-label">My therapieland</div>
            <div class="wireframe-arrow wireframe-arrow-right">→</div>
          </div>
          
          <!-- Desktop: My therapieland (clickable to toggle submenu) -->
          <div
            v-if="!isMobile"
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === 'My therapieland' }"
            @click="handleMenuClick({ title: 'My therapieland', submenu: true })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div v-if="!rail" class="wireframe-label">My therapieland</div>
            <div v-if="!rail" class="wireframe-arrow" :class="{ 'wireframe-arrow-open': expandedSubmenu }"></div>
          </div>
          
          <!-- Desktop: Submenu for My therapieland -->
          <div v-if="!rail && expandedSubmenu && !isMobile" class="wireframe-submenu">
            <!-- My progress -->
            <div
              class="wireframe-submenu-item"
              :class="{ 'wireframe-active': active === 'My progress' }"
              @click="handleSubmenuClick({ title: 'My progress' })"
            >
              <div class="wireframe-submenu-icon" style="min-width: 24px;"></div>
              <div class="wireframe-label">My progress</div>
            </div>
            
            <!-- Monitors -->
            <div
              class="wireframe-submenu-item"
              :class="{ 'wireframe-active': active === 'Monitors' }"
              @click="handleSubmenuClick({ title: 'Monitors' })"
            >
              <div class="wireframe-submenu-icon" style="min-width: 24px;"></div>
              <div class="wireframe-label">Monitors</div>
            </div>
            
            
            <!-- All assignments -->
            <div
              class="wireframe-submenu-item"
              :class="{ 'wireframe-active': active === 'All assignments' }"
              @click="handleSubmenuClick({ title: 'All assignments' })"
            >
              <div class="wireframe-submenu-icon" style="min-width: 24px;"></div>
              <div class="wireframe-label">All assignments</div>
            </div>
            
            <!-- Programs -->
            <div
              class="wireframe-submenu-item"
              :class="{ 'wireframe-active': active === 'Programs' }"
              @click="handleSubmenuClick({ title: 'Programs', hasSubmenu: true })"
            >
              <div class="wireframe-submenu-icon" style="min-width: 24px;"></div>
              <div class="wireframe-label">Programs</div>
              <div class="wireframe-arrow" :class="{ 'wireframe-arrow-open': expandedPrograms }"></div>
            </div>
            
            <!-- Programs submenu - positioned directly under Programs -->
            <div v-if="expandedPrograms" class="wireframe-programs-submenu">
              <!-- Individual Programs -->
              <div
                v-for="program in programsSubmenu"
                :key="program.title"
                class="wireframe-submenu-item wireframe-program-item"
                :class="{ 'wireframe-active': active === program.title }"
                @click="handleProgramClick(program)"
              >
                <div class="wireframe-submenu-icon" style="min-width: 20px;"></div>
                <div class="wireframe-program-content">
                  <div class="wireframe-label">{{ program.title }}</div>
                  <div class="wireframe-program-progress">
                    <div class="wireframe-progress-track">
                      <div 
                        class="wireframe-progress-fill" 
                        :style="{ width: program.progress + '%' }"
                        :class="program.status"
                      ></div>
                    </div>
                    <div class="wireframe-progress-text">{{ program.progress }}%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Questionnaires -->
            <div
              class="wireframe-submenu-item"
              :class="{ 'wireframe-active': active === 'Questionnaires' }"
              @click="handleSubmenuClick({ title: 'Questionnaires', hasSubmenu: true })"
            >
              <div class="wireframe-submenu-icon" style="min-width: 24px;"></div>
              <div class="wireframe-label">Questionnaires</div>
              <div class="wireframe-arrow" :class="{ 'wireframe-arrow-open': expandedQuestionnaires }"></div>
            </div>
            
            <!-- Questionnaires submenu - positioned directly under Questionnaires -->
            <div v-if="expandedQuestionnaires" class="wireframe-questionnaires-submenu">
              <!-- Individual Questionnaires -->
              <div
                v-for="questionnaire in questionnairesSubmenu"
                :key="questionnaire.title"
                class="wireframe-submenu-item wireframe-questionnaire-item"
                :class="{ 'wireframe-active': active === questionnaire.title }"
                @click="handleQuestionnaireClick(questionnaire)"
              >
                <div class="wireframe-submenu-icon" style="min-width: 20px;"></div>
                <div class="wireframe-questionnaire-content">
                  <div class="wireframe-label">{{ questionnaire.title }}</div>
                  <div class="wireframe-questionnaire-status" :class="questionnaire.status">
                    {{ questionnaire.statusText }}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Library -->
            <div
              class="wireframe-submenu-item"
              :class="{ 'wireframe-active': active === 'Library' }"
              @click="handleSubmenuClick({ title: 'Library' })"
            >
              <div class="wireframe-submenu-icon" style="min-width: 24px;"></div>
              <div class="wireframe-label">Library</div>
            </div>
          </div>
          
          <!-- Chats -->
          <div
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === 'Chats' }"
            @click="handleMenuClick({ title: 'Chats', submenu: false })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div v-if="!rail" class="wireframe-label">Chats</div>
          </div>
          
          <!-- Settings -->
          <div
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === 'Settings' }"
            @click="handleMenuClick({ title: 'Settings', submenu: false })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div v-if="!rail" class="wireframe-label">Settings</div>
          </div>
        </div>

        <!-- Level 1: My therapieland Submenu (Mobile) -->
        <div v-if="isMobile && mobileCurrentLevel === 1" class="wireframe-menu">
          <!-- My progress -->
          <div
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === 'My progress' }"
            @click="handleSubmenuClick({ title: 'My progress' })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div class="wireframe-label">My progress</div>
          </div>
          
          <!-- Monitors -->
          <div
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === 'Monitors' }"
            @click="handleSubmenuClick({ title: 'Monitors' })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div class="wireframe-label">Monitors</div>
          </div>
          
          <!-- All assignments -->
          <div
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === 'All assignments' }"
            @click="handleSubmenuClick({ title: 'All assignments' })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div class="wireframe-label">All assignments</div>
          </div>
          
          <!-- Programs -->
          <div
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === 'Programs' }"
            @click="handleSubmenuClick({ title: 'Programs', hasSubmenu: true })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div class="wireframe-label">Programs</div>
            <div class="wireframe-arrow wireframe-arrow-right">→</div>
          </div>
          
          <!-- Questionnaires -->
          <div
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === 'Questionnaires' }"
            @click="handleSubmenuClick({ title: 'Questionnaires', hasSubmenu: true })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div class="wireframe-label">Questionnaires</div>
            <div class="wireframe-arrow wireframe-arrow-right">→</div>
          </div>
          
          <!-- Library -->
          <div
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === 'Library' }"
            @click="handleSubmenuClick({ title: 'Library' })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div class="wireframe-label">Library</div>
          </div>
        </div>

        <!-- Level 2: Programs Submenu (Mobile) -->
        <div v-if="isMobile && mobileCurrentLevel === 2" class="wireframe-menu">
          <!-- Individual Programs -->
          <div
            v-for="program in programsSubmenu"
            :key="program.title"
            class="wireframe-menu-item wireframe-program-item"
            :class="{ 'wireframe-active': active === program.title }"
            @click="handleProgramClick(program)"
          >
            <div class="wireframe-icon" style="min-width: 20px;"></div>
            <div class="wireframe-program-content">
              <div class="wireframe-label">{{ program.title }}</div>
              <div class="wireframe-program-progress">
                <div class="wireframe-progress-track">
                  <div 
                    class="wireframe-progress-fill" 
                    :style="{ width: program.progress + '%' }"
                    :class="program.status"
                  ></div>
                </div>
                <div class="wireframe-progress-text">{{ program.progress }}%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Level 3: Questionnaires Submenu (Mobile) -->
        <div v-if="isMobile && mobileCurrentLevel === 3" class="wireframe-menu">
          <!-- Individual Questionnaires -->
          <div
            v-for="questionnaire in questionnairesSubmenu"
            :key="questionnaire.title"
            class="wireframe-menu-item wireframe-questionnaire-item"
            :class="{ 'wireframe-active': active === questionnaire.title }"
            @click="handleQuestionnaireClick(questionnaire)"
          >
            <div class="wireframe-icon" style="min-width: 20px;"></div>
            <div class="wireframe-questionnaire-content">
              <div class="wireframe-label">{{ questionnaire.title }}</div>
              <div class="wireframe-questionnaire-status" :class="questionnaire.status">
                {{ questionnaire.statusText }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="wireframe-menu-item wireframe-logout">
          <div class="wireframe-icon" style="min-width: 24px;"></div>
          <div v-if="!rail" class="wireframe-label">Logout</div>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
  
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  drawer: { type: Boolean, required: true },
  rail: { type: Boolean, default: false },
  isMobile: { type: Boolean, default: false },
})

const emit = defineEmits(['update:drawer'])

const router = useRouter()
const route = useRoute()

const items = [
  { title: 'Dashboard', submenu: false },
  { title: 'My therapieland', submenu: true, expanded: false },
  { title: 'Chats', submenu: false },
  { title: 'Settings', submenu: false },
]

const therapielandSubmenu = [
  { title: 'My progress' },
  { title: 'Monitors' },
  { title: 'All assignments', hasSubmenu: true },
  { title: 'Library' },
]

const programsSubmenu = [
  { title: 'Cognitive Behavioral Therapy', progress: 65, status: 'active' },
  { title: 'Mindfulness & Stress Reduction', progress: 0, status: 'not-started' },
  { title: 'Trauma Recovery Program', progress: 0, status: 'not-started' },
  { title: 'Depression Treatment Program', progress: 0, status: 'not-started' },
  { title: 'Social Skills Training', progress: 0, status: 'not-started' },
  { title: 'Anger Management Program', progress: 0, status: 'not-started' },
]

const questionnairesSubmenu = [
  { title: 'PHQ-9 Depression Screening', status: 'available', statusText: 'Available' },
  { title: 'GAD-7 Anxiety Assessment', status: 'completed', statusText: 'Completed' },
  { title: 'PTSD Checklist (PCL-5)', status: 'available', statusText: 'Available' },
  { title: 'Social Anxiety Scale', status: 'completed', statusText: 'Completed' },
  { title: 'Weekly Mood Check-in', status: 'available', statusText: 'Available' },
]

const active = ref('Dashboard')
const expandedSubmenu = ref(false)
const expandedPrograms = ref(false)
const expandedQuestionnaires = ref(false)
const userManuallyCollapsedPrograms = ref(false)

// Mobile navigation state
const mobileCurrentLevel = ref(0) // 0 = main menu, 1 = therapieland submenu, 2 = programs submenu
const mobileNavigationStack = ref([]) // Track navigation history

// Update active state based on current route
const updateActiveState = () => {
  if (route.path === '/') {
    active.value = 'Dashboard'
    expandedSubmenu.value = false
    expandedPrograms.value = false
    expandedQuestionnaires.value = false
    userManuallyCollapsedPrograms.value = false
  } else if (route.path === '/my-therapieland') {
    active.value = 'My therapieland'
    expandedSubmenu.value = true
    expandedPrograms.value = false
    expandedQuestionnaires.value = false
    userManuallyCollapsedPrograms.value = false
  } else if (route.path === '/all-assignments') {
    active.value = 'All assignments'
    expandedSubmenu.value = true
    expandedPrograms.value = false
    expandedQuestionnaires.value = false
    userManuallyCollapsedPrograms.value = false
  } else if (route.path.includes('/program/')) {
    active.value = 'Programs'
    expandedSubmenu.value = true
    expandedPrograms.value = true
    expandedQuestionnaires.value = false
    userManuallyCollapsedPrograms.value = false
  } else if (route.path.includes('/questionnaire/')) {
    active.value = 'Questionnaires'
    expandedSubmenu.value = true
    expandedPrograms.value = false
    expandedQuestionnaires.value = true
    userManuallyCollapsedPrograms.value = false
  }
}

// Watch for route changes
watch(() => route.path, updateActiveState, { immediate: true })

const handleMenuClick = (item) => {
  if (item.submenu) {
    if (props.isMobile) {
      // On mobile, navigate to submenu level
      if (item.title === 'My therapieland') {
        navigateToLevel(1, item.title)
      }
      console.log('Mobile: Navigating to submenu level for:', item.title)
    } else {
      // Desktop behavior - toggle submenu
      if (item.title === 'My therapieland') {
    expandedSubmenu.value = !expandedSubmenu.value
      }
      active.value = item.title
      console.log('Desktop: Toggling submenu for:', item.title)
    }
  } else {
    // Regular menu item - navigate to route
    active.value = item.title
    if (props.isMobile) {
      resetMobileNavigation()
    }
    
    // Navigate based on menu item
    if (item.title === 'Dashboard') {
      router.push('/')
    } else if (item.title === 'Chats') {
      // Add route for chats when created
      console.log('Chats page not implemented yet')
    } else if (item.title === 'Settings') {
      // Add route for settings when created
      console.log('Settings page not implemented yet')
    }
  }
}

const handleSubmenuClick = (subItem) => {
  if (subItem.hasSubmenu) {
    if (props.isMobile) {
      // On mobile, navigate to appropriate submenu level
      if (subItem.title === 'Programs') {
        navigateToLevel(2, subItem.title)
      } else if (subItem.title === 'Questionnaires') {
        navigateToLevel(3, subItem.title)
      }
      // Don't navigate to a page, just show submenu
    } else {
      // Desktop behavior - toggle the submenu (allow manual collapse/expand)
      if (subItem.title === 'Programs') {
        expandedPrograms.value = !expandedPrograms.value
        // Track if user manually collapsed the submenu
        if (!expandedPrograms.value) {
          userManuallyCollapsedPrograms.value = true
        } else {
          userManuallyCollapsedPrograms.value = false
        }
      } else if (subItem.title === 'Questionnaires') {
        expandedQuestionnaires.value = !expandedQuestionnaires.value
      } else {
        // Toggle other submenus
        expandedPrograms.value = !expandedPrograms.value
      }
    }
  } else {
    active.value = subItem.title
    if (props.isMobile) {
      // On mobile, navigate to the page and reset navigation
      resetMobileNavigation()
    }
    
    // Navigate based on submenu item
    if (subItem.title === 'My progress') {
      router.push('/my-progress')
    } else if (subItem.title === 'Monitors') {
      router.push('/monitors')
    } else if (subItem.title === 'Library') {
      router.push('/library')
    } else if (subItem.title === 'All assignments') {
      router.push('/all-assignments')
    } else {
      // Add routes for other submenu items when created
      console.log(`${subItem.title} page not implemented yet`)
    }
  }
}

const handleProgramClick = (program) => {
  active.value = program.title
  // Don't close submenus - keep them open
  // expandedSubmenu.value = false
  // expandedProgramsSubmenu.value = false
  
  // Keep drawer open on mobile/tablet when navigating to programs
  if (props.isMobile) {
    // Don't close drawer on mobile when navigating to programs
    console.log('Mobile: Keeping drawer open for program navigation')
  }
  
  // Navigate to specific program detail page
  // Map program titles to their correct route IDs
  const programRouteMap = {
    'Cognitive Behavioral Therapy': 'cognitive-behavioral-therapy',
    'Mindfulness & Stress Reduction': 'mindfulness--stress-reduction',
    'Trauma Recovery Program': 'trauma-recovery-program',
    'Depression Treatment Program': 'depression-treatment-program',
    'Social Skills Training': 'social-skills-training',
    'Anger Management Program': 'anger-management-program'
  }
  
  const programId = programRouteMap[program.title] || program.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')
  router.push(`/program/${programId}`)
}

const handleQuestionnaireClick = (questionnaire) => {
  active.value = questionnaire.title
  if (props.isMobile) {
    resetMobileNavigation() // Reset mobile navigation when navigating to a questionnaire page
  }
  // Navigate to specific questionnaire detail page
  const questionnaireId = questionnaire.title.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')
  router.push(`/questionnaire/${questionnaireId}`)
}

// Mobile navigation functions
const navigateToLevel = (level, title) => {
  if (props.isMobile) {
    mobileNavigationStack.value.push({ level: mobileCurrentLevel.value, title: title })
    mobileCurrentLevel.value = level
    console.log('Mobile: Navigated to level', level, 'Title:', title)
  }
}

const goBackLevel = () => {
  if (props.isMobile && mobileNavigationStack.value.length > 0) {
    const previousState = mobileNavigationStack.value.pop()
    mobileCurrentLevel.value = previousState.level
    console.log('Mobile: Went back to level', previousState.level)
  }
}

const resetMobileNavigation = () => {
  mobileCurrentLevel.value = 0
  mobileNavigationStack.value = []
}
const search = ref('')
const avatarSrc = 'https://s3-alpha-sig.figma.com/img/8242/5855/478e145e1b8ec85651a72ac2891dc900?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cJJcQryNGMT19zTyRiISngKrQx~HXyqZyXTUaMT0xJgIfh49hFR-qhRi0QVZykig-HK~9ofittBgGTllDgbmRmf2Dqyag0WZzBRlbPY9Tn~F3Yq88gvIkQGOmeRTb0YHE0pxELIaSjVFAaJbGd80y-1nUecID6wSvl-ybZQBXR8MerEg0dLcRq9rgaOlgGh6sbQxCgqiAJKkiwJWtOfGH8TQgW77m6X9puGXYRIWWuirYJKTw6T3Xz-ABmEKXzFDcbyvpC-hpGiuZHE~qQHBxhl1HwYKudeUXz56rKuNgP64EP0x3Jlers7R2ewesKI-vHPW1aoI04bpdfABsA2AfQ__'
const logoutIcon = 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/mcp/get_code/assets/c25c25ba-fa87-413a-a59d-6a35ca63b2a2/figma%3Aasset/2f491662dd6056b10707646d03261ab37ca2d864.svg'

</script>

<style scoped>
/* Wireframe Styles */
.wireframe-sidebar {
  border: 2px solid #333 !important;
  transition: width 0.3s ease, transform 0.3s ease;
  height: 100vh !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
}

/* Ensure sidebar borders are always visible */
.v-navigation-drawer.wireframe-sidebar {
  border: 2px solid #333 !important;
}

.wireframe-sidebar-content {
  min-width: 80px;
  width: 100%;
  height: 100%;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
}

.wireframe-profile {
  border: 2px solid #333;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.wireframe-avatar {
  width: 56px;
  height: 56px;
  border: 2px solid #333;
  border-radius: 8px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.wireframe-avatar-rail {
  width: 32px;
  height: 32px;
  border-radius: 4px;
}

.wireframe-text {
  margin-left: 12px;
}

.wireframe-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.wireframe-email {
  color: #666;
  font-size: 14px;
}


.wireframe-menu {
  margin-bottom: 20px;
}

.wireframe-menu-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 4px;
  border: 2px solid #333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 24px;
  width: 100%;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  touch-action: manipulation;
  user-select: none;
  min-height: 48px;
}

.wireframe-menu-item:hover {
  border-color: #666;
  border-width: 2px;
  background: #f0f0f0;
}

.wireframe-menu-item:hover .wireframe-label {
  font-weight: 600;
}

.wireframe-active {
  background: #d0d0d0 !important;
  border-color: #333 !important;
  border-width: 2px !important;
}

.wireframe-active .wireframe-label {
  font-weight: 600 !important;
}

.wireframe-icon {
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-radius: 2px;
  margin-right: 8px;
  flex-shrink: 0;
}

.wireframe-label {
  color: #333;
  font-weight: 600;
}

.wireframe-logout {
  margin-bottom: 12px;
}

.wireframe-arrow {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
  margin-left: auto;
  transition: transform 0.2s;
}

.wireframe-arrow-open {
  transform: rotate(180deg);
}

/* Right arrow for mobile */
.wireframe-arrow-right {
  width: auto !important;
  height: auto !important;
  border: none !important;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-left: auto;
}

.wireframe-submenu {
  margin-left: 20px;
  margin-top: 4px;
  margin-bottom: 8px;
}

.wireframe-submenu-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 2px;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 24px;
  width: 100%;
}

.wireframe-submenu-item:hover {
  border-color: #666;
  border-width: 1px;
  background: #f0f0f0;
}

.wireframe-submenu-item:hover .wireframe-label {
  font-weight: 600;
}

.wireframe-submenu-item.wireframe-active {
  background: #d0d0d0 !important;
  border-color: #333 !important;
  border-width: 1px !important;
}

.wireframe-submenu-item.wireframe-active .wireframe-label {
  font-weight: 600 !important;
}

.wireframe-submenu-icon {
  width: 16px;
  height: 16px;
  border: 1px solid #333;
  border-radius: 2px;
  margin-right: 8px;
  flex-shrink: 0;
}

.wireframe-programs-submenu {
  margin-left: 20px;
  margin-top: 4px;
  margin-bottom: 8px;
}

.wireframe-questionnaires-submenu {
  margin-left: 20px;
  margin-top: 4px;
  margin-bottom: 8px;
}

.wireframe-questionnaire-item {
  margin-bottom: 4px;
}

.wireframe-questionnaire-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.wireframe-questionnaire-status {
  font-size: 11px;
  padding: 2px 6px;
  border: 1px solid #333;
  border-radius: 3px;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
}

.wireframe-questionnaire-status.available {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.wireframe-questionnaire-status.completed {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}

.wireframe-program-item {
  padding: 6px 12px;
  font-size: 13px;
  border: 1px solid #333;
  border-radius: 3px;
}

.wireframe-program-item:hover {
  border-color: #666;
  border-width: 1px;
  background: #e0e0e0;
  font-weight: 600;
}

.wireframe-program-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.wireframe-program-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wireframe-progress-track {
  flex: 1;
  height: 4px;
  border: 1px solid #333;
  border-radius: 2px;
  overflow: hidden;
  background: #f0f0f0;
}

.wireframe-progress-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.wireframe-progress-fill.active {
  background: #4CAF50;
}

.wireframe-progress-fill.not-started {
  background: #9E9E9E;
}

.wireframe-progress-fill.completed {
  background: #2196F3;
}

.wireframe-progress-text {
  font-size: 11px;
  font-weight: 600;
  color: #333;
  min-width: 30px;
  text-align: right;
}

/* Responsive sidebar behavior */

/* Desktop: >= 1200px */
@media (min-width: 1200px) {
  .wireframe-sidebar-content {
    padding: 16px 12px !important;
  }
  
  .wireframe-menu-item {
    padding: 12px !important;
    margin-bottom: 4px !important;
  }
}

/* Tablet: 768px - 1199px */
@media (min-width: 768px) and (max-width: 1199px) {
  .wireframe-sidebar-content {
    padding: 14px 10px !important;
  }
  
  .wireframe-menu-item {
    padding: 12px !important;
    margin-bottom: 4px !important;
    min-height: 52px !important;
    font-size: 16px !important;
  }
  
  .wireframe-submenu {
    margin-left: 16px !important;
  }
  
  .wireframe-submenu-item {
    padding: 8px 12px !important;
    min-height: 44px !important;
  }
  
  /* Better touch targets for tablet */
  .wireframe-menu-item:active {
    transform: scale(0.98);
    background: #e0e0e0 !important;
  }
}

/* Mobile Navigation Header */
.wireframe-mobile-header {
  border-bottom: 2px solid #333;
  padding: 12px;
  margin-bottom: 8px;
}

.wireframe-mobile-header .wireframe-back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  font-weight: 600;
  color: #333;
}

.wireframe-mobile-header .wireframe-back-button:hover {
  background: #f0f0f0;
  border-color: #666;
}

.wireframe-mobile-header .wireframe-back-button:active {
  transform: scale(0.97);
  background: #e0e0e0;
}

/* Menu header styling */
.wireframe-menu-header {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 4px;
  border: 2px solid #333;
  border-radius: 4px;
  background: #f8f8f8;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  font-weight: 600;
  color: #333;
  cursor: default;
}

.wireframe-menu-header .wireframe-icon {
  min-width: 24px;
}

.wireframe-menu-header .wireframe-label {
  flex: 1;
  font-size: 14px;
}

/* Mobile: < 768px */
@media (max-width: 767px) {
  .wireframe-sidebar-content {
    padding: 12px 8px !important;
  }
  
  .wireframe-menu-item {
    padding: 14px 12px !important;
    margin-bottom: 4px !important;
    min-height: 56px !important;
    font-size: 16px !important;
    border-width: 2px !important;
  }
  
  .wireframe-submenu {
    margin-left: 12px !important;
  }
  
  .wireframe-submenu-item {
    padding: 10px 12px !important;
    min-height: 48px !important;
    font-size: 15px !important;
  }
  
  .wireframe-programs-submenu {
    margin-left: 12px !important;
  }
  
  /* Hide up/down arrows on mobile, but show right arrows */
  .wireframe-menu-header .wireframe-arrow:not(.wireframe-arrow-right),
  .wireframe-submenu-item .wireframe-arrow:not(.wireframe-arrow-right) {
    display: none !important;
  }
  
  /* Mobile arrow styling - only show right arrows */
  .wireframe-menu-item .wireframe-arrow-right {
    font-size: 18px !important;
    font-weight: bold !important;
    color: #333 !important;
    margin-left: auto !important;
  }
  
  /* Better touch targets for mobile */
  .wireframe-menu-item:active {
    transform: scale(0.97);
    background: #d0d0d0 !important;
    border-color: #000 !important;
  }
  
  .wireframe-submenu-item:active {
    transform: scale(0.97);
    background: #d0d0d0 !important;
  }
  
  /* Improve touch scrolling */
  .wireframe-sidebar {
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }
}
</style>


