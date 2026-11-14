import { Edit3, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { AsignatureResponse } from '@/dtos/outputs/asignature-output'

interface AsignatureFormProps {
  formData: {
    name: string
    description: string
    status: 'active' | 'inactive'
  }
  onFormChange: (data: { name: string; description: string; status: 'active' | 'inactive' }) => void
  onSave: () => void
  onCancel: () => void
  isActionLoading: boolean
  error?: string | null
  selectedAsignature?: AsignatureResponse | null
}

export const AsignatureForm = ({
  formData,
  onFormChange,
  onSave,
  onCancel,
  isActionLoading,
  error,
  selectedAsignature
}: AsignatureFormProps) => {
  if (!selectedAsignature) {
    return (
      <div className='w-full lg:w-96 bg-card text-card-foreground rounded-2xl border border-border shadow-xs p-8 flex flex-col items-center justify-center text-center gap-4 sticky top-6 self-start min-h-125'>
        <div className='bg-muted p-6 rounded-full'>
          <Edit3 className='w-10 h-10 text-muted-foreground/60' />
        </div>
        <div>
          <h3 className='text-lg font-bold text-foreground'>No hay selección</h3>
          <p className='text-sm text-muted-foreground mt-2 max-w-50 mx-auto'>
            Selecciona una materia del listado para ver y editar sus detalles.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full lg:w-96 bg-card text-card-foreground rounded-2xl border border-border shadow-xs p-6 flex flex-col gap-6 sticky top-6 self-start'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-bold text-foreground text-[18px]'>
            Editar Asignatura
          </h2>
        </div>
        <div className='bg-primary/10 p-2 rounded-xl'>
          <Edit3 className='w-5 h-5 text-primary' />
        </div>
      </div>

      <div className='top-4 flex flex-col gap-4'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider px-1 text-[10px]'>Nombre de la Asignatura</label>
            <Input
              value={formData.name}
              onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
              placeholder='Ej. Matemáticas Avanzadas'
              className='h-11 border-border bg-muted/40 rounded-xl focus-visible:ring-primary'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider px-1 text-[10px]'>Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => onFormChange({ ...formData, description: e.target.value })}
              placeholder='Breve descripción de la materia...'
              className='w-full min-h-30 p-3 text-sm border border-border bg-muted/40 text-foreground rounded-xl focus:outline-none focus:ring-1 focus:ring-primary resize-none transition-all placeholder:text-muted-foreground'
            />
          </div>

          <div className='p-4 rounded-xl border border-border bg-muted/30 flex items-center justify-between'>
            <div>
              <p className='text-sm font-bold text-foreground'>Estado Activo</p>
              <p className='text-[10px] text-muted-foreground'>Visible para estudiantes</p>
            </div>
            <button
              onClick={() => onFormChange({ ...formData, status: formData.status === 'active' ? 'inactive' : 'active' })}
              className={`${formData.status === 'active' ? 'bg-primary' : 'bg-muted'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
            >
              <span
                className={`${formData.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs`}
              />
            </button>
          </div>
        </div>

        {error && (
          <p className='text-xs text-destructive bg-destructive/10 p-2.5 rounded-lg border border-destructive/20 flex items-center gap-2 font-medium'>
            <XCircle className='w-3.5 h-3.5 shrink-0' />
            {error}
          </p>
        )}

        <div className='flex gap-3 mt-auto pt-4'>
          <Button
            variant='outline'
            className='flex-1 h-11 rounded-xl font-bold'
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            className='flex-1 h-11 rounded-xl font-bold'
            onClick={onSave}
            disabled={isActionLoading || !formData.name}
          >
            {isActionLoading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>
    </div>
  )
}
