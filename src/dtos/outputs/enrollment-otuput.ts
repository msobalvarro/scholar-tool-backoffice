import type { Enrollment } from '../types/models'

export type EnrollmentResponse = Enrollment & {
  _id: string
  createdAt: Date
  updatedAt: Date
}