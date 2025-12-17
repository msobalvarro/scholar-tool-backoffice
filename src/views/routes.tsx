import { Route, Routes } from 'react-router'
import { LayoutTeacher } from '@/components/ui/layout-teacher'
import { LoginTeacher } from './(logout)/login-teacher'
import { LoginInstitution } from './(logout)/login-insitution'
import { DashboardView } from './(logged)/institution/dashboard.view'
import { StudentsView } from './(logged)/institution/students.view'

export const ProtectedRoutesTeacher = () => (
  <LayoutTeacher>
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
    </Routes>
  </LayoutTeacher>
)


export const ProtectedRoutesUserInstitution = () => (
  <LayoutTeacher>
    <Routes>
      <Route path='/' element={<DashboardView />} />
      <Route path='/students' element={<StudentsView />} />
    </Routes>
  </LayoutTeacher>
)

export const PublicRoutes = () => (
  <Routes>
    <Route path='/teacher' element={<LoginTeacher />} />
    <Route path='/' element={<LoginInstitution />} />
  </Routes>
)