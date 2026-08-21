import { GraduationCap, Sparkles, Building2, UserCheck } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { ModeToggle } from './mode-toggle'

export const HeaderLogout = () => {
  const location = useLocation()
  const isTeacherPath = location.pathname.startsWith('/teacher')

  return (
    <header className='sticky top-0 z-30 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-colors'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4'>
        {/* Brand */}
        <Link to='/' className='flex items-center gap-3 group transition-transform active:scale-98'>
          <div className='size-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md shadow-primary/20 group-hover:shadow-primary/30 transition-all'>
            <GraduationCap className='size-6 text-white' />
          </div>
          <div>
            <div className='flex items-center gap-1.5'>
              <span className='font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text'>
                ScholarTool
              </span>
              <span className='inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20'>
                <Sparkles className='size-2.5' /> BackOffice
              </span>
            </div>
            <p className='text-[11px] text-muted-foreground hidden sm:block leading-none'>
              Sistema de Gestión Educativa
            </p>
          </div>
        </Link>

        {/* Center / Role Selector Nav */}
        <div className='flex items-center bg-muted/60 p-1 rounded-xl border border-border/60 text-xs font-medium'>
          <Link
            to='/'
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              !isTeacherPath
                ? 'bg-card text-foreground font-semibold shadow-xs border border-border/50'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Building2 className='size-3.5' />
            <span>Administración</span>
          </Link>
          <Link
            to='/teacher'
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              isTeacherPath
                ? 'bg-card text-foreground font-semibold shadow-xs border border-border/50'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <UserCheck className='size-3.5' />
            <span>Docentes</span>
          </Link>
        </div>

        {/* Actions (Theme toggle) */}
        <div className='flex items-center gap-2'>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}