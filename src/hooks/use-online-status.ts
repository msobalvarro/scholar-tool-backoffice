import { useEffect, useState } from 'react'
import { onlineManager } from '@tanstack/react-query'

interface UseOnlineStatusOptions {
  onOnline?: () => void
  onOffline?: () => void
}

export function useOnlineStatus(options?: UseOnlineStatusOptions) {
  const [isOnline, setIsOnline] = useState(onlineManager.isOnline())

  useEffect(() => {
    const unsubscribe = onlineManager.subscribe((online) => {
      setIsOnline(online)
      if (online) {
        options?.onOnline?.()
      } else {
        options?.onOffline?.()
      }
    })

    return () => {
      unsubscribe()
    }
  }, [options])

  return isOnline
}
