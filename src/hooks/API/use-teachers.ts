import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Teacher } from '@/dtos/types'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { axiosInstance } from '@/adapters/axios-intance'

export const useTeachers = () => useQuery({
  queryKey: ['teachers'],
  queryFn: async () => {
    const { data } = await axiosInstance.get<Teacher[]>('/teachers')
    return data
  }
})

export const useTeacherActions = () => {
  const [error, setError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const createTeacherMutation = useMutation({
    mutationFn: async (teacher: Omit<Teacher, '_id' | 'institution'>) => {
      setError(null)
      return await axiosInstance.post('/teachers', teacher)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)
      setError(err)
    }
  })

  const updateTeacherMutation = useMutation({
    mutationFn: async ({ id, teacher }: { id: string, teacher: Partial<Teacher> }) => {
      setError(null)
      return await axiosInstance.put(`/teachers/${id}`, teacher)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)
      setError(err)
    }
  })

  const deleteTeacherMutation = useMutation({
    mutationFn: async (id: string) => {
      setError(null)
      return await axiosInstance.delete(`/teachers/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)
      setError(err)
    }
  })

  return {
    postTeacher: createTeacherMutation.mutateAsync,
    patchTeacher: updateTeacherMutation.mutateAsync,
    deleteTeacher: deleteTeacherMutation.mutateAsync,
    error,
    isLoading: createTeacherMutation.isPending || updateTeacherMutation.isPending || deleteTeacherMutation.isPending
  }
}
