import { useCourses } from '@/hooks/API/use-course'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ClassScheduleInputFilters } from '@/dtos/inputs/class-schedule-input'

interface Props {
  onChange?(value: ClassScheduleInputFilters): void
}

export const ClassScheduleFilters = ({ onChange }: Props) => {
  const [courseId, setCourseId] = useState('')
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const { data: courses } = useCourses()

  useEffect(() => { onChange?.({ courseId, year }) }, [courseId, year])

  return (
    <div className='flex items-center gap-2 bg-white w-fit p-2 rounded-xl border shadow-sm'>
      <Select value={courseId} onValueChange={setCourseId}>
        <SelectTrigger className="w-full max-w-48 border-none">
          <SelectValue placeholder='Seleccionar curso' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Cursos</SelectLabel>
            {courses?.map((item) => (
              <SelectItem key={item._id} value={item._id}>
                {item.name} {item.groupName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        onChange={(e) => setYear(e.target.value)}
        value={year}
        type='number'
        placeholder='Año escolar' />
    </div>
  )
}