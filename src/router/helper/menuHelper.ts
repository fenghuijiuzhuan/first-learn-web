import { toRaw } from 'vue'
import type { RouteParams } from 'vue-router'
import type { Menu, AppRouteRecordRaw } from '@/router/types'
import { treeMap } from '@/utils/helper/treeHelper'
import { isUrl } from '@/utils/is'
import { cloneDeep } from 'lodash-es'

function joinParentPath(menus: Menu[], parentPath = ''): void {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]

    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // Note that nested paths that start with / will be treated as a root path.
    // This allows you to leverage the component nesting without having to use a nested URL.
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // path doesn't start with /, nor is it a url, join parent path
      // console.log('---menu.path ', menu.path)
      menu.path = `${parentPath}/${menu.path}`
      // console.log(' menu.path  menu.path ', menu.path)
    }
    if (menu?.children?.length != null) {
      joinParentPath(menu.children, menu.path)
    }
  }
}

// Parsing the menu module
export function transformMenuModule(menu: Menu): Menu {
  const menuList = [menu]

  joinParentPath(menuList)
  return menuList[0]
}

export function transformRouteToMenu(
  routeModList: AppRouteRecordRaw[],
  routerMapping = false
): AppRouteRecordRaw[] {
  const cloneRouteModList = cloneDeep(routeModList)
  const routeList: AppRouteRecordRaw[] = []

  cloneRouteModList.forEach((item) => {
    if (
      routerMapping &&
      Boolean(item.meta.hideChildrenInMenu) &&
      typeof item.redirect === 'string'
    ) {
      item.path = item.redirect
    }
    routeList.push(item)
  })
  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = node
      // const path = getMicroPath(node.meta.fromAppCode, node.path)
      return {
        ...(node.meta ?? {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        ...(node.redirect ? { redirect: node.redirect } : {})
      }
    }
  })
  joinParentPath(list)
  return cloneDeep(list)
}

/**
 * config menu with given params
 */
const menuParamRegex = /(?::)([\s\S]+?)((?=\/)|$)/g
export function configureDynamicParamsMenu(menu: Menu, params: RouteParams): void {
  const { path, paramPath } = toRaw(menu)
  let realPath = paramPath !== undefined ? paramPath : path
  const matchArr = realPath.match(menuParamRegex)

  matchArr?.forEach((it) => {
    const realIt = it.substring(1)
    if (params[realIt] !== undefined) {
      realPath = realPath.replace(`:${realIt}`, params[realIt] as string)
    }
  })
  // save original param path.
  if (paramPath === undefined && matchArr != null && matchArr.length > 0) {
    menu.paramPath = path
  }
  menu.path = realPath
  // children
  menu.children?.forEach((item) => {
    configureDynamicParamsMenu(item, params)
  })
}
