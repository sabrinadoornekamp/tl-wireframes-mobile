import { createApp } from 'vue'
import App from './components/MobileApp.vue'
import router from './router/mobile.js'
import vuetify from './plugins/vuetify.js'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
