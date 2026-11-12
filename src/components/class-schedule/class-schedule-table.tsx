import { WEEK_DAYS } from '@/constants/calendar-events.constant'
import type { ClassScheduleResponse } from '@/dtos/outputs/class-schedule-output'

interface Props {
  classSchedule: ClassScheduleResponse[]
}

export const ClassScheduleDataTable = ({ classSchedule }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Acciones</th>
          {WEEK_DAYS.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {classSchedule.map((daySchedule) => (
          <tr key={daySchedule._id}>
            <td></td>
            {WEEK_DAYS.map((day) => (
              <td key={day}>{day}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}