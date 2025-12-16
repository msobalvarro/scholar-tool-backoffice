import axios from 'axios'
import { KEYSTORE_NAMES } from './constant'

const baseURL = import.meta.env.VITE_BASE_URL

export const axiosInstance = axios.create({
  baseURL,
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
    console.log(error)

    if (error.response.status === 401) {
      localStorage.clear()

      window.location.pathname = '/'
      window.location.reload()
    }
    return Promise.reject(error)
  }
)


// fetcher.ts
export const axiosFetcher = async <T>(url: string): Promise<T> => {
  const { data } = await axiosInstance.get<T>(url)
  return data
}



