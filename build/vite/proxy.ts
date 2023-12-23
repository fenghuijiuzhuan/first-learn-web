import { isFunction } from 'lodash-es'
import { ProxyOptions } from 'vite'

type ProxyList = [string, string][]
type ProxyTargetList = Record<string, ProxyOptions>
type ProxyOptionFormator<T> = (proxyOptions: T) => T
const httpsRE = /^https:\/\//

export function createProxy(list: ProxyList = [], formater?: ProxyOptionFormator<ProxyOptions>) {
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
    if (isFunction) {
      ret[prefix] = formater(ret[prefix])
    }
  }
  return ret
}
