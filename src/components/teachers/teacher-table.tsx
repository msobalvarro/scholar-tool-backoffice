import { useState, useMemo } from 'react'
import type { Teacher } from '@/dtos/types'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Edit,
  Trash2
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface TeacherTableProps {
  data: Teacher[]
  searchQuery?: string
  onEdit: (teacher: Teacher) => void
  onDelete: (teacher: Teacher) => void
}

export const TeacherTable = ({ data, searchQuery, onEdit, onDelete }: TeacherTableProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const filteredData = useMemo(() => {
    if (!searchQuery) return data

    const lowerQuery = searchQuery.toLowerCase()
    return data.filter(teacher =>
      teacher._id.toLowerCase().includes(lowerQuery) ||
      teacher.name.toLowerCase().includes(lowerQuery) ||
      teacher.email.toLowerCase().includes(lowerQuery)
    )
  }, [data, searchQuery])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left'>
          <thead className='bg-gray-50/50 border-b border-gray-100'>
            <tr>
              <th className='px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider'>
                Profesor
              </th>
              <th className='px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider'>
                Correo Electrónico
              </th>
              <th className='px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider'>
                Teléfono
              </th>
              <th className='px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider'>
                Estado
              </th>
              <th className='px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider'>
                Asignaturas
              </th>
              <th className='px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-right'>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={6} className='px-6 py-10 text-center text-gray-400'>
                  No se encontraron profesores
                </td>
              </tr>
            ) : (
              paginatedData.map((teacher) => (
                <tr key={teacher._id} className='hover:bg-gray-50/50 transition-colors'>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-10 w-10 border border-gray-200'>
                        <AvatarImage src={teacher.photo} />
                        <AvatarFallback className='bg-blue-50 text-blue-600 font-medium'>
                          {teacher.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <span className='font-bold text-gray-900'>{teacher.name}</span>
                        <span className='text-xs text-gray-500'>{teacher.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2'>
                      {teacher.email}
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2'>
                      {teacher.phoneNumber}
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <Badge
                      variant="secondary"
                      className={
                        teacher.status === 'active'
                          ? 'bg-green-50 text-green-600 border-green-100'
                          : 'bg-gray-50 text-gray-500 border-gray-100'
                      }
                    >
                      <div className={`h-1.5 w-1.5 rounded-full mr-1.5 ${teacher.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                      {teacher.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2'>
                      {teacher.asignatures?.map((asignature) => asignature.name).join(', ')}
                    </div>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon' className='h-8 w-8 text-gray-400 hover:text-gray-600'>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end' className="w-48">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEdit(teacher)} className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Editar Profesor
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(teacher)}
                          className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar Profesor
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              )
              )
            )}
          </tbody>
        </table>
      </div>

      <div className='px-6 py-4 border-t border-gray-100 flex items-center justify-between'>
        <span className='text-sm text-gray-500'>
          Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} de {filteredData.length}
        </span>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className='border-gray-200 text-gray-600'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className='border-gray-200 text-gray-600'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
