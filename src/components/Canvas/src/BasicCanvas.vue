<template>
  <div class="canvas-wrap">
    <canvas ref="canvasRef" class="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
  import { getCurrentInstance, ref, unref } from 'vue'
  import { type CanvasInstanceMethods, type CanvasProps, type CanvasRef } from './typing'
  import { deepMerge } from '@/utils/index'

  const emit = defineEmits<{
    register: [canvasMethod: CanvasInstanceMethods, uuid: number]
  }>()
  const propsRef = ref<Partial<CanvasProps> | null>(null)
  const canvasMethods: CanvasInstanceMethods = {
    setCanvasProps,
    emitVisible: undefined,
    getCanvasRef: () => canvasRef
  }
  const canvasRef = ref<HTMLCanvasElement | null>(null) as CanvasRef

  const instance = getCurrentInstance()
  if (instance != null) {
    emit('register', canvasMethods, instance.uid)
  }

  function setCanvasProps(props: Partial<CanvasProps>): void {
    propsRef.value = deepMerge(unref(propsRef) != null || ({} as unknown), props)
  }
</script>
