import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { axiosInstance } from '@/adapters/axios-intance'
import type { CreateStudentAssistencePayload } from '@/dtos/inputs/student-assistence-input'
import type { StudentAssistenceResponse } from '@/dtos/outputs/student-assistence-output'
import soundSuccess from '@/assets/sounds/success.mp3'
import soundError from '@/assets/sounds/error.mp3'
import { useSound } from 'use-sound'

export const useCreateStudentAssistence = () => {
  const [playSuccess] = useSound(soundSuccess)
  const [playError] = useSound(soundError)

  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: async (payload: CreateStudentAssistencePayload) => {
      setError(null)
      const { data } = await axiosInstance.post<StudentAssistenceResponse>('/student-assistences', payload)
      return data
    },
    onSuccess: () => {
      console.log('Success')
      queryClient.invalidateQueries({ queryKey: ['student-assistences'] })
      playSuccess()
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data?.message || String(error)
        : String(error)
      setError(err)
      playError()
    }
  })

  return {
    ...mutation,
    createAssistence: mutation,
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

export const useLastAssitences = () => useQuery({
  queryKey: ['student-assistences', 'last'],
  queryFn: async () => {
    const { data } = await axiosInstance.get<StudentAssistenceResponse[]>('/student-assistences/last')
    return data
  },
  refetchInterval: 10_000,
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
