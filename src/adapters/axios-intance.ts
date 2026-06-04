import { BASE_URL, KEYSTORE_NAMES } from '@/env'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token =
    localStorage.getItem(KEYSTORE_NAMES.TOKEN_USER_INSTITUTION)
    ||
    localStorage.getItem(KEYSTORE_NAMES.TOKEN_USER)
    ||
    localStorage.getItem(KEYSTORE_NAMES.TOKEN_TEACHER)

  if (token) {
    config.headers.Authorization = `Bearer ${token.replaceAll('"', '')}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear()

      window.location.pathname = '/'
      window.location.reload()
    }
    return Promise.reject(error)
  }
)