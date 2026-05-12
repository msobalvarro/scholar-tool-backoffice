import { Users } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { SearchRepresentative } from './search-representative'
import { CreateRepresentative } from './create-representative'

export const CreateSelectRepresentative = () => {
  const [tab, setTab] = useState<'search' | 'create'>('create')


  return (
    <Card className='overflow-hidden border-none shadow-md '>
      <CardHeader className='border-b bg-white/50 dark:bg-slate-900/50 px-8 py-6'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-6'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-accent/10 rounded-lg'>
              <Users className='size-6 text-accent' />
            </div>
            <div>
              <CardTitle className='text-xl font-bold'>Datos del Tutor</CardTitle>
              <CardDescription>Información del representante o encargado</CardDescription>
            </div>
          </div>

          <div className='flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl'>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`rounded-lg text-xs font-bold ${tab === 'create' ? 'bg-white dark:bg-slate-700' : 'text-slate-500 dark:text-slate-400'}`}
              onClick={() => setTab('create')}
            >
              Crear Nuevo
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`rounded-lg text-xs font-bold ${tab === 'search' ? 'bg-white dark:bg-slate-700' : 'text-slate-500 dark:text-slate-400'}`}
              onClick={() => setTab('search')}
            >
              Buscar Existente
            </Button>
          </div>
        </div>
      </CardHeader>

      {tab === 'create' && <CreateRepresentative />}
      {tab === 'search' && <SearchRepresentative />}
    </Card>
  )
}