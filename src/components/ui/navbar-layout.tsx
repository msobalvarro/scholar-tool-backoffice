import { SidebarTrigger } from './sidebar'
import { ModeToggle } from './mode-toggle'
import { DropdownNotifications } from './dropdown-notifications'
import { NavbarUserMenu } from './navbar-user-menu'

export function NavbarLayout() {
  return (
    <nav className='sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-background/60 px-4 backdrop-blur'>
      <div className='flex items-center gap-4'>
        <SidebarTrigger />
      </div>

      <div className='flex items-center gap-2 md:gap-4'>
        <div className='flex items-center gap-2'>
          <ModeToggle />
          <DropdownNotifications />
        </div>

        <NavbarUserMenu />
      </div>
    </nav>
  )
}
