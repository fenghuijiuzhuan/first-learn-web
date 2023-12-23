import type { Menu } from '@/router/types'
import { transformMenuModule, transformRouteToMenu } from '@/router/helper/menuHelper'
import { asyncRoutes } from '../routes'

const menuList = transformRouteToMenu(asyncRoutes, true) as Menu[]

const staticMenus: Menu[] = []
;(() => {
  menuList.sort((a, b) => {
    return (a.orderNo ?? 0) - (b.orderNo ?? 0)
  })

  for (const menu of menuList) {
    staticMenus.push(transformMenuModule(menu))
  }
})()

export const getMenus = (): Menu[] => {
  const menus = staticMenus
  return menus
}
