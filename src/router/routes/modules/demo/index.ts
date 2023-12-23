import { type RouteRecordRaw } from 'vue-router'
import { type Component } from 'vue'

const demo: RouteRecordRaw = {
  path: '/demo',
  name: 'Demo',
  component: async (): Promise<Component> => await import('@/layout/Default/index.vue'),
  redirect: '/demo/index',
  meta: {
    title: 'demo',
    orderNo: 0
  },
  children: [
    {
      name: 'HelloWorld',
      meta: {
        title: 'HelloWorld'
      },
      path: 'index',
      component: async (): Promise<Component> => await import('@/views/HelloWorld/index.vue')
    }
  ]
}

export default demo
