import { useState, useEffect } from 'react'
import {
  Book,
  BookUser,
  Calendar,
  ClipboardCheck,
  GraduationCap,
  Home,
  Settings,
  User,
  List,
  ChevronDown,
  CalendarDays,
  DollarSign,
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar'
import { Link, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { KEYSTORE_NAMES } from '@/env'
import type { UserInstitutionResponse, Teacher } from '@/dtos/types'
import { useSimpleLocalStorage } from '@/hooks/use-localstorage'
import { useOnlineStatus } from '@/hooks/use-online-status'
import clsx from 'clsx'

interface SubMenuItem {
  title: string
  url: string
  icon?: typeof Home
}

interface MenuItem {
  title: string
  url: string
  icon: typeof Home
  items?: SubMenuItem[]
}

// Menu items for Institution.
const ItemsOfInstitution: MenuItem[] = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Estudiantes',
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
    url: '/asignatures',
    icon: Book,
  },
  {
    title: 'Cursos Académicos',
    url: '/courses',
    icon: BookUser,
  },
  {
    title: 'Matrículas',
    url: '/matricule',
    icon: List,
    items: [
      {
        title: 'Gestión Matrículas',
        url: '/matricule',
        icon: GraduationCap,
      },
      {
        title: 'Reportes Diarios',
        url: '/matricule/daily-reports',
        icon: CalendarDays,
      },
      {
        title: 'Reportes Financieros',
        url: '/matricule/financial-reports',
        icon: DollarSign,
      },
    ],
  },
  {
    title: 'Asistencia',
    url: '/assistance',
    icon: ClipboardCheck,
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
]

// Menu items for Teacher.
const ItemsOfTeacher: MenuItem[] = [
  {
    title: 'Inicio',
    url: '/',
    icon: Home,
  },
]

export function AppSidebar() {
  const isOnline = useOnlineStatus()
  const [authInstitution] = useSimpleLocalStorage<UserInstitutionResponse>(KEYSTORE_NAMES.USER_INSTITUTION)
  const [authTeacher] = useSimpleLocalStorage<Teacher>(KEYSTORE_NAMES.TEACHER)
  const { pathname } = useLocation()

  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    ItemsOfInstitution.forEach((item) => {
      if (item.items && (item.items.some((sub) => pathname === sub.url) || pathname.startsWith(item.url))) {
        initial[item.title] = true
      }
    })
    return initial
  })

  useEffect(() => {
    ItemsOfInstitution.forEach((item) => {
      if (item.items && (item.items.some((sub) => pathname === sub.url) || pathname.startsWith(item.url))) {
        setOpenSubMenus((prev) => ({ ...prev, [item.title]: true }))
      }
    })
  }, [pathname])

  const toggleSubMenu = (title: string) => {
    setOpenSubMenus((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  const isActivePath = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname === path || pathname.startsWith(path + '/')
  }

  const items = authInstitution ? ItemsOfInstitution : (authTeacher ? ItemsOfTeacher : [])
  const panelLabel = authInstitution ? 'Institutional Panel' : (authTeacher ? 'Teacher Panel' : 'Panel')

  return (
    <Sidebar variant='sidebar' className='border-r border-sidebar-border/50'>
      <SidebarHeader className='p-4 border-b border-sidebar-border/30'>
        <div className='flex items-center gap-3 px-2'>
          <div className='flex aspect-square size-9 items-center justify-center rounded-xl bg-linear-to-tr from-accent to-violet-500 text-white shadow-lg shadow-accent/20'>
            <GraduationCap className='size-5' />
          </div>
          <div className='flex flex-col leading-tight overflow-hidden'>
            <span className='truncate font-bold text-base tracking-tight text-foreground'>
              Lúmina
            </span>
            <span className='truncate text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80'>
              {panelLabel}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className='px-2 pt-4'>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className='gap-1'>
              {items.map((item) => {
                const hasChildren = Boolean(item.items && item.items.length > 0)
                const isItemActive = hasChildren
                  ? (item.items?.some((sub) => pathname === sub.url) || pathname.startsWith(item.url))
                  : isActivePath(item.url)
                const isOpen = openSubMenus[item.title]

                if (hasChildren) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => toggleSubMenu(item.title)}
                        isActive={isItemActive}
                        className={cn(
                          'transition-all duration-200 h-10 px-3 cursor-pointer select-none justify-between w-full',
                          isItemActive
                            ? 'bg-accent/10 text-accent hover:bg-accent/20 font-medium'
                            : 'text-muted-foreground hover:bg-black/10'
                        )}
                      >
                        <div className='flex items-center gap-3 min-w-0'>
                          <item.icon className={cn(
                            'size-5 transition-transform duration-200 shrink-0',
                            isItemActive ? 'text-accent' : 'text-muted-foreground/70'
                          )} />
                          <span className='text-sm truncate'>{item.title}</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            'size-4 transition-transform duration-200 shrink-0 text-muted-foreground/70',
                            isOpen ? 'rotate-180 text-accent' : ''
                          )}
                        />
                      </SidebarMenuButton>

                      {isOpen && (
                        <SidebarMenuSub className='my-1 gap-1 border-sidebar-border/60 pl-3'>
                          {item.items?.map((subItem) => {
                            const isSubActive = pathname === subItem.url
                            return (
                              <SidebarMenuSubItem key={subItem.url}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isSubActive}
                                  className={cn(
                                    'transition-all duration-200 h-8 px-3 rounded-md',
                                    isSubActive
                                      ? 'bg-accent/10 text-accent font-medium hover:bg-accent/20'
                                      : 'text-muted-foreground hover:bg-black/5 hover:text-foreground'
                                  )}
                                >
                                  <Link to={subItem.url} className='flex items-center gap-2'>
                                    {subItem.icon && (
                                      <subItem.icon className={cn(
                                        'size-3.5 shrink-0 transition-colors duration-200',
                                        isSubActive ? 'text-accent' : 'text-muted-foreground/70'
                                      )} />
                                    )}
                                    <span className='text-xs'>{subItem.title}</span>
                                    {isSubActive && (
                                      <div className='ml-auto size-1.5 rounded-full bg-accent shadow-sm' />
                                    )}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )
                          })}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  )
                }

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActivePath(item.url)}
                      className={cn(
                        'transition-all duration-200 h-10 px-3',
                        isActivePath(item.url)
                          ? 'bg-accent/10 text-accent hover:bg-accent/70 hover:text-white font-medium'
                          : 'text-muted-foreground hover:bg-black/10'
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
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='p-4 mt-auto border-t border-sidebar-border/30'>
        <div className='flex items-center gap-2'>
          <div className={clsx('size-2 rounded-full animate-pulse', isOnline ? 'bg-emerald-500' : 'bg-red-500')} />
          <span className='text-[11px] font-medium text-muted-foreground uppercase tracking-widest line-clamp-1'>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}