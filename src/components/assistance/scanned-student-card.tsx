import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { StudentAssistenceResponse } from '@/dtos/outputs/student-assistence-output'
import { formatDate } from '@/lib/utils'

export const ScannedStudentCard = ({ record: payload }: { record: StudentAssistenceResponse }) => {
  const { student, ...record } = payload
  const name = student ? `${student.firstName} ${student.lastName}` : 'Estudiante desconocido'
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join('')

  return (
    <div className='flex items-center gap-4 p-4 mb-6 rounded-xl border border-green-500/30 bg-green-500/5 animate-in fade-in slide-in-from-top-2 duration-300'>
      {/* Avatar */}
      <div className='size-12 rounded-full bg-green-500/15 flex items-center justify-center shrink-0 text-green-600 dark:text-green-400 font-bold text-lg'>
        {initials}
      </div>

      {/* Details */}
      <div className='flex-1 min-w-0'>
        <p className='font-semibold text-sm truncate'>{name}</p>
        {student?.email && (
          <p className='text-xs text-muted-foreground truncate'>{student.email}</p>
        )}
        <p className='text-xs text-muted-foreground'>{formatDate(record.date)}</p>
      </div>

      {/* Status badge */}
      {record.assistence ? (
        <Badge variant='default' className='gap-1.5 shrink-0 bg-green-600 hover:bg-green-600 text-white'>
          <CheckCircle2 className='size-3.5' />
          Asistencia registrada
        </Badge>
      ) : (
        <Badge className='gap-1.5 shrink-0  bg-green-500'>
          <XCircle className='size-3.5' />
          Ausente registrado
        </Badge>
      )}
    </div>
  )
}
