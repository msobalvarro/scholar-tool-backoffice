import { ViewContainer } from '@/components/ui/view-container'
import { useSimpleLocalStorage } from '@/hooks/use-localstorage'
import { KEYSTORE_NAMES } from '@/env'
import type { Teacher, Institution } from '@/dtos/types'
import {
  GraduationCap,
  ClipboardCheck,
  Calendar as CalendarIcon,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CalendarDays,
  Flame,
  Lightbulb
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

export const TeacherWelcomeView = () => {
  const [teacher] = useSimpleLocalStorage<Teacher>(KEYSTORE_NAMES.TEACHER)
  const [institution] = useSimpleLocalStorage<Institution>(KEYSTORE_NAMES.INSTITUTION)

  const currentHour = new Date().getHours()
  const getGreeting = () => {
    if (currentHour < 12) return 'Buenos días'
    if (currentHour < 18) return 'Buenas tardes'
    return 'Buenas noches'
  }

  const currentDate = dayjs().format('dddd, D [de] MMMM [de] YYYY')
  const teacherName = teacher?.name || 'Profesor(a)'
  const institutionName = institution?.name || 'Institución Educativa'

  return (
    <ViewContainer>
      <div className='max-w-7xl mx-auto space-y-8 pb-10'>
        {/* Hero Section */}
        <div className='relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 via-primary to-accent p-6 sm:p-10 text-white shadow-xl shadow-primary/10'>
          {/* Background decorative circles */}
          <div className='absolute -top-16 -right-16 size-64 rounded-full bg-white/10 blur-2xl pointer-events-none' />
          <div className='absolute -bottom-16 -left-16 size-64 rounded-full bg-accent/20 blur-2xl pointer-events-none' />

          <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
            <div className='space-y-3 max-w-2xl'>
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-white/90 border border-white/20'>
                <Sparkles className='size-3.5 text-amber-300' />
                <span>Portal Docente • {institutionName}</span>
              </div>

              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight'>
                ¡{getGreeting()},{' '}
                <span className='text-amber-200 drop-shadow-sm'>{teacherName}</span>!
              </h1>

              <p className='text-sm sm:text-base text-white/80 leading-relaxed max-w-xl'>
                Te damos la bienvenida a tu espacio de gestión académica. Desde aquí puedes registrar asistencias, consultar tu programación y dar seguimiento a tus grupos escolares.
              </p>

              <div className='pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-white/90'>
                <div className='flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10'>
                  <CalendarDays className='size-4 text-amber-300' />
                  <span className='capitalize'>{currentDate}</span>
                </div>
                <div className='flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10'>
                  <ShieldCheck className='size-4 text-emerald-300' />
                  <span>Sesión Docente Activa</span>
                </div>
              </div>
            </div>

            {/* Quick Action Button in Hero */}
            <div className='flex flex-col sm:flex-row md:flex-col gap-3 shrink-0'>
              <Button
                asChild
                className='h-12 px-6 rounded-2xl bg-white text-primary hover:bg-white/90 font-bold shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer'
              >
                <Link to='/assistance'>
                  <ClipboardCheck className='size-5 text-primary' />
                  <span>Tomar Asistencia Hoy</span>
                  <ArrowRight className='size-4' />
                </Link>
              </Button>

              <Button
                asChild
                variant='outline'
                className='h-12 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer'
              >
                <Link to='/calendar'>
                  <CalendarIcon className='size-5' />
                  <span>Ver Calendario</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Card 1: Registro de Asistencias */}
          <Link
            to='/assistance'
            className='group relative bg-card border border-border/80 hover:border-primary/50 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between overflow-hidden'
          >
            <div className='absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-300 pointer-events-none'>
              <ClipboardCheck className='size-28 text-primary' />
            </div>

            <div className='space-y-4'>
              <div className='size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                <ClipboardCheck className='size-6' />
              </div>

              <div className='space-y-1.5'>
                <h3 className='text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2'>
                  Control de Asistencias
                  <ArrowRight className='size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary' />
                </h3>
                <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                  Pasa lista a tus alumnos rápidamente, registra tardanzas o faltas justificadas en tiempo real.
                </p>
              </div>
            </div>

            <div className='mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary'>
              <span>Ir al módulo de asistencias</span>
              <span className='size-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors'>
                →
              </span>
            </div>
          </Link>

          {/* Card 2: Calendario y Eventos */}
          <Link
            to='/calendar'
            className='group relative bg-card border border-border/80 hover:border-secondary/50 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300 flex flex-col justify-between overflow-hidden'
          >
            <div className='absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-300 pointer-events-none'>
              <CalendarIcon className='size-28 text-secondary' />
            </div>

            <div className='space-y-4'>
              <div className='size-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                <CalendarIcon className='size-6' />
              </div>

              <div className='space-y-1.5'>
                <h3 className='text-lg font-bold text-foreground group-hover:text-secondary transition-colors flex items-center gap-2'>
                  Calendario Escolar
                  <ArrowRight className='size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-secondary' />
                </h3>
                <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                  Consulta días festivos, evaluaciones institucionales y actividades programadas para este ciclo escolar.
                </p>
              </div>
            </div>

            <div className='mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-secondary'>
              <span>Explorar calendario</span>
              <span className='size-6 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors'>
                →
              </span>
            </div>
          </Link>

          {/* Card 3: Asistencias por Fecha */}
          <Link
            to='/assistance/by-date'
            className='group relative bg-card border border-border/80 hover:border-accent/50 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 flex flex-col justify-between overflow-hidden'
          >
            <div className='absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-300 pointer-events-none'>
              <Clock className='size-28 text-accent' />
            </div>

            <div className='space-y-4'>
              <div className='size-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                <Clock className='size-6' />
              </div>

              <div className='space-y-1.5'>
                <h3 className='text-lg font-bold text-foreground group-hover:text-accent transition-colors flex items-center gap-2'>
                  Historial de Asistencia
                  <ArrowRight className='size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent' />
                </h3>
                <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                  Revisa el registro histórico de asistencias de fechas pasadas y genera reportes de tus cursos.
                </p>
              </div>
            </div>

            <div className='mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-accent'>
              <span>Ver asistencias por fecha</span>
              <span className='size-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors'>
                →
              </span>
            </div>
          </Link>
        </div>

        {/* Informative & Pedagogical Tips Section */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Info Card - Teacher Profile Details */}
          <div className='bg-card border border-border/70 rounded-3xl p-6 sm:p-7 space-y-4'>
            <div className='flex items-center gap-3'>
              <div className='size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center'>
                <GraduationCap className='size-5' />
              </div>
              <div>
                <h4 className='font-bold text-sm text-foreground'>Ficha del Docente</h4>
                <p className='text-xs text-muted-foreground'>Tus datos institucionales</p>
              </div>
            </div>

            <div className='space-y-2.5 pt-2'>
              <div className='p-3 bg-muted/50 rounded-xl border border-border/40 flex justify-between items-center text-xs'>
                <span className='text-muted-foreground'>Nombre:</span>
                <span className='font-bold text-foreground'>{teacher?.name || 'No especificado'}</span>
              </div>
              <div className='p-3 bg-muted/50 rounded-xl border border-border/40 flex justify-between items-center text-xs'>
                <span className='text-muted-foreground'>Correo:</span>
                <span className='font-bold text-foreground'>{teacher?.email || 'No especificado'}</span>
              </div>
              <div className='p-3 bg-muted/50 rounded-xl border border-border/40 flex justify-between items-center text-xs'>
                <span className='text-muted-foreground'>Teléfono:</span>
                <span className='font-bold text-foreground'>{teacher?.phoneNumber || 'No especificado'}</span>
              </div>
              <div className='p-3 bg-muted/50 rounded-xl border border-border/40 flex justify-between items-center text-xs'>
                <span className='text-muted-foreground'>Institución:</span>
                <span className='font-bold text-foreground'>{institution?.name || 'Lúmina Education'}</span>
              </div>
            </div>
          </div>

          {/* Quick Tips / Recommendations */}
          <div className='lg:col-span-2 bg-gradient-to-br from-amber-500/10 via-card to-primary/5 border border-border/70 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4'>
            <div className='space-y-3'>
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs'>
                <Lightbulb className='size-4' />
                <span>Consejos para la jornada escolar</span>
              </div>

              <h3 className='text-xl font-bold text-foreground'>
                Optimiza el seguimiento de tus alumnos
              </h3>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-muted-foreground'>
                <div className='p-3.5 bg-background/80 backdrop-blur-sm rounded-2xl border border-border/60 space-y-1'>
                  <div className='flex items-center gap-1.5 font-bold text-foreground'>
                    <Flame className='size-4 text-amber-500' />
                    <span>Toma de asistencia puntual</span>
                  </div>
                  <p>Registra la asistencia al iniciar cada bloque de clase para mantener a los tutores informados.</p>
                </div>

                <div className='p-3.5 bg-background/80 backdrop-blur-sm rounded-2xl border border-border/60 space-y-1'>
                  <div className='flex items-center gap-1.5 font-bold text-foreground'>
                    <Users className='size-4 text-primary' />
                    <span>Comunicación continua</span>
                  </div>
                  <p>Informa oportunamente a la coordinación académica ante cualquier eventualidad con un estudiante.</p>
                </div>
              </div>
            </div>

            <div className='pt-2 flex items-center justify-between text-xs text-muted-foreground'>
              <span>Plataforma institucional actualizada y sincronizada en tiempo real.</span>
              <span className='font-semibold text-primary'>Lúmina Docentes</span>
            </div>
          </div>
        </div>
      </div>
    </ViewContainer>
  )
}
