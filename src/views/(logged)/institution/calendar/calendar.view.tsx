import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { Plus, Sparkles } from 'lucide-react'
import { ViewContainer } from '@/components/ui/view-container'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

import type { CalendarEvent } from '@/components/calendar/types'
import { CalendarGrid } from '@/components/calendar/calendar-grid'
import { CalendarSidebar } from '@/components/calendar/calendar-sidebar'
import { CalendarEventModal } from '@/components/calendar/calendar-event-modal'

export const CalendarView = () => {
  // Navigation states
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(dayjs())
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs())
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Events state
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const stored = localStorage.getItem('scholar_calendar_events')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (err) {
        console.error('Failed to parse calendar events:', err)
      }
    }

    // Default mock events relative to current month for visual richness
    const initialEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Examen Parcial de Álgebra',
        description: 'Capítulo 3: Matrices y Determinantes. Traer hoja de fórmulas y calculadora.',
        date: dayjs().date(10).format('YYYY-MM-DD'),
        startTime: '08:00',
        endTime: '09:30',
        category: 'exam'
      },
      {
        id: '2',
        title: 'Entrega de Reporte de Química',
        description: 'Informe sobre la reacción de neutralización ácido-base en formato PDF.',
        date: dayjs().date(14).format('YYYY-MM-DD'),
        startTime: '14:00',
        endTime: '15:30',
        category: 'task'
      },
      {
        id: '3',
        title: 'Capacitación del Personal Docente',
        description: 'Jornada pedagógica sobre nuevas metodologías y herramientas digitales. No hay clases.',
        date: dayjs().date(16).format('YYYY-MM-DD'),
        startTime: '08:00',
        endTime: '16:00',
        category: 'holiday'
      },
      {
        id: '4',
        title: 'Reunión General con Padres de Familia',
        description: 'Entrega del informe académico del primer periodo y anuncios sobre el festival escolar.',
        date: dayjs().date(20).format('YYYY-MM-DD'),
        startTime: '17:30',
        endTime: '19:00',
        category: 'meeting'
      },
      {
        id: '5',
        title: 'Proyecto Integrador de Ciencias',
        description: 'Presentación en grupos sobre la biodiversidad en la región de Antioquia.',
        date: dayjs().date(20).format('YYYY-MM-DD'),
        startTime: '10:00',
        endTime: '12:30',
        category: 'task'
      },
      {
        id: '6',
        title: 'Evaluación Escrita de Física',
        description: 'Movimiento Uniformemente Variado (MUV) y Caída Libre. Aula 201.',
        date: dayjs().date(25).format('YYYY-MM-DD'),
        startTime: '11:00',
        endTime: '12:30',
        category: 'exam'
      }
    ]
    localStorage.setItem('scholar_calendar_events', JSON.stringify(initialEvents))
    return initialEvents
  })

  // Save events in localstorage
  useEffect(() => {
    localStorage.setItem('scholar_calendar_events', JSON.stringify(events))
  }, [events])

  // Handlers
  const handlePrevMonth = () => {
    setCurrentMonth(prev => prev.subtract(1, 'month'))
  }

  const handleNextMonth = () => {
    setCurrentMonth(prev => prev.add(1, 'month'))
  }

  const handleToday = () => {
    const today = dayjs()
    setCurrentMonth(today)
    setSelectedDate(today)
  }

  const handleSelectMonth = (month: number) => {
    setCurrentMonth(prev => prev.month(month))
  }

  const handleSelectYear = (year: number) => {
    setCurrentMonth(prev => prev.year(year))
  }

  const handleSaveEvent = (newEventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      id: Math.random().toString(36).substring(2, 9),
      ...newEventData
    }
    setEvents(prev => [...prev, newEvent])
    setIsModalOpen(false)
    toast.success(`Evento "${newEventData.title}" programado correctamente.`)
  }

  const handleDeleteEvent = (id: string, title: string) => {
    setEvents(prev => prev.filter(item => item.id !== id))
    toast.success(`Evento "${title}" eliminado.`)
  }

  return (
    <ViewContainer>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-extrabold text-foreground">Calendario Escolar</h1>
            <Sparkles className="w-6 h-6 text-accent animate-pulse" />
          </div>
          <p className="text-muted-foreground text-lg font-medium">
            Visualiza eventos escolares, exámenes, tareas y reuniones.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="rounded-xl h-11 px-6 font-bold shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95 bg-accent text-white"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Evento
        </Button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Calendar Grid */}
        <div className="xl:col-span-2">
          <CalendarGrid
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
            onChangeMonth={handleSelectMonth}
            onChangeYear={handleSelectYear}
            events={events}
          />
        </div>

        {/* Sidebar */}
        <CalendarSidebar
          selectedDate={selectedDate}
          events={events}
          onDeleteEvent={handleDeleteEvent}
          onOpenAddModal={() => setIsModalOpen(true)}
        />
      </div>

      {/* Add Event Modal */}
      <CalendarEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        onSaveEvent={handleSaveEvent}
      />
    </ViewContainer>
  )
}