import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import glsl from 'vite-plugin-glsl'
import { wrapperEnv } from './build/utils'
import { resolve } from 'path'
import { createProxy } from './build/vite/proxy'

function pathResolve(dir: string): string {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PROXY } = viteEnv

  const _isBuild = command === 'build'

  return {
    resolve: {
      alias: [
        // @a//xxxx => src/api/xxxx
        {
          find: /@a\//,
          replacement: pathResolve('src/api') + '/'
        },
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/'
        },
        // #/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve('types') + '/'
        }
      ]
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    plugins: [vue(), glsl()]
  }
})
