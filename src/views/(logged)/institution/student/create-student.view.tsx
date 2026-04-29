import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Link } from 'react-router'
import { ViewContainer } from '@/components/ui/view-container'
import { PersonalInformation } from '@/components/students/create/personal-information'
import { DataResponsable } from '@/components/students/create/data-responsable'

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

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-1">
            Nuevo Estudiante
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            Ingresa la información personal del estudiante.
          </p>
        </div>
      </div>

      <form className='flex space-x-8' onSubmit={(e) => e.preventDefault()}>
        <PersonalInformation />

        <DataResponsable />
      </form>
    </ViewContainer>
  )
}