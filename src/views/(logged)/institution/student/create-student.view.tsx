import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Link } from 'react-router'
import { ViewContainer } from '@/components/ui/view-container'
import { PersonalInformationForm } from '@/components/students/create/personal-information-form'
import { TitlePageView } from '@/components/ui/title-page'

export const CreateStudentView = () => {
  return (
    <ViewContainer className='flex-1 overflow-y-auto'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/students">Estudiantes</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/students/create">Nuevo Estudiante</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TitlePageView
        title='Nuevo Estudiante'
        subtitle='Ingresa la información personal del estudiante.'
      />

      <PersonalInformationForm />
    </ViewContainer>
  )
}