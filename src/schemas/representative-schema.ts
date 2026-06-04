import { z } from 'zod'

export const representativeSchema = z.object({
  fullName: z.string({ message: 'El nombre es requerido.' })
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
    .max(100, { message: 'El nombre debe tener menos de 100 caracteres.' }),
  identification: z.string({ message: 'La identificación es requerida.' })
    .min(14, { message: 'La identificación debe tener al menos 14 caracteres.' }),
  email: z.email({ message: 'El correo no es válido.' }),
  phoneNumber: z.string({ message: 'El teléfono es requerido.' })
    .min(8, { message: 'El teléfono debe tener al menos 8 caracteres.' })
    .max(8, { message: 'El teléfono debe tener menos de 8 caracteres.' }),
  direction: z.string({ message: 'La dirección es requerida.' })
    .min(3, { message: 'La dirección debe tener al menos 3 caracteres.' }),
  isEmergencyContact: z.boolean({ message: 'El campo de contacto de emergencia es requerido.' }),
  type: z.enum(['father', 'mother', 'grandfather', 'uncle', 'other'], { message: 'El tipo de responsable es requerido.' }),
})