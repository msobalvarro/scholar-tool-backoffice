export type StatusType = 'idle' | 'loading' | 'success' | { error: string }

export type UserInstitutionResponse = {
  _id: string
  name: string
  email: string
  password: string
  status: 'active' | 'inactive'
  lastLogin: Date
}

export type Teacher = {
  _id: string
  name: string
  birthday: string
  phoneNumber: string
  email: string
  status: 'active' | 'inactive'
  institution: Institution
  photo?: string
}


export type Institution = {
  _id: string
  name: string
  logo?: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: Date
  updatedAt: Date
}

export type LoginUserInstitutionResponse = {
  user: UserInstitutionResponse
  token: string
  institution: Institution
}

export type LoginUserTeacherResponse = {
  user: Teacher
  token: string
  institution: Institution
}
