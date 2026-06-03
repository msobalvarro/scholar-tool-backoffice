import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useSearchRepresentative } from '@/hooks/API/use-representativ'
import { RepresentativeCard } from './representative-card'

export const SearchRepresentative = () => {
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 400)

  const { data: results = [], isFetching } = useSearchRepresentative(debouncedQuery)

  return (
    <CardContent className='p-8'>
      <div className='space-y-4'>
        {/* Header */}
        <div>
          <h3 className='text-base font-semibold'>Buscar representante</h3>
          <p className='text-sm text-muted-foreground'>
            Busca por nombre, identificación o teléfono
          </p>
        </div>

        {/* Search input */}
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            className='pl-9'
            placeholder='Ej. Juan Pérez, 0912345678...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Results */}
        {debouncedQuery.trim().length > 0 && (
          <div className='space-y-2'>
            {isFetching && (
              <div className='flex items-center gap-2 py-6 justify-center text-sm text-muted-foreground'>
                <span className='animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full inline-block' />
                Buscando...
              </div>
            )}

            {(!isFetching && results.length === 0) && (
              <p className='text-center text-sm text-muted-foreground py-6'>
                No se encontraron representantes para &ldquo;{debouncedQuery}&rdquo;
              </p>
            )}

            {results.map((rep, index) => (
              <RepresentativeCard
                key={rep.identification ?? index}
                representative={rep}
              />
            ))}
          </div>
        )}
      </div>
    </CardContent>
  )
}