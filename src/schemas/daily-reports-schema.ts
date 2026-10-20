import { ConceptType, TypeMovementType } from '@/dtos/inputs/daily-reports'
import { z } from 'zod'

const baseDailyReportSchema = z.object({
  date: z.date(),
  type_movement: z.enum(TypeMovementType),
  concept: z.enum(ConceptType, 'Seleccione un concepto'),
  description: z.string().min(1, 'La descripción es requerida'),
  receipt_number: z.string().min(1, 'El número de recibo es requerido'),
  income_recorded_amount: z.number().nonnegative('El monto no puede ser negativo').optional(),
  income_recorded_amount_usd: z.number().nonnegative('El monto no puede ser negativo').optional(),
  expense_amount: z.number().nonnegative('El monto no puede ser negativo').optional(),
  expense_amount_usd: z.number().nonnegative('El monto no puede ser negativo').optional(),
  student: z.string().optional(),
})

const validateAmounts = (
  data: z.infer<typeof baseDailyReportSchema>,
  ctx: z.RefinementCtx
) => {
  if (data.type_movement === TypeMovementType.EXPENSE) {
    const local = data.expense_amount ?? 0
    const usd = data.expense_amount_usd ?? 0

    if (local <= 0 && usd <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe ingresar un monto mayor a 0 en moneda local o en dólares',
        path: ['expense_amount'],
      })
    }
  }

  if (data.type_movement === TypeMovementType.INCOME) {
    const local = data.income_recorded_amount ?? 0
    const usd = data.income_recorded_amount_usd ?? 0

    if (local <= 0 && usd <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe ingresar un monto mayor a 0 en moneda local o en dólares',
        path: ['income_recorded_amount'],
      })
    }
  }
}

export const createDailyReportSchema = baseDailyReportSchema.superRefine(validateAmounts)
export type CreateDailyReportSchema = z.infer<typeof createDailyReportSchema>

export const updateDailyReportSchema = baseDailyReportSchema
  .extend({
    _id: z.string(),
  })
  .superRefine(validateAmounts)

export type UpdateDailyReportSchema = z.infer<typeof updateDailyReportSchema>
