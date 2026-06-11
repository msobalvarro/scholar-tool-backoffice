import type { UseFormRegister, Control, FieldErrors } from 'react-hook-form'
import type { CoursesResponse } from '@/dtos/types'
import type { StudentResponse } from '../outputs/student-output'

export type StudentGender = 'male' | 'female'

export type CreateStudentRequest = Omit<StudentResponse, '_id' | 'institution' | 'responsable' | 'status'> & {
  responsableId: string
}

export type UpdateStudentRequest = Omit<StudentResponse, 'institution' | 'responsable'> & {
  responsableId: string
}

export type CreateStudentPayload = {
  student: CreateStudentRequest
}

export interface StudentFormValues {
  firstName: string
  paternalLastName: string
  maternalLastName?: string
  birthday: string
  gender: StudentGender
  direction?: string
  phone?: string
  email?: string
  courseId: string
}

export interface StudentPersonalCardProps {
  register: UseFormRegister<StudentFormValues>
  control: Control<StudentFormValues>
  errors: FieldErrors<StudentFormValues>
  dataCourses?: CoursesResponse[]
}
