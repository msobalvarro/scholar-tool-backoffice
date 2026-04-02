import { useState } from 'react'
import { useTeachers } from '@/hooks/API/use-teachers'
import { TeacherStats } from '@/components/teachers/teacher-stats'
import { TeacherTable } from '@/components/teachers/teacher-table'
import { CreateTeacherDialog } from '@/components/teachers/create-teacher-dialog'
import { EditTeacherDialog } from '@/components/teachers/edit-teacher-dialog'
import { DeleteTeacherDialog } from '@/components/teachers/delete-teacher-dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Search,
  Filter
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ViewContainer } from '@/components/ui/view-container'
import type { Teacher } from '@/dtos/types'

export const TeachersView = () => {
  const { data: teachers = [], isLoading } = useTeachers()
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)

  const stats = {
    total: teachers.length,
    active: teachers.filter(t => t.status === 'active').length,
    onLeave: teachers.filter(t => t.status === 'inactive').length // Mimicking 'onLeave' with 'inactive'
  }

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setIsEditOpen(true)
  }

  const handleDelete = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setIsDeleteOpen(true)
  }

  return (
    <ViewContainer>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-3xl font-extrabold text-[#111827]'>Gestión de Profesores</h1>
          <p className='text-gray-500 mt-1 font-medium'>
            Administra el personal docente y sus permisos.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className='bg-accent text-white font-bold px-6 py-6 rounded-xl shadow-lg transition-all active:scale-95'
        >
          <Plus className='mr-2 h-5 w-5 stroke-3' />
          Añadir Profesor
        </Button>
      </div>

      <TeacherStats {...stats} />

      <div className='flex flex-col md:flex-row items-center gap-4 mb-6'>
        <div className='relative flex-1 w-full'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
          <Input
            placeholder='Buscar por nombre, email o ID...'
            className='pl-12 py-6 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className='flex items-center gap-3 w-full md:w-auto'>
          <Select>
            <SelectTrigger className='w-full md:w-45 py-6 bg-white border-gray-200 rounded-xl'>
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="math">Matemáticas</SelectItem>
              <SelectItem value="science">Ciencias</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className='w-full md:w-35 py-6 bg-white border-gray-200 rounded-xl'>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="inactive">Inactivos</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='outline' size='icon' className='p-6 border-gray-200 text-gray-400 hover:text-gray-600 rounded-xl'>
            <Filter className='h-5 w-5' />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <TeacherTable
          data={teachers}
          searchQuery={searchQuery}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CreateTeacherDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />

      <EditTeacherDialog
        teacher={selectedTeacher}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <DeleteTeacherDialog
        teacher={selectedTeacher}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </ViewContainer>
  )
}