import type { TaskScheduleSchema } from '@/schemas/task-schedule-schema'
import type { TaskSchedule } from '@/dtos/outputs/task-schedule'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/adapters/axios-intance'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { useSimpleLocalStorage } from '@/hooks/use-localstorage'
import { KEYSTORE_NAMES } from '@/env'
import type { Teacher, Asignature } from '@/dtos/types'
import type { AsignatureResponse } from '@/dtos/outputs/asignature-output'

export const useTeacherAsignatures = () => {
  const [teacher] = useSimpleLocalStorage<Teacher>(KEYSTORE_NAMES.TEACHER)

  const query = useQuery({
    queryKey: ['teacher-asignatures', teacher?._id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AsignatureResponse[]>('/asignatures/teacher/all')
      return data
    },
    enabled: Boolean(!teacher?.asignatures || teacher.asignatures.length === 0),
  })

  const asignatures: (Asignature | AsignatureResponse)[] =
    teacher?.asignatures && teacher.asignatures.length > 0
      ? teacher.asignatures
      : (query.data || [])

  return {
    asignatures,
    teacher,
    isLoading: query.isLoading && (!teacher?.asignatures || teacher.asignatures.length === 0),
  }
}

export const useTaskScheduleActions = () => {
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)
  const createTaskScheduleMutation = useMutation({
    mutationFn: async (taskSchedule: TaskScheduleSchema) => {
      setError(null)
      const { data } = await axiosInstance.post<TaskSchedule>('/task-schedules/create', taskSchedule)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task-schedules'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data?.message || error.message
        : String(error)
      setError(err)
    }
  })
  return {
    createTaskSchedule: createTaskScheduleMutation.mutateAsync,
    isLoading: createTaskScheduleMutation.isPending,
    error,
  }
}