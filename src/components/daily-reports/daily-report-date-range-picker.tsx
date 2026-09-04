import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { Calendar as CalendarIcon, RefreshCw, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DailyReportDateRangePickerProps {
  fromDate: string
  toDate: string
  onDateRangeChange: (from: string, to: string) => void
  onRefresh?: () => void
  isFetching?: boolean
}

export const DailyReportDateRangePicker = ({
  fromDate,
  toDate,
  onDateRangeChange,
  onRefresh,
  isFetching = false,
}: DailyReportDateRangePickerProps) => {
  const today = dayjs().format('YYYY-MM-DD')
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
  const startOfWeek = dayjs().startOf('week').format('YYYY-MM-DD')
  const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD')
  const thirtyDaysAgo = dayjs().subtract(30, 'day').format('YYYY-MM-DD')

  const isTodayActive = fromDate === today && toDate === today
  const isYesterdayActive = fromDate === yesterday && toDate === yesterday
  const isThisWeekActive = fromDate === startOfWeek && toDate === today
  const isThisMonthActive = fromDate === startOfMonth && toDate === today
  const isLast30DaysActive = fromDate === thirtyDaysAgo && toDate === today

  const handlePreset = (from: string, to: string) => {
    onDateRangeChange(from, to)
  }

  const formattedRangeText = () => {
    if (!fromDate && !toDate) return 'Todos los registros'
    if (fromDate === toDate) {
      return dayjs(fromDate).locale('es').format('dddd, D [de] MMMM [de] YYYY')
    }
    return `Del ${dayjs(fromDate).locale('es').format('D [de] MMM YYYY')} al ${dayjs(toDate).locale('es').format('D [de] MMM YYYY')}`
  }

  return (
    <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-4 rounded-2xl bg-card border shadow-xs'>
      {/* Range Description */}
      <div className='flex items-center gap-3'>
        <div className='size-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0'>
          <CalendarIcon className='size-5' />
        </div>
        <div>
          <span className='text-xs font-semibold text-muted-foreground uppercase tracking-wider block'>
            Rango de fechas seleccionado
          </span>
          <span className='text-base font-bold text-foreground capitalize'>
            {formattedRangeText()}
          </span>
        </div>
      </div>

      {/* Date Pickers & Presets */}
      <div className='flex flex-wrap items-center gap-2'>
        {/* Quick presets */}
        <div className='flex items-center flex-wrap gap-1 bg-muted/60 p-1 rounded-xl'>
          <Button
            variant={isTodayActive ? 'default' : 'ghost'}
            size='sm'
            className='h-8 text-xs font-medium rounded-lg'
            onClick={() => handlePreset(today, today)}
          >
            Hoy
          </Button>
          <Button
            variant={isYesterdayActive ? 'default' : 'ghost'}
            size='sm'
            className='h-8 text-xs font-medium rounded-lg'
            onClick={() => handlePreset(yesterday, yesterday)}
          >
            Ayer
          </Button>
          <Button
            variant={isThisWeekActive ? 'default' : 'ghost'}
            size='sm'
            className='h-8 text-xs font-medium rounded-lg'
            onClick={() => handlePreset(startOfWeek, today)}
          >
            Esta semana
          </Button>
          <Button
            variant={isThisMonthActive ? 'default' : 'ghost'}
            size='sm'
            className='h-8 text-xs font-medium rounded-lg'
            onClick={() => handlePreset(startOfMonth, today)}
          >
            Este mes
          </Button>
          <Button
            variant={isLast30DaysActive ? 'default' : 'ghost'}
            size='sm'
            className='h-8 text-xs font-medium rounded-lg'
            onClick={() => handlePreset(thirtyDaysAgo, today)}
          >
            Últimos 30 días
          </Button>
        </div>

        {/* Custom Date Inputs */}
        <div className='flex items-center gap-1.5 bg-card border rounded-xl p-1 shadow-2xs'>
          <div className='flex items-center px-2 py-0.5'>
            <span className='text-xs text-muted-foreground mr-1.5 font-medium'>Desde:</span>
            <input
              type='date'
              value={fromDate}
              onChange={(e) => {
                if (e.target.value) {
                  onDateRangeChange(e.target.value, toDate >= e.target.value ? toDate : e.target.value)
                }
              }}
              className='bg-transparent text-xs font-medium focus:outline-hidden cursor-pointer'
            />
          </div>

          <ArrowRight className='size-3 text-muted-foreground shrink-0' />

          <div className='flex items-center px-2 py-0.5'>
            <span className='text-xs text-muted-foreground mr-1.5 font-medium'>Hasta:</span>
            <input
              type='date'
              value={toDate}
              onChange={(e) => {
                if (e.target.value) {
                  onDateRangeChange(fromDate <= e.target.value ? fromDate : e.target.value, e.target.value)
                }
              }}
              className='bg-transparent text-xs font-medium focus:outline-hidden cursor-pointer'
            />
          </div>
        </div>

        {/* Refresh button */}
        {onRefresh && (
          <Button
            variant='outline'
            size='icon'
            className='size-9 rounded-xl shadow-2xs'
            onClick={onRefresh}
            disabled={isFetching}
            title='Actualizar registros'
          >
            <RefreshCw className={`size-4 ${isFetching ? 'animate-spin' : ''}`} />
          </Button>
        )}
      </div>
    </div>
  )
}
