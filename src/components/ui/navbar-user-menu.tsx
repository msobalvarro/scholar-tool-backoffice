import {
  User,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { Avatar, AvatarFallback } from './avatar'
import { useSimpleLocalStorage } from '@/hooks/use-localstorage'
import { KEYSTORE_NAMES } from '@/utils/constant'
import type { UserInstitutionResponse } from '@/utils/types'

export function NavbarUserMenu() {
  const [user] = useSimpleLocalStorage<UserInstitutionResponse>(KEYSTORE_NAMES.USER_INSTITUTION)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='bg-transparent hover:bg-black/5'>
          <div className='hidden flex-col items-end md:flex'>
            <span className='text-sm font-medium leading-none text-accent'>{user?.name}</span>
            <span className='text-xs text-muted-foreground'>{user?.email}</span>
          </div>
          <Avatar className='h-8 w-8 border border-border/50'>
            <AvatarFallback className='bg-accent text-[10px] text-white'>
              {user?.name?.split(' ').map((n) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className='h-4 w-4 text-muted-foreground' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user?.name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className='mr-2 h-4 w-4' />
            <span>Account Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-destructive focus:bg-destructive/10 focus:text-destructive'>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
