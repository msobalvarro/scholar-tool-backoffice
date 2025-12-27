import type { CoursesResponse } from '@/utils/types'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { GroupCard } from './GroupCard'

interface GroupListProps {
  groups: CoursesResponse[]
  selectedGroupId?: string | null
  onSelectGroup: (id: string) => void
}

export const GroupList = ({ groups, selectedGroupId, onSelectGroup }: GroupListProps) => {
  return (
    <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 w-full lg:w-80 min-h-[50vh]'>

      <div className='relative mb-6'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
        <Input
          placeholder='Filtrar grupos...'
          className='pl-10 bg-gray-50 border-none rounded-xl focus-visible:ring-blue-500'
        />
      </div>

      <div className='space-y-1 max-h-[calc(100vh-350px)] overflow-y-auto pr-1'>
        {groups.map((group) => (
          <GroupCard
            key={group._id}
            group={group}
            isActive={selectedGroupId === group._id}
            onClick={() => onSelectGroup(group._id)}
          />
        ))}
      </div>
    </div>
  )
}
