import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Edit2,
  GraduationCap,
  Users,
  Calendar,
  Briefcase,
  Clock
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCourseStore } from '@/store/course.store'
import { useCourseActions } from '@/hooks/API/use-course'
import { useTeachers } from '@/hooks/API/use-teachers'
import { toast } from 'sonner'
import type { CreateCourseState } from '@/dtos/types'

interface EditCourseDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const EditCourseDialog = ({ isOpen, onOpenChange }: EditCourseDialogProps) => {
  const { course, setCourse } = useCourseStore()
  const { data: teachers } = useTeachers()
  const { updateCourse, isLoading: isActionLoading } = useCourseActions()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCourseState>({
    defaultValues: {
      name: '',
      groupName: '',
      teacherLeadId: '',
      order: 0,
      startBreakTime: '',
      endBreakTime: '',
      maxCapacity: 35,
    }
  })

  useEffect(() => {
    if (course && isOpen) {
      reset({
        name: course.name,
        groupName: course.groupName,
        teacherLeadId: course.teacherLead._id,
        order: course.order,
        startBreakTime: course.breakTime.split('-')[0] || '',
        endBreakTime: course.breakTime.split('-')[1] || '',
        maxCapacity: course.maxCapacity || 35,
      })
    }
  }, [course, isOpen, reset])

  const onSubmit = async (data: CreateCourseState) => {
    if (!course) return
    try {
      const updatedCourse = await updateCourse({
        id: course._id,
        course: {
          name: data.name,
          groupName: data.groupName,
          teacherLeadId: data.teacherLeadId,
          order: data.order,
          breakTime: `${data.startBreakTime}-${data.endBreakTime}`,
          maxCapacity: data.maxCapacity
        }
      })
      setCourse(updatedCourse)
      toast.success('Curso actualizado correctamente')
      onOpenChange(false)
    } catch (error) {
      toast.error(String(error))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-125 rounded-3xl p-8 border-none shadow-2xl bg-white'>
        <DialogHeader className='mb-6'>
          <div className='w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4'>
            <Edit2 className='w-6 h-6' />
          </div>
          <DialogTitle className='text-2xl font-bold text-gray-900'>Editar Curso</DialogTitle>
          <DialogDescription className='text-gray-400 mt-1'>
            Modifica los detalles del curso y guarda los cambios.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2 col-span-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <GraduationCap className='w-4 h-4 text-blue-500' />
                Nombre del Curso
              </label>
              <Input
                placeholder='Ej: Matemáticas'
                className={`rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11 ${errors.name ? 'ring-2 ring-red-500 focus-visible:ring-red-500' : ''}`}
                {...register('name', { required: 'El nombre del curso es obligatorio' })}
              />
              {errors.name && (
                <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <Users className='w-4 h-4 text-blue-500' />
                Grupo
              </label>
              <Input
                placeholder='Ej: A, B, C'
                className={`rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11 ${errors.groupName ? 'ring-2 ring-red-500 focus-visible:ring-red-500' : ''}`}
                {...register('groupName', { required: 'El grupo es obligatorio' })}
              />
              {errors.groupName && (
                <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>
                  {errors.groupName.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-blue-500' />
                Orden
              </label>
              <Input
                type='number'
                className={`rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11 ${errors.order ? 'ring-2 ring-red-500 focus-visible:ring-red-500' : ''}`}
                {...register('order', {
                  required: 'El orden es obligatorio',
                  valueAsNumber: true
                })}
              />
              {errors.order && (
                <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>
                  {errors.order.message}
                </p>
              )}
            </div>

            <div className='space-y-2 col-span-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <Briefcase className='w-4 h-4 text-blue-500' />
                Profesor Responsable
              </label>
              <Controller
                name='teacherLeadId'
                control={control}
                rules={{ required: 'El profesor responsable es obligatorio' }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className={`w-full rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11 ${errors.teacherLeadId ? 'ring-2 ring-red-500 focus-visible:ring-red-500' : ''}`}>
                      <SelectValue placeholder='Selecciona un profesor' />
                    </SelectTrigger>
                    <SelectContent className='rounded-xl border-none shadow-xl'>
                      {teachers?.map((teacher) => (
                        <SelectItem key={teacher._id} value={teacher._id} className='rounded-lg'>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.teacherLeadId && (
                <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>
                  {errors.teacherLeadId.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <Clock className='w-4 h-4 text-blue-500' />
                Inicio Receso
              </label>
              <Input
                type='time'
                className={`rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11 ${errors.startBreakTime ? 'ring-2 ring-red-500 focus-visible:ring-red-500' : ''}`}
                {...register('startBreakTime')}
              />
              {errors.startBreakTime && (
                <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>
                  {errors.startBreakTime.message}
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <Clock className='w-4 h-4 text-blue-500' />
                Fin Receso
              </label>
              <Input
                type='time'
                className={`rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11 ${errors.endBreakTime ? 'ring-2 ring-red-500 focus-visible:ring-red-500' : ''}`}
                {...register('endBreakTime')}
              />
              {errors.endBreakTime && (
                <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>
                  {errors.endBreakTime.message}
                </p>
              )}
            </div>

            <div className='space-y-2 col-span-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <Users className='w-4 h-4 text-blue-500' />
                Capacidad Máxima
              </label>
              <Input
                type='number'
                min={1}
                className={`rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11 ${errors.maxCapacity ? 'ring-2 ring-red-500 focus-visible:ring-red-500' : ''}`}
                {...register('maxCapacity', {
                  required: 'La capacidad máxima es obligatoria',
                  valueAsNumber: true,
                  min: { value: 1, message: 'La capacidad debe ser al menos 1' }
                })}
              />
              {errors.maxCapacity && (
                <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>
                  {errors.maxCapacity.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className='gap-3 pt-4'>
            <Button
              type='button'
              variant='ghost'
              onClick={() => onOpenChange(false)}
              className='rounded-xl h-11 flex-1 font-bold text-gray-500 hover:bg-gray-100'
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              disabled={isActionLoading}
              className='rounded-xl h-11 flex-1 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
            >
              {isActionLoading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

