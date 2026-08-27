import { useState } from 'react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog'
import { useSimpleLocalStorage } from '@/hooks/use-localstorage'
import { KEYSTORE_NAMES } from '@/env'
import type { UserInstitutionResponse, Teacher } from '@/dtos/types'

export function NavbarUserMenu() {
  const [userInstitution] = useSimpleLocalStorage<UserInstitutionResponse>(KEYSTORE_NAMES.USER_INSTITUTION)
  const [teacher] = useSimpleLocalStorage<Teacher>(KEYSTORE_NAMES.TEACHER)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const user = userInstitution || teacher

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <>
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
          <DropdownMenuItem
            className='text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer'
            onClick={() => setShowLogoutConfirm(true)}
          >
            <LogOut className='mr-2 h-4 w-4' />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className='sm:max-w-100 rounded-3xl p-8 border-none shadow-2xl bg-white dark:bg-zinc-900'>
          <DialogHeader className='flex flex-col items-center text-center'>
            <div className='w-16 h-16 bg-red-50 dark:bg-red-950/50 text-red-500 rounded-2xl flex items-center justify-center mb-4'>
              <LogOut className='w-8 h-8' />
            </div>
            <DialogTitle className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              ¿Cerrar sesión?
            </DialogTitle>
            <DialogDescription className='text-gray-500 dark:text-gray-400 mt-2'>
              ¿Estás seguro de que deseas cerrar sesión? Deberás ingresar tus credenciales para volver a acceder.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className='gap-3 pt-6 flex-col sm:flex-row'>
            <Button
              variant='outline'
              onClick={() => setShowLogoutConfirm(false)}
              className='rounded-xl h-11 flex-1 font-semibold'
            >
              Cancelar
            </Button>
            <Button
              onClick={handleLogout}
              className='rounded-xl h-11 flex-1 font-semibold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200 dark:shadow-none'
            >
              Cerrar sesión
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
