import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import type { RequestOptions, Result } from '#/axios'
import { ApiMsgEnum } from '@/enums/msgEnum'
import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums/httpEnum'
import { useMessage } from '@/hooks/web/useMessage'
import { deepMerge, setObjToUrlParams } from '@/utils'
import { cloneDeep, isString } from 'lodash-es'
import { VAxios } from './Axios'
import { formatRequestDate, joinTimestamp } from './helper'
import { checkStatus } from './checkStatus'
import { AxiosRetry } from './AxiosRetry'
import { useGlobSetting } from '@/hooks/setting'

const globSetting = useGlobSetting()
const { createMessage, createErrorModal } = useMessage()

const transform: AxiosTransform = {
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    if (isReturnNativeResponse) return res
    if (!isTransformResponse) return res.data
    const { data: response } = res
    console.log(response)

    if (!response) {
      throw new Error(ApiMsgEnum.apiRequestFailed)
    }
    const { code, data, message } = response

    const hasSuccess = response && Reflect.has(response, 'code') && code === ResultEnum.SUCCESS
    if (hasSuccess) {
      return { error: null, data }
    }

    if (options.errorMessageMode === 'modal') {
      createErrorModal({ title: ApiMsgEnum.errorTip, content: message })
    } else if (options.errorMessageMode === 'message') {
      void createMessage.error(message)
    }

    return { error: response }
    // throw new Error(message || ApiMsgEnum.apiRequestFailed)
  },

  beforeRequestHook(config, options): CreateAxiosOptions {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options
    config.url = config.url || ''

    if (joinPrefix && urlPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }

    const params = config.params || {}
    const data = config.data || false

    if (formatDate && data && !isString(data)) {
      formatRequestDate(data)
    }

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          (Object.keys(config.data).length > 0 || config.data instanceof FormData)
        ) {
          config.data = data
          config.params = params
        } else {
          config.data = config.params
          config.params = undefined
        }

        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url, config.data)
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }

    return config
  },

  // 请求拦截器处理
  requestInterceptors(config, _options): AxiosRequestConfig {
    // 可以在这里处理增加token等
    // options.authenticationScheme
    return config
  },

  // 响应拦截器处理
  responseInterceptors(res: AxiosResponse) {
    return res
  },

  // 响应错误处理
  responseInterceptorsCatch(
    axiosInstance: AxiosInstance,
    error: any
  ): Promise<any> | Promise<never> {
    console.log(error)

    const { response, code, message, config } = error || {}
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
    const msg: string = response?.statusText ?? ''
    const err: string = error?.toString?.() ?? ''
    let errMessage = ''

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = ApiMsgEnum.apiTimeoutMessage
      }
      if (err?.includes('Network Error')) {
        errMessage = ApiMsgEnum.networkExceptionMsg
      }
      if (errMessage) {
        if (errorMessageMode === 'modal') {
          createErrorModal({ title: ApiMsgEnum.errorTip, content: errMessage })
        } else if (errorMessageMode === 'message') {
          void createMessage.error(errMessage)
        }
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error as string)
    }

    checkStatus(response?.status, msg, errorMessageMode)

    // 自动重试，只针对GET请求
    const { isOpenRetry } = config.requestOptions.retryRequest
    if (config.method?.toUpperCase() === RequestEnum.GET && isOpenRetry) {
      const retryRequest = new AxiosRetry()
      // ts-ignore
      void retryRequest.retry(axiosInstance, error)
    }

    return Promise.reject(error)
  }
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        authenticationScheme: '',
        timeout: 10 * 1000,

        headers: { 'Content-type': ContentTypeEnum.JSON },
        transform: cloneDeep(transform),
        requestOptions: {
          joinPrefix: true,
          isReturnNativeResponse: false,
          isTransformResponse: true,
          joinParamsToUrl: false,
          formatDate: true,
          errorMessageMode: 'message',
          apiUrl: globSetting.apiUrl,
          urlPrefix: globSetting.urlPrefix,
          joinTime: true,
          ignoreCancelToken: true,
          withToken: true,
          retryRequest: {
            isOpenRetry: false,
            count: 5,
            waitTime: 100
          }
        }
      },
      opt || {}
    )
  )
}

export const defHttp = createAxios({
  requestOptions: {
    isReturnNativeResponse: true
  }
})
