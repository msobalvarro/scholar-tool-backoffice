import { WEEK_DAYS } from '@/constants/calendar-events.constant'
import { useState } from 'react'
import { Input } from '../ui/input'
import type { AsignatureResponse } from '@/dtos/outputs/asignature-output'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from '../ui/select'

interface Hour {
  start: string
  end: string
}

interface Props {
  asignatures: AsignatureResponse[]
}

export const RowAddSchedule = ({ asignatures = [] }: Props) => {
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
            <Select >
              <SelectTrigger >
                <SelectValue placeholder='Elegir asignatura' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {asignatures.map(asignature => (
                    <SelectItem key={asignature._id} value={asignature._id}>
                      <b>{asignature.name}</b> <span className='muted'>{asignature.description}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </td>
      ))}
    </tr>
  )
}