import type { AppRouteRecordRaw } from '@/router/types'
import { type Component } from 'vue'

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: async () => await import('@/layout/Default/index.vue'),
  meta: {
    title: 'ErrorPage',
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'PageNotFound',
      component: async (): Promise<Component> => await import('@/views/HelloWorld/index.vue'),
      meta: {
        title: 'ErrorPage',
        hideMenu: true
      }
    }
  ]
}
