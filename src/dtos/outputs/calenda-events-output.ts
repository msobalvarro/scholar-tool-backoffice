import type { CoursesResponse } from '../types'

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
