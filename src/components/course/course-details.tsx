import {
  Edit2,
  Trash2,
  Users,
  BarChart,
  Search,
  UserPlus,
  MinusCircle,
  LoaderCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCourseStore } from '@/store/course.store'
import { useStudentsByGroupId } from '@/hooks/API/use-students'

export const CourseDetail = () => {
  const { course } = useCourseStore()
  const { data: students, isLoading } = useStudentsByGroupId(course?._id)

  if (isLoading) return (
    <div className='flex-1 bg-background rounded-2xl shadow-sm border flex flex-col overflow-hidden'>
      <div className='flex flex-col justify-center items-center gap-4 min-h-[50vh]'>
        <LoaderCircle className='w-8 h-8 text-blue-500 animate-spin' />
      </div>
    </div>
  )

  if (!course) return (
    <div className='flex-1 bg-background rounded-2xl shadow-sm border flex flex-col overflow-hidden'>

      <div className='flex flex-col justify-center items-center gap-4 min-h-[50vh]'>
        <div className='p-4 bg-blue-50 text-accent rounded-2xl'>
          <Users className='w-8 h-8' />
        </div>
        <div className='flex flex-col items-center gap-1 mb-1'>
          <h2 className='text-2xl font-bold text-gray-400'>No hay grupo seleccionado</h2>
          <p className='text-gray-400'>Selecciona un grupo para ver sus detalles.</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className='flex-1 bg-background rounded-2xl shadow-sm border flex flex-col overflow-hidden'>
      {/* Header */}
      <div className='p-6 border-b border-gray-100 flex items-start justify-between'>
        <div className='flex items-center gap-4'>
          <div className='p-4 bg-blue-50 text-accent rounded-2xl'>
            <Users className='w-8 h-8' />
          </div>
          <div>
            <div className='flex items-center gap-3 mb-1'>
              <h2 className='text-2xl font-bold text-gray-900'>{course.name} - {course.groupName}</h2>
              <div className='flex items-center gap-1.5 text-blue-500 font-medium text-sm'>
                <div className='w-1.5 h-1.5 rounded-full bg-blue-500' />
                Activo
              </div>
            </div>
            <div className='flex items-center gap-2 text-gray-400 text-sm'>
              <BarChart className='w-4 h-4' />
              <span>{course.teacherLead.name}</span>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon' className='text-gray-400 hover:text-accent'>
            <Edit2 className='w-5 h-5' />
          </Button>
          <Button variant='ghost' size='icon' className='text-gray-400 hover:text-red-600'>
            <Trash2 className='w-5 h-5' />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className='flex-1 p-6 overflow-y-auto'>
        <div className='space-y-6'>
          <div className='flex items-center justify-between gap-4'>
            <div className='relative flex-1 max-w-md'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
              <Input
                placeholder='Buscar estudiante...'
                className='pl-10 bg-gray-50 border-none rounded-xl focus-visible:ring-blue-500'
              />
            </div>
            <div className='flex items-center gap-2'>
              <Button className='rounded-xl'>
                <UserPlus className='w-4 h-4 mr-2' />
                Asignar Estudiante
              </Button>
            </div>
          </div>

          {students && (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='text-left border-b border-gray-50'>
                    <th className='pb-4 font-bold text-xs text-gray-400 uppercase tracking-wider'>Nombre</th>
                    <th className='pb-4 font-bold text-xs text-gray-400 uppercase tracking-wider'>Estado</th>
                    <th className='pb-4 font-bold text-xs text-gray-400 uppercase tracking-wider text-right'>Acciones</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-50'>
                  {students && students.length > 0 ? (
                    students.map((student) => (
                      <tr key={student._id} className='group hover:bg-gray-50/50 transition-colors'>
                        <td className='py-4'>
                          <div className='flex items-center gap-3'>
                            <Avatar className='w-10 h-10 border-2 border-white shadow-sm'>
                              <AvatarImage src={student.photo} />
                              <AvatarFallback className='bg-blue-100 text-accent text-xs font-bold'>
                                {student.firstName[0]}{student.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                              <span className='font-bold text-gray-900 leading-tight'>
                                {student.firstName} {student.lastName}
                              </span>
                              <span className='text-xs text-gray-400'>{student.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className='py-4'>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize`}>
                            {student.status}
                          </span>
                        </td>
                        <td className='py-4 text-right'>
                          <Button variant='ghost' size='icon' className='text-gray-300 hover:text-red-500 transition-colors'>
                            <MinusCircle className='w-5 h-5' />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className='py-12 text-center text-gray-400 font-medium'>
                        No hay estudiantes asignados a este grupo.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
