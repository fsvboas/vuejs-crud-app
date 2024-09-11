import {
  useToast as useVueToastNotification,
  type ActiveToast,
  type ToastPosition
} from 'vue-toast-notification'

type ToastType = {
  message: string
  position?: ToastPosition
  duration?: number
}

export const useToast = () => {
  const { open } = useVueToastNotification()

  const showSuccess = ({ message, position, duration }: ToastType): ActiveToast => {
    const printableText = typeof message === 'string' ? message : JSON.stringify(message)
    return open({
      type: 'success',
      message: printableText,
      position: position,
      duration: duration
    })
  }

  const showWarning = ({ message, position, duration }: ToastType): ActiveToast => {
    const printableText = typeof message === 'string' ? message : JSON.stringify(message)
    return open({
      type: 'warn',
      message: printableText,
      position: position,
      duration: duration
    })
  }

  const showError = ({ message, position, duration }: ToastType): ActiveToast => {
    const printableText = typeof message === 'string' ? message : JSON.stringify(message)
    return open({
      type: 'error',
      message: printableText,
      position: position,
      duration: duration
    })
  }

  return { showSuccess, showWarning, showError }
}
