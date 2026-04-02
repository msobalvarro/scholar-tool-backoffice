import type { StudentResponse } from '../outputs/student-output'

export type CreateStudentRequest = Omit<StudentResponse, '_id' | 'institution' | 'responsable' | 'status'> & {
  responsableId: string
}

export type UpdateStudentRequest = Omit<StudentResponse, 'institution' | 'responsable'> & {
  responsableId: string
}
