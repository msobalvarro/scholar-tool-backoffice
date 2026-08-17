import { useState } from 'react'
import { CameraQr } from './camera-qr'
import { useLastAssitences } from '@/hooks/API/use-student-assistence'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, RefreshCw } from 'lucide-react'
import type { StudentAssistenceResponse } from '@/dtos/outputs/student-assistence-output'
import { ScannedStudentCard } from './scanned-student-card'
import { AssistenceRowSkeleton } from './assistence-row-skeleton'
import { AssistenceRow } from './assistence-row'

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
