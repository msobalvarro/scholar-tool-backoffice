import type { IEnrollment } from '@/dtos/outputs/enrollment-output'
import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/adapters/axios-intance'
import type { EnrollmentInput, EnrollmentUpdateInput } from '@/schemas/enrollment-schema'

export const useEnrollment = () => {
  const getEnrollments = useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IEnrollment[]>('/enrollments')
      return data
    }
  })


  const createEnrollment = (payload: EnrollmentInput) => useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post<IEnrollment>('/enrollments', payload)
      return data
    }
  })

  const updateEnrollment = (enrollment: EnrollmentUpdateInput) => useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.put<IEnrollment>('/enrollments', enrollment)
      return data
    }
  })

  return {
    getEnrollments,
    createEnrollment,
    updateEnrollment,
  }
}