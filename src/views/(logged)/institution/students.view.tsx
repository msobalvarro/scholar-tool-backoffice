import { StudentTable } from '@/components/students/student-table'
import { useStudents } from '@/hooks/API/use-students'
import { Loader2 } from 'lucide-react'

export const StudentsView = () => {
  const { data: students, isLoading, error } = useStudents()

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">
        Error al cargar estudiantes
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Estudiantes</h1>
      {students && <StudentTable data={students} />}
    </div>
  )
}