import type { Asignature, Teacher } from '../types'
import type { Institution, UserInstitution } from '../types/models'


export interface TaskSchedule {
  _id?: string
  teacher: Teacher
  asignature: Asignature
  month: number
  year: number
  aproved?: boolean
  aprovedBy?: UserInstitution | null
  scheduleUnit: ScheduleUnit[]
  institution: Institution
  createdAt: Date
}

export interface ScheduleUnit {
  unitName: string
  diciplineName: string
  tasks: TaskDetail[]
}

export interface TaskDetail {
  content: string
  evaluationMethod: string
  page?: string | null
  inNotebook: boolean
  date: string
  points: number
}
