import { axiosInstance } from '@/utils/axios-intance'
import { KEYSTORE_NAMES } from '@/env'
import type { LoginUserInstitutionResponse } from '@/dtos/types'
import { AxiosError } from 'axios'

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
      throw new Error(error.response?.data.message)
    }
    throw new Error(String(error))
  }
}

export const authLoginTeacherService = async (email: string, password: string) => {
  try {
    const { data } = await axiosInstance.post<LoginUserInstitutionResponse>('/auth/teacher', {
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
      throw new Error(error.response?.data.message)
    }
    throw new Error(String(error))
  }
}
