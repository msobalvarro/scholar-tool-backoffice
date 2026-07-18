import dayjs from 'dayjs'
import clsx from 'clsx'
import MultiSelect from 'react-select'
import { Calendar as CalendarIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type { CreateCalendarEventDto } from '@/dtos/outputs/calendar-events-output'
import { CATEGORIES } from '@/constants/calendar-events.constant'
import { Controller, useForm } from 'react-hook-form'
import { createCalendarEventSchema } from '@/schemas/calendar-event-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCalendar } from '@/hooks/API/use-calendar-events'
import { useCourses } from '@/hooks/API/use-course'

interface CalendarEventModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate?: dayjs.Dayjs
  onSaveEvent?: () => void
}

export const CalendarEventModal = ({
  isOpen,
  onClose,
}: CalendarEventModalProps) => {
  const { createEvent } = useCalendar()
  const { data: courses } = useCourses()
  const { handleSubmit, control, register, formState: { errors, isLoading }, reset } = useForm<CreateCalendarEventDto>({
    resolver: zodResolver(createCalendarEventSchema),
    defaultValues: {
      title: '',
      description: '',
      coursesId: [],
      date: dayjs().format('YYYY-MM-DD'),
      time: '',
      type: 'exam'
    },
  })

  const submit = async (data: CreateCalendarEventDto) => {
    await createEvent.mutateAsync(data)
    onClose()
    reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-card border border-border">
        <form onSubmit={handleSubmit(submit)}>
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-accent" />
              Programar Nuevo Evento
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Completa los datos del evento académico que deseas agendar.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2 text-foreground">
            {/* Event Title */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="evt-title" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Título del Evento <span className="text-rose-500">*</span>
              </label>
              <Input
                {...register('title')}
                className={clsx(['bg-background border-border', errors.title && 'border-destructive focus-visible:ring-destructive'])}
              />
              {errors.title && (
                <p className='text-xs font-medium text-destructive mt-1'>
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Date Selection & Category Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="evt-date" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Fecha <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="date"
                  {...register('date')}
                  className={clsx(['bg-background border-border w-full text-foreground', errors.date && 'border-destructive focus-visible:ring-destructive'])}
                />
                {errors.date && (
                  <p className='text-xs font-medium text-destructive mt-1'>
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="evt-start" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Hora
                </label>
                <Input
                  {...register('time')}
                  type='time'
                  className={clsx(['bg-background border-border w-full text-foreground', errors.date && 'border-destructive focus-visible:ring-destructive'])}
                />
                {errors.time && (
                  <p className='text-xs font-medium text-destructive mt-1'>
                    {errors.time.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="evt-category" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Categoría
              </label>
              <Controller
                control={control}
                name='type'
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="evt-category" className="bg-background border-border w-full text-foreground">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CATEGORIES).map(([key, val]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${val.color}`} />
                            {val.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Course Multi-Selection */}
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="evt-course" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Cursos
              </label>
              <Controller
                control={control}
                name='coursesId'
                render={({ field }) => (
                  <MultiSelect
                    isMulti
                    options={
                      courses?.map(course => ({
                        value: course._id,
                        label: course.name
                      })) || []
                    }
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="evt-desc" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Descripción / Detalles
              </label>
              <Controller
                control={control}
                name='description'
                render={({ field }) => (
                  <textarea
                    id="evt-desc"
                    placeholder="Detalles sobre el aula, materiales necesarios o especificaciones..."
                    rows={3}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring transition-all outline-hidden min-h-20 text-foreground"
                  />
                )}
              />
            </div>
          </div>

          <DialogFooter className="mt-6 gap-2 sm:gap-0 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border text-foreground"
            >
              Cancelar
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-accent text-white hover:bg-accent/90"
            >
              Guardar Evento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}
