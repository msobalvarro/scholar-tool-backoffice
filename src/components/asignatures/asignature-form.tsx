import { Edit3, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { AsignatureResponse } from '@/utils/types'

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
      <div className='w-full lg:w-96 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center gap-4 sticky top-6 self-start min-h-125'>
        <div className='bg-gray-50 p-6 rounded-full'>
          <Edit3 className='w-10 h-10 text-gray-300' />
        </div>
        <div>
          <h3 className='text-lg font-bold text-gray-900'>No hay selección</h3>
          <p className='text-sm text-gray-500 mt-2 max-w-50 mx-auto'>
            Selecciona una materia del listado para ver y editar sus detalles.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full lg:w-96 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6 sticky top-6 self-start'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-bold text-gray-900 text-[18px]'>
            Editar Asignatura
          </h2>
        </div>
        <div className='bg-accent/10 p-2 rounded-xl'>
          <Edit3 className='w-5 h-5 text-accent' />
        </div>
      </div>

      <div className='top-4 flex flex-col gap-4'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-xs font-bold text-gray-500 uppercase tracking-wider px-1 text-[10px]'>Nombre de la Asignatura</label>
            <Input
              value={formData.name}
              onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
              placeholder='Ej. Matemáticas Avanzadas'
              className='h-11 border-gray-100 bg-gray-50/50 rounded-xl focus-visible:ring-accent'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-xs font-bold text-gray-500 uppercase tracking-wider px-1 text-[10px]'>Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => onFormChange({ ...formData, description: e.target.value })}
              placeholder='Breve descripción de la materia...'
              className='w-full min-h-30 p-3 text-sm border-gray-100 bg-gray-50/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent resize-none transition-all'
            />
          </div>

          <div className='p-4 rounded-xl border border-gray-100 bg-gray-50/30 flex items-center justify-between'>
            <div>
              <p className='text-sm font-bold text-gray-900'>Estado Activo</p>
              <p className='text-[10px] text-gray-500'>Visible para estudiantes</p>
            </div>
            <button
              onClick={() => onFormChange({ ...formData, status: formData.status === 'active' ? 'inactive' : 'active' })}
              className={`${formData.status === 'active' ? 'bg-accent' : 'bg-gray-300'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
            >
              <span
                className={`${formData.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm`}
              />
            </button>
          </div>
        </div>

        {error && (
          <p className='text-xs text-red-500 bg-red-50 p-2 rounded-lg border border-red-100 flex items-center gap-2 font-medium'>
            <XCircle className='w-3 h-3' />
            {error}
          </p>
        )}

        <div className='flex gap-3 mt-auto pt-4'>
          <Button
            variant='outline'
            className='flex-1 h-11 rounded-xl font-bold border-gray-200 text-gray-700 hover:bg-gray-50'
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            className='flex-1 h-11 rounded-xl font-bold bg-accent hover:bg-accent/95 text-white shadow-lg shadow-accent/20 transition-all active:scale-[0.98]'
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
