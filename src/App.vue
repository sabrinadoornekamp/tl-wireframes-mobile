<template>
  <v-app>
    <AppHeader @toggle-drawer="toggleDrawer" />
    <SidebarNav :drawer="drawer" :rail="rail" :is-mobile="isMobile" />
    <v-main>
      <BreadcrumbNav />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import SidebarNav from '@/components/SidebarNav.vue'
import AppHeader from '@/components/AppHeader.vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'

const route = useRoute()
const drawer = ref(true)
const rail = ref(false)
const isMobile = ref(false)

function handleResize() {
  const width = window.innerWidth
  // Desktop: >= 1200px
  // Tablet: 768px - 1199px  
  // Mobile: < 768px
  isMobile.value = width < 768
  if (isMobile.value) {
    rail.value = false
    drawer.value = false // Start closed on mobile so toggle works
  } else {
    drawer.value = true
  }
}

function toggleDrawer() {
  if (isMobile.value) {
    // Force toggle on mobile - ensure it works
    drawer.value = !drawer.value
    console.log('Mobile drawer toggled:', drawer.value)
  } else {
    rail.value = !rail.value
  }
}

// Watch for route changes to ensure sidebar is visible on non-module pages
watch(() => route.path, (newPath) => {
  // If not on a module page, ensure sidebar and app bar are visible
  if (!newPath.includes('/module/')) {
    const sidebar = document.querySelector('.v-navigation-drawer')
    const appBar = document.querySelector('.v-app-bar')
    
    if (sidebar) {
      sidebar.style.display = ''
      sidebar.style.visibility = ''
    }
    if (appBar) {
      appBar.style.display = ''
      appBar.style.visibility = ''
    }
  }
}, { immediate: true })

// Watch drawer state changes for debugging
watch(drawer, (newValue) => {
  console.log('Drawer state changed:', newValue, 'isMobile:', isMobile.value)
})

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  
  // Debug drawer state
  console.log('App mounted - drawer state:', drawer.value, 'isMobile:', isMobile.value)
  
  // Ensure sidebar and app bar are visible on app mount
  const sidebar = document.querySelector('.v-navigation-drawer')
  const appBar = document.querySelector('.v-app-bar')
  
  if (sidebar) {
    sidebar.style.display = ''
    sidebar.style.visibility = ''
  }
  if (appBar) {
    appBar.style.display = ''
    appBar.style.visibility = ''
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style>
/* Global typewriter font for all wireframe components */
* {
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace !important;
  color: #000000 !important;
  font-weight: 700 !important;
}

/* Ensure white background for the entire application */
html, body, #app {
  background-color: white !important;
  background: white !important;
}

/* Override Vuetify components to use typewriter font */
.v-application {
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace !important;
  background-color: white !important;
  background: white !important;
}

.v-toolbar-title,
.v-list-item-title,
.v-list-item-subtitle,
.v-btn,
.v-card-title,
.v-card-text,
.v-chip,
.v-badge,
.v-navigation-drawer,
.v-app-bar {
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace !important;
  color: black;
  font-weight: 600;
}

/* Let Vuetify handle main content positioning naturally */
.v-main {
  transition: margin-left 0.3s ease !important;
  padding-top: 64px !important; /* Account for fixed top bar height */
}

/* Responsive content spacing */
.router-view {
  padding: 24px;
  margin-top: 0 !important; /* No top margin, breadcrumb handles spacing */
  transition: padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Desktop: >= 1200px */
@media (min-width: 1200px) {
  .router-view {
    padding: 24px;
  }
}

/* Tablet: 768px - 1199px */
@media (min-width: 768px) and (max-width: 1199px) {
  .router-view {
    padding: 20px;
  }
}

/* Mobile: < 768px */
@media (max-width: 767px) {
  .router-view {
    padding: 16px;
  }
  
  /* Enhanced text readability on mobile */
  * {
    color: #000000 !important;
    font-weight: 800 !important;
    text-shadow: 0 0 0.5px rgba(0, 0, 0, 0.1);
  }
  
  /* Make specific elements even darker on mobile */
  .v-list-item-title,
  .v-list-item-subtitle,
  .v-card-title,
  .v-card-text,
  .v-btn,
  .v-chip,
  .v-badge,
  .v-toolbar-title {
    color: #000000 !important;
    font-weight: 800 !important;
  }
}

/* Small mobile: < 480px */
@media (max-width: 479px) {
  .router-view {
    padding: 12px;
  }
  
  /* Even more enhanced text readability on small mobile */
  * {
    color: #000000 !important;
    font-weight: 900 !important;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  }
  
  /* Make all text elements very dark and bold on small mobile */
  .v-list-item-title,
  .v-list-item-subtitle,
  .v-card-title,
  .v-card-text,
  .v-btn,
  .v-chip,
  .v-badge,
  .v-toolbar-title,
  .wireframe-content-text,
  .wireframe-module-title,
  .wireframe-module-description {
    color: #000000 !important;
    font-weight: 900 !important;
  }
}

/* Responsive breakpoints for sidebar behavior */

/* Desktop: >= 1200px - Sidebar pushes content aside */
@media (min-width: 1200px) {
  :deep(.v-navigation-drawer--permanent) {
    position: relative !important;
  }
  
  :deep(.v-main) {
    margin-left: 0 !important; /* Let Vuetify handle this */
  }
}

/* Tablet: 768px - 1199px - Sidebar pushes content aside but smaller */
@media (min-width: 768px) and (max-width: 1199px) {
  :deep(.v-navigation-drawer--permanent) {
    position: relative !important;
  }
  
  :deep(.v-main) {
    margin-left: 0 !important; /* Let Vuetify handle this */
  }
  
  /* Adjust sidebar width for tablet */
  :deep(.v-navigation-drawer) {
    width: 240px !important;
  }
  
  :deep(.v-navigation-drawer--rail) {
    width: 80px !important;
  }
}

/* Mobile: < 768px - Sidebar becomes overlay */
@media (max-width: 767px) {
  :deep(.v-navigation-drawer--permanent) {
    position: fixed !important;
    z-index: 5 !important; /* Below app bar */
  }
  
  :deep(.v-main) {
    margin-left: 0 !important;
  }
  
  /* Ensure mobile sidebar is full width */
  :deep(.v-navigation-drawer) {
    width: 100vw !important;
    max-width: 320px !important;
  }
}

/* Breadcrumb positioning within v-main */
.v-main .wireframe-breadcrumb {
  margin-bottom: 16px !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

/* Ensure borders are always visible on topbar and sidebar */
.v-app-bar.wireframe-app-bar {
  border-bottom: 2px solid #333 !important;
  border-left: 2px solid #333 !important;
  border-right: 2px solid #333 !important;
}

.v-navigation-drawer.wireframe-sidebar {
  border: 2px solid #333 !important;
}
</style>
