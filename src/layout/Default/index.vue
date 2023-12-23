<template>
  <Layout style="height: 100%">
    <LayoutSider
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0
      }"
    >
      <Menu />
    </LayoutSider>
    <Layout :style="{ marginLeft: '200px', width: '100%', height: '100%' }">
      <LayoutContent :style="{ margin: '24px 16px 24px', overflow: 'auto' }">
        <Content>
          <RouterView />
        </Content>
      </LayoutContent>
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
  import { Layout, LayoutSider, LayoutContent } from 'ant-design-vue'
  import { Menu } from './Menu/index.ts'
  import Content from './Content/index.vue'
</script>
