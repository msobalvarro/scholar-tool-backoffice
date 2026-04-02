import { GraduationCap } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

      <div className='space-y-8'>
        <form className='space-y-8' onSubmit={(e) => e.preventDefault()}>
          <PersonalInformation />

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <DataResponsable />

            <section className='rounded-xl border border-slate-200 bg-surface-light shadow-sm bg-background h-full'>
              <div className='border-b border-slate-100 px-6 py-4 dark:border-slate-800'>
                <h2 className='text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2'>
                  <GraduationCap className='size-5 text-accent' />
                  Asignación Académica
                </h2>
              </div>
              <div className='p-6 grid grid-cols-1 gap-4'>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Nivel Escolar</label>
                  <Select defaultValue="Secundaria">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Secundaria">Secundaria</SelectItem>
                      <SelectItem value="Preparatoria">Preparatoria</SelectItem>
                      <SelectItem value="Universidad">Universidad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Grado</label>
                    <Select defaultValue="1º Año">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1º Año">1º Año</SelectItem>
                        <SelectItem value="2º Año">2º Año</SelectItem>
                        <SelectItem value="3º Año">3º Año</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Grupo</label>
                    <Select defaultValue="A">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Ciclo Escolar</label>
                  <div className='relative'>
                    <input className='w-full rounded-lg border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 cursor-not-allowed dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400' type='text' value='2023 - 2024' />
                  </div>
                </div>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Fecha de Ingreso</label>
                  <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white' type='date' />
                </div>
              </div>
            </section>
          </div>


        </form>
      </div>
    </ViewContainer>
  )
}