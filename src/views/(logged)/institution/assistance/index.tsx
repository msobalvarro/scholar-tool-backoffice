import { CameraQr } from '@/components/assistance/camera-qr'
import { Button } from '@/components/ui/button'
import { TitlePageView } from '@/components/ui/title-page'
import { ViewContainer } from '@/components/ui/view-container'
import { useStudentAssistence } from '@/hooks/API/use-student-assistence'

export const StudentAssistanceView = () => {
  const { createAssistence } = useStudentAssistence()

  return (
    <ViewContainer>
      <TitlePageView title='Asistencia' subtitle='Registrar la asistencia de los estudiantes' />

      <Button
        variant='default'
        onClick={() =>
          createAssistence({
            studentId: '6946b6224d5223a2d65f9d81',
            date: new Date(),
            assistence: true
          })
        }
      >
        Crear Asistencia
      </Button>

      <CameraQr />
    </ViewContainer>
  )
}