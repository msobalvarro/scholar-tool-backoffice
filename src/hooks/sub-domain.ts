
/**
 * retorna el subdominio de la url actual
 */
export const getSubdomain = () => {
  const hostname = window.location.hostname
  const parts = hostname.split('.')


  if (parts.length > 2 || (hostname.includes('localhost') && parts.length > 1)) {
    return parts[0]
  }

  return null
}