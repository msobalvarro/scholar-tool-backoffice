import { User, Users, Mail, Phone, Briefcase, Heart } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export const CreateRepresentative = () => {
  return (
    <CardContent className='p-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6'>
        <div className='space-y-2 lg:col-span-2'>
          <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>Nombre Completo</label>
          <div className='relative'>
            <User className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400' />
            <Input className='pl-9' placeholder='Ej. María Pérez' />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>Parentesco</label>
          <Select defaultValue="Madre">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Madre">Madre</SelectItem>
              <SelectItem value="Padre">Padre</SelectItem>
              <SelectItem value="Abuelo/a">Abuelo/a</SelectItem>
              <SelectItem value="Tío/a">Tío/a</SelectItem>
              <SelectItem value="Otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>Teléfono Móvil</label>
          <div className='relative'>
            <Phone className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400' />
            <Input className='pl-9' placeholder='(55) 9876 5432' type='tel' />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>Correo Electrónico</label>
          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400' />
            <Input className='pl-9' placeholder='tutor@email.com' type='email' />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>Ocupación</label>
          <div className='relative'>
            <Briefcase className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400' />
            <Input className='pl-9' placeholder='Ej. Ingeniero' />
          </div>
        </div>

        <div className='lg:col-span-3 pt-2'>
          <Separator className='mb-6' />
          <div className='flex items-center gap-3 p-4 bg-accent/5 rounded-xl border border-accent/10 transition-all hover:bg-accent/10 group cursor-pointer'>
            <div className='flex items-center justify-center size-5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-has-[:checked]:bg-accent group-has-[:checked]:border-accent transition-colors'>
              <input className='sr-only peer' id='emergency_contact' type='checkbox' />
              <Heart className='size-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity' />
            </div>
            <label className='text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer flex-1' htmlFor='emergency_contact'>
              Designar como contacto de emergencia principal
            </label>
            <div className='text-xs font-bold text-accent opacity-0 group-has-[:checked]:opacity-100 transition-opacity uppercase tracking-widest'>
              Seleccionado
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  )
}