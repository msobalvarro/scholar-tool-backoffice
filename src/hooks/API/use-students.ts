import type {
  CreateStudentRequest,
  StudentResponse,
  UpdateStudentRequest
} from '@/utils/types'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/utils/axios-intance'
import { useState } from 'react'
import { AxiosError } from 'axios'

export const useStudents = () => useQuery({
  queryKey: ['students'],
  queryFn: async () => {
    const { data } = await axiosInstance.get<StudentResponse[]>('/students')
    return data
  }
})

export const useStudentActions = () => {
  const [error, setError] = useState<string | null>(null)

  const addStudent = async (student: CreateStudentRequest) => {
    try {
      const { data } = await axiosInstance.post<StudentResponse>('/students', student)
      return data
    } catch (error) {
      setError(
        error instanceof AxiosError
          ? error.response?.data.message
          : String(error)
      )
    }
  }

  const updateStudent = async (student: UpdateStudentRequest) => {
    try {
      const { data } = await axiosInstance.put<StudentResponse>(`/students`, student)
      return data
    } catch (error) {
      setError(
        error instanceof AxiosError
          ? error.response?.data.message
          : String(error)
      )
    }
  }

  const deleteStudent = async (_id: string) => {
    try {
      const { data } = await axiosInstance.delete<StudentResponse>(`/students/${_id}`)
      return data
    } catch (error) {
      setError(
        error instanceof AxiosError
          ? error.response?.data.message
          : String(error)
      )
    }
  }

  return {
    error,
    addStudent,
    updateStudent,
    deleteStudent
  }
}