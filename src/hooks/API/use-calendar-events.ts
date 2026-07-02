import { axiosInstance } from '@/adapters/axios-intance'
import type { CalendarEventResponse, CreateCalendarEventDto } from '@/dtos/outputs/calendar-events-output'
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCalendar = () => {
  const getCalendarEvents = useQuery({
    queryKey: ['calendar-events'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<CalendarEventResponse[]>('/calendar-events')
      return data
    }
  })

  const createEvent = useMutation({
    mutationFn: async (data: Omit<CreateCalendarEventDto, 'time'>) => {
      const { data: response } = await axiosInstance.post<CalendarEventResponse>('/calendar-events', data)
      return response
    }
  })

  return {
    getCalendarEvents,
    createEvent,
  }
}