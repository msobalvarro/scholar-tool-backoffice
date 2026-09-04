import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PlusCircle,
  FileText,
  CalendarDays,
  AlignLeft,
  Hash,
  TrendingUp,
  TrendingDown,
  Loader2,
  DollarSign,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createDailyReportSchema, type CreateDailyReportSchema } from '@/schemas/daily-reports-schema'
import { ConceptType, TypeMovementType } from '@/dtos/inputs/daily-reports'
import { useCreateDailyReport } from '@/hooks/API/use-daily-reports'

interface CreateDailyReportModalProps {
  isOpen: boolean
  onClose: () => void
}

const typeMovementOptions = Object.values(TypeMovementType)
const conceptOptions = Object.values(ConceptType)

export const CreateDailyReportModal = ({ isOpen, onClose }: CreateDailyReportModalProps) => {
  const { mutateAsync: createReport, isPending } = useCreateDailyReport()

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateDailyReportSchema>({
    resolver: zodResolver(createDailyReportSchema),
    defaultValues: {
      date: new Date(),
      description: '',
      receipt_number: '',
      concept: 'Matrícula',
      type_movement: 'Ingreso',
      income_recorded_amount: 0,
      income_recorded_amount_usd: 0,
      expense_amount: 0,
      expense_amount_usd: 0,
    },
  })

  const typeMovement = watch('type_movement')
  const isIncome = typeMovement === TypeMovementType.INCOME
  const isExpense = typeMovement === TypeMovementType.EXPENSE

  const onSubmit = async (data: CreateDailyReportSchema) => {
    try {
      await createReport(data)
      reset()
      onClose()
    } catch {
      // error already handled by hook
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const fieldClass = (hasError: boolean) =>
    `rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11 ${hasError ? 'ring-2 ring-red-500 focus-visible:ring-red-500' : ''}`

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-2xl rounded-3xl p-8 border-none shadow-2xl bg-white max-h-[90vh] overflow-y-auto'>
        <DialogHeader className='mb-4'>
          <div className='w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4'>
            <PlusCircle className='w-6 h-6' />
          </div>
          <DialogTitle className='text-2xl font-bold text-gray-900'>Nuevo Reporte Diario</DialogTitle>
          <DialogDescription className='text-gray-400 mt-1'>
            Registra un nuevo movimiento financiero del día.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <div className='grid grid-cols-2 gap-4'>

            {/* Fecha */}
            <div className='space-y-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <CalendarDays className='w-4 h-4 text-blue-500' />
                Fecha
              </label>
              <Input
                type='date'
                className={fieldClass(!!errors.date)}
                {...register('date', { valueAsDate: true })}
              />
              {errors.date && (
                <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>{errors.date.message}</p>
              )}
            </div>

            {/* Número de Recibo */}
            <div className='space-y-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <Hash className='w-4 h-4 text-blue-500' />
                N° de Recibo
              </label>
              <Input
                placeholder='Ej: REC-001'
                className={fieldClass(!!errors.receipt_number)}
                {...register('receipt_number')}
              />
              {errors.receipt_number && (
                <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>{errors.receipt_number.message}</p>
              )}
            </div>

            {/* Tipo de Movimiento */}
            <div className='space-y-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <FileText className='w-4 h-4 text-blue-500' />
                Tipo de Movimiento
              </label>
              <Controller
                name='type_movement'
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={`w-full rounded-xl bg-gray-50 border-none h-11 ${errors.type_movement ? 'ring-2 ring-red-500' : ''}`}>
                      <SelectValue placeholder='Selecciona tipo' />
                    </SelectTrigger>
                    <SelectContent className='rounded-xl border-none shadow-xl'>
                      {typeMovementOptions.map((type) => (
                        <SelectItem key={type} value={type} className='rounded-lg'>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type_movement && (
                <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>{errors.type_movement.message}</p>
              )}
            </div>

            {/* Concepto */}
            <div className='space-y-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <FileText className='w-4 h-4 text-blue-500' />
                Concepto
              </label>
              <Controller
                name='concept'
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={`w-full rounded-xl bg-gray-50 border-none h-11 ${errors.concept ? 'ring-2 ring-red-500' : ''}`}>
                      <SelectValue placeholder='Selecciona concepto' />
                    </SelectTrigger>
                    <SelectContent className='rounded-xl border-none shadow-xl'>
                      {conceptOptions.map((concept) => (
                        <SelectItem key={concept} value={concept} className='rounded-lg'>{concept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.concept && (
                <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>{errors.concept.message}</p>
              )}
            </div>

            {/* Descripción */}
            <div className='space-y-2 col-span-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <AlignLeft className='w-4 h-4 text-blue-500' />
                Descripción
              </label>
              <Input
                multiple
                placeholder='Descripción del movimiento...'
                className={fieldClass(!!errors.description)}
                {...register('description')}
              />
              {errors.description && (
                <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>{errors.description.message}</p>
              )}
            </div>

            {/* Montos de Ingreso */}
            {isIncome && (
              <>
                <div className='space-y-2'>
                  <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                    <TrendingUp className='w-4 h-4 text-green-500' />
                    Ingreso (C$)
                  </label>
                  <Input
                    type='number'
                    min={0}
                    step='0.01'
                    placeholder='0.00'
                    className={fieldClass(!!errors.income_recorded_amount)}
                    {...register('income_recorded_amount', { valueAsNumber: true })}
                  />
                  {errors.income_recorded_amount && (
                    <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>{errors.income_recorded_amount.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                    <DollarSign className='w-4 h-4 text-green-500' />
                    Ingreso (USD)
                  </label>
                  <Input
                    type='number'
                    min={0}
                    step='0.01'
                    placeholder='0.00'
                    className={fieldClass(!!errors.income_recorded_amount_usd)}
                    {...register('income_recorded_amount_usd', { valueAsNumber: true })}
                  />
                  {errors.income_recorded_amount_usd && (
                    <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>{errors.income_recorded_amount_usd.message}</p>
                  )}
                </div>
              </>
            )}

            {/* Montos de Egreso */}
            {isExpense && (
              <>
                <div className='space-y-2'>
                  <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                    <TrendingDown className='w-4 h-4 text-red-500' />
                    Egreso (C$)
                  </label>
                  <Input
                    type='number'
                    min={0}
                    step='0.01'
                    placeholder='0.00'
                    className={fieldClass(!!errors.expense_amount)}
                    {...register('expense_amount', { valueAsNumber: true })}
                  />
                  {errors.expense_amount && (
                    <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>{errors.expense_amount.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                    <DollarSign className='w-4 h-4 text-red-500' />
                    Egreso (USD)
                  </label>
                  <Input
                    type='number'
                    min={0}
                    step='0.01'
                    placeholder='0.00'
                    className={fieldClass(!!errors.expense_amount_usd)}
                    {...register('expense_amount_usd', { valueAsNumber: true })}
                  />
                  {errors.expense_amount_usd && (
                    <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>{errors.expense_amount_usd.message}</p>
                  )}
                </div>
              </>
            )}
          </div>

          <DialogFooter className='gap-3 pt-4'>
            <Button
              type='button'
              variant='ghost'
              onClick={handleClose}
              className='rounded-xl h-11 flex-1 font-bold text-gray-500 hover:bg-gray-100'
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              disabled={isPending}
              className='rounded-xl h-11 flex-1 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
            >
              {isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Guardando...
                </>
              ) : (
                'Guardar Reporte'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
