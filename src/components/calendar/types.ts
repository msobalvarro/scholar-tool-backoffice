export interface CalendarEvent {
  id: string
  title: string
  description?: string
  date: string // YYYY-MM-DD
  startTime: string // HH:MM
  endTime: string // HH:MM
  category: 'exam' | 'task' | 'holiday' | 'meeting' | 'other'
}

export const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

export const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export interface CategoryStyle {
  label: string
  color: string
  text: string
  badge: string
}

export const CATEGORIES: Record<CalendarEvent['category'], CategoryStyle> = {
  exam: {
    label: 'Examen',
    color: 'bg-rose-500',
    text: 'text-rose-600 dark:text-rose-400',
    badge: 'bg-rose-50 border-rose-100 text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/30 dark:text-rose-400'
  },
  task: {
    label: 'Tarea',
    color: 'bg-indigo-500',
    text: 'text-indigo-600 dark:text-indigo-400',
    badge: 'bg-indigo-50 border-indigo-100 text-indigo-600 dark:bg-indigo-950/20 dark:border-indigo-900/30 dark:text-indigo-400'
  },
  holiday: {
    label: 'Festivo',
    color: 'bg-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-50 border-emerald-100 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400'
  },
  meeting: {
    label: 'Reunión',
    color: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-50 border-amber-100 text-amber-600 dark:bg-amber-950/20 dark:border-amber-900/30 dark:text-amber-400'
  },
  other: {
    label: 'Otro',
    color: 'bg-violet-500',
    text: 'text-violet-600 dark:text-violet-400',
    badge: 'bg-violet-50 border-violet-100 text-violet-600 dark:bg-violet-950/20 dark:border-violet-900/30 dark:text-violet-400'
  }
}
