import { useState } from 'react'
import dayjs from 'dayjs'
import { Plus, Sparkles } from 'lucide-react'
import { ViewContainer } from '@/components/ui/view-container'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

import { CalendarGrid } from '@/components/calendar/calendar-grid'
import { CalendarSidebar } from '@/components/calendar/calendar-sidebar'
import { CalendarEventModal } from '@/components/calendar/calendar-event-modal'
import type { CalendarEventResponse } from '@/dtos/outputs/calenda-events-output'

export const CalendarView = () => {
  // Navigation states
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(dayjs())
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs())
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Events state
  const [events, setEvents] = useState<CalendarEventResponse[]>([])


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


  const handleDeleteEvent = (id: string, title: string) => {
    setEvents(prev => prev.filter(item => item._id !== id))
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
        onSaveEvent={() => { }}
      />
    </ViewContainer>
  )
}