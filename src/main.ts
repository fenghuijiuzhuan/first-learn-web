import '@/assets/theme/index.scss'

import App from './App.vue'
import { createApp } from 'vue'
import { setupRouter } from '@/router/index.ts'
import { setupGlobDirectives } from '@/directives/index'

function render(): void {
  const app = createApp(App)
  setupRouter(app)
  setupGlobDirectives(app)
  app.mount('#app')
}

render()
