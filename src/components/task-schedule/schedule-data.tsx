import type { ScheduleUnit, TaskSchedule } from '@/dtos/outputs/task-schedule'
import { BookOpen, Check, Clock, Folder, Mail, ShieldCheck, User, WatchIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { useTaskScheduleActions } from '@/hooks/API/use-task-schedule'

interface TaskSchedulesListProps {
  schedules: TaskSchedule[]
}

export const TaskSchedulesList = ({ schedules }: TaskSchedulesListProps) => {
  const { aproveTaskSchedule, isLoading } = useTaskScheduleActions()

  const handleAprove = async (id: string) => {
    await aproveTaskSchedule(id)
  }

  if (!schedules || schedules.length === 0) {
    return (
      <div className='text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm mx-4 my-6'>
        <p className='text-slate-500 font-medium'>No hay cronogramas de tareas disponibles.</p>
      </div>
    )
  }

  return (
    <div className='px-4 py-6 space-y-8'>
      {schedules.map((schedule) => (
        <div
          key={schedule._id}
          className='bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl'
        >
          {/* Cabecera del Cronograma / Información General */}
          <div className='p-6 sm:p-8 bg-linear-to-b from-slate-50/50 to-white border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6'>

            {/* Información de la Asignatura y Docente */}
            <div className='flex flex-col gap-3'>
              <div className='flex flex-wrap items-center gap-3'>
                <div className='flex items-center gap-2'>
                  <div className='p-2 bg-indigo-50 rounded-xl text-indigo-600'>
                    <BookOpen className='w-5 h-5' />
                  </div>
                  <h3 className='text-xl font-bold text-slate-800 tracking-tight'>
                    {schedule.asignature.name}
                  </h3>
                </div>

                <span className='px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold'>
                  {schedule.asignature.description}
                </span>

                {/* Badge de Estado (Pendiente / Aprobado) */}
                {!schedule.aproved ? (
                  <span className='inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-full text-xs font-semibold shadow-sm'>
                    <WatchIcon className='w-3.5 h-3.5' />
                    Pendiente de aprobación
                  </span>
                ) : (
                  <span className='inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full text-xs font-semibold shadow-sm'>
                    <ShieldCheck className='w-3.5 h-3.5' />
                    Aprobado
                  </span>
                )}
              </div>

              {/* Profesor */}
              <div className='flex flex-wrap items-center gap-4 text-sm text-slate-600'>
                <span className='flex items-center gap-1.5 font-medium text-slate-700'>
                  <User className='w-4 h-4 text-slate-400' />
                  Prof. {schedule.teacher.name}
                </span>
                <span className='flex items-center gap-1.5 text-slate-400 text-xs bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100'>
                  <Mail className='w-3.5 h-3.5' />
                  {schedule.teacher.email}
                </span>
              </div>

              {/* Fechas de envío y edición */}
              <div className='flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1'>
                <span className='flex items-center gap-1.5'>
                  <Clock className='w-3.5 h-3.5' />
                  Enviado: {dayjs(schedule.createdAt).format('DD/MM/YYYY - HH:mm')}
                </span>

                {schedule.updatedAt && schedule.updatedAt !== schedule.createdAt && (
                  <span className='flex items-center gap-1.5 pl-4 border-l border-slate-200'>
                    <Clock className='w-3.5 h-3.5' />
                    Editado: {dayjs(schedule.updatedAt).format('DD/MM/YYYY - HH:mm')}
                  </span>
                )}
              </div>
            </div>

            {/* Acciones (Botón Aprobar / Estado visual) */}
            <div className='flex items-center self-start md:self-center'>
              {schedule.aproved ? (
                <div className='flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-white rounded-2xl font-medium shadow-sm shadow-emerald-500/20 text-sm'>
                  <Check className='h-4 w-4 stroke-3' />
                  <span>Cronograma Aprobado</span>
                </div>
              ) : (
                <button
                  onClick={() => handleAprove(schedule._id!)}
                  disabled={isLoading}
                  className='inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm rounded-2xl shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isLoading ? 'Aprobando...' : 'Aprobar Cronograma'}
                </button>
              )}
            </div>

          </div>

          {/* Unidades del Cronograma */}
          <div className='p-6 bg-slate-50/50 space-y-4'>
            {schedule.scheduleUnit.map((unit: any, index: number) => (
              <UnitComponent key={index} unit={unit} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}


const UnitComponent = ({ unit }: { unit: ScheduleUnit }) => {
  const totalPoints = unit.tasks.reduce((acc, task) => acc + task.points, 0)

  return (
    <div className='bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden my-6 mx-4 transition-all hover:shadow-xl'>
      {/* Cabecera de la Unidad */}
      <div className='flex flex-wrap items-center justify-between gap-4 bg-linear-to-r from-slate-900 to-slate-800 text-white px-6 py-4'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-white/10 rounded-xl backdrop-blur-sm'>
            <Folder className='w-5 h-5 text-indigo-400' />
          </div>
          <h2 className='text-lg font-semibold tracking-wide'>{unit.unitName}</h2>
        </div>

        <div className='flex items-center gap-3 text-sm'>
          <span className='px-3 py-1 bg-white/10 rounded-full font-medium text-slate-200'>
            {unit.tasks.length} {unit.tasks.length === 1 ? 'Actividad' : 'Actividades'}
          </span>
          <span className='px-3 py-1 bg-indigo-500/30 text-indigo-200 rounded-full font-medium border border-indigo-400/20'>
            Total: {totalPoints} pts
          </span>
        </div>
      </div>

      {/* Tabla de Actividades */}
      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='border-b border-slate-100 bg-slate-50/75 text-slate-500 text-xs uppercase tracking-wider font-semibold'>
              <th className='py-3.5 px-6'>Contenido</th>
              <th className='py-3.5 px-4'>Método de Evaluación</th>
              <th className='py-3.5 px-4'>Fecha</th>
              <th className='py-3.5 px-4'>Puntos</th>
              <th className='py-3.5 px-4'>Página</th>
              <th className='py-3.5 px-4 text-center'>En Cuaderno</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 text-sm text-slate-600'>
            {unit.tasks.map((task, index) => (
              <tr
                key={index}
                className='transition-colors hover:bg-slate-50/60 even:bg-slate-50/30'
              >
                <td className='py-4 px-6 font-medium text-slate-800'>{task.content}</td>
                <td className='py-4 px-4'>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700'>
                    {task.evaluationMethod}
                  </span>
                </td>
                <td className='py-4 px-4 whitespace-nowrap text-slate-500'>{dayjs(task.date).format('LLL')}</td>
                <td className='py-4 px-4 font-semibold text-slate-700'>{task.points}</td>
                <td className='py-4 px-4 text-slate-500'>{task.page}</td>
                <td className='py-4 px-4 text-center'>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.inNotebook
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                      : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                      }`}
                  >
                    {task.inNotebook ? 'Sí' : 'No'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
