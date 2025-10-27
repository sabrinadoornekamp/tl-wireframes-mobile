import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#000000',
          secondary: '#000000',
          accent: '#000000',
          error: '#f44336',
          warning: '#ff9800',
          info: '#2196f3',
          success: '#4caf50'
        }
      }
    }
  }
})
