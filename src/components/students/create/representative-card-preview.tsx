import { User, Phone, Mail, IdCard, Trash2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ResponsablePerson } from '@/dtos/types'
import { useRepresentativeStore } from '@/store/representatice.store'

interface RepresentativeCardPreviewProps {
  representative: ResponsablePerson
}

export const RepresentativeCardPreview = ({ representative: rep }: RepresentativeCardPreviewProps) => {
  const { clearRepresentative } = useRepresentativeStore()

  const handleRemove = () => {
    clearRepresentative()
  }

  return (
    <div className='relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-card to-card/80 shadow-lg transition-all duration-300 hover:shadow-xl'>
      <div className='absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-accent via-accent/70 to-accent/40 rounded-t-2xl' />

      <div className='p-6'>
        <div className='flex items-start justify-between gap-4 mb-5'>
          <div className='flex items-center gap-4'>
            <div className='relative shrink-0'>
              <div className='h-14 w-14 rounded-2xl bg-linear-to-br from-accent/20 to-accent/10 border border-accent/20 flex items-center justify-center'>
                <User className='h-7 w-7 text-accent' />
              </div>
              <span className='absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-card flex items-center justify-center'>
                <CheckCircle2 className='h-2.5 w-2.5 text-white' strokeWidth={3} />
              </span>
            </div>

            <div className='min-w-0'>
              <p className='text-base font-bold text-foreground truncate leading-tight'>
                {rep.fullName}
              </p>
              <Badge
                variant='secondary'
                className='mt-1 text-[10px] font-semibold px-2 py-0 bg-accent/10 text-accent border border-accent/20 rounded-full'
              >
                Representante
              </Badge>
            </div>
          </div>

          <Button
            type='button'
            size='sm'
            variant='ghost'
            className='shrink-0 h-9 w-9 p-0 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 group'
            onClick={handleRemove}
            title='Eliminar representante'
          >
            <Trash2 className='h-4 w-4 transition-transform duration-200 group-hover:scale-110' />
          </Button>
        </div>

        <div className='h-px bg-border/50 mb-4' />

        <div className='grid gap-2.5'>
          {rep.identification && (
            <div className='flex items-center gap-3 group/item'>
              <div className='h-8 w-8 rounded-xl bg-muted/60 flex items-center justify-center shrink-0 group-hover/item:bg-accent/10 transition-colors duration-200'>
                <IdCard className='h-4 w-4 text-muted-foreground group-hover/item:text-accent transition-colors duration-200' />
              </div>
              <div className='min-w-0'>
                <p className='text-[10px] font-medium text-muted-foreground uppercase tracking-wide leading-none mb-0.5'>Cédula</p>
                <p className='text-sm font-semibold text-foreground truncate'>{rep.identification}</p>
              </div>
            </div>
          )}

          {rep.phoneNumber && (
            <div className='flex items-center gap-3 group/item'>
              <div className='h-8 w-8 rounded-xl bg-muted/60 flex items-center justify-center shrink-0 group-hover/item:bg-accent/10 transition-colors duration-200'>
                <Phone className='h-4 w-4 text-muted-foreground group-hover/item:text-accent transition-colors duration-200' />
              </div>
              <div className='min-w-0'>
                <p className='text-[10px] font-medium text-muted-foreground uppercase tracking-wide leading-none mb-0.5'>Teléfono</p>
                <p className='text-sm font-semibold text-foreground truncate'>{rep.phoneNumber}</p>
              </div>
            </div>
          )}

          {rep.email && (
            <div className='flex items-center gap-3 group/item'>
              <div className='h-8 w-8 rounded-xl bg-muted/60 flex items-center justify-center shrink-0 group-hover/item:bg-accent/10 transition-colors duration-200'>
                <Mail className='h-4 w-4 text-muted-foreground group-hover/item:text-accent transition-colors duration-200' />
              </div>
              <div className='min-w-0'>
                <p className='text-[10px] font-medium text-muted-foreground uppercase tracking-wide leading-none mb-0.5'>Correo</p>
                <p className='text-sm font-semibold text-foreground truncate'>{rep.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
