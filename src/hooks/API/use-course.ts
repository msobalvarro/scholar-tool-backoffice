import type { CoursesResponse, CreateCourseRequest } from '@/dtos/types'
import { axiosInstance } from '@/utils/axios-intance'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'

export const useCourses = () => useQuery({
  queryKey: ['courses'],
  queryFn: async () => {
    const { data } = await axiosInstance.get<CoursesResponse[]>('/courses')
    return data
  }
})

export const useCourseActions = () => {
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)

  const addCourseMutation = useMutation({
    mutationFn: async (course: CreateCourseRequest) => {
      setError(null)
      const { data } = await axiosInstance.post<CoursesResponse>('/courses', course)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)
      setError(err)
    }
  })

  const updateCourseMutation = useMutation({
    mutationFn: async ({ id, course }: { id: string, course: Partial<CreateCourseRequest> }) => {
      setError(null)
      const { data } = await axiosInstance.patch<CoursesResponse>(`/courses/${id}`, course)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)
      setError(err)
    }
  })

  const deleteCourseMutation = useMutation({
    mutationFn: async (id: string) => {
      setError(null)
      const { data } = await axiosInstance.delete(`/courses/${id}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)
      setError(err)
    }
  })

  return {
    addCourse: addCourseMutation.mutateAsync,
    updateCourse: updateCourseMutation.mutateAsync,
    deleteCourse: deleteCourseMutation.mutateAsync,
    isLoading: addCourseMutation.isPending || updateCourseMutation.isPending || deleteCourseMutation.isPending,
    error,
  }
}