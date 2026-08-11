import { CameraQr } from '@/components/assistance/camera-qr'
import { TitlePageView } from '@/components/ui/title-page'
import { ViewContainer } from '@/components/ui/view-container'

export const StudentAssistanceView = () => {
  return (
    <ViewContainer>
      <TitlePageView title='Asistencia' subtitle='Registrar la asistencia de los estudiantes' />

      <CameraQr />
    </ViewContainer>
  )
}