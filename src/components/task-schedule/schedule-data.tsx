import type { ScheduleUnit, TaskSchedule } from '@/dtos/outputs/task-schedule'
import { Check, Clock, Folder, WatchIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { Button } from '../ui/button'
import { useTaskScheduleActions } from '@/hooks/API/use-task-schedule'

interface TaskSchedulesListProps {
  schedules: TaskSchedule[]
}

export const TaskSchedulesList = ({ schedules }: TaskSchedulesListProps) => {
  const { aproveTaskSchedule, isLoading } = useTaskScheduleActions()

  const handleAprove = async (id: string) => {
    await aproveTaskSchedule(id)
  }

  return (
    <div>
      {schedules.map((schedule) => (
        <div key={schedule._id} className='hover:shadow rounded overflow-hidden'>
          <div className='p-4 bg-white flex justify-between'>
            <div className='flex flex-col'>
              <div className='flex gap-2'>
                <h3>
                  {schedule.asignature.name}
                </h3>

                <span className='bg-slate-400 rounded-lg'>
                  {schedule.asignature.description}
                </span>

                {!schedule.aproved && (
                  <span className='bg-slate-400 rounded-lg flex items-center gap-1'>
                    <WatchIcon />
                    Pendiente de aprobación
                  </span>
                )}
              </div>

              <span className='flex gap-1 items-center'>
                Prof. {schedule.teacher.name}

                <span className='text-muted text-sm'>({schedule.teacher.email})</span>
              </span>

              <div className='text-muted'>
                <span className='flex items-center'>
                  <Clock />
                  Enviado {dayjs(schedule.createdAt).format('DD/MM/YYYY: HH:mm')}
                </span>

                {schedule.updatedAt && (
                  <span className='flex items-center pl-2 border-l'>
                    <Clock />
                    Editado: {dayjs(schedule.createdAt).format('DD/MM/YYYY: HH:mm')}
                  </span>
                )}
              </div>
            </div>

            <div>
              {schedule.aproved
                ? (
                  <span className='bg-green-500 rounded-lg'>
                    <Check className='h-5 w-5' />

                    Aprobado
                  </span>
                )
                : (
                  <Button onClick={() => handleAprove(schedule._id!)}>
                    {isLoading ? 'Aprobando...' : 'Aprobar Cronograma'}
                  </Button>
                )
              }
            </div>
          </div>

          {schedule.scheduleUnit.map((unit, index) => <UnitComponent key={index} unit={unit} />)}
        </div>
      ))}
    </div>
  )
}


const UnitComponent = ({ unit }: { unit: ScheduleUnit }) => {
  const totalPoints = unit.tasks.reduce((acc, task) => acc + task.points, 0)

  return (
    <div className='rounded overflow-hidden m-4'>
      <div className='flex items-center bg-slate-200'>
        <span className='flex gap-1'>
          <Folder />

          {unit.unitName}
        </span>

        <span>
          ({unit.tasks.length} Actividades planificadas)
        </span>

        <span>
          Puntos en total: {totalPoints}
        </span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Contenido</th>
            <th>Método de Evaluación</th>
            <th>Fecha</th>
            <th>Puntos</th>
            <th>Página</th>
            <th>En Cuaderno</th>
          </tr>
        </thead>

        <tbody>
          {unit.tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.content}</td>
              <td>{task.evaluationMethod}</td>
              <td>{task.date}</td>
              <td>{task.points}</td>
              <td>{task.page}</td>
              <td>{task.inNotebook ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
