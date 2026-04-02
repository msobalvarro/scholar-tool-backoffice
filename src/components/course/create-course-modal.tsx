import { useState } from 'react'
import {
  PlusCircle,
  GraduationCap,
  Users,
  Calendar,
  Briefcase,
  Clock,
  Loader2
} from 'lucide-react'
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
  SelectValue,
} from '@/components/ui/select'
import { useCourseActions } from '@/hooks/API/use-course'
import { useTeachers } from '@/hooks/API/use-teachers'
import { toast } from 'sonner'
import type { CreateCourseState } from '@/dtos/types'

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
        name: formData.name,
        groupName: formData.groupName,
        teacherLeadId: formData.teacherLeadId,
        order: formData.order,
        breakTime: `${formData.startBreakTime}-${formData.endBreakTime}`,
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
      <DialogContent className='sm:max-w-125 rounded-3xl p-8 border-none shadow-2xl bg-white'>
        <DialogHeader className='mb-6'>
          <div className='w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4'>
            <PlusCircle className='w-6 h-6' />
          </div>
          <DialogTitle className='text-2xl font-bold text-gray-900'>Crear Nuevo Curso</DialogTitle>
          <DialogDescription className='text-gray-400 mt-1'>
            Ingresa los detalles para registrar un nuevo curso en el sistema.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2 col-span-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <GraduationCap className='w-4 h-4 text-blue-500' />
                Nombre del Curso
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder='Ej: Matemáticas'
                className='rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11'
                required
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <Users className='w-4 h-4 text-blue-500' />
                Grupo
              </label>
              <Input
                value={formData.groupName}
                onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                placeholder='Ej: A, B, C'
                className='rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11'
                required
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-blue-500' />
                Orden
              </label>
              <Input
                type='number'
                min={1}
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className='rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11'
                required
              />
            </div>

            <div className='space-y-2 col-span-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <Briefcase className='w-4 h-4 text-blue-500' />
                Profesor Responsable
              </label>
              <Select
                value={formData.teacherLeadId}
                onValueChange={(value) => setFormData({ ...formData, teacherLeadId: value })}
              >
                <SelectTrigger className='w-full rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11'>
                  <SelectValue placeholder={isLoadingTeachers ? 'Cargando...' : 'Selecciona un profesor'} />
                </SelectTrigger>
                <SelectContent className='rounded-xl border-none shadow-xl'>
                  {teachers?.map((teacher) => (
                    <SelectItem key={teacher._id} value={teacher._id} className='rounded-lg'>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <Clock className='w-4 h-4 text-blue-500' />
                Inicio Receso
              </label>
              <Input
                type='time'
                value={formData.startBreakTime}
                onChange={(e) => setFormData({ ...formData, startBreakTime: e.target.value })}
                className='rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                <Clock className='w-4 h-4 text-blue-500' />
                Fin Receso
              </label>
              <Input
                type='time'
                value={formData.endBreakTime}
                onChange={(e) => setFormData({ ...formData, endBreakTime: e.target.value })}
                className='rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11'
              />
            </div>
          </div>

          <DialogFooter className='gap-3 pt-4'>
            <Button
              type='button'
              variant='ghost'
              onClick={onClose}
              className='rounded-xl h-11 flex-1 font-bold text-gray-500 hover:bg-gray-100'
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              disabled={isCreating}
              className='rounded-xl h-11 flex-1 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
            >
              {isCreating ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creando...
                </>
              ) : (
                'Crear Curso'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
