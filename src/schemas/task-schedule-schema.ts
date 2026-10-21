import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

export const taskDetailSchema = z.object({
  content: z.string().min(1, 'El contenido es requerido'),
  evaluationMethod: z.string().min(1, 'El método de evaluación es requerido'),
  page: z.string().optional(),
  inNotebook: z.boolean().default(false).optional(),
  date: z.string().min(1, 'La fecha es requerida'),
  points: z.coerce.number().min(0, 'El puntaje debe ser mayor o igual a 0'),
})

export type TaskDetailSchema = z.infer<typeof taskDetailSchema>

export const scheduleUnitSchema = z.object({
  unitName: z.string().min(1, 'El nombre de la unidad es requerido'),
  diciplineName: z.string().min(1, 'La disciplina es requerida'),
  tasks: z.array(taskDetailSchema).min(1, 'Agrega al menos una tarea a la unidad'),
})

export type ScheduleUnitSchema = z.infer<typeof scheduleUnitSchema>

export const taskScheduleSchema = z.object({
  asignatureId: z.string().min(1, 'Selecciona una asignatura'),
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2000),
  scheduleUnit: z.array(scheduleUnitSchema).min(1, 'Agrega al menos una unidad al cronograma'),
})
  .describe('')

export type TaskScheduleSchema = z.infer<typeof taskScheduleSchema>