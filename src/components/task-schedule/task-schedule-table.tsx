import { MONTH_NAMES } from '@/constants/calendar-events.constant'
import type { TaskSchedule } from '@/dtos/outputs/task-schedule'
import dayjs from 'dayjs'

interface Props {
  dataList: TaskSchedule[]
}

const ScheduleTable = ({ dataList = [] }: Props) => {
  const getMonthName = (monthNumber: number) => MONTH_NAMES[monthNumber - 1]

  return (
    <div className="w-full overflow-x-auto shadow-md rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-left border-collapse text-sm text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700 font-semibold border-b border-gray-200">
          <tr>
            <th className="px-6 py-4">Fecha Creación</th>
            <th className="px-6 py-4">Asignatura</th>
            <th className="px-6 py-4">Período</th>
            <th className="px-6 py-4">Estado</th>
            <th className="px-6 py-4">Unidades / Tareas</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {dataList.length > 0 ? (
            dataList.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">

                {/* Fecha de creación */}
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                  {dayjs(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                </td>

                {/* Asignatura */}
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{item.asignature?.name}</div>
                  <div className="text-xs text-gray-500">{item.asignature?.description}</div>
                </td>

                {/* Período (Mes / Año) */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                    {getMonthName(item.month)} {item.year}
                  </span>
                </td>

                {/* Estado (Aprobado) */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.aproved ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Aprobado
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pendiente
                    </span>
                  )}
                </td>

                {/* Unidades y Tareas (scheduleUnit) */}
                <td className="px-6 py-4">
                  <div className="space-y-2 max-w-xs">
                    {item.scheduleUnit?.map((unit, index) => (
                      <div key={index} className="border-l-2 border-indigo-500 pl-2">
                        <p className="font-semibold text-xs text-indigo-600">{unit.unitName}</p>
                        {unit.tasks?.map((task, tIndex) => (
                          <div key={tIndex} className="text-xs text-gray-600 mt-1 bg-gray-50 p-1.5 rounded">
                            <p><strong className="text-gray-700">Tarea:</strong> {task.content}</p>
                            <p><strong className="text-gray-700">Método:</strong> {task.evaluationMethod} ({task.points} pts)</p>
                            <p><strong className="text-gray-700">Pág:</strong> {task.page}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
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

export default ScheduleTable