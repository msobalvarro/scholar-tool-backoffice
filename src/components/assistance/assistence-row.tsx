import type { StudentAssistenceResponse } from '@/dtos/outputs/student-assistence-output'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Badge } from '../ui/badge'
import { formatDate } from '@/lib/utils'

export const AssistenceRow = ({ record }: { record: StudentAssistenceResponse }) => {
  const student = record.student
  const name = student
    ? `${student.firstName} ${student.lastName}`
    : 'Estudiante desconocido'

  return (
    <div className='flex items-center gap-3 py-3 border-b border-border/50 last:border-0 transition-colors hover:bg-muted/40 rounded-md px-2'>
      {/* Avatar */}
      <div className='size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-semibold text-sm'>
        {name.charAt(0).toUpperCase()}
      </div>

      {/* Info */}
      <div className='flex-1 min-w-0'>
        <p className='text-sm font-medium truncate'>{name}</p>
        <p className='text-xs text-muted-foreground'>{formatDate(record.date)}</p>
      </div>

      {/* Status */}
      {record.assistence ? (
        <Badge variant='default' className='gap-1 shrink-0'>
          <CheckCircle2 className='size-3' />
          Presente
        </Badge>
      ) : (
        <Badge variant='destructive' className='gap-1 shrink-0'>
          <XCircle className='size-3' />
          Ausente
        </Badge>
      )}
    </div>
  )
}