import dayjs from 'dayjs'
import { useTasksScheduleByTeacher } from '@/hooks/API/use-task-schedule'
import { TitlePageView } from '@/components/ui/title-page'
import { ViewContainer } from '@/components/ui/view-container'
// import { TaskSchedulesListView } from '@/components/task-schedule/schedule-data'
import { useState } from 'react'
import { TaskScheduleDialogForm } from '../../../../components/task-schedule/create-task-schedule'
import ScheduleTable from '@/components/task-schedule/task-schedule-table'

export const TaskScheduleView = () => {
  const [month, setMonth] = useState(dayjs().month() + 1)
  const [year, setYear] = useState(dayjs().year())

  const { taskSchedules } = useTasksScheduleByTeacher({ month, year })

  return (
    <ViewContainer>
      <div className='flex justify-between items-center mb-4'>
        <TitlePageView
          title='Cronogramas de tareas'
          subtitle='Crea y envia el cronograma de tareas del mes'
        />
        <TaskScheduleDialogForm />
      </div>

      <ScheduleTable dataList={taskSchedules || []} />
    </ViewContainer>
  )
}