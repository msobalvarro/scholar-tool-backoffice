import { Link, useNavigate, useLocation } from 'react-router'
import {
  Compass,
  ArrowLeft,
  Home,
  FileQuestion,
  Users,
  Calendar,
  ClipboardCheck,
  Building2,
  Sparkles,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ViewContainer } from '@/components/ui/view-container'
import { HeaderLogout } from '@/components/ui/header-logout'
import { FooterLogout } from '@/components/ui/footer-logout'
import { useSimpleLocalStorage } from '@/hooks/use-localstorage'
import { KEYSTORE_NAMES } from '@/env'

interface NotFoundViewProps {
  isPublic?: boolean
}

export const NotFoundView = ({ isPublic: explicitPublic }: NotFoundViewProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [isAuthTeacher] = useSimpleLocalStorage<string | null>(KEYSTORE_NAMES.TOKEN_TEACHER)
  const [isAuthUserInstitution] = useSimpleLocalStorage<string | null>(KEYSTORE_NAMES.TOKEN_USER_INSTITUTION)

  const isPublic = explicitPublic ?? (!isAuthTeacher && !isAuthUserInstitution)

  const homeHref = isAuthTeacher ? '/' : isAuthUserInstitution ? '/' : '/'

  const content = (
    <div className='w-full max-w-2xl mx-auto flex flex-col items-center text-center py-6 px-4'>
      {/* Decorative Badge */}
      <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-400/10 border border-redbg-red-400/20 text-redbg-red-400 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse'>
        <Sparkles className='size-3.5' />
        <span>Error 404 • Página No Encontrada</span>
      </div>

      {/* Main Illustration / Number Display */}
      <div className='relative flex items-center justify-center mb-6'>
        {/* Glow effect behind the 404 */}
        <div className='absolute size-48 rounded-full bg-linear-to-tr from-primary/30 via-indigo-500/20 to-accent/30 blur-3xl pointer-events-none' />

        <div className='relative z-10 flex items-center gap-2 select-none'>
          <span className='text-8xl sm:text-9xl font-black tracking-tighter bg-linear-to-b from-primary via-indigo-600 to-accent bg-clip-text text-transparent drop-shadow-sm'>
            4
          </span>
          <div className='relative size-20 sm:size-24 rounded-3xl bg-card border-2 border-primary/30 shadow-2xl flex items-center justify-center p-3 transform rotate-6 hover:rotate-0 transition-transform duration-300'>
            <Compass className='size-12 sm:size-14 text-primary animate-spin-slow' />
          </div>
          <span className='text-8xl sm:text-9xl font-black tracking-tighter bg-linear-to-b from-primary via-indigo-600 to-accent bg-clip-text text-transparent drop-shadow-sm'>
            4
          </span>
        </div>
      </div>

      {/* Heading and Description */}
      <h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-3'>
        ¿Te has desorientado en la plataforma?
      </h1>
      <p className='text-sm sm:text-base text-muted-foreground max-w-lg mb-4 leading-relaxed'>
        La página o recurso que buscas no existe, ha sido movido de lugar o la ruta escrita no es válida.
      </p>

      {/* Requested Path Badge */}
      <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-muted/60 border border-border/70 text-xs text-muted-foreground font-mono mb-8 max-w-full overflow-hidden text-ellipsis'>
        <FileQuestion className='size-3.5 shrink-0 text-muted-foreground' />
        <span className='truncate'>{location.pathname}</span>
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-10'>
        <Button
          asChild
          size='lg'
          className='w-full sm:w-auto h-11 px-6 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer'
        >
          <Link to={homeHref}>
            <Home className='size-4' />
            <span>Volver al Inicio</span>
          </Link>
        </Button>

        <Button
          onClick={() => navigate(-1)}
          variant='outline'
          size='lg'
          className='w-full sm:w-auto h-11 px-6 rounded-2xl border-border/80 hover:bg-muted/80 font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer'
        >
          <ArrowLeft className='size-4' />
          <span>Regresar a la página anterior</span>
        </Button>
      </div>

      {/* Suggested Shortcuts (for logged-in users) */}
      {(isAuthUserInstitution) && (
        <div className='w-full border-t border-border/60 pt-6 text-left'>
          <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center sm:text-left'>
            Accesos directos rápidos
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {isAuthUserInstitution && (
              <>
                <Link
                  to='/students'
                  className='p-3 rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:bg-muted/40 transition-all flex items-center gap-3 text-xs font-semibold text-foreground group'
                >
                  <div className='size-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform'>
                    <Users className='size-4' />
                  </div>
                  <span>Estudiantes</span>
                </Link>

                <Link
                  to='/assistance'
                  className='p-3 rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:bg-muted/40 transition-all flex items-center gap-3 text-xs font-semibold text-foreground group'
                >
                  <div className='size-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform'>
                    <ClipboardCheck className='size-4' />
                  </div>
                  <span>Asistencias</span>
                </Link>

                <Link
                  to='/calendar'
                  className='p-3 rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:bg-muted/40 transition-all flex items-center gap-3 text-xs font-semibold text-foreground group'
                >
                  <div className='size-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform'>
                    <Calendar className='size-4' />
                  </div>
                  <span>Calendario</span>
                </Link>
              </>
            )}

            {isAuthTeacher && (
              <>
                <Link
                  to='/'
                  className='p-3 rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:bg-muted/40 transition-all flex items-center gap-3 text-xs font-semibold text-foreground group'
                >
                  <div className='size-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform'>
                    <Home className='size-4' />
                  </div>
                  <span>Panel Docente</span>
                </Link>

                <Link
                  to='/assistance'
                  className='p-3 rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:bg-muted/40 transition-all flex items-center gap-3 text-xs font-semibold text-foreground group'
                >
                  <div className='size-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform'>
                    <ClipboardCheck className='size-4' />
                  </div>
                  <span>Tomar Asistencia</span>
                </Link>

                <Link
                  to='/calendar'
                  className='p-3 rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:bg-muted/40 transition-all flex items-center gap-3 text-xs font-semibold text-foreground group'
                >
                  <div className='size-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform'>
                    <Calendar className='size-4' />
                  </div>
                  <span>Calendario Escolar</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Public Shortcuts */}
      {!isAuthUserInstitution && !isAuthTeacher && (
        <div className='w-full border-t border-border/60 pt-6 text-center sm:text-left'>
          <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center'>
            Inicia sesión en tu cuenta
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto'>
            <Link
              to='/'
              className='p-3.5 rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:bg-muted/40 transition-all flex items-center gap-3 text-xs font-semibold text-foreground group'
            >
              <div className='size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform'>
                <Building2 className='size-4' />
              </div>
              <div className='text-left'>
                <div className='font-bold text-foreground'>Portal Institucional</div>
                <div className='text-[11px] text-muted-foreground font-normal'>Ingreso para directores</div>
              </div>
            </Link>

            <Link
              to='/teacher'
              className='p-3.5 rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:bg-muted/40 transition-all flex items-center gap-3 text-xs font-semibold text-foreground group'
            >
              <div className='size-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform'>
                <HelpCircle className='size-4' />
              </div>
              <div className='text-left'>
                <div className='font-bold text-foreground'>Portal Docente</div>
                <div className='text-[11px] text-muted-foreground font-normal'>Ingreso para profesores</div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )

  if (isPublic) {
    return (
      <div className='relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden selection:bg-primary/20'>
        {/* Background Ambient Glow Orbs */}
        <div className='pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-primary/15 blur-3xl' />
        <div className='pointer-events-none absolute top-1/3 -right-40 size-96 rounded-full bg-accent/15 blur-3xl' />
        <div className='pointer-events-none absolute -bottom-40 left-1/3 size-96 rounded-full bg-secondary/15 blur-3xl' />

        <HeaderLogout />

        <main className='relative z-10 grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
          {content}
        </main>

        <FooterLogout />
      </div>
    )
  }

  return (
    <ViewContainer className='flex items-center justify-center min-h-[calc(100vh-8rem)]'>
      {content}
    </ViewContainer>
  )
}
