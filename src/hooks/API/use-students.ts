import type {
  CreateStudentRequest,
  StudentResponse,
  UpdateStudentRequest
} from '@/utils/types'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/utils/axios-intance'
import { useState } from 'react'
import { AxiosError } from 'axios'

export function useStudents(params?: Record<string, unknown>): ReturnType<typeof useQuery<StudentResponse[]>>

export function useStudents(id: string, params?: Record<string, unknown>): ReturnType<typeof useQuery<StudentResponse>>

export function useStudents(idOrParams?: string | Record<string, unknown>, params?: Record<string, unknown>) {
  const id = typeof idOrParams === 'string' ? idOrParams : undefined
  const queryParams = typeof idOrParams === 'object' ? idOrParams : params

  return useQuery({
    queryKey: ['students', id, queryParams],
    queryFn: async () => {
      const url = id ? `/students/${id}` : '/students'
      const { data } = await axiosInstance.get<StudentResponse | StudentResponse[]>(url, { params: queryParams })
      return data
    }
  })
}

export const useStudentActions = () => {
  const [error, setError] = useState<string | null>(null)

  const addStudent = async (student: CreateStudentRequest) => {
    try {
      const { data } = await axiosInstance.post<StudentResponse>('/students', student)
      return data
    } catch (error) {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)

      setError(err)
      throw error
    }
  }

  const updateStudent = async (student: UpdateStudentRequest) => {
    try {
      const { data } = await axiosInstance.put<StudentResponse>(`/students/${student._id}`, student)
      return data
    } catch (error) {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)

      setError(err)

      throw error
    }
  }

  const deleteStudent = async (_id: string) => {
    try {
      const { data } = await axiosInstance.delete<StudentResponse>(`/students/${_id}`)
      return data
    } catch (error) {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)

      setError(err)

      throw error
    }
  }

  return {
    error,
    addStudent,
    updateStudent,
    deleteStudent
  }
}