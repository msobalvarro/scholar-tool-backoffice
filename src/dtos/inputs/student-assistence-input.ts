export type CreateStudentAssistencePayload = {
  studentId: string
  date: Date | string
  assistence: boolean
  justification?: string
}
