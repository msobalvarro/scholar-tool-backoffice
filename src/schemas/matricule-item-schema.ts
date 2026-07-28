import { z } from 'zod'

export const matriculeItemSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  enrollmentPrice: z.number({ error: 'El precio es obligatorio' }).min(0, 'El precio debe ser mayor o igual a 0'),
  monthlyPaymentPrice: z.number({ error: 'El precio es obligatorio' }).min(0, 'El precio debe ser mayor o igual a 0'),
  coursesId: z.array(z.string()).min(1, 'Debe seleccionar al menos un curso'),
})

export type MatriculeItemInput = z.infer<typeof matriculeItemSchema>
