import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MultiSelect from 'react-select'
import type { IEnrollment } from '@/dtos/outputs/enrollment-output'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useEnrollment } from '@/hooks/API/use-enrollment'
import { useCourseAvailableByEnrollment } from '@/hooks/API/use-course'
import { Pencil, Check, X, Loader2, GraduationCap, DollarSign } from 'lucide-react'
import { toast } from 'sonner'
import { matriculeItemSchema, type MatriculeItemInput } from '@/schemas/matricule-item-schema'

interface Props {
  enrollment: IEnrollment
}

export const MatriculeItemTable = ({ enrollment }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const { updateEnrollment } = useEnrollment()
  const { data: courses, isLoading: isLoadingCourses, refetch: refetchCourses } = useCourseAvailableByEnrollment(enrollment._id)

  const initialCoursesId = enrollment.courses?.map(c => c._id).filter((id): id is string => Boolean(id)) || []

  const courseOptions = [...(courses || []), ...(enrollment.courses || [])].map(course => ({
    value: course._id,
    label: course.name
  })) || []

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<MatriculeItemInput>({
    resolver: zodResolver(matriculeItemSchema),
    values: {
      name: enrollment.name,
      enrollmentPrice: enrollment.enrollmentPrice,
      monthlyPaymentPrice: enrollment.monthlyPaymentPrice,
      coursesId: initialCoursesId
    }
  })

  const handleCancel = () => {
    reset({
      name: enrollment.name,
      enrollmentPrice: enrollment.enrollmentPrice,
      monthlyPaymentPrice: enrollment.monthlyPaymentPrice,
      coursesId: initialCoursesId
    })
    setIsEditing(false)
  }

  const onSubmit = async (data: MatriculeItemInput) => {
    try {
      await updateEnrollment.mutateAsync({
        _id: enrollment._id,
        name: data.name,
        year: enrollment.year || new Date().getFullYear(),
        enrollmentPrice: Number(data.enrollmentPrice),
        monthlyPaymentPrice: Number(data.monthlyPaymentPrice),
        coursesId: data.coursesId
      })
      toast.success('Matrícula actualizada con éxito')
      setIsEditing(false)
    } catch {
      toast.error('Error al actualizar la matrícula')
    }
  }

  useEffect(() => {
    if (isEditing) {
      refetchCourses()
    }
  }, [isEditing])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-card border border-border/60 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4'
    >
      {/* Info Section: Name & Courses */}
      <div className='flex items-start gap-3 flex-1 min-w-0'>
        <div className='p-2.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5'>
          <GraduationCap className='w-5 h-5' />
        </div>
        <div className='flex flex-col gap-1.5 flex-1 min-w-0'>
          {isEditing ? (
            <div className='flex flex-col gap-1'>
              <label className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>Nombre Matrícula</label>
              <Input
                {...register('name')}
                placeholder='Nombre de la matrícula'
                disabled={!isEditing}
                className='max-w-xs text-sm font-medium'
              />
              {errors.name && (
                <p className='text-xs text-red-500 font-medium'>{errors.name.message}</p>
              )}
            </div>
          ) : (
            <div className='flex items-center gap-2 flex-wrap'>
              <span className='font-semibold text-base text-foreground tracking-tight'>{enrollment.name}</span>
              {enrollment.year && (
                <Badge variant='outline' className='text-xs font-normal'>
                  {enrollment.year}
                </Badge>
              )}
            </div>
          )}

          {isEditing ? (
            <div className='flex flex-col gap-1 pt-1'>
              <label className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
                Cursos Asignados
              </label>
              <Controller
                control={control}
                name='coursesId'
                render={({ field }) => (
                  <MultiSelect
                    isMulti
                    isLoading={isLoadingCourses}
                    placeholder='Selecciona los cursos...'
                    options={courseOptions}
                    value={courseOptions.filter(opt => field.value?.includes(opt?.value ?? ''))}
                    onChange={(selected: unknown) => {
                      const optionsArray = (selected as Array<{ value: string }> | null) ?? []
                      field.onChange(optionsArray.map(opt => opt.value))
                    }}
                    className='text-sm max-w-md'
                  />
                )}
              />
              {errors.coursesId && (
                <p className='text-xs text-red-500 font-medium'>{errors.coursesId.message}</p>
              )}
            </div>
          ) : (
            <div className='flex flex-wrap gap-1.5 items-center pt-0.5'>
              {enrollment.courses && enrollment.courses.length > 0 ? (
                enrollment.courses.map(course => (
                  <Badge variant='secondary' key={course._id} className='text-xs px-2 py-0.5 font-normal'>
                    {course.name}
                  </Badge>
                ))
              ) : (
                <span className='text-xs text-muted-foreground italic'>Sin cursos asignados</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Inputs Section: Matricula & Mensualidad */}
      <div className='flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0'>
        <div className='flex flex-col gap-1 w-32 sm:w-36'>
          <label className='text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1'>
            <DollarSign className='w-3 h-3 text-emerald-600' />
            Matrícula
          </label>
          <div className='relative'>
            <Input
              type='number'
              step='0.01'
              {...register('enrollmentPrice', { valueAsNumber: true })}
              disabled={!isEditing}
              placeholder='0.00'
              className='h-9 text-sm disabled:opacity-75 disabled:bg-muted/40 disabled:cursor-not-allowed border-muted-foreground/20'
            />
          </div>
          {errors.enrollmentPrice && (
            <p className='text-xs text-red-500 font-medium'>{errors.enrollmentPrice.message}</p>
          )}
        </div>

        <div className='flex flex-col gap-1 w-32 sm:w-36'>
          <label className='text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1'>
            <DollarSign className='w-3 h-3 text-blue-600' />
            Mensualidad
          </label>
          <div className='relative'>
            <Input
              type='number'
              step='0.01'
              {...register('monthlyPaymentPrice', { valueAsNumber: true })}
              disabled={!isEditing}
              placeholder='0.00'
              className='h-9 text-sm disabled:opacity-75 disabled:bg-muted/40 disabled:cursor-not-allowed border-muted-foreground/20'
            />
          </div>
          {errors.monthlyPaymentPrice && (
            <p className='text-xs text-red-500 font-medium'>{errors.monthlyPaymentPrice.message}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-2 self-end md:self-center pt-2 sm:pt-0 pl-1'>
          <div className='flex flex-col gap-1'>
            <label className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>Acciones</label>

            <div className='relative flex gap-2'>

              {isEditing && (
                <>
                  <Button
                    type='submit'
                    size='sm'
                    disabled={updateEnrollment.isPending}
                    className='h-9 px-3 gap-1.5 font-medium'
                  >
                    {updateEnrollment.isPending ? (
                      <Loader2 className='w-4 h-4 animate-spin' />
                    ) : (
                      <Check className='w-4 h-4' />
                    )}
                    Guardar
                  </Button>
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={handleCancel}
                    disabled={updateEnrollment.isPending}
                    className='h-9 px-3 gap-1.5 text-muted-foreground hover:text-foreground'
                  >
                    <X className='w-4 h-4' />
                    Cancelar
                  </Button>
                </>
              )}

              {!isEditing && (
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={(event) => {
                    event.preventDefault()
                    setIsEditing(true)
                  }}
                  className='h-9 px-3.5 gap-1.5 text-muted-foreground hover:text-foreground hover:border-primary/50'
                >
                  <Pencil className='w-3.5 h-3.5 text-primary' />
                  Editar
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}