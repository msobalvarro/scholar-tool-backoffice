import type { CoursesResponse, Institution } from '../types'
import type { AsignatureResponse } from './asignature-output'


export type DayOfWeek = 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES'

export interface TimeTableSlot {
  asignature: AsignatureResponse | null
  isBreak: boolean
  startTime: string
  endTime: string
}

export interface ClassScheduleResponse {
  _id: string
  course: CoursesResponse
  dayOfWeek: DayOfWeek
  institution: Institution
  year: number
  timeSlots: TimeTableSlot[]
}