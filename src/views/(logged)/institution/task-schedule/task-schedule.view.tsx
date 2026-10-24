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
import { useAsignatures } from '@/hooks/API/use-asignatures'
import { useTeachers } from '@/hooks/API/use-teachers'
import { Button } from '@/components/ui/button'
import { useCourses } from '@/hooks/API/use-course'

export const TaskScheduleForUserInsitutionView = () => {
  const [month, setMonth] = useState((dayjs().month() + 1).toString())
  const [year, setYear] = useState(dayjs().year().toString())
  const [aprove, setAprove] = useState<boolean>(false)
  const [teacherId, setTeacherId] = useState<string | undefined>(undefined)
  const [asignatureId, setAsignatureId] = useState<string | undefined>(undefined)
  const [courseId, setCourseId] = useState<string | undefined>(undefined)

  const { data: asignatures } = useAsignatures()
  const { data: teachers } = useTeachers()
  const { data: courses } = useCourses()

  const { taskSchedules, isLoading } = useTasksSchedule({
    month,
    year,
    aproved: String(aprove),
    teacherId,
    asignatureId,
    courseId
  })

  const resetFilters = () => {
    setMonth((dayjs().month() + 1).toString())
    setYear(dayjs().year().toString())
    setAprove(false)
    setTeacherId(undefined)
    setAsignatureId(undefined)
    setCourseId(undefined)
  }

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

        <Select value={teacherId} onValueChange={setTeacherId}>
          <SelectTrigger className="w-45 bg-white">
            <SelectValue placeholder="Docente" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {teachers?.map((teacher) => (
                <SelectItem key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={asignatureId} onValueChange={setAsignatureId} defaultValue=''>
          <SelectTrigger className="w-45 bg-white">
            <SelectValue placeholder="Asignatura" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {asignatures?.map((asignature) => (
                <SelectItem key={asignature._id} value={asignature._id}>
                  {asignature.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Approbed filter */}
        <Select value={String(aprove)} onValueChange={(value) => setAprove(value === 'true')}>
          <SelectTrigger className="w-45 bg-white">
            <SelectValue placeholder="Estado" defaultValue={undefined} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="true">Aprobado</SelectItem>
              <SelectItem value="false">Pendiente</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/*courses */}
        <Select value={String(courseId)} onValueChange={(value) => setCourseId(value)}>
          <SelectTrigger className="w-45 bg-white">
            <span>Curso</span>
            <SelectValue placeholder="Curso" defaultValue={undefined} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {courses?.map((course) => (
                <SelectItem key={course._id} value={course._id}>
                  {course.name} {course.groupName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={resetFilters}>Reiniciar filtros</Button>


        {isLoading && <Loader className='animate-spin' />}
      </div>

      <TaskSchedulesList schedules={taskSchedules || []} />
    </ViewContainer>
  )
}