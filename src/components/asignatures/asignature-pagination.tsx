import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AsignaturePaginationProps {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  onPageChange: (page: number) => void
}

export const AsignaturePagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange
}: AsignaturePaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalItems === 0) return null

  return (
    <div className='px-6 py-4 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between'>
      <p className='text-xs text-gray-500 font-medium font-mono'>
        Mostrando <span className='text-gray-900'>
          {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)}
        </span> de <span className='text-gray-900'>{totalItems}</span> resultados
      </p>
      <div className='flex gap-2'>
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 rounded-lg border-gray-200'
          onClick={(e) => { e.stopPropagation(); onPageChange(Math.max(1, currentPage - 1)) }}
          disabled={currentPage === 1}
        >
          <ChevronLeft className='w-4 h-4 text-gray-600' />
        </Button>
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 rounded-lg border-gray-200'
          onClick={(e) => { e.stopPropagation(); onPageChange(Math.min(totalPages, currentPage + 1)) }}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <ChevronRight className='w-4 h-4 text-gray-600' />
        </Button>
      </div>
    </div>
  )
}
