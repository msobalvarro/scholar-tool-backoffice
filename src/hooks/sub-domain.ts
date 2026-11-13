import type { Subdomain } from '@/dtos/types/subdomain'

/**
 * retorna el subdominio de la url actual
 */
export const getSubdomain = (): Subdomain | null => {
  const hostname = window.location.hostname
  const parts = hostname.split('.')


  if (parts.length > 2 || (hostname.includes('localhost') && parts.length > 1)) {
    return parts[0] as Subdomain
  }

  return null
}