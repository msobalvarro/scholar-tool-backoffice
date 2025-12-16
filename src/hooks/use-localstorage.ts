import { useState } from 'react'

export const useSimpleLocalStorage = <T>(key: string) => {
  const [value, setValue] = useState<T | null>(() => {
    const item = localStorage.getItem(key)
    if (item) {
      try {
        return JSON.parse(item) as T
      } catch {
        return item as T
      }
    }

    return null
  })

  const set = (val: T) => {
    setValue(val)
    localStorage.setItem(key, JSON.stringify(val))
  }

  return [value, set] as const
}