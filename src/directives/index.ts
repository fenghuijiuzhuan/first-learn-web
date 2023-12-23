import type { App } from 'vue'
import { setupHighLightDirective } from './highLight'

export function setupGlobDirectives(app: App): void {
  setupHighLightDirective(app)
}
