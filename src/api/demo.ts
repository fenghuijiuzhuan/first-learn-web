import { defHttp } from '@/utils/http/axios'

export const getPersonById = (params) => {
  return defHttp.get({ url: '/person', params })
}

export const queryPerson = (params) => {
  return defHttp.get({ url: '/person/find', params })
}
