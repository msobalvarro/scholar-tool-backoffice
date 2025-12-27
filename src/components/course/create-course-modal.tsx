import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCourseActions } from '@/hooks/API/use-course'
import { useTeachers } from '@/hooks/API/use-teachers'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import type { CreateCourseState } from '@/utils/types'

interface CreateCourseModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CreateCourseModal = ({ isOpen, onClose }: CreateCourseModalProps) => {
  const { data: teachers, isLoading: isLoadingTeachers } = useTeachers()
  const { addCourse, isLoading: isCreating } = useCourseActions()

  const [formData, setFormData] = useState<CreateCourseState>({
    name: '',
    groupName: '',
    teacherLeadId: '',
    order: 1,
    startBreakTime: '10:00',
    endBreakTime: '11:00',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.groupName || !formData.teacherLeadId) {
      toast.error('Por favor completa los campos obligatorios')
      return
    }

    try {
      await addCourse({
        ...formData,
        breakTime: formData.startBreakTime + '-' + formData.endBreakTime,
      })

      toast.success('Curso creado exitosamente')
      onClose()
      setFormData({
        name: '',
        groupName: '',
        teacherLeadId: '',
        order: 1,
        startBreakTime: '10:00',
        endBreakTime: '11:00',
      })
    } catch {
      toast.error('Error al crear el curso')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-125 rounded-2xl'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>Crear Nuevo Curso</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6 py-4'>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-gray-700'>Nombre del Curso</label>
            <Input
              placeholder='Ej. Primer Grado'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className='rounded-xl h-11'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-gray-700'>Grupo</label>
              <Input
                placeholder='Ej. Grupo A'
                value={formData.groupName}
                onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                className='rounded-xl h-11'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-gray-700'>Orden</label>
              <Input
                type='number'
                min={1}
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className='rounded-xl h-11'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-semibold text-gray-700'>Profesor Guía</label>
            <Select
              value={formData.teacherLeadId}
              onValueChange={(value) => setFormData({ ...formData, teacherLeadId: value })}
            >
              <SelectTrigger className='rounded-xl h-11'>
                <SelectValue placeholder={isLoadingTeachers ? 'Cargando...' : 'Selecciona un profesor'} />
              </SelectTrigger>
              <SelectContent>
                {teachers?.map((teacher) => (
                  <SelectItem key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex gap-2'>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-gray-700'>Hora de Inicio de Receso</label>
              <Input
                type='time'
                value={formData.startBreakTime}
                onChange={(e) => setFormData({ ...formData, startBreakTime: e.target.value })}
                className='rounded-xl h-11'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-gray-700'>Hora de Fin de Receso</label>
              <Input
                type='time'
                value={formData.endBreakTime}
                onChange={(e) => setFormData({ ...formData, endBreakTime: e.target.value })}
                className='rounded-xl h-11'
              />
            </div>
          </div>

          <DialogFooter className='pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              className='rounded-xl h-11 px-6 font-bold'
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              disabled={isCreating}
              className='rounded-xl h-11 px-8 font-bold shadow-lg shadow-blue-200'
            >
              {isCreating && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Crear Curso
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
