import type { Institution } from '../types'
import type { Course } from '../types/models'

export interface IEnrollment {
  _id: string
  name: string
  courses: Course[]
  year: number
  enrollmentPrice: number
  monthlyPaymentPrice: number
  createdAt: string
  updatedAt: string
  institution: Institution
}