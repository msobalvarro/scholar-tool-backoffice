import type { Teacher } from '../types'

export type UpdateTeacherInput = Partial<Omit<Teacher, 'asignatures'>> & {
  asignatureIds?: string[]
  asignatures?: Teacher['asignatures']
}

export type CreateTeacherInput = Omit<Teacher, '_id' | 'institution' | 'asignatures'> & {
  asignatureIds?: string[]
}