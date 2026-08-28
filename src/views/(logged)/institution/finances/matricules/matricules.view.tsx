import { MatriculeTable } from '@/components/matricule/matricule-table'
import { TitlePageView } from '@/components/ui/title-page'
import { ViewContainer } from "@/components/ui/view-container"
import { useEnrollment } from '@/hooks/API/use-enrollment'

export const MatriculeView = () => {
  const { getEnrollments } = useEnrollment()
  console.log(getEnrollments.data)

  return (
    <ViewContainer className='flex flex-col gap-4 space-y-4'>
      <TitlePageView
        title='Matriculas'
        subtitle='Aquí puedes gestionar las matriculas de los estudiantes'
        classNameContainer='m'
      />

      {getEnrollments.error && <p className='text-red-500'>{getEnrollments.error.message}</p>}

      {getEnrollments.data && <MatriculeTable enrollments={getEnrollments.data} />}
    </ViewContainer>
  )
}