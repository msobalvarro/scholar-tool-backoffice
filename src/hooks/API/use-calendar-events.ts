import { axiosInstance } from '@/adapters/axios-intance'
import type { CalendarEventResponse } from '@/dtos/outputs/calendar-events-output'
import { useQuery } from "@tanstack/react-query"

export const useCalendar = () => {
  const getCalendarEvents = useQuery({
    queryKey: ['calendar-events'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<CalendarEventResponse[]>('/calendar-events')
      return data
    }
  })

  return {
    getCalendarEvents
  }
}