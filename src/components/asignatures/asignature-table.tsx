import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { AsignatureResponse } from '@/dtos/types'

interface AsignatureTableProps {
  data: AsignatureResponse[]
  isLoading: boolean
  selectedId?: string
  onEdit: (asignature: AsignatureResponse) => void
}

export const AsignatureTable = ({
  data,
  isLoading,
  selectedId,
  onEdit
}: AsignatureTableProps) => {
  return (
    <div className='w-full'>
      <table className='w-full text-left border-collapse'>
        <thead>
          <tr className='border-b border-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-wider'>
            <th className='px-6 py-4'>Código</th>
            <th className='px-6 py-4'>Nombre</th>
            <th className='px-6 py-4 text-right'>Acciones</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-50'>
          {isLoading ? (
            <tr>
              <td colSpan={3} className='px-6 py-12 text-center text-gray-400'>Cargando asignaturas...</td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={3} className='px-6 py-12 text-center text-gray-400'>No se encontraron asignaturas</td>
            </tr>
          ) : (
            data.map((a) => (
              <tr
                key={a._id}
                className={`group transition-all cursor-pointer ${selectedId === a._id ? 'bg-accent/10' : 'hover:bg-gray-50/50'}`}
                onClick={() => onEdit(a)}
              >
                <td className='px-6 py-5'>
                  <div className='flex flex-col'>
                    <span className='font-bold text-gray-900 group-hover:text-accent transition-colors uppercase text-sm'>
                      {a.name}
                    </span>
                    <div className='flex items-center gap-1 mt-1'>
                      {a.status === 'active' ? (
                        <Badge variant='secondary' className='bg-green-50 text-green-600 border-green-100 text-[10px] h-4 px-1'>Activo</Badge>
                      ) : (
                        <Badge variant='secondary' className='bg-gray-50 text-gray-500 border-gray-100 text-[10px] h-4 px-1'>Inactivo</Badge>
                      )}
                    </div>
                  </div>
                </td>
                <td className='px-6 py-5'>
                  <p className='text-gray-500 text-sm line-clamp-1 max-w-xs'>{a.description}</p>
                </td>
                <td className='px-6 py-5 text-right'>
                  <Button variant='ghost' size='icon' className='h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <MoreHorizontal className='w-4 h-4' />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
