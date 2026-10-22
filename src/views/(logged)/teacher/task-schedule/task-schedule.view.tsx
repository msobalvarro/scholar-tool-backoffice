import dayjs from 'dayjs'
import { useState } from 'react'
import { useTasksScheduleByTeacher } from '@/hooks/API/use-task-schedule'
import { TitlePageView } from '@/components/ui/title-page'
import { ViewContainer } from '@/components/ui/view-container'
import { TaskScheduleDialogForm } from '@/components/task-schedule/create-task-schedule'
import { ScheduleTable } from '@/components/task-schedule/task-schedule-table'
import { MONTH_NAMES } from '@/constants/calendar-events.constant'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Loader } from 'lucide-react'

export const TaskScheduleView = () => {
  const [month, setMonth] = useState((dayjs().month() + 1).toString())
  const [year, setYear] = useState(dayjs().year().toString())

  const { taskSchedules, isLoading } = useTasksScheduleByTeacher({ month, year })

  return (
    <ViewContainer className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <TitlePageView
          title='Cronogramas de tareas'
          subtitle='Crea y envia el cronograma de tareas del mes'
        />
        <TaskScheduleDialogForm />
      </div>

      {/* Filters changes year and month */}
      <div className='flex gap-4 items-center'>

        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="w-45 bg-white">
            <SelectValue placeholder="Tema" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {MONTH_NAMES.map((month, index) => (
                <SelectItem key={index + 1} value={(index + 1).toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          className='w-25 bg-white'
          type='number'
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        {isLoading && <Loader className='animate-spin' />}
      </div>

      <ScheduleTable dataList={taskSchedules || []} />
    </ViewContainer>
  )
}