import type { UsersResponse } from '@/dtos/types'
import { useSimpleLocalStorage } from '@/hooks/use-localstorage'
import { KEYSTORE_NAMES } from '@/env'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'

export const UserCard = () => {
  const [user] = useSimpleLocalStorage<UsersResponse>(KEYSTORE_NAMES.USER)

  return (
    <div className='flex items-center gap-2 rounded-md hover:bg-[#00000020] py-2 px-3 cursor-pointer'>
      <Avatar>
        <AvatarFallback className='bg-sky-600 p-2 rounded-full'>
          {user?.name.split(' ').map((name) => name[0]).join('')}
        </AvatarFallback>
      </Avatar>

      <div className='flex flex-col'>
        <span>{user?.name}</span>
        <span className='text-xs opacity-50'>{user?.email}</span>

      </div>
    </div>
  )
}