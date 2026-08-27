import { ViewContainer } from '@/components/ui/view-container'
import { useSimpleLocalStorage } from '@/hooks/use-localstorage'
import { KEYSTORE_NAMES } from '@/env'
import type { UserInstitutionResponse, Institution } from '@/dtos/types'
import { useStudents } from '@/hooks/API/use-students'
import { useTeachers } from '@/hooks/API/use-teachers'
import { useCourses } from '@/hooks/API/use-course'
import { useAsignatures } from '@/hooks/API/use-asignatures'
import { useCalendar } from '@/hooks/API/use-calendar-events'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import {
  GraduationCap,
  Users,
  BookOpen,
  BookMarked,
  ClipboardCheck,
  Calendar as CalendarIcon,
  ArrowRight,
  Plus,
  Sparkles,
  ShieldCheck,
  CalendarDays,
  Layers,
  School,
  TrendingUp,
  CheckCircle2,
  Activity,
  UserCheck,
  List,
  Flame,
  Lightbulb,
  ExternalLink
} from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

export const DashboardView = () => {
  const [authUser] = useSimpleLocalStorage<UserInstitutionResponse>(KEYSTORE_NAMES.USER_INSTITUTION)
  const [institution] = useSimpleLocalStorage<Institution>(KEYSTORE_NAMES.INSTITUTION)

  // API Data
  const { data: students, isLoading: isLoadingStudents } = useStudents()
  const { data: teachers, isLoading: isLoadingTeachers } = useTeachers()
  const { data: courses, isLoading: isLoadingCourses } = useCourses()
  const { data: asignatures, isLoading: isLoadingAsignatures } = useAsignatures()

  const currentMonthStart = dayjs().startOf('month').format('YYYY-MM-DD')
  const currentMonthEnd = dayjs().endOf('month').format('YYYY-MM-DD')
  const { getCalendarEventsByDate: { data: events } } = useCalendar({
    startDate: currentMonthStart,
    endDate: currentMonthEnd
  })

  // Date and greeting
  const currentHour = new Date().getHours()
  const getGreeting = () => {
    if (currentHour < 12) return 'Buenos días'
    if (currentHour < 18) return 'Buenas tardes'
    return 'Buenas noches'
  }

  const currentDate = dayjs().format('dddd, D [de] MMMM [de] YYYY')
  const adminName = authUser?.name || 'Administrador'
  const institutionName = institution?.name || 'Institución Educativa'

  // Stats calculation
  const totalStudents = Array.isArray(students) ? students.length : 0
  const totalTeachers = teachers?.length ?? 0
  const totalCourses = courses?.length ?? 0
  const totalAsignatures = Array.isArray(asignatures) ? asignatures.length : 0

  const upcomingEvents = (events || [])
    .filter(evt => dayjs(evt.date).isAfter(dayjs().subtract(1, 'day')))
    .slice(0, 4)

  const quickStats = [
    {
      title: 'Estudiantes',
      value: isLoadingStudents ? '...' : totalStudents,
      subtitle: 'Alumnos registrados',
      icon: Users,
      color: 'from-blue-600 to-cyan-500',
      textColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'hover:border-blue-500/40',
      link: '/students',
      badge: 'Ver alumnos'
    },
    {
      title: 'Docentes',
      value: isLoadingTeachers ? '...' : totalTeachers,
      subtitle: 'Profesores activos',
      icon: UserCheck,
      color: 'from-violet-600 to-purple-500',
      textColor: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'hover:border-purple-500/40',
      link: '/teachers',
      badge: 'Ver equipo'
    },
    {
      title: 'Cursos Académicos',
      value: isLoadingCourses ? '...' : totalCourses,
      subtitle: 'Grados y secciones',
      icon: Layers,
      color: 'from-amber-600 to-orange-500',
      textColor: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'hover:border-amber-500/40',
      link: '/courses',
      badge: 'Ver cursos'
    },
    {
      title: 'Asignaturas',
      value: isLoadingAsignatures ? '...' : totalAsignatures,
      subtitle: 'Materias en malla',
      icon: BookMarked,
      color: 'from-emerald-600 to-teal-500',
      textColor: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'hover:border-emerald-500/40',
      link: '/asignatures',
      badge: 'Ver materias'
    }
  ]

  const actionCards = [
    {
      title: 'Gestión de Estudiantes',
      desc: 'Registra, actualiza y supervisa los expedientes y datos de contacto de cada alumno.',
      icon: GraduationCap,
      href: '/students',
      actionText: 'Explorar Estudiantes',
      color: 'border-blue-500/20 hover:border-blue-500/50',
      iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Control de Asistencias',
      desc: 'Supervisa el registro de asistencia diario, justificaciones e historial por fecha.',
      icon: ClipboardCheck,
      href: '/assistance',
      actionText: 'Ver Asistencias',
      color: 'border-emerald-500/20 hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Cursos y Asignaciones',
      desc: 'Organiza los grupos académicos, cupos máximos, directores de grupo y horarios.',
      icon: BookOpen,
      href: '/courses',
      actionText: 'Configurar Cursos',
      color: 'border-purple-500/20 hover:border-purple-500/50',
      iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Matrículas Escolares',
      desc: 'Inscribe a los estudiantes en sus cursos correspondientes y gestiona vacantes.',
      icon: List,
      href: '/matricule',
      actionText: 'Gestionar Matrículas',
      color: 'border-amber-500/20 hover:border-amber-500/50',
      iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
    },
    {
      title: 'Cuerpo Docente',
      desc: 'Administra la información de profesores, datos de contacto y roles institucionales.',
      icon: UserCheck,
      href: '/teachers',
      actionText: 'Administrar Profesores',
      color: 'border-indigo-500/20 hover:border-indigo-500/50',
      iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
    },
    {
      title: 'Calendario y Eventos',
      desc: 'Planifica exámenes, entregas de notas, actos cívicos y eventos institucionales.',
      icon: CalendarIcon,
      href: '/calendar',
      actionText: 'Ver Calendario',
      color: 'border-rose-500/20 hover:border-rose-500/50',
      iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
    }
  ]

  return (
    <ViewContainer>
      <div className='max-w-7xl mx-auto space-y-8 pb-12'>
        {/* Hero Section */}
        <div className='relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-700 via-primary to-accent p-6 sm:p-10 text-white shadow-2xl shadow-primary/20'>
          {/* Background Ambient Glow */}
          <div className='absolute -top-24 -right-24 size-80 rounded-full bg-white/10 blur-3xl pointer-events-none' />
          <div className='absolute -bottom-24 -left-24 size-80 rounded-full bg-accent/30 blur-3xl pointer-events-none' />

          <div className='relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8'>
            <div className='space-y-4 max-w-2xl'>
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-white/90 border border-white/20'>
                <Sparkles className='size-3.5 text-amber-300' />
                <span>Panel Administrativo • {institutionName}</span>
              </div>

              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight'>
                ¡{getGreeting()},{' '}
                <span className='text-amber-200 drop-shadow-sm'>{adminName}</span>!
              </h1>

              <p className='text-sm sm:text-base text-white/85 leading-relaxed max-w-xl'>
                Te damos la bienvenida al centro de control de tu institución. Monitorea matrículas, personal docente, estudiantes y la actividad académica en tiempo real.
              </p>

              <div className='pt-2 flex flex-wrap items-center gap-3 text-xs font-medium text-white/90'>
                <div className='flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/10'>
                  <CalendarDays className='size-4 text-amber-300' />
                  <span className='capitalize'>{currentDate}</span>
                </div>
                <div className='flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/10'>
                  <ShieldCheck className='size-4 text-emerald-300' />
                  <span>Sistema Institucional Activo</span>
                </div>
              </div>
            </div>

            {/* Quick Actions in Hero */}
            <div className='flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0'>
              <Button
                asChild
                className='h-12 px-6 rounded-2xl bg-white text-primary hover:bg-white/95 font-bold shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer'
              >
                <Link to='/students/create'>
                  <Plus className='size-5 text-primary' />
                  <span>Nuevo Estudiante</span>
                  <ArrowRight className='size-4' />
                </Link>
              </Button>

              <Button
                asChild
                variant='outline'
                className='h-12 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer'
              >
                <Link to='/assistance'>
                  <ClipboardCheck className='size-5' />
                  <span>Ver Asistencia</span>
                </Link>
              </Button>

              <Button
                asChild
                variant='outline'
                className='h-12 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer'
              >
                <Link to='/calendar'>
                  <CalendarIcon className='size-5' />
                  <span>Calendario</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <TrendingUp className='size-5 text-primary' />
              <h2 className='text-xl font-bold text-foreground'>Resumen Institucional</h2>
            </div>
            <span className='text-xs text-muted-foreground font-medium'>Datos en tiempo real</span>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {quickStats.map((stat, idx) => (
              <Link
                key={idx}
                to={stat.link}
                className={`group relative bg-card border border-border/80 ${stat.borderColor} rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                <div className='flex items-start justify-between'>
                  <div className={`size-12 rounded-2xl ${stat.bgColor} ${stat.textColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className='size-6' />
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${stat.bgColor} ${stat.textColor} flex items-center gap-1`}>
                    {stat.badge}
                    <ArrowRight className='size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all' />
                  </span>
                </div>

                <div className='mt-5 space-y-1'>
                  <div className='text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight'>
                    {stat.value}
                  </div>
                  <div className='font-bold text-sm text-foreground'>{stat.title}</div>
                  <p className='text-xs text-muted-foreground'>{stat.subtitle}</p>
                </div>

                <div className='mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors'>
                  <span>Gestionar módulo</span>
                  <span className='size-5 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors'>
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Modules & Action Shortcuts Grid */}
        <div>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <Activity className='size-5 text-primary' />
              <h2 className='text-xl font-bold text-foreground'>Módulos y Accesos Directos</h2>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {actionCards.map((card, idx) => (
              <Link
                key={idx}
                to={card.href}
                className={`group relative bg-card border border-border/80 ${card.color} rounded-3xl p-6 shadow-xs hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                <div className='space-y-4'>
                  <div className={`size-12 rounded-2xl ${card.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className='size-6' />
                  </div>

                  <div className='space-y-1.5'>
                    <h3 className='text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between'>
                      <span>{card.title}</span>
                      <ArrowRight className='size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary' />
                    </h3>
                    <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className='mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary'>
                  <span>{card.actionText}</span>
                  <span className='size-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors'>
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section: Institution Summary & Academic Overview */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Institutional Information Card */}
          <div className='bg-card border border-border/70 rounded-3xl p-6 sm:p-7 space-y-4 flex flex-col justify-between'>
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='size-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-xs'>
                  <School className='size-6' />
                </div>
                <div>
                  <h3 className='font-bold text-base text-foreground'>Ficha Institucional</h3>
                  <p className='text-xs text-muted-foreground'>Detalles de la cuenta activa</p>
                </div>
              </div>

              <div className='space-y-2.5 pt-1'>
                <div className='p-3 bg-muted/40 rounded-2xl border border-border/40 flex justify-between items-center text-xs'>
                  <span className='text-muted-foreground'>Institución:</span>
                  <span className='font-bold text-foreground truncate max-w-[170px]'>{institution?.name || 'Lúmina Education'}</span>
                </div>
                <div className='p-3 bg-muted/40 rounded-2xl border border-border/40 flex justify-between items-center text-xs'>
                  <span className='text-muted-foreground'>Administrador:</span>
                  <span className='font-bold text-foreground truncate max-w-[170px]'>{authUser?.name || 'Administrador'}</span>
                </div>
                <div className='p-3 bg-muted/40 rounded-2xl border border-border/40 flex justify-between items-center text-xs'>
                  <span className='text-muted-foreground'>Correo de acceso:</span>
                  <span className='font-bold text-foreground truncate max-w-[170px]'>{authUser?.email || 'admin@lumina.edu'}</span>
                </div>
                <div className='p-3 bg-muted/40 rounded-2xl border border-border/40 flex justify-between items-center text-xs'>
                  <span className='text-muted-foreground'>Estado:</span>
                  <span className='inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400'>
                    <CheckCircle2 className='size-3.5' /> Activo
                  </span>
                </div>
              </div>
            </div>

            <div className='pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground'>
              <span>Plataforma Lúmina Backoffice</span>
              <span className='font-semibold text-primary'>v1.0</span>
            </div>
          </div>

          {/* Academic Highlights / Upcoming Events & Recommendations */}
          <div className='lg:col-span-2 bg-gradient-to-br from-indigo-500/5 via-card to-accent/5 border border-border/70 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-primary/10 text-primary font-semibold text-xs'>
                  <CalendarIcon className='size-4' />
                  <span>Agenda y Próximos Eventos</span>
                </div>

                <Link
                  to='/calendar'
                  className='text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1'
                >
                  <span>Ver todo el calendario</span>
                  <ExternalLink className='size-3.5' />
                </Link>
              </div>

              <div className='space-y-3'>
                {upcomingEvents.length > 0 ? (
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    {upcomingEvents.map((evt) => (
                      <div
                        key={evt._id}
                        className='p-4 bg-background/80 backdrop-blur-sm rounded-2xl border border-border/60 space-y-1.5 hover:border-primary/40 transition-colors'
                      >
                        <div className='flex items-center justify-between text-xs'>
                          <span className='font-semibold text-primary capitalize'>
                            {dayjs(evt.date).format('ddd, D [de] MMMM')}
                          </span>
                          <span className='text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground'>
                            {evt.type}
                          </span>
                        </div>
                        <h4 className='font-bold text-sm text-foreground line-clamp-1'>{evt.title}</h4>
                        <p className='text-xs text-muted-foreground line-clamp-2'>{evt.description || 'Sin descripción adicional'}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='p-6 text-center bg-background/60 rounded-2xl border border-border/40 space-y-2'>
                    <CalendarIcon className='size-8 text-muted-foreground/50 mx-auto' />
                    <p className='text-xs sm:text-sm text-muted-foreground font-medium'>
                      No hay eventos pendientes programados para los próximos días.
                    </p>
                    <Button asChild variant='outline' size='sm' className='rounded-xl text-xs'>
                      <Link to='/calendar'>Crear evento en el calendario</Link>
                    </Button>
                  </div>
                )}
              </div>

              {/* Administrative tips */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-muted-foreground'>
                <div className='p-3.5 bg-background/80 backdrop-blur-sm rounded-2xl border border-border/60 space-y-1'>
                  <div className='flex items-center gap-1.5 font-bold text-foreground'>
                    <Flame className='size-4 text-amber-500' />
                    <span>Control de Matrícula</span>
                  </div>
                  <p>Asegúrate de asignar a cada estudiante en su curso correspondiente para habilitar la toma de asistencia.</p>
                </div>

                <div className='p-3.5 bg-background/80 backdrop-blur-sm rounded-2xl border border-border/60 space-y-1'>
                  <div className='flex items-center gap-1.5 font-bold text-foreground'>
                    <Lightbulb className='size-4 text-primary' />
                    <span>Sincronización Continua</span>
                  </div>
                  <p>Los profesores registrados pueden ingresar con sus credenciales institucionales al portal docente.</p>
                </div>
              </div>
            </div>

            <div className='pt-2 flex items-center justify-between text-xs text-muted-foreground'>
              <span>Gestión escolar integral y centralizada.</span>
              <span className='font-semibold text-primary'>Lúmina Educación</span>
            </div>
          </div>
        </div>
      </div>
    </ViewContainer>
  )
}