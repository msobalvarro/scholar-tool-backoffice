import type { IEnrollment } from '@/dtos/outputs/enrollment-output'
import { MatriculeItemTable } from './matricule-item-table'
import { Button } from '../ui/button'
import { useState } from 'react'
import { CreateMatriculeModal } from './create-matricule-modal'

interface Props {
  enrollments: IEnrollment[]
}

export const MatriculeTable = ({ enrollments }: Props) => {
  const [showCreate, toggleCreate] = useState(false)

  return (
    <section className='bg-white border shadow rounded-lg p-4'>
      <div className='flex justify-between mb-4'>
        <h1 className='font-bold text-lg'>Todas las matriculas</h1>
        <Button onClick={() => toggleCreate(true)}>Agregar Matricula</Button>
      </div>

      <div className=' flex flex-col gap-2'>
        {enrollments.map(enrollment => (
          <MatriculeItemTable key={enrollment._id} enrollment={enrollment} />
        ))}
      </div>

      {showCreate && <CreateMatriculeModal onClose={() => toggleCreate(false)} />}
    </section>
  )
}