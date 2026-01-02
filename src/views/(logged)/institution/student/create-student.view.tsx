import { User, Camera, Contact, GraduationCap, Users } from 'lucide-react'
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

          <section className='rounded-xl border border-slate-200 bg-surface-light shadow-sm bg-background'>
            <div className='border-b border-slate-100 px-6 py-4 dark:border-slate-800'>
              <h2 className='text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2'>
                <User className='size-5 text-accent' />
                Información Personal
              </h2>
            </div>
            <div className='p-6'>
              <div className='flex flex-col md:flex-row gap-8'>
                <div className='flex flex-col items-center space-y-3 shrink-0'>
                  <div className='relative group cursor-pointer'>
                    <div className='h-32 w-32 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden dark:bg-slate-800 dark:border-slate-600' data-alt='Placeholder for student profile photo upload area'>
                      <Camera className='size-10 text-slate-400' />
                    </div>
                    <div className='absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                      <span className='text-white text-xs font-medium'>Cambiar Foto</span>
                    </div>
                  </div>
                  <p className='text-xs text-slate-500 text-center max-w-[120px]'>Formatos permitidos: JPG, PNG. Max 2MB.</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1'>
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Nombre(s)</label>
                    <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500' placeholder='Ej. Juan Pablo' type='text' />
                  </div>
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Apellido Paterno</label>
                    <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500' placeholder='Ej. Pérez' type='text' />
                  </div>
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Apellido Materno</label>
                    <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500' placeholder='Ej. López' type='text' />
                  </div>
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Fecha de Nacimiento</label>
                    <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white' type='date' />
                  </div>
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Género</label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='male'>Masculino</SelectItem>
                        <SelectItem value='female'>Femenino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>CURP / ID Nacional</label>
                    <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500' placeholder='Identificador único' type='text' />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <section className='rounded-xl border border-slate-200 bg-surface-light shadow-sm bg-background h-full'>
              <div className='border-b border-slate-100 px-6 py-4 dark:border-slate-800'>
                <h2 className='text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2'>
                  <Contact className='size-5 text-accent' />
                  Datos de Contacto
                </h2>
              </div>
              <div className='p-6 grid grid-cols-1 gap-4'>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Calle y Número</label>
                  <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500' placeholder='Ej. Av. Reforma 123' type='text' />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Colonia</label>
                    <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white' placeholder='' type='text' />
                  </div>
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Código Postal</label>
                    <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white' placeholder='00000' type='text' />
                  </div>
                </div>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Ciudad / Estado</label>
                  <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white' placeholder='Ej. Ciudad de México' type='text' />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Teléfono</label>
                    <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white' placeholder='(55) 1234 5678' type='tel' />
                  </div>
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Email</label>
                    <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white' placeholder='alumno@email.com' type='email' />
                  </div>
                </div>
              </div>
            </section>

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

          <section className='rounded-xl border border-slate-200 bg-surface-light shadow-sm bg-background'>
            <div className='border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 dark:border-slate-800'>
              <h2 className='text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2'>
                <Users className='size-5 text-accent' />
                Datos del Tutor
              </h2>

              <div className='bg-slate-100 p-1 rounded-lg inline-flex dark:bg-slate-800'>
                <button className='px-4 py-1.5 rounded-md text-xs font-semibold bg-white text-slate-800 shadow-sm dark:bg-slate-700 dark:text-white'>Crear Nuevo</button>
                <button className='px-4 py-1.5 rounded-md text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'>Buscar Existente</button>
              </div>
            </div>
            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Nombre Completo</label>
                  <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500' placeholder='Ej. María Pérez' type='text' />
                </div>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Parentesco</label>
                  <Select defaultValue="Madre">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Madre">Madre</SelectItem>
                      <SelectItem value="Padre">Padre</SelectItem>
                      <SelectItem value="Abuelo/a">Abuelo/a</SelectItem>
                      <SelectItem value="Tío/a">Tío/a</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Teléfono Móvil</label>
                  <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white' placeholder='(55) 9876 5432' type='tel' />
                </div>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Correo Electrónico</label>
                  <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white' placeholder='tutor@email.com' type='email' />
                </div>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Ocupación</label>
                  <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white' placeholder='Ej. Ingeniero' type='text' />
                </div>
                <div className='space-y-1.5 flex items-end'>
                  <div className='flex items-center gap-2'>
                    <input className='rounded border-slate-300 text-accent focus:ring-accent dark:border-slate-600 dark:bg-slate-800' id='emergency_contact' type='checkbox' />
                    <label className='text-sm text-slate-700 dark:text-slate-300 cursor-pointer' htmlFor='emergency_contact'>Es contacto de emergencia</label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </ViewContainer>
  )
}