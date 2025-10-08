<template>
  <v-app class="mobile-app">
    <!-- Mobile Navigation -->
    <MobileNav />
    
    <!-- Mobile Main Content -->
    <v-main class="mobile-main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MobileNav from './MobileNav.vue'

export default {
  name: 'MobileApp',
  components: {
    MobileNav
  }
}
</script>

<style scoped>
.mobile-app {
  background: #f5f5f5;
}

.mobile-main {
  padding-top: 60px; /* Space for mobile header */
  padding-bottom: 70px; /* Space for bottom navigation */
  min-height: 100vh;
}

/* Wireframe styling */
.mobile-app * {
  box-sizing: border-box;
}

.mobile-app {
  font-family: 'Roboto', sans-serif;
}
</style>
