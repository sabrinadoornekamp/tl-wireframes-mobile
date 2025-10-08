/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Router
import router from './router'

// Styles
// import 'unfonts.css' // Removed - file doesn't exist

const app = createApp(App)

registerPlugins(app)
app.use(router)

app.mount('#app')
