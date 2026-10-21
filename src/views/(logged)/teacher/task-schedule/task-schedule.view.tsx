import dayjs from 'dayjs'
import { useTaskScheduleActions, useTasksSchedule } from '@/hooks/API/use-task-schedule'
import { TitlePageView } from '@/components/ui/title-page'
import { ViewContainer } from '@/components/ui/view-container'
import { TaskSchedulesListView } from '@/components/task-schedule/schedule-data'
import { useState } from 'react'
import { TaskScheduleDialogForm } from './create-task-schedule'

export const TaskScheduleView = () => {
  const [month, setMonth] = useState(dayjs().month() + 1)
  const [year, setYear] = useState(dayjs().year())

  const { taskSchedules } = useTasksSchedule({ month, year })
  const { createTaskSchedule, isLoading, error } = useTaskScheduleActions()

  return (
    <ViewContainer>
      <TitlePageView
        title='Cronogramas de tareas'
        subtitle='Crea y envia el cronograma de tareas del mes'
      />

      <TaskScheduleDialogForm onSubmit={createTaskSchedule} />

      <TaskSchedulesListView schedules={taskSchedules || []} />
    </ViewContainer>
  )
}