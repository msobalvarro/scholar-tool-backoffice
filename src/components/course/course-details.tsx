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
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCourseStore } from '@/store/course.store'
import { useStudentsByGroupId } from '@/hooks/API/use-students'
import { EditCourseDialog } from './edit-course-dialog'
import { DeleteCourseDialog } from './delete-course-dialog'
import { AssignStudentDialog } from './assign-student-dialog'

export const CourseDetail = () => {
  const { course } = useCourseStore()
  const { data: students, isLoading } = useStudentsByGroupId(course?._id)

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)

  if (isLoading) return (
    <div className='flex-1 bg-card text-card-foreground rounded-2xl shadow-xs border border-border flex flex-col overflow-hidden'>
      <div className='flex flex-col justify-center items-center gap-4 min-h-[50vh]'>
        <LoaderCircle className='w-8 h-8 text-primary animate-spin' />
      </div>
    </div>
  )

  if (!course) return (
    <div className='flex-1 bg-card text-card-foreground rounded-2xl shadow-xs border border-border flex flex-col overflow-hidden'>

      <div className='flex flex-col justify-center items-center gap-4 min-h-[50vh]'>
        <div className='p-4 bg-primary/10 text-primary rounded-2xl'>
          <Users className='w-8 h-8' />
        </div>
        <div className='flex flex-col items-center gap-1 mb-1'>
          <h2 className='text-2xl font-bold text-foreground'>No hay grupo seleccionado</h2>
          <p className='text-muted-foreground'>Selecciona un grupo para ver sus detalles.</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className='flex-1 bg-card text-card-foreground rounded-2xl shadow-xs border border-border flex flex-col overflow-hidden'>
      {/* Header */}
      <div className='p-6 border-b border-border flex items-start justify-between'>
        <div className='flex items-center gap-4'>
          <div className='p-4 bg-primary/10 text-primary rounded-2xl'>
            <Users className='w-8 h-8' />
          </div>
          <div>
            <div className='flex items-center gap-3 mb-1'>
              <h2 className='text-2xl font-bold text-foreground'>{course.name} - {course.groupName}</h2>
              <div className='flex items-center gap-1.5 text-primary font-medium text-sm'>
                <div className='w-1.5 h-1.5 rounded-full bg-primary' />
                Activo
              </div>
            </div>
            <div className='flex items-center gap-2 text-muted-foreground text-sm'>
              <BarChart className='w-4 h-4' />
              <span>{course.teacherLead.name}</span>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            className='text-muted-foreground hover:text-foreground'
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit2 className='w-5 h-5' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='text-muted-foreground hover:text-destructive'
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className='w-5 h-5' />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className='flex-1 p-6 overflow-y-auto'>
        <div className='space-y-6'>
          <div className='flex items-center justify-between gap-4'>
            <div className='relative flex-1 max-w-md'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='Buscar estudiante...'
                className='pl-10 bg-muted/40 border border-border rounded-xl focus-visible:ring-primary'
              />
            </div>
            <div className='flex items-center gap-2'>
              <Button
                className='rounded-xl'
                onClick={() => setIsAssignDialogOpen(true)}
              >
                <UserPlus className='w-4 h-4 mr-2' />
                Asignar Estudiante
              </Button>
            </div>
          </div>

          {students && (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='text-left border-b border-border'>
                    <th className='pb-4 font-bold text-xs text-muted-foreground uppercase tracking-wider'>Nombre</th>
                    <th className='pb-4 font-bold text-xs text-muted-foreground uppercase tracking-wider'>Estado</th>
                    <th className='pb-4 font-bold text-xs text-muted-foreground uppercase tracking-wider text-right'>Acciones</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-border'>
                  {students && students.length > 0 ? (
                    students.map((student) => (
                      <tr key={student._id} className='group hover:bg-muted/50 transition-colors'>
                        <td className='py-4'>
                          <div className='flex items-center gap-3'>
                            <Avatar className='w-10 h-10 border-2 border-border shadow-xs'>
                              <AvatarImage src={student.photo} />
                              <AvatarFallback className='bg-primary/10 text-primary text-xs font-bold'>
                                {student.firstName[0]}{student.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                              <span className='font-bold text-foreground leading-tight'>
                                {student.firstName} {student.lastName}
                              </span>
                              <span className='text-xs text-muted-foreground'>{student.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className='py-4'>
                          <span className='px-2.5 py-1 rounded-lg text-xs font-bold capitalize bg-primary/10 text-primary'>
                            {student.status}
                          </span>
                        </td>
                        <td className='py-4 text-right'>
                          <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-destructive transition-colors'>
                            <MinusCircle className='w-5 h-5' />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className='py-12 text-center text-muted-foreground font-medium'>
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

      <EditCourseDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <DeleteCourseDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />

      <AssignStudentDialog
        isOpen={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
      />
    </div>
  )
}
