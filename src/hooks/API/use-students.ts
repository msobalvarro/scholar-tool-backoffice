
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { AxiosError } from 'axios'
import type { CreateStudentRequest, UpdateStudentRequest } from '@/dtos/inputs/student.input'
import type { StudentResponse } from '@/dtos/outputs/student-output'
import { axiosInstance } from '@/adapters/axios-intance'

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

export const useStudentsByGroupId = (groupId?: string) => useQuery({
  queryKey: ['studentsByGroupId', groupId],
  queryFn: async () => {
    const { data } = await axiosInstance.get<StudentResponse[]>(`/students/course/${groupId}`)
    return data
  },
  enabled: !!groupId
})

export const useStudentActions = () => {
  const [error, setError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const addStudentMutation = useMutation({
    mutationFn: async (student: CreateStudentRequest) => {
      setError(null)
      const { data } = await axiosInstance.post<StudentResponse>('/students', student)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)
      setError(err)
    }
  })

  const updateStudentMutation = useMutation({
    mutationFn: async (student: UpdateStudentRequest) => {
      setError(null)
      const { data } = await axiosInstance.put<StudentResponse>(`/students/${student._id}`, student)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)
      setError(err)
    }
  })

  const deleteStudentMutation = useMutation({
    mutationFn: async (_id: string) => {
      setError(null)
      const { data } = await axiosInstance.delete<StudentResponse>(`/students/${_id}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)
      setError(err)
    }
  })

  const assignStudentToCourseMutation = useMutation({
    mutationFn: async (payload: { studentId: string, courseId: string }) => {
      setError(null)
      const { data } = await axiosInstance.post('/students/course/assign', payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      queryClient.invalidateQueries({ queryKey: ['studentsByGroupId'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)
      setError(err)
    }
  })

  return {
    error,
    addStudent: addStudentMutation.mutateAsync,
    updateStudent: updateStudentMutation.mutateAsync,
    deleteStudent: deleteStudentMutation.mutateAsync,
    assignStudentToCourse: assignStudentToCourseMutation.mutateAsync,
    isLoading: addStudentMutation.isPending || updateStudentMutation.isPending || deleteStudentMutation.isPending || assignStudentToCourseMutation.isPending
  }
}