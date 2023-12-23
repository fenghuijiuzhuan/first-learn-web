<template>
  <Menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @select="handleSelect">
    <template v-for="item in menuList" :key="item.path">
      <SubMenuItem :item="item" />
    </template>
  </Menu>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { Menu } from 'ant-design-vue'
  import { getMenus } from '@/router/menus/index.ts'
  import { useRouter, useRoute } from 'vue-router'
  import { type SelectInfo } from 'ant-design-vue/es/menu/src/interface'
  import type { Menu as MenuType } from '@/router/types'
  import SubMenuItem from './components/SubMenuItem.vue'

  const router = useRouter()
  const route = useRoute()

  const menuList: MenuType[] = getMenus()

  const selectedKeys = ref<string[]>([menuList[0]?.path ?? ''])
  function handleSelect({ key }: SelectInfo): void {
    void router.push({ path: key as string })
  }

  watch(
    () => route,
    (val) => {
      selectedKeys.value = [val.path]
    },
    {
      immediate: true
    }
  )
</script>
