import type { Institution, ResponsablePerson } from '../types'

export type StudentResponse = {
  _id: string
  birthday: Date | string
  startDate: Date
  firstName: string
  lastName: string
  institution: Institution
  status: 'active' | 'inactive'
  gender: 'male' | 'female'
  photo?: string
  email?: string
  responsable?: ResponsablePerson
}