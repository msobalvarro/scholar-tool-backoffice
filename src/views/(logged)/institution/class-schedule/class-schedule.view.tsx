import { TitlePageView } from '@/components/ui/title-page';
import { ViewContainer } from '@/components/ui/view-container';

export const ClassScheduleView = () => {
  return (
    <ViewContainer>
      <div className='flex justify-between items-center'>
        <TitlePageView
          title='Horarios'
          subtitle='Administra los horarios de clases por grupo y sección'
        />
      </div>
    </ViewContainer>
  );
}