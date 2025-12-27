import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/utils/axios-intance'
import type { Teacher } from '@/utils/types'

export const useTeachers = () => useQuery({
  queryKey: ['teachers'],
  queryFn: async () => {
    const { data } = await axiosInstance.get<Teacher[]>('/teachers')
    return data
  }
})
