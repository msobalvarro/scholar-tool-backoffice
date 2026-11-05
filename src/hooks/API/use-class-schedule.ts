import type { ClassScheduleResponse } from '@/dtos/outputs/class-schedule-output'
import { axiosInstance } from '@/adapters/axios-intance'
import { useQuery } from '@tanstack/react-query'

export const useClassSchedule = (courseId: string, year: string | number) => useQuery({
  queryKey: ['class-schedule', courseId, String(year)],
  queryFn: async () => {
    const { data } = await axiosInstance.get<ClassScheduleResponse[]>(`/class-schedule/course/${courseId}/year/${year}`)
    return data
  }
})