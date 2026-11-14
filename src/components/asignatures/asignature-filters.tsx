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
    <div className='bg-card text-card-foreground p-4 rounded-2xl border border-border shadow-xs flex items-center gap-4'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
        <Input
          placeholder='Buscar por nombre o código...'
          className='pl-10 h-10 border-border bg-muted/40 rounded-xl focus-visible:ring-primary'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant='ghost' className='text-muted-foreground hover:text-foreground gap-2 h-10 rounded-xl px-4 font-medium'>
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
