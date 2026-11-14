import dayjs from 'dayjs'
import { MONTH_NAMES } from '@/constants/calendar-events.constant'
import type { TaskSchedule } from '@/dtos/outputs/task-schedule'
import { TaskScheduleDialogForm } from './create-task-schedule'
import { Check } from 'lucide-react'

interface Props {
  dataList: TaskSchedule[]
}

export const ScheduleTable = ({ dataList = [] }: Props) => {
  const getMonthName = (monthNumber: number) => MONTH_NAMES[monthNumber - 1]

  return (
    <div className="w-full overflow-x-auto shadow-xs rounded-2xl border border-border bg-card text-card-foreground">
      <table className="w-full text-left border-collapse text-sm">
        <thead className="bg-muted/40 text-xs uppercase text-muted-foreground font-semibold border-b border-border">
          <tr>
            <th className="px-6 py-4">Fecha Creación</th>
            <th className="px-6 py-4">Asignatura</th>
            <th className="px-6 py-4">Período</th>
            <th className="px-6 py-4">Curso</th>
            <th className="px-6 py-4">Estado</th>
            <th className="px-6 py-4">Unidades / Tareas</th>
            <th className="px-6 py-4">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {dataList.length > 0 ? (
            dataList.map((item) => (
              <tr key={item._id} className="hover:bg-muted/50 transition-colors">

                {/* Fecha de creación */}
                <td className="px-6 py-4 whitespace-nowrap text-xs text-muted-foreground">
                  {dayjs(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                </td>

                {/* Asignatura */}
                <td className="px-6 py-4">
                  <div className="font-semibold text-foreground">{item.asignature?.name}</div>
                  <div className="text-xs text-muted-foreground">{item.asignature?.description}</div>
                </td>

                {/* Período (Mes / Año) */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-2.5 py-1 rounded-md">
                    {getMonthName(item.month)} {item.year}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="font-semibold text-foreground">{item.course?.name}</div>
                  <div className="text-xs text-muted-foreground">{item.course?.groupName}</div>
                </td>

                {/* Estado (Aprobado) */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.aproved ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Aprobado
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      Pendiente
                    </span>
                  )}
                </td>

                {/* Unidades y Tareas (scheduleUnit) */}
                <td className="px-6 py-4">
                  <div className="space-y-2 max-w-xs">
                    {item.scheduleUnit?.map((unit, index) => (
                      <div key={index} className="border-l-2 border-primary pl-2">
                        <p className="font-semibold text-xs text-primary">{unit.unitName}</p>
                        {unit.tasks?.map((task, tIndex) => (
                          <div key={tIndex} className="text-xs text-foreground mt-1 bg-muted/40 border border-border/50 p-2 rounded-lg">
                            <p><strong className="text-foreground">Tarea:</strong> {task.content}</p>
                            <p><strong className="text-foreground">Método:</strong> {task.evaluationMethod} ({task.points} pts)</p>
                            <p><strong className="text-foreground">Pág:</strong> {task.page}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </td>

                {/* Acciones */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {!item.aproved && (
                    <TaskScheduleDialogForm
                      isUpdate={true}
                      triggerButtonText='Editar Cronograma'
                      defaultValues={{
                        courseId: item.course._id!,
                        asignatureId: item.asignature._id!,
                        month: item.month,
                        year: item.year,
                        scheduleUnit: item.scheduleUnit!,
                      }}
                      taskId={item._id}
                    />
                  )}
                  {item.aproved && (
                    <Check className='text-green-500' size={24} />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-6 text-center text-gray-500">
                No hay registros disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}