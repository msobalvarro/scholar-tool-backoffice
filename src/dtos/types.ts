export type StatusType = 'idle' | 'loading' | 'success' | { error: string }

export type Theme = "dark" | "light" | "system"

export type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export type UsersResponse = {
  _id: string
  name: string
  email: string
}

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


export type ResponsablePerson = {
  fullName: string
  identification: string
  email: string | null
  phoneNumber: string
}


export type AcademicGroup = {
  _id: string
  name: string
  subject: string
  grade: string
  semester: string
  status: 'active' | 'inactive'
  teacher: Teacher
  studentCount: number
}

export type GroupStudent = {
  _id: string
  firstName: string
  lastName: string
  email: string
  photo?: string
  enrollmentId: string
  status: 'regular' | 'conditional' | 'suspended'
}

// export 

export type CoursesResponse = {
  _id: string
  name: string
  groupName: string
  order: number
  createdAt: Date
  updatedAt: Date
  breakTime: string
  teacherLead: Teacher
  studentCount: number
}

export type CourseStore = {
  course: CoursesResponse | null
  setCourse: (c: CoursesResponse | null) => void
}

export type CreateCourseRequest = {
  name: string
  groupName: string
  teacherLeadId: string
  order: number
  breakTime: string
}

export type CreateCourseState = {
  name: string
  groupName: string
  teacherLeadId: string
  order: number
  startBreakTime: string
  endBreakTime: string
}

