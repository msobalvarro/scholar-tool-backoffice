import {
  Book,
  BookUser,
  Calendar,
  GraduationCap,
  Home,
  Settings,
  User
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Link, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { ModeToggle } from './mode-toggle'
import { KEYSTORE_NAMES } from '@/utils/constant'
import type { UserInstitutionResponse } from '@/utils/types'
import { useSimpleLocalStorage } from '@/hooks/use-localstorage'
import { useOnlineStatus } from '@/hooks/use-online-status'
import clsx from 'clsx'

// Menu items.
const ItemsOfInstitution = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Alumnos',
    url: '/students',
    icon: User,
  },
  {
    title: 'Profesores',
    url: '/teachers',
    icon: User,
  },
  {
    title: 'Materias',
    url: '/subjects',
    icon: Book,
  },
  {
    title: 'Calendario',
    url: '/calendar',
    icon: Calendar,
  },
  {
    title: 'Configuración',
    url: '/configuration',
    icon: Settings,
  },
  {
    title: 'Grupos',
    url: '/groups',
    icon: BookUser,
  },
]

export function AppSidebar() {
  const isOnline = useOnlineStatus()
  const [authInstitution] = useSimpleLocalStorage<UserInstitutionResponse>(KEYSTORE_NAMES.USER_INSTITUTION)
  const { pathname } = useLocation()

  const isActivePath = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <Sidebar variant='sidebar' className='border-r border-sidebar-border/50'>
      <SidebarHeader className='p-4 border-b border-sidebar-border/30'>
        <div className='flex items-center gap-3 px-2'>
          <div className='flex aspect-square size-9 items-center justify-center rounded-xl bg-linear-to-tr from-accent to-violet-500 text-white shadow-lg shadow-accent/20'>
            <GraduationCap className='size-5' />
          </div>
          <div className='flex flex-col leading-tight overflow-hidden'>
            <span className='truncate font-bold text-base tracking-tight text-foreground'>
              ScholarTool
            </span>
            <span className='truncate text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80'>
              Institutional Panel
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className='px-2 pt-4'>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className='gap-1'>
              {authInstitution && ItemsOfInstitution.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath(item.url)}
                    className={cn(
                      'transition-all duration-200 h-10 px-3',
                      isActivePath(item.url)
                        ? 'bg-accent/10 text-accent hover:bg-accent/15 hover:text-accent font-medium'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                    )}
                  >
                    <Link to={item.url} className='flex items-center gap-3'>
                      <item.icon className={cn(
                        'size-5 transition-transform duration-200',
                        isActivePath(item.url) ? 'text-accent' : 'text-muted-foreground/70'
                      )} />
                      <span className='text-sm'>{item.title}</span>
                      {isActivePath(item.url) && (
                        <div className='ml-auto size-1.5 rounded-full bg-accent shadow-sm' />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='p-4 mt-auto border-t border-sidebar-border/30'>
        <div className='flex items-center justify-between px-2'>
          <div className='flex items-center gap-2'>
            <div className={clsx('size-2 rounded-full animate-pulse', isOnline ? 'bg-emerald-500' : 'bg-red-500')} />
            <span className='text-[11px] font-medium text-muted-foreground uppercase tracking-widest line-clamp-1'>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}