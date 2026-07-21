import { z } from 'zod'

export const enrollmentSchema = z.object({
  coursesId: z.array(z.string()).min(1, 'Debe seleccionar al menos un curso'),
  name: z.string().min(1, 'El nombre es obligatorio'),
  year: z.number({ error: 'El año es obligatorio' }).int('El año debe ser entero').min(2000, 'Ingrese un año válido'),
  enrolementPrice: z.number({ error: 'El precio de inscripción es obligatorio' }).min(0, 'El precio debe ser mayor o igual a 0'),
  monthlyPaymentPrice: z.number({ error: 'El precio de mensualidad es obligatorio' }).min(0, 'El precio debe ser mayor o igual a 0'),
})

export type EnrollmentInput = z.infer<typeof enrollmentSchema>

export const enrollmentUpdateSchema = enrollmentSchema.extend({
  _id: z.string(),
})

export type EnrollmentUpdateInput = z.infer<typeof enrollmentUpdateSchema>