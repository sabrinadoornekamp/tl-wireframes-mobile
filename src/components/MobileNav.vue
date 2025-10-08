<template>
  <div class="mobile-nav-container">
    <!-- Bottom Navigation Bar -->
    <v-bottom-navigation
      v-model="activeTab"
      color="primary"
      class="mobile-bottom-nav"
      grow
      height="70"
    >
      <v-btn
        v-for="item in bottomNavItems"
        :key="item.name"
        :value="item.name"
        @click="navigateTo(item.route)"
        class="mobile-nav-btn"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <span class="mobile-nav-label">{{ item.label }}</span>
      </v-btn>
    </v-bottom-navigation>

    <!-- Mobile Header -->
    <v-app-bar
      class="mobile-header"
      color="white"
      elevation="1"
      height="60"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" class="mobile-menu-btn">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      
      <v-toolbar-title class="mobile-title">
        Therapieland
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon class="mobile-notification-btn">
        <v-icon>mdi-bell-outline</v-icon>
        <v-badge
          v-if="notificationCount > 0"
          :content="notificationCount"
          color="red"
          class="mobile-badge"
        >
        </v-badge>
      </v-btn>
    </v-app-bar>

    <!-- Mobile Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      class="mobile-drawer"
      width="280"
    >
      <div class="mobile-drawer-content">
        <!-- User Profile Section -->
        <div class="mobile-profile-section">
          <v-avatar size="60" class="mobile-avatar">
            <v-icon size="30">mdi-account</v-icon>
          </v-avatar>
          <div class="mobile-profile-info">
            <div class="mobile-profile-name">Sarah Johnson</div>
            <div class="mobile-profile-role">Client</div>
          </div>
        </div>

        <!-- Navigation Menu -->
        <v-list class="mobile-menu-list">
          <v-list-item
            v-for="item in mobileMenuItems"
            :key="item.name"
            @click="navigateTo(item.route)"
            class="mobile-menu-item"
            :class="{ 'mobile-active': $route.path === item.route }"
          >
            <template v-slot:prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
            <v-list-item-subtitle v-if="item.subtitle">{{ item.subtitle }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <!-- Progress Section -->
        <div class="mobile-progress-section">
          <div class="mobile-progress-title">My Progress</div>
          <v-progress-linear
            :model-value="overallProgress"
            color="primary"
            height="8"
            rounded
            class="mobile-progress-bar"
          ></v-progress-linear>
          <div class="mobile-progress-text">{{ overallProgress }}% Complete</div>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'MobileNav',
  data() {
    return {
      drawer: false,
      activeTab: 'dashboard',
      notificationCount: 3,
      overallProgress: 65,
      bottomNavItems: [
        {
          name: 'dashboard',
          label: 'Home',
          icon: 'mdi-home',
          route: '/'
        },
        {
          name: 'care-plan',
          label: 'Care Plan',
          icon: 'mdi-clipboard-list',
          route: '/care-plan'
        },
        {
          name: 'chat',
          label: 'Chat',
          icon: 'mdi-chat',
          route: '/chat'
        },
        {
          name: 'progress',
          label: 'Progress',
          icon: 'mdi-chart-line',
          route: '/progress'
        },
        {
          name: 'profile',
          label: 'Profile',
          icon: 'mdi-account',
          route: '/profile'
        }
      ],
      mobileMenuItems: [
        {
          name: 'dashboard',
          label: 'Dashboard',
          icon: 'mdi-view-dashboard',
          route: '/'
        },
        {
          name: 'progress',
          label: 'My Progress',
          icon: 'mdi-chart-line',
          route: '/progress',
          subtitle: 'Track your journey'
        },
        {
          name: 'programs',
          label: 'Programs',
          icon: 'mdi-book-open',
          route: '/programs',
          subtitle: 'Therapy programs'
        },
        {
          name: 'assignments',
          label: 'Assignments',
          icon: 'mdi-checkbox-marked-circle',
          route: '/assignments',
          subtitle: 'Your tasks'
        },
        {
          name: 'monitors',
          label: 'Monitors',
          icon: 'mdi-monitor',
          route: '/monitors',
          subtitle: 'Health tracking'
        },
        {
          name: 'questionnaires',
          label: 'Questionnaires',
          icon: 'mdi-clipboard-text',
          route: '/questionnaires',
          subtitle: 'Assessments'
        },
        {
          name: 'settings',
          label: 'Settings',
          icon: 'mdi-cog',
          route: '/settings',
          subtitle: 'Preferences'
        }
      ]
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
      this.drawer = false
    }
  }
}
</script>

<style scoped>
.mobile-nav-container {
  position: relative;
}

.mobile-bottom-nav {
  position: fixed !important;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-top: 2px solid #333;
  background: white;
}

.mobile-nav-btn {
  min-width: 60px !important;
  height: 70px !important;
  flex-direction: column;
  padding: 8px 4px !important;
}

.mobile-nav-label {
  font-size: 10px;
  font-weight: 500;
  margin-top: 4px;
  line-height: 1;
}

.mobile-header {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  border-bottom: 2px solid #333;
}

.mobile-menu-btn {
  color: #333 !important;
}

.mobile-title {
  font-weight: 600;
  color: #333;
  font-size: 18px;
}

.mobile-notification-btn {
  color: #333 !important;
  position: relative;
}

.mobile-badge {
  position: absolute;
  top: 8px;
  right: 8px;
}

.mobile-drawer {
  border-right: 2px solid #333;
}

.mobile-drawer-content {
  padding: 16px;
}

.mobile-profile-section {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 2px solid #333;
  margin-bottom: 16px;
}

.mobile-avatar {
  background: #4a90e2;
  color: white;
  margin-right: 12px;
}

.mobile-profile-info {
  flex: 1;
}

.mobile-profile-name {
  font-weight: 600;
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
}

.mobile-profile-role {
  font-size: 14px;
  color: #666;
}

.mobile-menu-list {
  padding: 0;
}

.mobile-menu-item {
  margin: 4px 0;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.mobile-menu-item:hover {
  border-color: #666;
  background: #f5f5f5;
}

.mobile-active {
  border-color: #4a90e2 !important;
  background: #e3f2fd !important;
}

.mobile-progress-section {
  margin-top: 24px;
  padding: 16px;
  border: 2px solid #333;
  border-radius: 8px;
  background: #f9f9f9;
}

.mobile-progress-title {
  font-weight: 600;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.mobile-progress-bar {
  margin-bottom: 8px;
}

.mobile-progress-text {
  font-size: 12px;
  color: #666;
  text-align: center;
}

/* Wireframe styling */
.mobile-nav-container * {
  box-sizing: border-box;
}

.mobile-bottom-nav,
.mobile-header,
.mobile-drawer {
  font-family: 'Roboto', sans-serif;
}

/* Mobile-specific adjustments */
@media (max-width: 768px) {
  .mobile-nav-label {
    font-size: 9px;
  }
  
  .mobile-nav-btn {
    min-width: 50px !important;
  }
}
</style>
