import type { Institution } from '../types'

export type AsignatureResponse = {
  _id: string
  name: string
  description: string
  status: 'active' | 'inactive'
  institution: Institution
  createdAt: Date
  updatedAt: Date
}