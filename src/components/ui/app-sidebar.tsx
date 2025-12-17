import {
  Book,
  BookUser,
  Calendar,
  Home,
  Settings,
  User
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from '@/components/ui/sidebar'
import { Link, useLocation, } from 'react-router'
import clsx from 'clsx'
import { ModeToggle } from './mode-toggle'
import { KEYSTORE_NAMES } from '@/utils/constant'
import type { UserInstitutionResponse } from '@/utils/types'
import { useSimpleLocalStorage } from '@/hooks/use-localstorage'

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
  const [authInstitution] = useSimpleLocalStorage<UserInstitutionResponse>(KEYSTORE_NAMES.USER_INSTITUTION)
  const { pathname } = useLocation()
  const isActivePath = (path: string) => pathname === path

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className='flex-1'>
            <SidebarMenu>
              {authInstitution && ItemsOfInstitution.map((item) => (
                <div
                  key={item.url}
                  className={
                    clsx(
                      [
                        'text-xl hover:bg-[#00000020] rounded py-2 px-1',
                        isActivePath(item.url) && 'bg-[#00000020]'
                      ]
                    )}>
                  <Link className='flex gap-x-2 items-center' to={item.url}>
                    <item.icon className='size-7' />
                    <span className='font-light'>{item.title}</span>
                  </Link>
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className='p-4'>
        <ModeToggle />
      </div>
    </Sidebar>
  )
}