import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { axiosInstance } from '@/adapters/axios-intance'
import type { CreateStudentAssistencePayload } from '@/dtos/inputs/student-assistence-input'
import type { StudentAssistenceResponse } from '@/dtos/outputs/student-assistence-output'

export const useCreateStudentAssistence = () => {
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: async (payload: CreateStudentAssistencePayload) => {
      setError(null)
      const { data } = await axiosInstance.post<StudentAssistenceResponse>('/student-assistences', payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-assistences'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data?.message || String(error)
        : String(error)
      setError(err)
    }
  })

  return {
    ...mutation,
    createAssistence: mutation.mutateAsync,
    error
  }
}

export const useStudentAssistencesByStudent = (studentId?: string) => useQuery({
  queryKey: ['student-assistences', 'student', studentId],
  queryFn: async () => {
    const { data } = await axiosInstance.get<StudentAssistenceResponse[]>(`/student-assistences/student/${studentId}`)
    return data
  },
  enabled: !!studentId
})

export const useStudentAssistence = () => {
  const createAssistenceMutation = useCreateStudentAssistence()

  return {
    createAssistence: createAssistenceMutation.createAssistence,
    isLoading: createAssistenceMutation.isPending,
    error: createAssistenceMutation.error,
    createAssistenceMutation
  }
}
