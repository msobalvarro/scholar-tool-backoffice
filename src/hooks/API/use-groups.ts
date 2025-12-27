import type { CoursesResponse } from '@/utils/types'
import { axiosInstance } from '@/utils/axios-intance'
import { useQuery } from '@tanstack/react-query'

export const useGroups = () => useQuery({
  queryKey: ['courses'],
  queryFn: async () => {
    const { data } = await axiosInstance.get<CoursesResponse[]>('/courses')
    return data
  }
})

// export const useGroupById = (_id:string) => useQuery({
//   queryKey: ['group', _id],
//   queryFn: async () => {
//     const { data } = await axiosInstance.get<GroupResponse>(`/courses/${_id}`)
//     return data
//   }
// })