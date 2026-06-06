import { useMutation, useQuery } from '@tanstack/react-query'
import type { ResponsablePerson } from '@/dtos/types'
import type { IRepresentativeCreated } from '@/dtos/outputs/representative-output'
import { axiosInstance } from '@/adapters/axios-intance'

export const useSearchRepresentative = (query: string) =>
  useQuery({
    queryKey: ['representatives', 'search', query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ResponsablePerson[]>('/responsable/search', {
        params: { q: query }
      })
      return data
    },
    enabled: query.trim().length > 0
  })

export const useCreateRepresentative = () => useMutation({
  mutationFn: async (data: ResponsablePerson) => {
    const { data: response } = await axiosInstance.post<IRepresentativeCreated>('/responsable', data)
    return response
  },
  mutationKey: ['representatives', 'create'],
})