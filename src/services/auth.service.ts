import { KEYSTORE_NAMES } from '@/env'
import type { LoginUserInstitutionResponse, LoginUserTeacherResponse } from '@/dtos/types'
import { AxiosError } from 'axios'
import { axiosInstance } from '@/adapters/axios-intance'

export const authLoginUserInstitutionService = async (email: string, password: string) => {
  try {
    // El token ya NO viene en el body — el servidor lo setea como cookie HttpOnly
    const { data } = await axiosInstance.post<Omit<LoginUserInstitutionResponse, 'token'>>('/auth/institution', {
      email,
      password,
    })

    localStorage.setItem(KEYSTORE_NAMES.USER_INSTITUTION, JSON.stringify(data.user))
    localStorage.setItem(KEYSTORE_NAMES.INSTITUTION, JSON.stringify(data.institution))

    return data
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión')
    }
    throw new Error(String(error))
  }
}

export const authLoginTeacherService = async (email: string, password: string) => {
  try {
    // El token ya NO viene en el body — el servidor lo setea como cookie HttpOnly
    const { data } = await axiosInstance.post<Omit<LoginUserTeacherResponse, 'token'>>('/auth/teacher', {
      email,
      password,
    })

    const teacherData = data.teacher || data.user

    if (teacherData) {
      localStorage.setItem(KEYSTORE_NAMES.TEACHER, JSON.stringify(teacherData))
    }
    if (data.institution) {
      localStorage.setItem(KEYSTORE_NAMES.INSTITUTION, JSON.stringify(data.institution))
    }

    return data
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión como docente')
    }
    throw new Error(String(error))
  }
}
