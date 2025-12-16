import { Home } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Link, useLocation, } from 'react-router'
import clsx from 'clsx'

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
]

export function AppSidebar() {
  const { pathname } = useLocation()
  const isActivePath = (path: string) => pathname === path

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Escolar Tool - Administrador</SidebarGroupLabel>

          <SidebarGroupContent className='flex-1'>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className={clsx(['text-lg font-light', isActivePath(item.url) && 'bg-[#FFFFFF10]'])} asChild>
                    <Link to={item.url}>
                      <item.icon className='size-8' />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}