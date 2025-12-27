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

export const useTeacherActions = () => {
  const postTeacher = async (teacher: Omit<Teacher, '_id' | 'institution'>) => {
    return await axiosInstance.post('/teachers', teacher)
  }

  const patchTeacher = async (id: string, teacher: Partial<Teacher>) => {
    return await axiosInstance.put(`/teachers/${id}`, teacher)
  }

  const deleteTeacher = async (id: string) => {
    return await axiosInstance.delete(`/teachers/${id}`)
  }

  return { postTeacher, patchTeacher, deleteTeacher }
}
