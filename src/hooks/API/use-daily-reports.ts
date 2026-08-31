import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { axiosInstance } from '@/adapters/axios-intance'
import { toast } from 'sonner'
import type { IDailyReportStudentResponse } from '@/dtos/outputs/daily-reports-output'
import type { CreateDailyReportSchema } from '@/schemas/daily-reports-schema'

export const useCreateDailyReport = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateDailyReportSchema) => {
      const { data } = await axiosInstance.post<IDailyReportStudentResponse>('/daily-reports', payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-reports'] })
      toast.success('Reporte creado exitosamente', { richColors: true, position: 'bottom-center' })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data?.message || String(error)
        : String(error)

      toast.error(err, {
        richColors: true,
        position: 'bottom-center',
        duration: 5000,
      })
    },
  })
}

export const useDailyReportsByDate = (from?: string, to?: string) => useQuery({
  queryKey: ['daily-reports', from, to],
  queryFn: async () => {
    const { data } = await axiosInstance.get<IDailyReportStudentResponse[]>('/daily-reports', {
      params: { from, to },
    })
    return data
  }
})

