import type { CoursesResponse } from '@/dtos/types'
import { Badge } from '@/components/ui/badge'
import { User } from 'lucide-react'

interface GroupCardProps {
  group: CoursesResponse
  isActive: boolean
  onClick: () => void
}

export const CourseCard = ({ group, isActive, onClick }: GroupCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all border-2 mb-3 ${isActive
        ? 'border-primary bg-primary/5 shadow-xs relative'
        : 'border-border/60 hover:bg-muted/50 bg-card'
        }`}
    >
      <div className='flex justify-between items-start mb-1'>
        <h4 className={`font-bold ${isActive ? 'text-primary' : 'text-foreground'}`}>
          {group.name}
        </h4>
        <Badge variant='secondary' className='bg-primary/10 text-primary font-medium'>
          {group.studentCount} Alumnos
        </Badge>
      </div>
      <div className='flex items-center gap-2 text-xs text-muted-foreground mt-2'>
        <div className='w-5 h-5 rounded-full bg-muted flex items-center justify-center text-muted-foreground'>
          <User className='w-3 h-3' />
        </div>
        <span>{group.teacherLead.name}</span>
      </div>
      {isActive && (
        <div className='absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl' />
      )}
    </div>
  )
}
