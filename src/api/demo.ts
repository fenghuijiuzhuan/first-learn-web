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
    url: '/upload/fff',
    data: params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA
    }
  })
}

// 单个上传 后端限制10k并且只能是png图片
export const uploadFileSize10kPng = (params) => {
  return defHttp.post({
    url: '/upload/ggg',
    data: params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA
    }
  })
}

// 单个上传 后端限制10k2
export const uploadFileSize10k2 = (params) => {
  return defHttp.post({
    url: '/upload/hhh',
    data: params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA
    }
  })
}

// 大文件文件切片上传
export const uploadFilesSlice = (params) => {
  return defHttp.post({
    url: '/upload/iii',
    data: params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA
    }
  })
}

// 大文件文件切片上传后合并
export const uploadFilesSliceMerge = (params) => {
  return defHttp.get({
    url: '/upload/merge',
    params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA
    }
  })
}
