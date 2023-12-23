import { getCurrentInstance, onUnmounted, ref, unref } from 'vue'
import { type CanvasInstanceMethods, type CanvasProps, type UseCanvasReturnType } from './typing'
import { error } from '@/utils/log'
import { getWebGL2Context } from '@/utils/webglHelper'

export function useCanvas(): UseCanvasReturnType {
  const canvasInstanceMethods = ref<Nullable<CanvasInstanceMethods>>(null)
  const loaded = ref<boolean>(false)
  const uid = ref<number | undefined>(0)

  function register(canvasMethod: CanvasInstanceMethods, uuid?: number): void {
    if (getCurrentInstance() == null) {
      throw new Error('useCanvas() can only be used inside setup() or functional components!')
    }
    uid.value = uuid
    onUnmounted(() => {
      canvasInstanceMethods.value = null
      loaded.value = false
    })

    if (unref(loaded) && canvasMethod === unref(canvasInstanceMethods)) return

    canvasInstanceMethods.value = canvasMethod
    loaded.value = true
  }

  const getInstanceMethods: () => CanvasInstanceMethods = () => {
    const instanceMethods = unref(canvasInstanceMethods)
    if (instanceMethods === null) {
      error('useCanvas instanceMethods is undefined!')
    }
    return instanceMethods as CanvasInstanceMethods
  }

  const methods = {
    setCanvasProps: (props: Partial<CanvasProps>): void => {
      getInstanceMethods()?.setCanvasProps(props)
    },
    getGL: (): WebGL2RenderingContext => {
      const canvas = unref(getInstanceMethods()?.getCanvasRef()) as HTMLCanvasElement
      return getWebGL2Context(canvas)
    }
  }
  return [register, methods]
}
