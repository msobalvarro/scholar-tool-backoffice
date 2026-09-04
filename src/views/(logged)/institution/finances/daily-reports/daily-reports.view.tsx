import { useState } from 'react'
import dayjs from 'dayjs'
import { TitlePageView } from '@/components/ui/title-page'
import { ViewContainer } from '@/components/ui/view-container'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { CreateDailyReportModal } from '@/components/daily-reports/create-daily-report-modal'
import { DailyReportDateRangePicker } from '@/components/daily-reports/daily-report-date-range-picker'
import { DailyReportsStats } from '@/components/daily-reports/daily-reports-stats'
import { DailyReportsTable } from '@/components/daily-reports/daily-reports-table'
import { useDailyReportsByDate } from '@/hooks/API/use-daily-reports'

export const DailyReportsView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fromDate, setFromDate] = useState<string>(() =>
    dayjs().startOf('month').format('YYYY-MM-DD')
  )
  const [toDate, setToDate] = useState<string>(() =>
    dayjs().format('YYYY-MM-DD')
  )

  const {
    data: dailyReports,
    isLoading,
    isFetching,
    refetch,
  } = useDailyReportsByDate(fromDate, toDate)

  const handleDateRangeChange = (from: string, to: string) => {
    setFromDate(from)
    setToDate(to)
  }

  return (
    <ViewContainer className='flex flex-col gap-6 pb-12'>
      {/* ── Header ── */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <TitlePageView
          title='Reportes Diarios'
          subtitle='Consulta, filtra por rango de fechas y registra los movimientos y operaciones'
        />
        <Button
          onClick={() => setIsModalOpen(true)}
          className='rounded-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none gap-2 h-10 px-4 self-start sm:self-auto cursor-pointer'
        >
          <Plus className='size-4' />
          Nuevo Reporte
        </Button>
      </div>

      {/* ── Date Range Selector ── */}
      <DailyReportDateRangePicker
        fromDate={fromDate}
        toDate={toDate}
        onDateRangeChange={handleDateRangeChange}
        onRefresh={() => refetch()}
        isFetching={isFetching}
      />

      {/* ── Summary Cards ── */}
      <DailyReportsStats reports={dailyReports} />

      {/* ── Reports Table / List ── */}
      <DailyReportsTable data={dailyReports} isLoading={isLoading} />

      {/* ── Modal for creating new daily report ── */}
      <CreateDailyReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </ViewContainer>
  )
}
