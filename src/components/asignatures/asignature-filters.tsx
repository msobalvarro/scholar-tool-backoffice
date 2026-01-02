import { Search, Filter, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AsignatureFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onSortClick?: () => void
}

export const AsignatureFilters = ({
  searchQuery,
  onSearchChange,
  onSortClick
}: AsignatureFiltersProps) => {
  return (
    <div className='bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
        <Input
          placeholder='Buscar por nombre o código...'
          className='pl-10 h-10 border-gray-100 bg-gray-50/50 rounded-xl focus-visible:ring-accent'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant='ghost' className='text-gray-600 gap-2 h-10 rounded-xl px-4 font-medium'>
        <Filter className='w-4 h-4' />
        Filtrar
      </Button>
      <Button
        variant='ghost'
        className='text-gray-600 gap-2 h-10 rounded-xl px-4 font-medium'
        onClick={onSortClick}
      >
        <ArrowUpDown className='w-4 h-4' />
        Ordenar
      </Button>
    </div>
  )
}
