import { Route, Routes } from 'react-router'
import { Layout } from '@/components/ui/layout'
import { LoginTeacher } from './(logout)/login-teacher'
import { LoginInstitution } from './(logout)/login-insitution'
import { DashboardView } from './(logged)/institution/dashboard.view'
import { StudentsView } from './(logged)/institution/student/students.view'
import { StudentProfileView } from './(logged)/institution/student/student-profile.view'
import { CreateStudentView } from './(logged)/institution/student/create-student.view'

export const ProtectedRoutesTeacher = () => (
  <Layout>
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
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
    </Routes>
  </Layout>
)

export const PublicRoutes = () => (
  <Routes>
    <Route path='/teacher' element={<LoginTeacher />} />
    <Route path='/' element={<LoginInstitution />} />
  </Routes>
)