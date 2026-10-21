import type { TaskScheduleSchema } from '@/schemas/task-schedule-schema'
import type { TaskSchedule } from '@/dtos/outputs/task-schedule'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/adapters/axios-intance'
import { useState } from 'react'
import { AxiosError } from 'axios'

export const useTasksSchedule = ({ year, month }: { year: number, month: number }) => {
  const query = useQuery({
    queryKey: ['task-schedules', 'date', year, month],
    queryFn: async () => {
      const { data } = await axiosInstance.get<TaskSchedule[]>(`/task-schedules/date/${year}/${month}`)
      return data
    },
  })

  return {
    taskSchedules: query.data,
    isLoading: query.isLoading,
  }
}

export const useTasksScheduleByTeacher = ({ year, month }: { year: number, month: number }) => {
  const query = useQuery({
    queryKey: ['task-schedules', 'teacher', year, month],
    queryFn: async () => {
      const { data } = await axiosInstance.get<TaskSchedule[]>(`/task-schedules/teacher?year=${year}&month=${month}`)
      return data
    },
  })

  return {
    taskSchedules: query.data,
    isLoading: query.isLoading,
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