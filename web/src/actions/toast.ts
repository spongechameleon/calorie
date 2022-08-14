import { toast } from '@zerodevx/svelte-toast'

export function tSuccess(s: string) {
  toast.push(s, {
    theme: {
      '--toastBackground': '#48BB78',
      '--toastBarBackground': '#2F855A'
    }
  })
}

export function tError(s: string) {
  toast.push(s, {
    theme: {
      '--toastBackground': '#F56565',
      '--toastBarBackground': '#C53030'
    }
  })
}