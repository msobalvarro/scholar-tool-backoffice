import { Route, Routes } from 'react-router'
import { Layout } from '@/components/ui/layout'
import { LoginTeacher } from './(logout)/login-teacher'
import { LoginInstitution } from './(logout)/login-insitution'
import { DashboardView } from './(logged)/institution/dashboard.view'
import { StudentsView } from './(logged)/institution/student/students.view'
import { StudentProfileView } from './(logged)/institution/student/student-profile.view'
import { CreateStudentView } from './(logged)/institution/student/create-student.view'
import { CoursesView } from './(logged)/institution/course/course.view'
import { TeachersView } from './(logged)/institution/teacher/teachers.view'
import { AsignaturesView } from './(logged)/institution/asignatures/asignatures.view'
import { CalendarView } from './(logged)/institution/calendar/calendar.view'
import { MatriculeView } from './(logged)/institution/matricule'
import { StudentAssistanceView } from './(logged)/institution/assistance'
import { AssistanceByDateView } from './(logged)/institution/assistance/assistence-by-date'
import { NotFoundView } from './not-found.view'

import { TeacherWelcomeView } from './(logged)/teacher/welcome.view'

export const ProtectedRoutesTeacher = () => (
  <Layout>
    <Routes>
      <Route path='/' element={<TeacherWelcomeView />} />
      <Route path='*' element={<NotFoundView />} />
    </Routes>
  </Layout>
)


export const ProtectedRoutesUserInstitution = () => (
  <Layout>
    <Routes>
      <Route path='/' element={<DashboardView />} />
      <Route path='/students' element={<StudentsView />} />
      <Route path='/students/create' element={<CreateStudentView />} />
      <Route path='/students/:studentId' element={<StudentProfileView />} />
      <Route path='/courses' element={<CoursesView />} />
      <Route path='/teachers' element={<TeachersView />} />
      <Route path='/asignatures' element={<AsignaturesView />} />
      <Route path='/calendar' element={<CalendarView />} />
      <Route path='/matricule' element={<MatriculeView />} />
      <Route path='/assistance' element={<StudentAssistanceView />} />
      <Route path='/assistance/by-date' element={<AssistanceByDateView />} />
      <Route path='*' element={<NotFoundView />} />
    </Routes>
  </Layout>
)

export const PublicRoutes = () => (
  <Routes>
    <Route path='/teacher' element={<LoginTeacher />} />
    <Route path='/' element={<LoginInstitution />} />
    <Route path='*' element={<NotFoundView isPublic />} />
  </Routes>
)