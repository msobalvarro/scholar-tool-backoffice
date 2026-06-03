import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/utils/axios-intance'
import type { ResponsablePerson } from '@/dtos/types'

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
