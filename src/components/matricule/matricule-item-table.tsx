import type { IEnrollment } from '@/dtos/outputs/enrollment-output'
import { Input } from '../ui/input'

interface Props {
  enrollment: IEnrollment
}

export const MatriculeItemTable = ({ enrollment }: Props) => {
  return (
    <div className='flex gap-2'>
      <div className='flex flex-col gap-1'>
        <span className='font-bold'>{enrollment.name}</span>
        <div className='flex gap-1 items-center'>
          {enrollment.courses?.map(course => (
            <span className='text-xs text-muted' key={course._id}>{course.name}</span>
          ))}
        </div>
      </div>

      <div className='flex flex-col'>
        <label>Matricula</label>
        <Input type='number' placeholder='$' />
      </div>

      <div className='flex flex-col'>
        <label>Mensualidad</label>
        <Input type='number' placeholder='$' />
      </div>
    </div>
  )
}