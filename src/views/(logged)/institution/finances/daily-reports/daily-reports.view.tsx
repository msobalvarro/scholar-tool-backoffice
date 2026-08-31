import { useState } from 'react'
import { TitlePageView } from '@/components/ui/title-page'
import { ViewContainer } from '@/components/ui/view-container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CalendarDays, FileText, Plus } from 'lucide-react'
import { CreateDailyReportModal } from '@/components/daily-reports/create-daily-report-modal'
import { useDailyReportsByDate } from '@/hooks/API/use-daily-reports'

export const DailyReportsView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: dailyReports } = useDailyReportsByDate()

  return (
    <ViewContainer className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <TitlePageView
          title='Reportes Diarios'
          subtitle='Consulta y genera los reportes de matrículas y operaciones del día'
        />
        <Button
          onClick={() => setIsModalOpen(true)}
          className='rounded-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 gap-2'
        >
          <Plus className='size-4' />
          Nuevo Reporte
        </Button>
      </div>

      <Card className='border-dashed'>
        <CardHeader className='text-center items-center pb-2'>
          <div className='p-3 rounded-full bg-accent/10 text-accent mb-2'>
            <CalendarDays className='size-8' />
          </div>
          <CardTitle className='text-xl'>Módulo de Reportes Diarios</CardTitle>
          <CardDescription className='max-w-md'>
            Esta vista está lista para integrar métricas, registros diarios y exportaciones en PDF o Excel.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center p-8 text-center text-muted-foreground'>
          <div className='flex items-center gap-2 text-sm'>
            <FileText className='size-4' />
            <span>Sin datos para mostrar actualmente.</span>
          </div>
        </CardContent>
      </Card>

      <CreateDailyReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </ViewContainer>
  )
}
