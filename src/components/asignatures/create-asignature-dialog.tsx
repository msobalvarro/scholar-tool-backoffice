import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAsignatureActions } from '@/hooks/API/use-asignatures'
import { toast } from 'sonner'

export const CreateAsignatureDialog = () => {
  const [open, setOpen] = useState(false)
  const { postAsignature, isLoading } = useAsignatureActions()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active' as 'active' | 'inactive'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await postAsignature(formData)
      toast.success('Asignatura creada exitosamente')
      setOpen(false)
      setFormData({ name: '', description: '', status: 'active' })
    } catch (error) {
      console.error(error)
      toast.error('Error al crear la asignatura')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-accent text-white font-bold px-6 py-6 rounded-xl shadow-lg transition-all active:scale-95'>
          <Plus className='mr-2 h-5 w-5 stroke-3' />
          Añadir Materia
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-106.25 rounded-2xl'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold text-gray-900'>Nueva Asignatura</DialogTitle>
            <DialogDescription className='text-gray-500'>
              Ingresa los detalles de la nueva materia que deseas agregar.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='space-y-2'>
              <label className='text-xs font-bold text-gray-500 uppercase tracking-wider px-1'>
                Nombre de la Asignatura
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder='Ej. Matemáticas Avanzadas'
                className='h-11 border-gray-100 bg-gray-50/50 rounded-xl focus-visible:ring-accent'
                required
              />
            </div>
            <div className='space-y-2'>
              <label className='text-xs font-bold text-gray-500 uppercase tracking-wider px-1'>
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
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
                type='button'
                onClick={() => setFormData(prev => ({ ...prev, status: prev.status === 'active' ? 'inactive' : 'active' }))}
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
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              className='h-11 rounded-xl font-bold border-gray-200 text-gray-700 hover:bg-gray-50'
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              className='h-11 rounded-xl font-bold bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20 transition-all active:scale-[0.98]'
              disabled={isLoading || !formData.name}
            >
              {isLoading ? 'Guardando...' : 'Guardar Materia'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
