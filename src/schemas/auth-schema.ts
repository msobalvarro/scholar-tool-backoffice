import { z } from 'zod'

export const loginTeacherSchema = z.object({
  email: z
    .email(),
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria')
    .min(4, 'La contraseña debe tener al menos 4 caracteres'),
  rememberMe: z.boolean().optional(),
})

export type LoginTeacherInput = z.infer<typeof loginTeacherSchema>
