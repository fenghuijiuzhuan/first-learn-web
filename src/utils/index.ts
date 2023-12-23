import { isObject } from '@/utils/is'

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

export function setObjToUrlParams(baseUrl: string, obj: object) {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')

  if (/\?$/.test(baseUrl)) {
    return baseUrl + parameters
  }
  return baseUrl.replace(/\/?$/, '?') + parameters
}
