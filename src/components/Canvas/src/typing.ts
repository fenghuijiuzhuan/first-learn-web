import { type Ref } from 'vue'

export interface CanvasInstanceMethods {
  setCanvasProps: (props: Partial<CanvasProps>) => void
  getCanvasRef: () => Ref<HTMLCanvasElement | undefined>
  emitVisible?: (visible: boolean, uid: number) => void
  redoModalHeight?: () => void
}

/**
 * @description: 画布对外暴露的方法
 */
export interface CanvasMethods {
  setCanvasProps: (props: Partial<CanvasProps>) => void
  getGL: () => WebGL2RenderingContext
}

export interface CanvasProps {
  width: number
}

export type RegisterFn = (canvasMethods: CanvasInstanceMethods, uuid?: number) => void

export type ReturnMethods = CanvasMethods

export type UseCanvasReturnType = [RegisterFn, ReturnMethods]

export type CanvasRef = Ref<HTMLCanvasElement>
