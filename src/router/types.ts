import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import type { Component } from 'vue'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name?: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}

export interface Menu {
  name?: string

  icon?: string

  path: string

  // path contains param, auto assignment.
  paramPath?: string

  disabled?: boolean

  children?: Menu[]

  orderNo?: number

  meta?: Partial<RouteMeta>

  tag?: MenuTag

  hideMenu?: boolean
}
