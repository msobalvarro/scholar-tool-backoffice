import { User, Camera } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const PersonalInformation = () => {
  return (
    <section className='rounded-xl border border-slate-200 bg-surface-light shadow-sm bg-background pb-8'>
      <div className='border-b border-slate-100 px-6 py-4 dark:border-slate-800'>
        <h2 className='text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2'>
          <User className='size-5 text-accent' />
          Información Personal
        </h2>
      </div>
      <div className='flex flex-col md:flex-row gap-12 px-12 items-center'>
        <div className='flex flex-col gap-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1'>
            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                Nombre(s) <span className='text-red-500'>*</span>
              </label>
              <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500'
                placeholder='Ej. Juan Pablo' type='text' required />
            </div>
            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Apellido Paterno</label>
              <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500'
                placeholder='Ej. Pérez' type='text' required />
            </div>
            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Apellido Materno</label>
              <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500'
                placeholder='Ej. López' type='text' />
            </div>
            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Fecha de Nacimiento</label>
              <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white'
                type='date' required />
            </div>
            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Género</label>
              <Select required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='male'>Masculino</SelectItem>
                  <SelectItem value='female'>Femenino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                Partida Nacimiento / Cédula
              </label>
              <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500' placeholder='ID Estudiante' type='text' />
            </div>

            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Número de Teléfono</label>
              <input
                className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500'
                placeholder='12345678'
                type='tel'
                maxLength={8}
                minLength={8}
                required
              />
            </div>
            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Dirección</label>
              <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500'
                placeholder='Ej. Av. Reforma 123' type='text' />
            </div>

            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Colonia / Barrio / Sector</label>
              <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white'
                placeholder='Ej. Las Colinas' type='text' />
            </div>
            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Ciudad / Estado</label>
              <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white'
                placeholder='Ej. Managua' type='text' />
            </div>

            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Teléfono</label>
              <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white'
                placeholder='12345678' maxLength={8} minLength={8} type='tel' />
            </div>
            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Email</label>
              <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white'
                placeholder='alumno@email.com' type='email' />
            </div>

          </div>
        </div>

        <div className='flex flex-col items-center space-y-3 shrink-0'>
          <div className='relative group cursor-pointer'>
            <div className='h-32 w-32 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden dark:bg-slate-800 dark:border-slate-600' data-alt='Placeholder for student profile photo upload area'>
              <Camera className='size-10 text-slate-400' />
            </div>
            <div className='absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
              <span className='text-white text-xs font-medium'>Cambiar Foto</span>
            </div>
          </div>
          <p className='text-xs text-slate-500 text-center max-w-[120px]'>Formatos permitidos: JPG, PNG. Max 2MB.</p>
        </div>
      </div>
    </section>
  )
}