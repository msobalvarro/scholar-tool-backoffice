import { WEEK_DAYS } from '@/constants/calendar-events.constant'
import type { ClassScheduleResponse } from '@/dtos/outputs/class-schedule-output'
import { Button } from '../ui/button'
import { RowAddSchedule } from './row-add-schedule'
import { useAsignatures } from '@/hooks/API/use-asignatures'

interface Props {
  classSchedule: ClassScheduleResponse[]
}

export const ClassScheduleDataTable = ({ classSchedule }: Props) => {
  const { data: asignatures } = useAsignatures()


  return (
    <table className='bg-white rounded shadow'>
      <thead>
        <tr>
          <th className='p-4'>HORA DE CLASES</th>
          {WEEK_DAYS.map((day) => (
            <th key={day} className='p-4'>{day}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {classSchedule.map((daySchedule) => (
          <tr key={daySchedule._id}>
            <td>
              <Button variant='outline'>Agregar Horario</Button>
            </td>
            {WEEK_DAYS.map((day) => (
              <td key={day}>{day}</td>
            ))}
          </tr>
        ))}

        <RowAddSchedule asignatures={asignatures || []} />
      </tbody>
    </table>
  )
}