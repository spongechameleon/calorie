import { toast } from '@zerodevx/svelte-toast'

export function tSuccess(s: string) {
  toast.push(s, {
    theme: {
      '--toastBackground': '#48BB78',
      '--toastBarBackground': '#48BB78'
    }
  })
}

export function tError(s: string) {
  toast.push(s, {
    theme: {
      '--toastBackground': '#F56565',
      '--toastBarBackground': '#F56565'
    }
  })
}