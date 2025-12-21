import { useState, useMemo } from 'react'
import type { StudentResponse } from '@/utils/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Search,
  MoreHorizontal
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useNavigate } from 'react-router'
import { useStudentActions } from '@/hooks/API/use-students'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { EditStudentModal } from './edit-student-modal'

interface StudentTableProps {
  data: StudentResponse[]
  searchQuery?: string
}

type SortConfig = {
  key: keyof StudentResponse | 'responsable.fullName' | null
  direction: 'asc' | 'desc'
}

export const StudentTable = ({ data, searchQuery }: StudentTableProps) => {
  const navigate = useNavigate()
  const { deleteStudent } = useStudentActions()
  const queryClient = useQueryClient()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<StudentResponse | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar a este estudiante?')) {
      await deleteStudent(id)
      toast.success('Estudiante eliminado exitosamente')
      queryClient.invalidateQueries({ queryKey: ['students'] })
    }
  }

  const handleEdit = (student: StudentResponse) => {
    setSelectedStudent(student)
    setIsEditModalOpen(true)
  }

  const filteredData = useMemo(() => {
    if (!searchQuery) return data

    const lowerQuery = searchQuery.toLowerCase()
    return data.filter(student =>
      student._id.includes(lowerQuery) ||
      student.firstName.toLowerCase().includes(lowerQuery) ||
      student.lastName.toLowerCase().includes(lowerQuery) ||
      student.email?.toLowerCase().includes(lowerQuery) ||
      student.responsable?.fullName.toLowerCase().includes(lowerQuery)
    )
  }, [data, searchQuery])

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData

    return [...filteredData].sort((a, b) => {
      let aValue: string | number | Date | unknown
      let bValue: string | number | Date | unknown

      if (sortConfig.key === 'responsable.fullName') {
        aValue = a.responsable?.fullName || ''
        bValue = b.responsable?.fullName || ''
      } else {
        aValue = a[sortConfig.key as keyof StudentResponse]
        bValue = b[sortConfig.key as keyof StudentResponse]
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (aValue && bValue) {
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [filteredData, sortConfig])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedData, currentPage, itemsPerPage])

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)

  const handleSort = (key: keyof StudentResponse | 'responsable.fullName') => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  return (
    <div className='space-y-4 bg-background rounded flex flex-col gap-4'>
      <div className='border-t border-b'>
        <table className='w-full text-sm'>
          <thead className='border-b bg-muted/50'>
            <tr>
              <th onClick={() => handleSort('firstName')} className='cursor-pointer h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                <div className='flex items-center'>
                  Nombre
                  <ArrowUpDown className='ml-2 h-4 w-4' />
                </div>
              </th>
              <th onClick={() => handleSort('gender')} className='cursor-pointer h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                <div className='flex items-center'>
                  Género
                  <ArrowUpDown className='ml-2 h-4 w-4' />
                </div>
              </th>
              <th onClick={() => handleSort('responsable.fullName')} className='cursor-pointer h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                <div className='flex items-center'>
                  Responsable
                  <ArrowUpDown className='ml-2 h-4 w-4' />
                </div>
              </th>
              <th onClick={() => handleSort('status')} className='cursor-pointer h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                <div className='flex items-center'>
                  Estado
                  <ArrowUpDown className='ml-2 h-4 w-4' />
                </div>
              </th>
              <th className='h-12 px-4 text-right align-middle font-medium text-muted-foreground'>
                <div className='flex items-center'>
                  Acciones
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={6} className='p-4 text-center text-muted-foreground'>
                  No se encontraron estudiantes
                </td>
              </tr>
            ) : (
              paginatedData.map((student) => (
                <tr key={student._id} className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
                  <td className='p-4 align-middle font-medium'>
                    <div className='flex items-center gap-2'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src={student.photo} alt={student.firstName} />
                        <AvatarFallback>{student.firstName[0]}{student.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <span>{student.firstName} {student.lastName}</span>
                        <span className='text-xs text-muted-foreground'>{student.email || '-'}</span>
                      </div>
                    </div>
                  </td>
                  <td className='p-4 align-middle capitalize'>
                    {student.gender === 'male' ? 'Masculino' : 'Femenino'}
                  </td>
                  <td className='p-4 align-middle'>
                    {student.responsable?.fullName || '-'}
                  </td>
                  <td className='p-4 align-middle'>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${student.status === 'active'
                      ? 'bg-green-50 text-green-700 ring-green-600/20'
                      : 'bg-red-50 text-red-700 ring-red-600/20'
                      }`}>
                      {student.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className='p-4 align-middle text-left'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                          <span className='sr-only'>Open menu</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(student._id)}>
                          Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/students/${student._id}`)}>
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(student)}>
                          Editar estudiante
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='text-red-600'
                          onClick={() => handleDelete(student._id)}
                        >
                          Eliminar estudiante
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className='flex items-center justify-between space-x-2'>
        <div className='text-sm text-muted-foreground'>
          Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredData.length)} de {filteredData.length} entradas
        </div>

        <div className='flex  items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className='h-4 w-4' />
            Anterior
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Siguiente
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <EditStudentModal
        student={selectedStudent}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />
    </div>
  )
}
