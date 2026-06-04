import type { ResponsablePerson } from '../types'

export type IRepresentativeCreated = ResponsablePerson & {
  _id: string
  createdAt: Date
  updatedAt: Date
}