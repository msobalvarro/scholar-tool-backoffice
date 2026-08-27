import { KEYSTORE_NAMES } from '@/env'
import type { LoginUserInstitutionResponse, LoginUserTeacherResponse } from '@/dtos/types'
import { AxiosError } from 'axios'
import { axiosInstance } from '@/adapters/axios-intance'

export const authLoginUserInstitutionService = async (email: string, password: string) => {
  try {
    const { data } = await axiosInstance.post<LoginUserInstitutionResponse>('/auth/institution', {
      email,
      password,
    })

    localStorage.setItem(KEYSTORE_NAMES.TOKEN_USER_INSTITUTION, data.token)
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
    const { data } = await axiosInstance.post<LoginUserTeacherResponse>('/auth/teacher', {
      email,
      password,
    })

    const teacherData = data.teacher || data.user

    localStorage.setItem(KEYSTORE_NAMES.TOKEN_TEACHER, data.token)
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
