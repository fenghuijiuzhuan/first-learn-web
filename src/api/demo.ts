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

// 单个上传
export const uploadFile = (params) => {
  return defHttp.post({
    url: '/upload/aaa',
    data: params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA
    }
  })
}

// 批量上传
export const uploadFiles = (params) => {
  return defHttp.post({
    url: '/upload/bbb',
    params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA
    }
  })
}

// 批量上传多文件字段
export const uploadFilesManyKey = (params) => {
  return defHttp.post({
    url: '/upload/ccc',
    params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA
    }
  })
}

// 批量上传任意文件字段
export const uploadFilesAnyKey = (params) => {
  return defHttp.post({
    url: '/upload/ddd',
    params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA
    }
  })
}

// 批量上传任意文件字段
export const uploadFilesAnyKeyStorage = (params) => {
  return defHttp.post({
    url: '/upload/eee',
    params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA
    }
  })
}

// 单个上传 后端限制10k
export const uploadFileSize10k = (params) => {
  return defHttp.post({
    url: '/upload/eee',
    data: params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA
    }
  })
}
