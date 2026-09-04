import { useState, useMemo } from 'react'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Ban,
  Receipt,
  Clock,
  Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DailyReportRowSkeleton } from './daily-report-row-skeleton'
import { ConceptType, TypeMovementType } from '@/dtos/inputs/daily-reports'
import type { IDailyReportStudentResponse } from '@/dtos/outputs/daily-reports-output'
import { FormatCurrency, FormatCurrencyDollar } from '@/adapters/format-currency'
import { formatDate } from '@/lib/utils'

interface DailyReportsTableProps {
  data?: IDailyReportStudentResponse[]
  isLoading?: boolean
}

type SortField = 'date' | 'receipt_number' | 'concept' | 'amount_nio' | 'amount_usd'
type SortOrder = 'asc' | 'desc'

export const DailyReportsTable = ({ data = [], isLoading = false }: DailyReportsTableProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [movementFilter, setMovementFilter] = useState<string>('all')
  const [conceptFilter, setConceptFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter list
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.receipt_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.concept?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesMovement =
        movementFilter === 'all' || item.type_movement === movementFilter

      const matchesConcept =
        conceptFilter === 'all' || item.concept === conceptFilter

      return matchesSearch && matchesMovement && matchesConcept
    })
  }, [data, searchQuery, movementFilter, conceptFilter])

  // Sort list
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let comparison = 0

      if (sortField === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortField === 'receipt_number') {
        comparison = (a.receipt_number || '').localeCompare(b.receipt_number || '')
      } else if (sortField === 'concept') {
        comparison = (a.concept || '').localeCompare(b.concept || '')
      } else if (sortField === 'amount_nio') {
        const aVal = a.type_movement === TypeMovementType.EXPENSE ? (a.expense_amount || 0) : (a.income_recorded_amount || 0)
        const bVal = b.type_movement === TypeMovementType.EXPENSE ? (b.expense_amount || 0) : (b.income_recorded_amount || 0)
        comparison = aVal - bVal
      } else if (sortField === 'amount_usd') {
        const aVal = a.type_movement === TypeMovementType.EXPENSE ? (a.expense_amount_usd || 0) : (a.income_recorded_amount_usd || 0)
        const bVal = b.type_movement === TypeMovementType.EXPENSE ? (b.expense_amount_usd || 0) : (b.income_recorded_amount_usd || 0)
        comparison = aVal - bVal
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })
  }, [filteredData, sortField, sortOrder])

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedData, currentPage, itemsPerPage])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const renderMovementBadge = (type: string) => {
    if (type === TypeMovementType.INCOME) {
      return (
        <Badge className='bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/30 gap-1.5 font-semibold'>
          <TrendingUp className='size-3.5' />
          {type}
        </Badge>
      )
    }
    if (type === TypeMovementType.EXPENSE) {
      return (
        <Badge className='bg-rose-500/15 text-rose-700 dark:text-rose-400 hover:bg-rose-500/20 border-rose-500/30 gap-1.5 font-semibold'>
          <TrendingDown className='size-3.5' />
          {type}
        </Badge>
      )
    }
    return (
      <Badge variant='outline' className='gap-1.5 font-medium text-muted-foreground'>
        <Ban className='size-3.5' />
        {type}
      </Badge>
    )
  }

  return (
    <Card className='shadow-xs border-border/70 overflow-hidden'>
      {/* ── Filter Toolbar ── */}
      <CardHeader className='pb-4 border-b bg-card/50'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
          {/* Movement Type Tabs */}
          <div className='flex items-center flex-wrap gap-1 bg-muted/60 p-1 rounded-xl w-fit'>
            <Button
              variant={movementFilter === 'all' ? 'default' : 'ghost'}
              size='sm'
              className='h-8 text-xs font-medium rounded-lg'
              onClick={() => {
                setMovementFilter('all')
                setCurrentPage(1)
              }}
            >
              Todos ({data.length})
            </Button>
            <Button
              variant={movementFilter === TypeMovementType.INCOME ? 'default' : 'ghost'}
              size='sm'
              className='h-8 text-xs font-medium rounded-lg'
              onClick={() => {
                setMovementFilter(TypeMovementType.INCOME)
                setCurrentPage(1)
              }}
            >
              Ingresos ({data.filter((d) => d.type_movement === TypeMovementType.INCOME).length})
            </Button>
            <Button
              variant={movementFilter === TypeMovementType.EXPENSE ? 'default' : 'ghost'}
              size='sm'
              className='h-8 text-xs font-medium rounded-lg'
              onClick={() => {
                setMovementFilter(TypeMovementType.EXPENSE)
                setCurrentPage(1)
              }}
            >
              Egresos ({data.filter((d) => d.type_movement === TypeMovementType.EXPENSE).length})
            </Button>
            <Button
              variant={movementFilter === TypeMovementType.CANCELLED ? 'default' : 'ghost'}
              size='sm'
              className='h-8 text-xs font-medium rounded-lg'
              onClick={() => {
                setMovementFilter(TypeMovementType.CANCELLED)
                setCurrentPage(1)
              }}
            >
              Cancelados ({data.filter((d) => d.type_movement === TypeMovementType.CANCELLED).length})
            </Button>
          </div>

          {/* Search & Concept Filter */}
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5'>
            {/* Concept Select Filter */}
            <div className='w-full sm:w-48'>
              <Select
                value={conceptFilter}
                onValueChange={(val) => {
                  setConceptFilter(val)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className='h-9 rounded-xl text-xs bg-background'>
                  <div className='flex items-center gap-1.5 truncate'>
                    <Filter className='size-3.5 text-muted-foreground' />
                    <SelectValue placeholder='Todos los conceptos' />
                  </div>
                </SelectTrigger>
                <SelectContent className='rounded-xl max-h-56'>
                  <SelectItem value='all' className='text-xs'>Todos los conceptos</SelectItem>
                  {Object.values(ConceptType).map((c) => (
                    <SelectItem key={c} value={c} className='text-xs'>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Input */}
            <div className='relative w-full sm:w-64'>
              <Search className='absolute left-3 top-2.5 size-4 text-muted-foreground' />
              <Input
                placeholder='Buscar por recibo, detalle...'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className='pl-9 h-9 rounded-xl text-xs bg-background'
              />
            </div>
          </div>
        </div>
      </CardHeader>

      {/* ── Table Content ── */}
      <CardContent className='p-0'>
        {isLoading ? (
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <tbody className='divide-y'>
                {[1, 2, 3, 4, 5].map((key) => (
                  <DailyReportRowSkeleton key={key} />
                ))}
              </tbody>
            </table>
          </div>
        ) : sortedData.length === 0 ? (
          <div className='py-16 flex flex-col items-center justify-center text-center px-4'>
            <div className='size-14 rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground mb-3'>
              <Receipt className='size-7' />
            </div>
            <h3 className='font-semibold text-base mb-1 text-foreground'>
              No se encontraron reportes
            </h3>
            <p className='text-sm text-muted-foreground max-w-sm'>
              {searchQuery || movementFilter !== 'all' || conceptFilter !== 'all'
                ? 'No hay registros que coincidan con los filtros aplicados en el rango seleccionado.'
                : 'No existen movimientos registrados para el rango de fechas seleccionado.'}
            </p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead className='bg-muted/40 border-b text-xs uppercase tracking-wider text-muted-foreground font-semibold'>
                <tr>
                  <th
                    onClick={() => handleSort('date')}
                    className='h-11 px-4 text-left cursor-pointer hover:text-foreground transition-colors'
                  >
                    <div className='flex items-center gap-1.5'>
                      Fecha y Hora
                      <ArrowUpDown className='size-3.5' />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('receipt_number')}
                    className='h-11 px-4 text-left cursor-pointer hover:text-foreground transition-colors'
                  >
                    <div className='flex items-center gap-1.5'>
                      N° Recibo
                      <ArrowUpDown className='size-3.5' />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('concept')}
                    className='h-11 px-4 text-left cursor-pointer hover:text-foreground transition-colors'
                  >
                    <div className='flex items-center gap-1.5'>
                      Concepto / Detalle
                      <ArrowUpDown className='size-3.5' />
                    </div>
                  </th>
                  <th className='h-11 px-4 text-left'>
                    Tipo
                  </th>
                  <th
                    onClick={() => handleSort('amount_nio')}
                    className='h-11 px-4 text-right cursor-pointer hover:text-foreground transition-colors'
                  >
                    <div className='flex items-center justify-end gap-1.5'>
                      Monto (C$)
                      <ArrowUpDown className='size-3.5' />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('amount_usd')}
                    className='h-11 px-4 text-right cursor-pointer hover:text-foreground transition-colors'
                  >
                    <div className='flex items-center justify-end gap-1.5'>
                      Monto (USD)
                      <ArrowUpDown className='size-3.5' />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border/60'>
                {paginatedData.map((item) => {
                  const isIncome = item.type_movement === TypeMovementType.INCOME
                  const isExpense = item.type_movement === TypeMovementType.EXPENSE
                  const nioAmount = isIncome
                    ? item.income_recorded_amount
                    : isExpense
                    ? item.expense_amount
                    : 0
                  const usdAmount = isIncome
                    ? item.income_recorded_amount_usd
                    : isExpense
                    ? item.expense_amount_usd
                    : 0

                  return (
                    <tr
                      key={item._id}
                      className='transition-colors hover:bg-muted/40'
                    >
                      {/* Fecha y Hora */}
                      <td className='p-4 align-middle whitespace-nowrap'>
                        <div className='flex items-center gap-2 text-xs'>
                          <Clock className='size-3.5 text-muted-foreground shrink-0' />
                          <span className='font-medium text-foreground'>
                            {formatDate(item.date)}
                          </span>
                        </div>
                      </td>

                      {/* Recibo */}
                      <td className='p-4 align-middle whitespace-nowrap'>
                        <span className='inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-semibold bg-muted text-foreground border border-border/80'>
                          #{item.receipt_number || 'S/N'}
                        </span>
                      </td>

                      {/* Concepto y Descripción */}
                      <td className='p-4 align-middle max-w-xs md:max-w-md'>
                        <div className='flex flex-col'>
                          <span className='font-bold text-foreground text-sm'>
                            {item.concept}
                          </span>
                          <span className='text-xs text-muted-foreground truncate' title={item.description}>
                            {item.description || '-'}
                          </span>
                        </div>
                      </td>

                      {/* Tipo de Movimiento */}
                      <td className='p-4 align-middle whitespace-nowrap'>
                        {renderMovementBadge(item.type_movement)}
                      </td>

                      {/* Monto C$ */}
                      <td className='p-4 align-middle text-right whitespace-nowrap'>
                        <span
                          className={`font-bold text-sm ${
                            isIncome
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : isExpense
                              ? 'text-rose-600 dark:text-rose-400'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {isIncome && '+'}
                          {isExpense && '-'}
                          {nioAmount !== undefined && nioAmount !== null
                            ? FormatCurrency(nioAmount)
                            : '-'}
                        </span>
                      </td>

                      {/* Monto USD */}
                      <td className='p-4 align-middle text-right whitespace-nowrap'>
                        <span
                          className={`font-semibold text-xs ${
                            isIncome
                              ? 'text-emerald-700 dark:text-emerald-300'
                              : isExpense
                              ? 'text-rose-700 dark:text-rose-300'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {isIncome && '+'}
                          {isExpense && '-'}
                          {usdAmount !== undefined && usdAmount !== null
                            ? FormatCurrencyDollar(usdAmount)
                            : '-'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Pagination ── */}
        {sortedData.length > itemsPerPage && (
          <div className='flex items-center justify-between p-4 border-t bg-card/30'>
            <div className='text-xs text-muted-foreground'>
              Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
              {Math.min(currentPage * itemsPerPage, sortedData.length)} de {sortedData.length} registros
            </div>

            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className='h-8 text-xs rounded-lg'
              >
                <ChevronLeft className='size-3.5 mr-1' />
                Anterior
              </Button>
              <div className='text-xs font-semibold px-2'>
                {currentPage} / {totalPages}
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className='h-8 text-xs rounded-lg'
              >
                Siguiente
                <ChevronRight className='size-3.5 ml-1' />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
