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
import { useTeacherActions } from '@/hooks/API/use-teachers'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Loader2, Trash2, AlertTriangle } from 'lucide-react'
import type { Teacher } from '@/utils/types'

interface DeleteTeacherDialogProps {
  teacher: Teacher | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const DeleteTeacherDialog = ({ teacher, open, onOpenChange }: DeleteTeacherDialogProps) => {
  const { deleteTeacher } = useTeacherActions()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    if (!teacher) return

    setIsLoading(true)
    try {
      await deleteTeacher(teacher._id)
      toast.success('Profesor eliminado exitosamente')
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      onOpenChange(false)
    } catch (error) {
      toast.error('Error al eliminar el profesor')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-center text-xl font-bold">¿Eliminar Profesor?</DialogTitle>
          <DialogDescription className="text-center">
            Esta acción no se puede deshacer. Se eliminará permanentemente al profesor
            <span className="font-semibold text-gray-900"> {teacher?.name} </span>
            del sistema.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-col gap-2 pt-4">
          <Button
            variant="destructive"
            className="w-full bg-red-600 hover:bg-red-700 font-semibold py-6"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            Sí, Eliminar Definitivamente
          </Button>
          <Button
            variant="ghost"
            className="w-full text-gray-500 hover:text-gray-700"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar y Mantener
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
