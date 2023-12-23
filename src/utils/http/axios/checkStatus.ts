import type { ErrorMessageMode } from '#/axios'
import { ApiMsgEnum } from '@/enums/msgEnum'
import { useMessage } from '@/hooks/web/useMessage'

const { createErrorModal, createMessage } = useMessage()

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message'
) {
  let errMessage = ''
  console.log(status)

  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    case 401:
      errMessage = msg || ApiMsgEnum.errMsg401
      break
    case 403:
      errMessage = ApiMsgEnum.errMsg403
      break
    case 404:
      errMessage = ApiMsgEnum.errMsg404
      break
    case 405:
      errMessage = ApiMsgEnum.errMsg405
      break

    case 408:
      errMessage = ApiMsgEnum.errMsg408
      break

    case 500:
      errMessage = ApiMsgEnum.errMsg500
      break

    case 501:
      errMessage = ApiMsgEnum.errMsg501
      break

    case 502:
      errMessage = ApiMsgEnum.errMsg502
      break

    case 503:
      errMessage = ApiMsgEnum.errMsg503
      break

    case 504:
      errMessage = ApiMsgEnum.errMsg504
      break

    case 505:
      errMessage = ApiMsgEnum.errMsg505
      break
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: ApiMsgEnum.errorTip, content: errMessage })
    } else if (errorMessageMode === 'message') {
      void createMessage.error({
        content: errMessage,
        key: `global_error_message_status_${status}`
      })
    }
  }
}
