import type { AppRouteRecordRaw } from '@/router/types'
import { PAGE_NOT_FOUND_ROUTE } from './basic'
const modules = import.meta.globEager('./modules/**/*.ts')

const routeModuleList: AppRouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})
export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList]

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/demo',
  meta: {
    title: 'Root'
  }
}

export const basicRouter: AppRouteRecordRaw[] = [
  RootRoute,
  PAGE_NOT_FOUND_ROUTE,
  ...routeModuleList
]
