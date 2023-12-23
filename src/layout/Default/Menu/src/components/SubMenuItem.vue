<template>
  <MenuItem
    v-if="!menuHasChildren(item) && !getHideMenu"
    :key="item.path"
    :label="item.meta?.title"
  >
    {{ item.meta?.title }}
  </MenuItem>
  <SubMenu
    v-if="menuHasChildren(item) && !getHideMenu"
    :key="`submenu-${item.path}`"
    :label="item.meta?.title"
    :title="item.meta?.title"
  >
    <template v-for="childrenItem in item.children" :key="childrenItem.path">
      <SubMenuItem :item="childrenItem" />
    </template>
  </SubMenu>
</template>

<script setup lang="ts" name="SubMenuItem">
  import type { Menu as MenuType } from '@/router/types'
  import { type PropType, computed } from 'vue'
  import { MenuItem, SubMenu } from 'ant-design-vue'
  const props = defineProps({
    item: {
      type: Object as PropType<MenuType>,
      required: true
    }
  })

  const getHideMenu = computed(() => Boolean(props.item.meta?.hideMenu))

  function menuHasChildren(menuTreeItem: MenuType): boolean {
    return (
      Reflect.has(menuTreeItem, 'children') &&
      !(menuTreeItem.children == null) &&
      menuTreeItem.children.length > 0
    )
  }
</script>
