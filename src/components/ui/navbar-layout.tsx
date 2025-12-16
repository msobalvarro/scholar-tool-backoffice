import { UserCard } from '../navbar/user-card'
import { ModeToggle } from './mode-toggle'
import { SidebarTrigger } from './sidebar'

export const NavbarLayout = () => (
  <nav className='flex items-center p-4 border-b-2 bg-[#FFFFFF10]'>
    <SidebarTrigger />

    <div className='flex-1 flex items-center justify-end gap-4'>
      <ModeToggle />

      <UserCard />
    </div>
  </nav>
)