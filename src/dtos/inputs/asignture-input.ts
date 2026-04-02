
export type CreateAsignatureRequest = {
  name: string
  description: string
  status?: 'active' | 'inactive'
}

export type UpdateAsignatureRequest = Partial<CreateAsignatureRequest> & {
  _id: string
}


export type AssignStudentRequest = {
  studentId: string
  courseId: string
}
