import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MultiSelect from 'react-select'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEnrollment } from '@/hooks/API/use-enrollment'
import { useCourses } from '@/hooks/API/use-course'
import { enrollmentSchema, type EnrollmentInput } from '@/schemas/enrollment-schema'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface Props {
  onClose: () => void
  isOpen?: boolean
}

export const CreateMatriculeModal = ({ onClose, isOpen = true }: Props) => {
  const { createEnrollment } = useEnrollment()
  const { data: courses, isLoading: isLoadingCourses } = useCourses()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EnrollmentInput>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      name: '',
      year: new Date().getFullYear(),
      enrollmentPrice: 0,
      monthlyPaymentPrice: 0,
      coursesId: []
    }
  })

  const onSubmit = async (data: EnrollmentInput) => {
    try {
      await createEnrollment.mutateAsync(data)
      toast.success('Matrícula creada exitosamente')
      reset()
      onClose()
    } catch {
      toast.error('Error al crear la matrícula')
    }
  }

  const courseOptions = courses?.map(course => ({
    value: course._id,
    label: course.name
  })) || []

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-125'>
        <DialogHeader>
          <DialogTitle>Crear Matricula</DialogTitle>
          <DialogDescription>
            Agrega una nueva matricula. Haz clic en guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 py-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>Nombre de la Matrícula</label>
            <Input
              placeholder='Ej: Matrícula General 2026'
              {...register('name')}
            />
            {errors.name && (
              <p className='text-xs text-red-500 font-medium'>{errors.name.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>Año</label>
            <Input
              type='number'
              placeholder='2026'
              {...register('year', { valueAsNumber: true })}
            />
            {errors.year && (
              <p className='text-xs text-red-500 font-medium'>{errors.year.message}</p>
            )}
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>Precio Inscripción</label>
              <Input
                type='number'
                step='0.01'
                placeholder='0.00'
                {...register('enrollmentPrice', { valueAsNumber: true })}
              />
              {errors.enrollmentPrice && (
                <p className='text-xs text-red-500 font-medium'>{errors.enrollmentPrice.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>Precio Mensualidad</label>
              <Input
                type='number'
                step='0.01'
                placeholder='0.00'
                {...register('monthlyPaymentPrice', { valueAsNumber: true })}
              />
              {errors.monthlyPaymentPrice && (
                <p className='text-xs text-red-500 font-medium'>{errors.monthlyPaymentPrice.message}</p>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>Seleccione los Grados</label>
            <Controller
              control={control}
              name='coursesId'
              render={({ field }) => (
                <MultiSelect
                  isMulti
                  isLoading={isLoadingCourses}
                  placeholder='Selecciona los cursos...'
                  options={courseOptions}
                  value={courseOptions.filter(opt => field.value?.includes(opt.value))}
                  onChange={(selected: unknown) => {
                    const optionsArray = (selected as Array<{ value: string }> | null) ?? []
                    field.onChange(optionsArray.map(opt => opt.value))
                  }}
                  className='text-sm'
                />
              )}
            />
            {errors.coursesId && (
              <p className='text-xs text-red-500 font-medium'>{errors.coursesId.message}</p>
            )}
          </div>

          <DialogFooter className='pt-4 gap-2'>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancelar
            </Button>
            <Button type='submit' disabled={createEnrollment.isPending}>
              {createEnrollment.isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Guardando...
                </>
              ) : (
                'Guardar'
              )}
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}