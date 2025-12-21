import { StudentTable } from '@/components/students/student-table'
import { Input } from '@/components/ui/input'
import { useStudents } from '@/hooks/API/use-students'
import { Loader2, Search } from 'lucide-react'
import { useState } from 'react'

export const StudentsView = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { data: students, isLoading, error } = useStudents()

  if (isLoading) {
    return (
      <div className='flex h-[50vh] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-[50vh] items-center justify-center text-destructive'>
        Error al cargar estudiantes
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 space-y-6 bg-background p-4 rounded-md shadow'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold tracking-tight'>Estudiantes</h1>
          <p className='text-muted-foreground'>
            Administra y gestiona los estudiantes
          </p>
        </div>

        <div className='flex items-center justify-end p-4'>
          <div className='relative w-72'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Buscar estudiantes...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-8 bg-white'
            />
          </div>
        </div>
      </div>

      {students && <StudentTable data={students} searchQuery={searchQuery} />}
    </div>
  )
}