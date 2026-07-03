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
    },
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

  const updateEvent = useMutation({
    mutationFn: async (payload: CalendarEventResponse) => {
      const { data: response } = await axiosInstance.put<CalendarEventResponse>(`/calendar-events`, payload)
      return response
    },
    onSuccess: async (_, payload) => {
      await getCalendarEvents.refetch()
      toast.success('Evento actualizado exitosamente', {
        description: `El evento ${payload.title} ha sido actualizado correctamente.`
      })
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Error al actualizar el evento', {
        description: error.response?.data?.message
      })
    }
  })

  const deleteEvent = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/calendar-events/${id}`)
    },
    onSuccess: async () => {
      await getCalendarEvents.refetch()
      toast.success('Evento eliminado exitosamente')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Error al eliminar el evento', {
        description: error.response?.data?.message
      })
    }
  })

  return {
    getCalendarEvents,
    createEvent,
    updateEvent,
    deleteEvent
  }
}