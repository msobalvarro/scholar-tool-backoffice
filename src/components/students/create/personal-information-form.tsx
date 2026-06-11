import { Save } from 'lucide-react'
import { CreateSelectRepresentative } from './create-select-representative'
import { Button } from '@/components/ui/button'
import { useRepresentativeStore } from '@/store/representatice.store'
import { useCourses } from '@/hooks/API/use-course'
import { useForm } from 'react-hook-form'
import { StudentPersonalCard } from './student-personal-card'
import type { StudentFormValues } from '@/dtos/inputs/student.input'

export const PersonalInformationForm = () => {
  const { data: dataCourses } = useCourses()
  const { representative } = useRepresentativeStore()

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

  const onSubmit = (data: StudentFormValues) => {
    console.log("se envio el formulario", data)
    console.log(representative)
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
        <Button size='lg' className='bg-accent px-6' type='submit'>
          <Save className='size-5 mr-2' />
          Guardar
        </Button>
      </div>
    </form>
  )
}