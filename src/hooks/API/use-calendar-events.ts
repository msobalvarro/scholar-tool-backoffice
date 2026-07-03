import { axiosInstance } from '@/adapters/axios-intance'
import type { CalendarEventResponse, CreateCalendarEventDto } from '@/dtos/outputs/calendar-events-output'
import type { AxiosError } from 'axios'
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from 'sonner'

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
    },
    onSuccess: async (_, payload) => {
      await getCalendarEvents.refetch()
      toast.success('Evento creado exitosamente', {
        description: `El evento ${payload.title} ha sido programado y notificado correctamente.`
      })
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Error al crear el evento', {
        description: error.response?.data?.message
      })
    }
  })

  return {
    getCalendarEvents,
    createEvent,
  }
}