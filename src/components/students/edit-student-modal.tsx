import { useState, useEffect } from 'react'
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
import type { StudentResponse, UpdateStudentRequest } from '@/utils/types'
import { useStudentActions } from '@/hooks/API/use-students'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface EditStudentModalProps {
  student: StudentResponse | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const EditStudentModal = ({ student, open, onOpenChange }: EditStudentModalProps) => {
  const { updateStudent, error } = useStudentActions()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<Partial<UpdateStudentRequest>>({})

  useEffect(() => {
    if (student) {
      setFormData({
        _id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email || '',
        birthday: student.birthday,
        gender: student.gender,
        status: student.status,
        responsableId: (student.responsable as { _id?: string })?._id || '',
      })
    }
  }, [student])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!student) return

    setIsLoading(true)
    try {
      await updateStudent({
        ...formData,
        birthday: new Date(formData?.birthday || '')
      } as UpdateStudentRequest)
      toast.success('Estudiante actualizado correctamente')
      queryClient.invalidateQueries({ queryKey: ['students'] })
      onOpenChange(false)
    } catch (error) {
      toast.error('Error al actualizar el estudiante')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Editar Estudiante</DialogTitle>
          <DialogDescription>
            Realiza cambios en la información del estudiante aquí. Haz clic en guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Nombre</label>
              <Input
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                required
                placeholder="Nombre"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Apellido</label>
              <Input
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                required
                placeholder="Apellido"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Correo Electrónico</label>
            <Input
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Fecha de Nacimiento</label>
              <Input
                name="birthday"
                type="date"
                value={formData.birthday ? new Date(formData.birthday).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Género</label>
              <select
                name="gender"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.gender || ''}
                onChange={handleChange}
                required
              >
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Estado</label>
            <select
              name="status"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.status || ''}
              onChange={handleChange}
              required
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>

          {error && <p className='text-red-400 text-sm text-center'>{error}</p>}

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
