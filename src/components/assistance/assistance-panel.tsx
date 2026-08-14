import { useState } from 'react'
import { CameraQr } from './camera-qr'
import { useLastAssitences } from '@/hooks/API/use-student-assistence'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { CheckCircle2, XCircle, Users, RefreshCw } from 'lucide-react'
import type { StudentAssistenceResponse } from '@/dtos/outputs/student-assistence-output'
import type { StudentResponse } from '@/dtos/outputs/student-output'

// ─── helpers ────────────────────────────────────────────────────────────────

const isStudentResponse = (s: unknown): s is StudentResponse =>
  typeof s === 'object' && s !== null && 'firstName' in s

const formatDate = (raw: Date | string) => {
  const d = new Date(raw)
  return d.toLocaleString('es-NI', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ─── sub-components ─────────────────────────────────────────────────────────

const ScannedStudentCard = ({ record }: { record: StudentAssistenceResponse }) => {
  const student = isStudentResponse(record.student) ? record.student : null
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
        <Badge variant='destructive' className='gap-1.5 shrink-0'>
          <XCircle className='size-3.5' />
          Ausente registrado
        </Badge>
      )}
    </div>
  )
}

const AssistenceRow = ({ record }: { record: StudentAssistenceResponse }) => {
  const student = isStudentResponse(record.student) ? record.student : null
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

const AssistenceRowSkeleton = () => (
  <div className='flex items-center gap-3 py-3 px-2'>
    <Skeleton className='size-9 rounded-full' />
    <div className='flex-1 space-y-1.5'>
      <Skeleton className='h-3.5 w-40 rounded' />
      <Skeleton className='h-3 w-24 rounded' />
    </div>
    <Skeleton className='h-5 w-20 rounded-full' />
  </div>
)

// ─── main component ──────────────────────────────────────────────────────────

export const AssistancePanel = () => {
  const { data: lastAssitences, isLoading, isFetching } = useLastAssitences()
  const [lastScanned, setLastScanned] = useState<StudentAssistenceResponse | null>(null)

  const handleSuccessQR = (record: StudentAssistenceResponse) => {
    setLastScanned(record)
  }

  return (
    <div className='mt-6'>
      {lastScanned && <ScannedStudentCard record={lastScanned} />}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

        {/* ── QR Scanner ── */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-base flex items-center gap-2'>
              <span className='size-2 rounded-full bg-green-500 animate-pulse' />
              Escáner QR
            </CardTitle>
          </CardHeader>
          <CardContent className='flex justify-center'>
            <CameraQr onSuccessQR={handleSuccessQR} />
          </CardContent>
        </Card>

        {/* ── Last assistances feed ── */}
        <Card>
          <CardHeader className='pb-3'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-base flex items-center gap-2'>
                <Users className='size-4 text-muted-foreground' />
                Últimas asistencias
              </CardTitle>
              {isFetching && (
                <RefreshCw className='size-3.5 text-muted-foreground animate-spin' />
              )}
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className='space-y-0.5'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <AssistenceRowSkeleton key={i} />
                ))}
              </div>
            ) : !lastAssitences?.length ? (
              <div className='py-10 text-center text-sm text-muted-foreground'>
                No hay registros de asistencia aún.
              </div>
            ) : (
              <div>
                {lastAssitences.map((record) => (
                  <AssistenceRow key={record._id} record={record} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
