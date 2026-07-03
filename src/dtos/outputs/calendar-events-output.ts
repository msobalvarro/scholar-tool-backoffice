import type { createCalendarEventSchema, updateCalendarEventSchema } from '@/schemas/calendar-event-schema'
import type { CoursesResponse } from '../types'
import { z } from 'zod'

export type CreateCalendarEventDto = z.infer<typeof createCalendarEventSchema>
export type UpdateCalendarEventDto = z.infer<typeof updateCalendarEventSchema>

export type CalendarEventType = 'exam' | 'task' | 'meeting' | 'holiday' | 'class' | 'other'

export interface CalendarEventResponse {
  _id: string
  date: Date
  type: CalendarEventType
  title: string
  description: string
  course?: CoursesResponse
}

export interface CalendarEventCategoryStyle {
  label: string
  color: string
  text: string
  badge: string
}
