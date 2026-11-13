import { WEEK_DAYS } from '@/constants/calendar-events.constant'
import { CalendarPlus } from 'lucide-react'
import { useState } from 'react'
import { Input } from '../ui/input'

interface Hour {
  start: string
  end: string
}

export const RowAddSchedule = () => {
  const [hours, setHours] = useState<Hour>({
    start: '',
    end: ''
  });


  return (
    <tr>
      <td className='flex flex-col gap-2 p-4'>
        <div className='flex gap-2 justify-center'>
          <label>
            <p className='text-left px-2'>Inicio</p>
            <Input className='w-36 text-center' type='time' value={hours.start} onChange={e => setHours({ ...hours, start: e.target.value })} />
          </label>

          <label>
            <p className='text-right px-2'>Fin</p>
            <Input className='w-36 text-center' type='time' value={hours?.end} onChange={e => setHours({ ...hours, end: e.target.value })} />
          </label>
        </div>
      </td>


      {WEEK_DAYS.map((_, index) => (
        <td key={index} className='px-4'>
          <div className='flex flex-col items-center justify-center border h-16 border-dashed rounded-lg'>
            <CalendarPlus size={32} />
            Agregar Horario
          </div>
        </td>
      ))}
    </tr>
  )
}