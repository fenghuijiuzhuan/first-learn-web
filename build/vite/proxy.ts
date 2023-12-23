import { isFunction } from 'lodash-es'
import { ProxyOptions } from 'vite'

type ProxyList = [string, string][]
type ProxyTargetList = Record<string, ProxyOptions>
type ProxyOptionFormator<T extends ProxyOptions> = (proxyOptions: T, prefix: string) => T
const httpsRE = /^https:\/\//

export function createProxy(list: ProxyList = [], formator?: ProxyOptionFormator<ProxyOptions>) {
  const ret: ProxyTargetList = {}
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target)

    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      ...(isHttps ? { source: false } : {})
    }
    if (isFunction(formator)) {
      ret[prefix] = formator(ret[prefix], prefix)
    }
  }
  return ret
}
