import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTeacherActions } from '@/hooks/API/use-teachers'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Loader2, Plus } from 'lucide-react'
import type { Teacher } from '@/utils/types'

interface CreateTeacherDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateTeacherDialog = ({ open, onOpenChange }: CreateTeacherDialogProps) => {
  const { postTeacher } = useTeacherActions()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<Omit<Teacher, '_id' | 'institution'>>({
    name: '',
    email: '',
    phoneNumber: '',
    birthday: '',
    status: 'active'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await postTeacher(formData)
      toast.success('Profesor creado exitosamente')
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        birthday: '',
        status: 'active'
      })
      onOpenChange(false)
    } catch (error) {
      toast.error('Error al crear el profesor')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Profesor</DialogTitle>
          <DialogDescription>
            Ingresa los datos del nuevo profesor para registrarlo en el sistema.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Nombre Completo</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Nombre y Apellido"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Correo Electrónico</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="correo@escuela.edu"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Teléfono</label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="+1 234 567 890"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Fecha de Nacimiento</label>
              <Input
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Registrar Profesor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
