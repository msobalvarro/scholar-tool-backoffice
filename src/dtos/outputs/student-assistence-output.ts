import type { StudentResponse } from './student-output'

export type StudentAssistenceResponse = {
  _id?: string
  student: StudentResponse
  date: Date | string
  assistence: boolean
  matricule?: unknown
  justification?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}
