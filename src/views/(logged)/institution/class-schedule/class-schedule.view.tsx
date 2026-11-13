import { ClassScheduleFilters } from '@/components/class-schedule/class-schedule-filters';
import { ClassScheduleDataTable } from '@/components/class-schedule/class-schedule-table';
import { TitlePageView } from '@/components/ui/title-page';
import { ViewContainer } from '@/components/ui/view-container';
import type { ClassScheduleInputFilters } from '@/dtos/inputs/class-schedule-input';
import { useClassSchedule } from '@/hooks/API/use-class-schedule';
import { useState } from 'react';

export const ClassScheduleView = () => {
  const [filters, setFilters] = useState<ClassScheduleInputFilters>({
    courseId: '',
    year: new Date().getFullYear().toString()
  })

  const { data: classSchedule } = useClassSchedule(filters.courseId, filters.year)

  return (
    <ViewContainer className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <TitlePageView
          title='Horarios'
          subtitle='Administra los horarios de clases por grupo y sección'
        />
      </div>

      <ClassScheduleFilters onChange={setFilters} />

      <ClassScheduleDataTable classSchedule={classSchedule || []} />
    </ViewContainer>
  );
}