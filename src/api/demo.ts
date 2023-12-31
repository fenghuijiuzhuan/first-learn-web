import { ContentTypeEnum } from '@/enums/httpEnum'
import { defHttp } from '@/utils/http/axios'

export const getPersonById = (params) => {
  return defHttp.get({ url: '/person', params })
}

export const queryPerson = (params) => {
  return defHttp.get({ url: '/person/find', params })
}

export const formUrl = (params) => {
  return defHttp.post({
    url: '/person',
    data: params,
    headers: {
      'content-type': ContentTypeEnum.FORM_URLENCODED
    }
  })
}

export const json = (params) => {
  return defHttp.post({ url: '/person', data: params })
}

export const formData = (params) => {
  return defHttp.post({
    url: '/person/file',
    data: params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA
    }
  })
}
