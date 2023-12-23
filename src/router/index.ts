import type { App } from 'vue'
import { type RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import { basicRouter } from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRouter as RouteRecordRaw[]
})

router.beforeEach((_to, _from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export function setupRouter(app: App<Element>): void {
  app.use(router)
}
