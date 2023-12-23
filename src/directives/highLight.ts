import type { Directive, App } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

const highLightDirective: Directive = {
  mounted(el) {
    hljs.highlightElement(el)
  },
  unmounted(el) {
    el?.instance?.close()
  }
}

export function setupHighLightDirective(app: App): void {
  hljs.configure({
    languages: ['javascript']
  })

  app.directive('high-light', highLightDirective)
}

export default highLightDirective
