import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { AsignatureResponse } from '@/dtos/outputs/asignature-output'

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
          <tr className='border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider'>
            <th className='px-6 py-4'>Código</th>
            <th className='px-6 py-4'>Nombre</th>
            <th className='px-6 py-4 text-right'>Acciones</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-border'>
          {isLoading ? (
            <tr>
              <td colSpan={3} className='px-6 py-12 text-center text-muted-foreground'>Cargando asignaturas...</td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={3} className='px-6 py-12 text-center text-muted-foreground'>No se encontraron asignaturas</td>
            </tr>
          ) : (
            data.map((a) => (
              <tr
                key={a._id}
                className={`group transition-all cursor-pointer ${selectedId === a._id ? 'bg-primary/10' : 'hover:bg-muted/50'}`}
                onClick={() => onEdit(a)}
              >
                <td className='px-6 py-5'>
                  <div className='flex flex-col'>
                    <span className='font-bold text-foreground group-hover:text-primary transition-colors uppercase text-sm'>
                      {a.name}
                    </span>
                    <div className='flex items-center gap-1 mt-1'>
                      {a.status === 'active' ? (
                        <Badge variant='success' className='text-[10px] h-4 px-1.5'>Activo</Badge>
                      ) : (
                        <Badge variant='outline' className='text-muted-foreground text-[10px] h-4 px-1.5'>Inactivo</Badge>
                      )}
                    </div>
                  </div>
                </td>
                <td className='px-6 py-5'>
                  <p className='text-muted-foreground text-sm line-clamp-1 max-w-xs'>{a.description}</p>
                </td>
                <td className='px-6 py-5 text-right'>
                  <Button variant='ghost' size='icon' className='h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity'>
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
