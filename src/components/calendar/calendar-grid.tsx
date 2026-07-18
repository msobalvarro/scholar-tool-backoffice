import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { CATEGORIES, DAY_NAMES, MONTH_NAMES } from '@/constants/calendar-events.constant'
import type { CalendarEventResponse } from '@/dtos/outputs/calendar-events-output'

interface CalendarGridProps {
  currentMonth: dayjs.Dayjs
  selectedDate: dayjs.Dayjs
  onSelectDate: (date: dayjs.Dayjs) => void
  onPrevMonth: () => void
  onNextMonth: () => void
  onToday: () => void
  onChangeMonth: (month: number) => void
  onChangeYear: (year: number) => void
  events: CalendarEventResponse[]
}

export const CalendarGrid = ({
  currentMonth,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  onChangeMonth,
  onChangeYear,
  events
}: CalendarGridProps) => {


  // Calculate 42 days (6 weeks) to display in the grid
  const generateDays = () => {
    const startOfMonth = currentMonth.startOf('month')
    const startDayOfWeek = startOfMonth.day() // 0 = Sunday, 1 = Monday, etc.

    let currentDay = startOfMonth.subtract(startDayOfWeek, 'day')

    const grid: dayjs.Dayjs[] = []
    for (let i = 0; i < 42; i++) {
      grid.push(currentDay)
      currentDay = currentDay.add(1, 'day')
    }
    return grid
  }

  const daysGrid = generateDays()

  // Generate years list for the selector
  const currentYear = dayjs().year()
  const years = Array.from({ length: 9 }, (_, i) => currentYear - 4 + i)

  return (
    <Card className="border-border shadow-md overflow-hidden bg-card/60 backdrop-blur-md">
      {/* Calendar Header with Navigation */}
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-muted/40 p-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
              {MONTH_NAMES[currentMonth.month()]} {currentMonth.year()}
            </CardTitle>
            <CardDescription className="text-xs">
              Navegación y vista general del mes
            </CardDescription>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToday}
            className="h-8 rounded-lg font-bold border-border/80 text-foreground"
          >
            Hoy
          </Button>

          {/* Month Navigation */}
          <div className="flex items-center border border-border rounded-lg bg-background p-0.5">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onPrevMonth}
              className="rounded-md"
              aria-label="Mes anterior"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onNextMonth}
              className="rounded-md"
              aria-label="Mes siguiente"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </Button>
          </div>

          {/* Quick Selectors */}
          <div className="flex items-center gap-1.5 ml-1">
            <Select
              value={currentMonth.month().toString()}
              onValueChange={(val) => onChangeMonth(parseInt(val))}
            >
              <SelectTrigger className="h-8 text-xs min-w-[100px] border-border text-foreground">
                <SelectValue placeholder="Mes" />
              </SelectTrigger>
              <SelectContent>
                {MONTH_NAMES.map((name, idx) => (
                  <SelectItem key={idx} value={idx.toString()}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={currentMonth.year().toString()}
              onValueChange={(val) => onChangeYear(parseInt(val))}
            >
              <SelectTrigger className="h-8 text-xs min-w-[80px] border-border text-foreground">
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      {/* Grid Area */}
      <CardContent className="p-5">
        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-1 text-center font-bold text-muted-foreground text-xs sm:text-sm mb-3">
          {DAY_NAMES.map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {daysGrid.map((day, idx) => {
            const isSelected = day.isSame(selectedDate, 'day')
            const isToday = day.isSame(dayjs(), 'day')
            const isCurrentMonth = day.isSame(currentMonth, 'month')

            // Events on this day
            const dayEvents = events?.filter(e => dayjs(e.date).isSame(day, 'day'))

            return (
              <button
                key={idx}
                onClick={() => onSelectDate(day)}
                className={`
                  relative flex flex-col justify-between aspect-square p-1 sm:p-2 rounded-xl border text-left transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                  ${isSelected
                    ? 'bg-primary text-primary-foreground border-primary shadow-md hover:bg-primary/95 scale-[1.01]'
                    : isToday
                      ? 'border-accent text-accent font-semibold bg-accent/5 dark:bg-accent/10 hover:bg-accent/15'
                      : 'border-border/40 hover:bg-muted/50 dark:hover:bg-muted/10 bg-background/30 hover:border-border'
                  }
                  ${!isCurrentMonth && !isSelected ? 'opacity-40' : ''}
                `}
              >
                {/* Day number */}
                <span className="text-xs sm:text-sm font-semibold self-start sm:self-auto">
                  {day.date()}
                </span>

                {/* Category mini dots */}
                {(dayEvents && dayEvents.length > 0) && (
                  <div className="flex flex-wrap gap-0.5 mt-auto pt-1 w-full justify-start items-center">
                    {dayEvents.slice(0, 4).map((evt, eIdx) => (
                      <span
                        key={eIdx}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${CATEGORIES[evt.type].color}`}
                        title={evt.title}
                      />
                    ))}
                    {dayEvents.length > 4 && (
                      <span className={`text-[8px] sm:text-[9px] font-extrabold ${isSelected ? 'text-primary-foreground' : 'text-muted-foreground'} ml-0.5`}>
                        +{dayEvents.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
