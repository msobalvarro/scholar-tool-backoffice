import { useState } from 'react'
import {
  CheckCircle2,
  Clock,
  BookOpen,
  Book,
  Calendar,
  Award,
  Search,
  ChevronDown,
  ChevronUp,
  User,
  Check,
  X,
  Layers
} from 'lucide-react'
import type { TaskSchedule } from '@/dtos/outputs/task-schedule'
import { MONTH_NAMES } from '@/constants/calendar-events.constant'

interface TaskSchedulesListProps {
  schedules: TaskSchedule[]
}

export const TaskSchedulesListView = ({ schedules }: TaskSchedulesListProps) => {
  const [selectedScheduleIndex, setSelectedScheduleIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [notebookFilter, setNotebookFilter] = useState<boolean | null>(null)
  const [collapsedUnits, setCollapsedUnits] = useState<{ [key: number]: boolean }>({})

  if (!schedules || schedules.length === 0) {
    return (
      <div className="p-4">
        No hay cronogramas disponibles para mostrar.
      </div>
    )
  }

  const currentSchedule = schedules[selectedScheduleIndex]

  // Calcular total de puntos del cronograma actual
  const totalPoints = currentSchedule.scheduleUnit.reduce((acc, unit) => {
    return acc + unit.tasks.reduce((tAcc, task) => tAcc + (task.points || 0), 0)
  }, 0)

  const toggleUnit = (index: number) => {
    setCollapsedUnits((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
    } catch {
      return dateStr
    }
  }

  return (
    <div>
      {/* Selector de Cronograma (si hay más de uno en la lista) */}
      {schedules.length > 1 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Seleccionar Cronograma:</span>
          </div>
          <select
            value={selectedScheduleIndex}
            onChange={(e) => {
              setSelectedScheduleIndex(Number(e.target.value))
              setCollapsedUnits({}) // Reiniciar estados de colapso al cambiar
            }}
            className="w-full sm:w-auto bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {schedules.map((sch, idx) => (
              <option key={idx} value={idx}>
                Asignatura: {sch.asignature.name} — {MONTH_NAMES[sch.month - 1]} {sch.year}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Header / Meta Información del Cronograma Actual */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-100 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-2.5 py-1 rounded-md">
                Asignatura: {currentSchedule.asignature.name}
              </span>

              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                {MONTH_NAMES[currentSchedule.month - 1] || `Mes ${currentSchedule.month}`} {currentSchedule.year}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Cronograma de Tareas</h1>
          </div>

          <div>
            {currentSchedule.aproved ? (
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Aprobado {currentSchedule.aprovedBy && `por ${currentSchedule.aprovedBy}`}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200 text-sm font-medium">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Pendiente de Aprobación</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" />
            <span>Profesor: <strong className="text-slate-700">{currentSchedule.teacher.name || 'No asignado'}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>Unidades: <strong className="text-slate-700">{currentSchedule.scheduleUnit.length}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-slate-400" />
            <span>Puntaje Total: <strong className="text-slate-700">{totalPoints} pts</strong></span>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar en el contenido o método de evaluación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setNotebookFilter(notebookFilter === true ? null : true)}
            className={`px-3 py-2 text-xs font-medium rounded-lg border flex items-center gap-1.5 transition-colors ${notebookFilter === true
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
          >
            <Book className="w-3.5 h-3.5" /> En Cuaderno
          </button>
        </div>
      </div>

      {/* Lista de Unidades */}
      <div className="space-y-6">
        {currentSchedule.scheduleUnit.map((unit, unitIdx) => {
          const isCollapsed = collapsedUnits[unitIdx]

          const filteredTasks = unit.tasks.filter((task) => {
            const matchesSearch =
              task.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
              task.evaluationMethod.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesNotebook =
              notebookFilter === null || task.inNotebook === notebookFilter

            return matchesSearch && matchesNotebook
          })

          if (filteredTasks.length === 0 && (searchTerm || notebookFilter !== null)) {
            return null
          }

          return (
            <div
              key={unitIdx}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div
                onClick={() => toggleUnit(unitIdx)}
                className="flex items-center justify-between p-4 bg-slate-50/80 border-b border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{unit.unitName}</h2>
                  <span className="text-xs font-medium text-slate-500">
                    Disciplina: <span className="text-slate-700 font-semibold">{unit.diciplineName}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                    {filteredTasks.length} {filteredTasks.length === 1 ? 'tarea' : 'tareas'}
                  </span>
                  {isCollapsed ? (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {!isCollapsed && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Contenido</th>
                        <th className="py-3 px-4">Método de Evaluación</th>
                        <th className="py-3 px-4">Fecha</th>
                        <th className="py-3 px-4 text-center">Cuaderno</th>
                        <th className="py-3 px-4 text-center">Página</th>
                        <th className="py-3 px-4 text-right">Puntos</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTasks.map((task, taskIdx) => (
                        <tr key={taskIdx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 px-4 font-medium text-slate-800 max-w-xs">
                            {task.content}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            <span className="inline-block bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">
                              {task.evaluationMethod}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(task.date)}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {task.inNotebook ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                <Check className="w-3 h-3" /> Sí
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                                <X className="w-3 h-3" /> No
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center text-slate-600 text-xs">
                            {task.page ? `Pág. ${task.page}` : '-'}
                          </td>
                          <td className="py-3.5 px-4 text-right font-bold text-indigo-600">
                            {task.points} pts
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}