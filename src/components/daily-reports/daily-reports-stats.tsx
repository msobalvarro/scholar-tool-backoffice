import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Scale, Receipt } from 'lucide-react'
import { FormatCurrency, FormatCurrencyDollar } from '@/adapters/format-currency'
import { TypeMovementType } from '@/dtos/inputs/daily-reports'
import type { IDailyReportStudentResponse } from '@/dtos/outputs/daily-reports-output'

interface DailyReportsStatsProps {
  reports?: IDailyReportStudentResponse[]
}

export const DailyReportsStats = ({ reports = [] }: DailyReportsStatsProps) => {
  const stats = useMemo(() => {
    let totalIncomeNIO = 0
    let totalIncomeUSD = 0
    let totalExpenseNIO = 0
    let totalExpenseUSD = 0
    let activeMovementsCount = 0

    reports.forEach((item) => {
      if (item.type_movement === TypeMovementType.INCOME) {
        totalIncomeNIO += Number(item.income_recorded_amount) || 0
        totalIncomeUSD += Number(item.income_recorded_amount_usd) || 0
        activeMovementsCount++
      } else if (item.type_movement === TypeMovementType.EXPENSE) {
        totalExpenseNIO += Number(item.expense_amount) || 0
        totalExpenseUSD += Number(item.expense_amount_usd) || 0
        activeMovementsCount++
      }
    })

    const netBalanceNIO = totalIncomeNIO - totalExpenseNIO
    const netBalanceUSD = totalIncomeUSD - totalExpenseUSD

    return {
      totalIncomeNIO,
      totalIncomeUSD,
      totalExpenseNIO,
      totalExpenseUSD,
      netBalanceNIO,
      netBalanceUSD,
      count: reports.length,
      activeMovementsCount,
    }
  }, [reports])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {/* Total Ingresos */}
      <Card className='shadow-xs border-border/70'>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
            Total Ingresos
          </CardTitle>
          <div className='size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400'>
            <TrendingUp className='size-4' />
          </div>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-emerald-600 dark:text-emerald-400'>
            {FormatCurrency(stats.totalIncomeNIO)}
          </div>
          <p className='text-xs font-medium text-emerald-700/80 dark:text-emerald-300/80 mt-1'>
            {FormatCurrencyDollar(stats.totalIncomeUSD)} USD
          </p>
        </CardContent>
      </Card>

      {/* Total Egresos */}
      <Card className='shadow-xs border-border/70'>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
            Total Egresos
          </CardTitle>
          <div className='size-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400'>
            <TrendingDown className='size-4' />
          </div>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-rose-600 dark:text-rose-400'>
            {FormatCurrency(stats.totalExpenseNIO)}
          </div>
          <p className='text-xs font-medium text-rose-700/80 dark:text-rose-300/80 mt-1'>
            {FormatCurrencyDollar(stats.totalExpenseUSD)} USD
          </p>
        </CardContent>
      </Card>

      {/* Balance Neto */}
      <Card className='shadow-xs border-border/70'>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
            Balance Neto
          </CardTitle>
          <div className={`size-8 rounded-lg flex items-center justify-center ${
            stats.netBalanceNIO >= 0
              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
          }`}>
            <Scale className='size-4' />
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${
            stats.netBalanceNIO >= 0
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-amber-600 dark:text-amber-400'
          }`}>
            {stats.netBalanceNIO >= 0 ? '+' : ''}
            {FormatCurrency(stats.netBalanceNIO)}
          </div>
          <p className='text-xs font-medium text-muted-foreground mt-1'>
            {stats.netBalanceUSD >= 0 ? '+' : ''}
            {FormatCurrencyDollar(stats.netBalanceUSD)} USD
          </p>
        </CardContent>
      </Card>

      {/* Total Movimientos */}
      <Card className='shadow-xs border-border/70'>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
            Movimientos
          </CardTitle>
          <div className='size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary'>
            <Receipt className='size-4' />
          </div>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.count}</div>
          <p className='text-xs text-muted-foreground mt-1'>
            {stats.activeMovementsCount} activos en el rango
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
