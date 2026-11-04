import { BASE_URL } from '@/env'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Envía las cookies HttpOnly automáticamente en cada request
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const url: string = error.config?.url ?? ''
    const isAuthCheck = url.includes('/auth/me')

    // Solo redirigir si es un 401 en rutas protegidas, no en la comprobación de sesión
    if (error.response?.status === 401 && !isAuthCheck) {
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)
