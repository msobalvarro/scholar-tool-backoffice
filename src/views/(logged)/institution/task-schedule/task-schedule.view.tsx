import dayjs from 'dayjs'
import { useState } from 'react'
import { useTasksSchedule } from '@/hooks/API/use-task-schedule'
import { TitlePageView } from '@/components/ui/title-page'
import { ViewContainer } from '@/components/ui/view-container'
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
import { Loader, } from 'lucide-react'
import { TaskSchedulesList } from '@/components/task-schedule/schedule-data'

export const TaskScheduleForUserInsitutionView = () => {
  const [month, setMonth] = useState((dayjs().month() + 1).toString())
  const [year, setYear] = useState(dayjs().year().toString())

  const { taskSchedules, isLoading } = useTasksSchedule({ month, year })

  return (
    <ViewContainer className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <TitlePageView
          title='Cronogramas de tareas'
          subtitle='Revisa y aprueba el cronograma de tareas enviado por el docente'
        />
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

      <TaskSchedulesList schedules={taskSchedules || []} />
    </ViewContainer>
  )
}