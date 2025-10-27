<template>
  <div class="breadcrumb">
    <div class="breadcrumb-item" @click="navigateTo('program')">
      <span class="breadcrumb-icon">🏠</span>
      <span class="breadcrumb-text">Ontspannen Program</span>
    </div>
    
    <div v-if="currentModule" class="breadcrumb-separator">›</div>
    <div v-if="currentModule" class="breadcrumb-item" @click="navigateToModule(currentModule)">
      <span class="breadcrumb-text">{{ currentModule.name }}</span>
    </div>
    
    <div v-if="currentSession" class="breadcrumb-separator">›</div>
    <div v-if="currentSession" class="breadcrumb-item current">
      <span class="breadcrumb-text">{{ currentSession.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    currentModule: {
      type: Object,
      default: null
    },
    currentSession: {
      type: Object,
      default: null
    }
  },
  methods: {
    navigateTo(route) {
      this.$emit('navigate', route)
    },
    navigateToModule(module) {
      this.$emit('navigate-to-module', module)
    }
  }
}
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border: 2px solid #000;
  border-radius: 0;
  margin-bottom: 16px;
  font-family: 'JetBrains Mono', 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 0;
  transition: all 0.2s ease;
  color: #000;
  border: 1px solid transparent;
}

.breadcrumb-item:hover {
  background: #f5f5f5;
  border-color: #000;
  transform: translateY(-1px);
}

.breadcrumb-item.current {
  cursor: default;
  font-weight: 500;
  color: #000;
}

.breadcrumb-item.current:hover {
  background: transparent;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #000;
  font-weight: 500;
}

.breadcrumb-icon {
  font-size: 14px;
}

.breadcrumb-text {
  font-size: 14px;
  font-weight: 400;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .breadcrumb {
    padding: 8px 12px;
    margin-bottom: 12px;
  }
  
  .breadcrumb-text {
    font-size: 12px;
  }
  
  .breadcrumb-separator {
    margin: 0 4px;
  }
}
</style>
