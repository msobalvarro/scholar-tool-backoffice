import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
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
import { toast } from 'sonner'
import type { CalendarEvent } from './types'
import { CATEGORIES } from './types'

interface CalendarEventModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: dayjs.Dayjs
  onSaveEvent: (event: Omit<CalendarEvent, 'id'>) => void
}

export const CalendarEventModal = ({
  isOpen,
  onClose,
  selectedDate,
  onSaveEvent
}: CalendarEventModalProps) => {
  const [formTitle, setFormTitle] = useState('')
  const [formDate, setFormDate] = useState('')
  const [formStartTime, setFormStartTime] = useState('08:00')
  const [formEndTime, setFormEndTime] = useState('09:00')
  const [formCategory, setFormCategory] = useState<CalendarEvent['category']>('exam')
  const [formDescription, setFormDescription] = useState('')

  // Pre-fill fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormTitle('')
      setFormDate(selectedDate.format('YYYY-MM-DD'))
      setFormStartTime('08:00')
      setFormEndTime('09:00')
      setFormCategory('exam')
      setFormDescription('')
    }
  }, [isOpen, selectedDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formTitle.trim()) {
      toast.error('El título del evento es obligatorio.')
      return
    }

    if (!formDate) {
      toast.error('La fecha es obligatoria.')
      return
    }

    if (formStartTime > formEndTime) {
      toast.error('La hora de inicio no puede ser posterior a la hora de fin.')
      return
    }

    onSaveEvent({
      title: formTitle.trim(),
      description: formDescription.trim() || undefined,
      date: formDate,
      startTime: formStartTime,
      endTime: formEndTime,
      category: formCategory
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-card border border-border">
        <form onSubmit={handleSubmit}>
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
                id="evt-title"
                placeholder="Ej. Examen de Ciencias o Entrega de Ensayos"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="bg-background border-border"
                required
              />
            </div>

            {/* Date Selection & Category Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="evt-date" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Fecha <span className="text-rose-500">*</span>
                </label>
                <Input
                  id="evt-date"
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="bg-background border-border w-full text-foreground"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="evt-category" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Categoría
                </label>
                <Select
                  value={formCategory}
                  onValueChange={(val: any) => setFormCategory(val)}
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
              </div>
            </div>

            {/* Start Time & End Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="evt-start" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Hora de Inicio
                </label>
                <Input
                  id="evt-start"
                  type="time"
                  value={formStartTime}
                  onChange={(e) => setFormStartTime(e.target.value)}
                  className="bg-background border-border w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="evt-end" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Hora de Fin
                </label>
                <Input
                  id="evt-end"
                  type="time"
                  value={formEndTime}
                  onChange={(e) => setFormEndTime(e.target.value)}
                  className="bg-background border-border w-full"
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="evt-desc" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Descripción / Detalles
              </label>
              <textarea
                id="evt-desc"
                placeholder="Detalles sobre el aula, materiales necesarios o especificaciones..."
                rows={3}
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring transition-all outline-hidden min-h-[80px] text-foreground"
              />
            </div>
          </div>

          <DialogFooter className="mt-6 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border text-foreground"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-accent text-white hover:bg-accent/90"
            >
              Guardar Evento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
