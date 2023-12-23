import { defHttp } from '@/utils/http/axios'

export const getPerson = (params) => {
  return defHttp.get({ url: '/person', params })
}
