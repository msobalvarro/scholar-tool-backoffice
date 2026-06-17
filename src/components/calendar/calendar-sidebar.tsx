import { useState } from 'react'
import dayjs from 'dayjs'
import { Calendar as CalendarIcon, Plus, Trash2, Clock, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { CalendarEvent } from './types'
import { MONTH_NAMES, CATEGORIES } from './types'

interface CalendarSidebarProps {
  selectedDate: dayjs.Dayjs
  events: CalendarEvent[]
  onDeleteEvent: (id: string, title: string) => void
  onOpenAddModal: () => void
}

export const CalendarSidebar = ({
  selectedDate,
  events,
  onDeleteEvent,
  onOpenAddModal
}: CalendarSidebarProps) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  // Selected date events
  const selectedDayEvents = events.filter(item =>
    dayjs(item.date).isSame(selectedDate, 'day')
  )

  // Filtered daily events
  const filteredEvents = selectedDayEvents.filter(item => {
    if (categoryFilter === 'all') return true
    return item.category === categoryFilter
  })

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-border shadow-md overflow-hidden bg-card/60 backdrop-blur-md flex-1">
        <CardHeader className="border-b border-border bg-muted/40 p-5">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                {selectedDate.format('D [de]')} {MONTH_NAMES[selectedDate.month()]}
              </CardTitle>
              <CardDescription className="text-xs">
                Eventos programados para este día
              </CardDescription>
            </div>
            <Button
              onClick={onOpenAddModal}
              size="sm"
              variant="outline"
              className="h-8 rounded-lg font-bold text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Añadir
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-5 flex flex-col gap-4">
          {/* Category Filter Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 w-full scrollbar-thin">
            <Button
              onClick={() => setCategoryFilter('all')}
              variant={categoryFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              className="h-7 text-xs rounded-full px-3 font-semibold"
            >
              Todos
            </Button>
            {Object.entries(CATEGORIES).map(([key, value]) => (
              <Button
                key={key}
                onClick={() => setCategoryFilter(key)}
                variant={categoryFilter === key ? 'default' : 'outline'}
                size="sm"
                className={`h-7 text-xs rounded-full px-3 font-semibold ${categoryFilter !== key ? 'hover:bg-muted border-border text-foreground' : ''}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full mr-1 ${value.color}`} />
                {value.label}
              </Button>
            ))}
          </div>

          {/* Events List */}
          <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
            {filteredEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center border border-dashed border-border/80 rounded-2xl bg-muted/10">
                <CalendarIcon className="w-10 h-10 text-muted-foreground/40 mb-3" />
                <p className="text-sm font-semibold text-muted-foreground">
                  No hay eventos en este día
                </p>
                <p className="text-xs text-muted-foreground/60 max-w-[200px] mt-1">
                  {categoryFilter !== 'all'
                    ? 'Prueba cambiando el filtro de categorías.'
                    : 'Agenda un examen, tarea o reunión escolar usando el botón superior.'}
                </p>
              </div>
            ) : (
              filteredEvents.map((evt) => {
                const catInfo = CATEGORIES[evt.category]
                return (
                  <div
                    key={evt.id}
                    className="group relative flex flex-col gap-2 p-4 rounded-xl border border-border/60 bg-background/40 hover:bg-background/80 transition-all duration-300 hover:shadow-xs hover:border-border pl-4"
                    style={{
                      borderLeftWidth: '4px',
                      borderLeftColor: `var(--color-${evt.category === 'exam' ? 'rose' : evt.category === 'task' ? 'indigo' : evt.category === 'holiday' ? 'emerald' : evt.category === 'meeting' ? 'amber' : 'violet'}-500, ${
                        catInfo.color.includes('rose') ? '#f43f5e' : catInfo.color.includes('indigo') ? '#6366f1' : catInfo.color.includes('emerald') ? '#10b981' : catInfo.color.includes('amber') ? '#f59e0b' : '#8b5cf6'
                      })`
                    }}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-sm text-foreground leading-tight">
                        {evt.title}
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onDeleteEvent(evt.id, evt.title)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive size-7 rounded-lg -mt-1 -mr-1"
                        title="Eliminar evento"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                    {evt.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {evt.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {evt.startTime} - {evt.endTime}
                      </span>
                      <Badge variant="outline" className={`text-[10px] py-0 px-2 font-bold rounded-md border ${catInfo.badge}`}>
                        {catInfo.label}
                      </Badge>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Info Card */}
      <Card className="border-border/60 bg-muted/20">
        <CardContent className="p-4 flex gap-3 items-start">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-bold text-foreground block mb-0.5">Tip del Calendario</span>
            Los eventos se guardan localmente en tu navegador. Puedes usarlos para simular calendarios de materias o exámenes.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
