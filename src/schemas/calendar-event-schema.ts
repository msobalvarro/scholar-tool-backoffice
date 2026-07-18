import { z } from 'zod'

export const createCalendarEventSchema = z.object({
  date: z.string(),
  time: z.string().optional(),
  type: z.enum(['exam', 'task', 'meeting', 'holiday', 'class', 'other']),
  title: z.string().min(3, 'El título es requerido'),
  description: z.string().min(10, 'La descripción es requerida'),
  coursesId: z.array(z.string())
})

export const updateCalendarEventSchema = createCalendarEventSchema.extend({
  _id: z.string()
})