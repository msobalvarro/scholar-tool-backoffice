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
    <section className='flex flex-col gap-4'>
      <div className='overflow-x-auto rounded-2xl border border-border bg-card shadow-xs'>
        <table className='w-full text-card-foreground'>
          <thead>
            <tr className='border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
              <th className='p-4 text-left'>HORA DE CLASES</th>
              {WEEK_DAYS.map((day) => (
                <th key={day} className='p-4 text-center'>{day}</th>
              ))}
            </tr>
          </thead>

          <tbody className='divide-y divide-border'>
            {/* {classSchedule.map((daySchedule) => (
              <tr key={daySchedule._id}>
                <td>
                  <Button variant='outline'>Agregar Horario</Button>
                </td>
                {WEEK_DAYS.map((day) => (
                  <td key={day}>{day}</td>
                ))}
              </tr>
            ))} */}

            <RowAddSchedule asignatures={asignatures || []} />
          </tbody>
        </table>
      </div>

      <div className='flex justify-stretch'>
        <Button className='w-full text-lg uppercase'>Agregar Horario</Button>
      </div>
    </section>
  )
}