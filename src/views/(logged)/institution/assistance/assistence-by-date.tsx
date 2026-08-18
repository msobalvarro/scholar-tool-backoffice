import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Search,
  Users,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Clock,
  Percent
} from 'lucide-react'
import { useStudentAssistencesByDate } from '@/hooks/API/use-student-assistence'
import { ViewContainer } from '@/components/ui/view-container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AssistenceRowSkeleton } from '@/components/assistance/assistence-row-skeleton'
import { formatDate } from '@/lib/utils'
import type { StudentAssistenceResponse } from '@/dtos/outputs/student-assistence-output'

type FilterStatus = 'all' | 'present' | 'absent'

export const AssistanceByDateView = () => {
  const [selectedDate, setSelectedDate] = useState<string>(() => dayjs().format('YYYY-MM-DD'))
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const {
    data: assistances,
    isLoading,
    isFetching,
    refetch
  } = useStudentAssistencesByDate(selectedDate)

  // Navigate dates
  const handlePrevDay = () => {
    setSelectedDate(prev => dayjs(prev).subtract(1, 'day').format('YYYY-MM-DD'))
    setCurrentPage(1)
  }

  const handleNextDay = () => {
    setSelectedDate(prev => dayjs(prev).add(1, 'day').format('YYYY-MM-DD'))
    setCurrentPage(1)
  }

  const handleToday = () => {
    setSelectedDate(dayjs().format('YYYY-MM-DD'))
    setCurrentPage(1)
  }

  const handleYesterday = () => {
    setSelectedDate(dayjs().subtract(1, 'day').format('YYYY-MM-DD'))
    setCurrentPage(1)
  }

  // Summary statistics
  const stats = useMemo(() => {
    const list = assistances || []
    const total = list.length
    const present = list.filter(item => item.assistence).length
    const absent = total - present
    const rate = total > 0 ? Math.round((present / total) * 100) : 0

    return { total, present, absent, rate }
  }, [assistances])

  // Filter and search
  const filteredAssistances = useMemo(() => {
    if (!assistances) return []

    return assistances.filter((record: StudentAssistenceResponse) => {
      const student = record.student
      const fullName = student
        ? `${student.firstName} ${student.lastName}`.toLowerCase()
        : ''
      const email = student?.email?.toLowerCase() || ''
      const studentId = student?._id?.toLowerCase() || ''
      const matchesSearch =
        !searchQuery ||
        fullName.includes(searchQuery.toLowerCase()) ||
        email.includes(searchQuery.toLowerCase()) ||
        studentId.includes(searchQuery.toLowerCase())

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'present' && record.assistence) ||
        (statusFilter === 'absent' && !record.assistence)

      return matchesSearch && matchesStatus
    })
  }, [assistances, searchQuery, statusFilter])

  // Pagination
  const totalPages = Math.ceil(filteredAssistances.length / itemsPerPage) || 1
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAssistances.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAssistances, currentPage, itemsPerPage])

  const formattedDateTitle = useMemo(() => {
    return dayjs(selectedDate).locale('es').format('dddd, D [de] MMMM [de] YYYY')
  }, [selectedDate])

  const isToday = selectedDate === dayjs().format('YYYY-MM-DD')

  return (
    <ViewContainer className='flex flex-col gap-6 space-y-2 pb-12'>
      {/* ── Top navigation bar ── */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <Link to='/assistance'>
            <Button variant='outline' size='sm' className='gap-2 shadow-xs'>
              <ArrowLeft className='size-4' />
              <span>Volver</span>
            </Button>
          </Link>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Historial de Asistencias</h1>
            <p className='text-sm text-muted-foreground capitalize'>
              {formattedDateTitle}
            </p>
          </div>
        </div>

        {/* ── Quick Date selector ── */}
        <div className='flex flex-wrap items-center gap-2'>
          <div className='flex items-center rounded-lg border bg-card p-1 shadow-xs'>
            <Button
              variant='ghost'
              size='icon'
              className='size-8'
              onClick={handlePrevDay}
              title='Día anterior'
            >
              <ChevronLeft className='size-4' />
            </Button>

            <div className='relative flex items-center px-2'>
              <CalendarIcon className='size-4 text-muted-foreground mr-2 pointer-events-none' />
              <input
                type='date'
                value={selectedDate}
                onChange={(e) => {
                  if (e.target.value) {
                    setSelectedDate(e.target.value)
                    setCurrentPage(1)
                  }
                }}
                className='bg-transparent text-sm font-medium focus:outline-hidden cursor-pointer'
              />
            </div>

            <Button
              variant='ghost'
              size='icon'
              className='size-8'
              onClick={handleNextDay}
              title='Día siguiente'
            >
              <ChevronRight className='size-4' />
            </Button>
          </div>

          <Button
            variant={isToday ? 'default' : 'outline'}
            size='sm'
            onClick={handleToday}
            className='shadow-xs'
          >
            Hoy
          </Button>

          <Button
            variant='outline'
            size='sm'
            onClick={handleYesterday}
            className='shadow-xs'
          >
            Ayer
          </Button>

          <Button
            variant='outline'
            size='icon'
            className='size-9 shadow-xs'
            onClick={() => refetch()}
            disabled={isFetching}
            title='Actualizar datos'
          >
            <RefreshCw className={`size-4 ${isFetching ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* ── Summary Stats Cards ── */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card className='shadow-xs border-border/70'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
              Total Registros
            </CardTitle>
            <div className='size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary'>
              <Users className='size-4' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.total}</div>
            <p className='text-xs text-muted-foreground mt-1'>
              Estudiantes registrados este día
            </p>
          </CardContent>
        </Card>

        <Card className='shadow-xs border-border/70'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
              Presentes
            </CardTitle>
            <div className='size-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600'>
              <CheckCircle2 className='size-4' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>{stats.present}</div>
            <p className='text-xs text-muted-foreground mt-1'>
              {stats.total > 0 ? `${stats.rate}% del total` : 'Sin registros'}
            </p>
          </CardContent>
        </Card>

        <Card className='shadow-xs border-border/70'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
              Ausentes
            </CardTitle>
            <div className='size-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-600'>
              <XCircle className='size-4' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-600'>{stats.absent}</div>
            <p className='text-xs text-muted-foreground mt-1'>
              {stats.total > 0 ? `${100 - stats.rate}% del total` : 'Sin registros'}
            </p>
          </CardContent>
        </Card>

        <Card className='shadow-xs border-border/70'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
              Tasa de Asistencia
            </CardTitle>
            <div className='size-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600'>
              <Percent className='size-4' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-600'>{stats.rate}%</div>
            <div className='w-full bg-muted rounded-full h-1.5 mt-2 overflow-hidden'>
              <div
                className='bg-blue-600 h-full rounded-full transition-all duration-500'
                style={{ width: `${stats.rate}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Table & Filters Section ── */}
      <Card className='shadow-xs border-border/70'>
        <CardHeader className='pb-4'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
            {/* Status Filter Tabs */}
            <div className='flex items-center gap-1 bg-muted/60 p-1 rounded-lg w-fit'>
              <Button
                variant={statusFilter === 'all' ? 'default' : 'ghost'}
                size='sm'
                className='h-8 text-xs'
                onClick={() => {
                  setStatusFilter('all')
                  setCurrentPage(1)
                }}
              >
                Todos ({stats.total})
              </Button>
              <Button
                variant={statusFilter === 'present' ? 'default' : 'ghost'}
                size='sm'
                className='h-8 text-xs'
                onClick={() => {
                  setStatusFilter('present')
                  setCurrentPage(1)
                }}
              >
                Presentes ({stats.present})
              </Button>
              <Button
                variant={statusFilter === 'absent' ? 'default' : 'ghost'}
                size='sm'
                className='h-8 text-xs'
                onClick={() => {
                  setStatusFilter('absent')
                  setCurrentPage(1)
                }}
              >
                Ausentes ({stats.absent})
              </Button>
            </div>

            {/* Search Input */}
            <div className='relative w-full sm:w-72'>
              <Search className='absolute left-2.5 top-2.5 size-4 text-muted-foreground' />
              <Input
                placeholder='Buscar estudiante...'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className='pl-9 bg-background h-9'
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className='p-0'>
          {isLoading ? (
            <div className='p-6 space-y-3'>
              {[1, 2, 3, 4, 5].map((key) => (
                <AssistenceRowSkeleton key={key} />
              ))}
            </div>
          ) : filteredAssistances.length === 0 ? (
            <div className='py-16 flex flex-col items-center justify-center text-center px-4'>
              <div className='size-14 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground mb-3'>
                <CalendarIcon className='size-7' />
              </div>
              <h3 className='font-semibold text-base mb-1'>No hay registros de asistencia</h3>
              <p className='text-sm text-muted-foreground max-w-sm'>
                {searchQuery || statusFilter !== 'all'
                  ? 'No se encontraron asistencias que coincidan con los filtros aplicados.'
                  : `No se encontraron asistencias registradas para el ${dayjs(selectedDate).format('DD/MM/YYYY')}.`}
              </p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead className='border-y bg-muted/30'>
                  <tr>
                    <th className='h-10 px-4 text-left font-medium text-muted-foreground'>
                      Estudiante
                    </th>
                    <th className='h-10 px-4 text-left font-medium text-muted-foreground'>
                      Hora de registro
                    </th>
                    <th className='h-10 px-4 text-left font-medium text-muted-foreground'>
                      Estado
                    </th>
                    <th className='h-10 px-4 text-left font-medium text-muted-foreground'>
                      Justificación
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-border/50'>
                  {paginatedData.map((record) => {
                    const student = record.student
                    const fullName = student
                      ? `${student.firstName} ${student.lastName}`
                      : 'Estudiante desconocido'
                    const initials = student
                      ? `${student.firstName?.[0] || ''}${student.lastName?.[0] || ''}`.toUpperCase()
                      : '?'

                    return (
                      <tr
                        key={record._id}
                        className='transition-colors hover:bg-muted/40'
                      >
                        {/* Estudiante */}
                        <td className='p-4 align-middle font-medium'>
                          <div className='flex items-center gap-3'>
                            <Avatar className='size-9'>
                              {student?.photo && <AvatarImage src={student.photo} alt={fullName} />}
                              <AvatarFallback className='bg-primary/10 text-primary font-semibold text-xs'>
                                {initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                              <span className='font-medium text-foreground'>{fullName}</span>
                              <span className='text-xs text-muted-foreground'>
                                {student?.email || student?._id || '-'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Hora */}
                        <td className='p-4 align-middle text-muted-foreground'>
                          <div className='flex items-center gap-1.5 text-xs'>
                            <Clock className='size-3.5' />
                            <span>{formatDate(record.date)}</span>
                          </div>
                        </td>

                        {/* Estado */}
                        <td className='p-4 align-middle'>
                          {record.assistence ? (
                            <Badge variant='default' className='gap-1 font-normal bg-green-600 hover:bg-green-700 text-white'>
                              <CheckCircle2 className='size-3' />
                              Presente
                            </Badge>
                          ) : (
                            <Badge variant='destructive' className='gap-1 font-normal'>
                              <XCircle className='size-3' />
                              Ausente
                            </Badge>
                          )}
                        </td>

                        {/* Justificación */}
                        <td className='p-4 align-middle text-xs text-muted-foreground'>
                          {record.justification || '-'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Pagination ── */}
          {filteredAssistances.length > itemsPerPage && (
            <div className='flex items-center justify-between p-4 border-t'>
              <div className='text-xs text-muted-foreground'>
                Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
                {Math.min(currentPage * itemsPerPage, filteredAssistances.length)} de{' '}
                {filteredAssistances.length} registros
              </div>

              <div className='flex items-center space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className='h-8 text-xs'
                >
                  <ChevronLeft className='size-3.5 mr-1' />
                  Anterior
                </Button>
                <div className='text-xs font-medium px-2'>
                  {currentPage} / {totalPages}
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className='h-8 text-xs'
                >
                  Siguiente
                  <ChevronRight className='size-3.5 ml-1' />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </ViewContainer>
  )
}