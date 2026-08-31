import type { IDailyReportStudentDto } from '../inputs/daily-reports';

export type IDailyReportStudentResponse = IDailyReportStudentDto & {
  _id: string
  createdAt: string
  updatedAt: string
}