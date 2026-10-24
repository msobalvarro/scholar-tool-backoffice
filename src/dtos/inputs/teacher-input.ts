import type { Teacher } from '../types'

export type UpdateTeacherInput = Partial<Omit<Teacher, 'asignatures' | 'courses'>> & {
  asignatureIds?: string[]
  asignatures?: Teacher['asignatures']
  courseIds?: string[]
}

export type CreateOrUpdateTeacherInput = Omit<Teacher, '_id' | 'institution' | 'asignatures' | 'courses'> & {
  asignatureIds?: string[]
  courseIds?: string[]
}

export interface CreateTeacherFormValues {
  name: string
  email: string
  phoneNumber: string
  birthday: string
  status: 'active' | 'inactive'
  asignatureIds: string[]
  courseIds: string[]
}
