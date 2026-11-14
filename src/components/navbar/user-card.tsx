import type { UsersResponse } from '@/dtos/types'
import { useSimpleLocalStorage } from '@/hooks/use-localstorage'
import { KEYSTORE_NAMES } from '@/env'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'

export const UserCard = () => {
  const [user] = useSimpleLocalStorage<UsersResponse>(KEYSTORE_NAMES.USER)

  return (
    <div className='flex items-center gap-2 rounded-md hover:bg-muted/80 p-2 cursor-pointer transition-colors'>
      <Avatar>
        <AvatarFallback className='bg-primary/10 text-primary font-bold p-2 rounded-full'>
          {user?.name.split(' ').map((name) => name[0]).join('')}
        </AvatarFallback>
      </Avatar>

      <div className='flex flex-col'>
        <span className='text-sm font-medium text-foreground'>{user?.name}</span>
        <span className='text-xs text-muted-foreground'>{user?.email}</span>
      </div>
    </div>
  )
}