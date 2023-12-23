import { Modal, message as Message, notification } from 'ant-design-vue'
import type { ModalFunc } from 'ant-design-vue/es/modal/Modal'
import type { ModalFuncProps } from 'ant-design-vue'
import { InfoCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue'
import { isString } from 'lodash-es'
import { ButtonText } from '@/enums/commonEnum'

export interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType: 'warning' | 'success' | 'error' | 'info'
}
export type ModalOptionsPartial = Partial<ModalOptionsEx> & Pick<ModalOptionsEx, 'content'>

interface ConfirmOptions {
  info: ModalFunc
  success: ModalFunc
  error: ModalFunc
  warn: ModalFunc
  warning: ModalFunc
}

function getIcon(iconType: string): JSX.Element {
  if (iconType === 'warning') {
    return <InfoCircleFilled class="modal-icon-warning" />
  } else if (iconType === 'success') {
    return <CheckCircleFilled class="modal-icon-success" />
  } else if (iconType === 'info') {
    return <InfoCircleFilled class="modal-icon-info" />
  } else {
    return <CloseCircleFilled class="modal-icon-error" />
  }
}

function renderContent({ content }: Pick<ModalOptionsEx, 'content'>) {
  if (isString(content)) {
    return (
      <div>
        <div>{{ content }}</div>
      </div>
    )
  } else {
    return content
  }
}

function createConfirm(options: ModalOptionsEx): ConfirmOptions {
  const iconType = options.iconType || 'warning'
  Reflect.deleteProperty(options, 'iconType')
  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    ...options,
    content: renderContent(options)
  }
  return Modal.confirm(opt) as unknown as ConfirmOptions
}

const getBaseOptions = () => {
  return {
    okText: ButtonText.okText,
    centred: true
  }
}

function createModalOptions(options: ModalOptionsPartial, icon: string) {
  return {
    ...getBaseOptions(),
    ...options,
    content: renderContent(options),
    icon: getIcon(icon)
  }
}

function createSuccessModal(options: ModalOptionsPartial) {
  return Modal.success(createModalOptions(options, 'success'))
}

function createErrorModal(options: ModalOptionsPartial) {
  return Modal.error(createModalOptions(options, 'close'))
}

function createInfoModal(options: ModalOptionsPartial) {
  return Modal.info(createModalOptions(options, 'info'))
}

function createWarningModal(options: ModalOptionsPartial) {
  return Modal.warning(createModalOptions(options, 'warning'))
}

notification.config({
  placement: 'topRight',
  duration: 3
})

export function useMessage() {
  return {
    createMessage: Message,
    notification,
    createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal
  }
}
