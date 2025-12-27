import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTeacherActions } from '@/hooks/API/use-teachers'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'
import type { Teacher } from '@/utils/types'

interface EditTeacherDialogProps {
  teacher: Teacher | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const EditTeacherDialog = ({ teacher, open, onOpenChange }: EditTeacherDialogProps) => {
  const { patchTeacher } = useTeacherActions()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<Partial<Teacher>>({})

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name,
        email: teacher.email,
        phoneNumber: teacher.phoneNumber,
        birthday: teacher.birthday,
        status: teacher.status,
      })
    }
  }, [teacher])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!teacher) return

    setIsLoading(true)
    try {
      await patchTeacher(teacher._id, formData)
      toast.success('Profesor actualizado correctamente')
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      onOpenChange(false)
    } catch (error) {
      toast.error('Error al actualizar el profesor')
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
          <DialogTitle>Editar Profesor</DialogTitle>
          <DialogDescription>
            Actualiza la información del profesor aquí.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Nombre Completo</label>
            <Input
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Correo Electrónico</label>
            <Input
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Teléfono</label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Estado</label>
              <Select
                value={formData.status || ''}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as "active" | "inactive" }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
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
                <Save className="mr-2 h-4 w-4" />
              )}
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
