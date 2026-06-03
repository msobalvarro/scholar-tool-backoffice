import { User, Phone, Mail, IdCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ResponsablePerson } from '@/dtos/types'
import { useRepresentativeStore } from '@/store/representatice.store'

interface RepresentativeCardProps {
  representative: ResponsablePerson
}

export const RepresentativeCard = ({ representative: rep }: RepresentativeCardProps) => {
  const { setRepresentative } = useRepresentativeStore()

  return (
    <div className='rounded-lg border px-4 py-3 space-y-2 hover:bg-muted/30 transition-colors'>
      {/* Info */}
      <div className='flex items-start justify-between gap-3'>
        <div className='space-y-1 min-w-0'>
          <div className='flex items-center gap-2 font-medium text-sm'>
            <User className='h-4 w-4 text-muted-foreground shrink-0' />
            <span className='truncate'>{rep.fullName}</span>
          </div>
          <div className='flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pl-6'>
            {rep.identification && (
              <span className='flex items-center gap-1'>
                <IdCard className='h-3 w-3' />
                {rep.identification}
              </span>
            )}
            {rep.phoneNumber && (
              <span className='flex items-center gap-1'>
                <Phone className='h-3 w-3' />
                {rep.phoneNumber}
              </span>
            )}
            {rep.email && (
              <span className='flex items-center gap-1'>
                <Mail className='h-3 w-3' />
                {rep.email}
              </span>
            )}
          </div>
        </div>

        {/* Select button */}
        <Button
          type='button'
          size='sm'
          variant='outline'
          className='shrink-0'
          onClick={() => setRepresentative(rep)}
        >
          Seleccionar
        </Button>
      </div>
    </div>
  )
}
