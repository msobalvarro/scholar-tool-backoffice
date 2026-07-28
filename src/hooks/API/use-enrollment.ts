import type { IEnrollment } from '@/dtos/outputs/enrollment-output'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/adapters/axios-intance'
import type { EnrollmentInput, EnrollmentUpdateInput } from '@/schemas/enrollment-schema'

export const useEnrollment = () => {
  const queryClient = useQueryClient()

  const getEnrollments = useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IEnrollment[]>('/enrollments')
      return data
    },
    enabled: true
  })

  const createEnrollment = useMutation({
    mutationFn: async (payload: EnrollmentInput) => {
      const { data } = await axiosInstance.post<IEnrollment>('/enrollments', payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] })
    }
  })

  const updateEnrollment = useMutation({
    mutationFn: async (enrollment: EnrollmentUpdateInput) => {
      const { data } = await axiosInstance.put<IEnrollment>('/enrollments', enrollment)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] })
    }
  })

  return {
    getEnrollments,
    createEnrollment,
    updateEnrollment,
  }
}