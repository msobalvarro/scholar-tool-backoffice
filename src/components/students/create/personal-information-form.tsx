import { Loader2, Save } from 'lucide-react'
import { CreateSelectRepresentative } from './create-select-representative'
import { Button } from '@/components/ui/button'
import { useRepresentativeStore } from '@/store/representatice.store'
import { useCourses } from '@/hooks/API/use-course'
import { useForm } from 'react-hook-form'
import { StudentPersonalCard } from './student-personal-card'
import { useStudentActions } from '@/hooks/API/use-students'
import type { StudentFormValues } from '@/dtos/inputs/student.input'
import { toast } from 'sonner'
import dayjs from 'dayjs'

export const PersonalInformationForm = () => {
  const { data: dataCourses } = useCourses()
  const { representative } = useRepresentativeStore()
  const { addStudent, isLoading } = useStudentActions()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormValues>({
    defaultValues: {
      firstName: '',
      paternalLastName: '',
      maternalLastName: '',
      birthday: '',
      gender: 'female',
      direction: '',
      phone: '',
      email: '',
      courseId: '',
    },
  })

  const onSubmit = async (data: StudentFormValues) => {
    try {
      await addStudent({
        firstName: data.firstName,
        lastName: `${data.paternalLastName} ${data.maternalLastName || ''}`.trim(),
        birthday: dayjs(data.birthday).format('YYYY-MM-DD'),
        gender: data.gender,
        email: data.email || undefined,
        responsableId: representative?._id || '',
        courseId: data.courseId,
      })
      toast.success('Estudiante creado exitosamente')
    } catch {
      toast.error('Error al crear el estudiante')
    }
  }

  return (
    <form className='space-y-8 ' onSubmit={handleSubmit(onSubmit)}>
      {/* Sección de Información Personal */}
      <StudentPersonalCard
        register={register}
        control={control}
        errors={errors}
        dataCourses={dataCourses}
      />

      {/* Sección de Datos del Tutor */}
      <CreateSelectRepresentative />

      <div className='flex justify-end'>
        <Button size='lg' className='bg-accent px-6' type='submit' disabled={isLoading}>
          {isLoading ? (
            <Loader2 className='size-5 mr-2 animate-spin' />
          ) : (
            <Save className='size-5 mr-2' />
          )}
          Guardar
        </Button>
      </div>
    </form>
  )
}