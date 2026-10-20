import { TitlePageView } from '@/components/ui/title-page'
import { ViewContainer } from '@/components/ui/view-container'

export const TaskScheduleView = () => {
  return (
    <ViewContainer>
      <TitlePageView
        title='Cronogramas de tareas'
        subtitle='Crea y envia el cronograma de tareas del mes'
      />
    </ViewContainer>
  )
}