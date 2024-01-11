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
    },
    {
      name: 'firstUse',
      meta: {
        title: 'Nest小试牛刀'
      },
      path: 'firstUse',
      component: async (): Promise<Component> => await import('@/views/NestFirstUse/index.vue')
    },
    {
      name: 'upload',
      meta: {
        title: '文件上传'
      },
      path: 'upload',
      component: async (): Promise<Component> => await import('@/views/UploadFile/index.vue')
    }
  ]
}

export default demo
