import { useState } from 'react'
import {
  UserPlus,
  Search,
  Check,
  LoaderCircle
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useStudents, useStudentActions } from '@/hooks/API/use-students'
import { useCourseStore } from '@/store/course.store'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

interface AssignStudentDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const AssignStudentDialog = ({ isOpen, onOpenChange }: AssignStudentDialogProps) => {
  const { course } = useCourseStore()
  const { data: students, isLoading: isLoadingStudents } = useStudents()
  const { assignStudentToCourse } = useStudentActions()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const queryClient = useQueryClient()

  const filteredStudents = students && Array.isArray(students)
    ? students.filter(student =>
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : []

  const handleAssign = async () => {
    if (!selectedStudentId || !course) return

    setIsSubmitting(true)
    try {
      await assignStudentToCourse({
        studentId: selectedStudentId,
        courseId: course._id
      })
      toast.success('Estudiante asignado correctamente')
      queryClient.invalidateQueries({ queryKey: ['studentsByGroupId', course._id] })
      onOpenChange(false)
      setSelectedStudentId(null)
      setSearchTerm('')
    } catch (error) {
      toast.error('Error al asignar el estudiante')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md rounded-3xl p-8 border-none shadow-2xl bg-white'>
        <DialogHeader className='mb-6'>
          <div className='w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4'>
            <UserPlus className='w-6 h-6' />
          </div>
          <DialogTitle className='text-2xl font-bold text-gray-900'>Asignar Estudiante</DialogTitle>
          <DialogDescription className='text-gray-400 mt-1'>
            Busca y selecciona un estudiante para asignarlo al curso {course?.name}.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Buscar por nombre o correo...'
              className='pl-10 rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11'
            />
          </div>

          <div className='max-h-75 overflow-y-auto space-y-2 pr-2 custom-scrollbar'>
            {isLoadingStudents ? (
              <div className='flex justify-center py-8'>
                <LoaderCircle className='w-6 h-6 text-blue-500 animate-spin' />
              </div>
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div
                  key={student._id}
                  onClick={() => setSelectedStudentId(student._id)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${selectedStudentId === student._id
                    ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
                    : 'bg-white border-2 border-transparent hover:bg-gray-50'
                    }`}
                >
                  <div className='flex items-center gap-3'>
                    <Avatar className='w-10 h-10 border-2 border-white shadow-sm'>
                      <AvatarImage src={student.photo} />
                      <AvatarFallback className='bg-blue-100 text-accent text-xs font-bold'>
                        {student.firstName[0]}{student.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                      <span className='font-bold text-gray-900 leading-tight'>
                        {student.firstName} {student.lastName}
                      </span>
                      <span className='text-xs text-gray-400 truncate max-w-37.5'>{student.email}</span>
                    </div>
                  </div>
                  {selectedStudentId === student._id && (
                    <div className='bg-blue-500 text-white rounded-full p-1'>
                      <Check className='w-4 h-4' />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className='text-center py-8 text-gray-400 text-sm'>
                {searchTerm ? 'No se encontraron estudiantes.' : 'Cargando estudiantes...'}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className='gap-3 pt-6'>
          <Button
            type='button'
            variant='ghost'
            onClick={() => onOpenChange(false)}
            className='rounded-xl h-11 flex-1 font-bold text-gray-500 hover:bg-gray-100'
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedStudentId || isSubmitting}
            className='rounded-xl h-11 flex-1 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
          >
            {isSubmitting ? 'Asignando...' : 'Asignar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
