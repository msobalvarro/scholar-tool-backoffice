import { Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCourseStore } from '@/store/course.store'
import { useCourseActions } from '@/hooks/API/use-course'
import { toast } from 'sonner'

interface DeleteCourseDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const DeleteCourseDialog = ({ isOpen, onOpenChange }: DeleteCourseDialogProps) => {
  const { course, setCourse } = useCourseStore()
  const { deleteCourse, isLoading: isActionLoading } = useCourseActions()

  const handleDelete = async () => {
    if (!course) return
    try {
      await deleteCourse(course._id)
      toast.success('Curso eliminado correctamente')
      setCourse(null)
      onOpenChange(false)
    } catch (error) {
      toast.error(String(error))
    }
  }

  if (!course) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-100 rounded-3xl p-8 border border-border shadow-2xl bg-card text-card-foreground'>
        <DialogHeader className='flex flex-col items-center text-center'>
          <div className='w-16 h-16 bg-destructive/10 text-destructive rounded-2xl flex items-center justify-center mb-6'>
            <Trash2 className='w-8 h-8' />
          </div>
          <DialogTitle className='text-2xl font-bold text-foreground'>¿Eliminar curso?</DialogTitle>
          <DialogDescription className='text-muted-foreground mt-2'>
            Esta acción no se puede deshacer. Se eliminarán permanentemente los datos del curso <span className='font-bold text-foreground'>{course.name}</span>.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='gap-3 pt-6 flex-col sm:flex-row'>
          <Button
            variant='ghost'
            onClick={() => onOpenChange(false)}
            className='rounded-xl h-12 flex-1 font-bold text-muted-foreground hover:bg-muted'
          >
            Cancelar
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isActionLoading}
            className='rounded-xl h-12 flex-1 font-bold'
          >
            {isActionLoading ? 'Eliminando...' : 'Sí, eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
