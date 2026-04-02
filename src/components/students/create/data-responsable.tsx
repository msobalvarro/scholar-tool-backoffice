import { Users } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'


export const DataResponsable = () => {
  return (
    <section className='rounded-xl border border-slate-200 bg-surface-light shadow-sm bg-background h-full'>
      <div className='border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 dark:border-slate-800'>
        <h2 className='text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2'>
          <Users className='size-5 text-accent' />
          Datos del Tutor
        </h2>

        <div className='bg-slate-100 p-1 rounded-lg inline-flex dark:bg-slate-800'>
          <button className='px-4 py-1.5 rounded-md text-xs font-semibold bg-white text-slate-800 shadow-sm dark:bg-slate-700 dark:text-white'>Crear Nuevo</button>
          <button className='px-4 py-1.5 rounded-md text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'>Buscar Existente</button>
        </div>
      </div>

      <div className='p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Nombre Completo</label>
            <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500' placeholder='Ej. María Pérez' type='text' />
          </div>

          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Parentesco</label>
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
          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Teléfono Móvil</label>
            <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white' placeholder='(55) 9876 5432' type='tel' />
          </div>
          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Correo Electrónico</label>
            <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white' placeholder='tutor@email.com' type='email' />
          </div>
          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>Ocupación</label>
            <input className='w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white' placeholder='Ej. Ingeniero' type='text' />
          </div>
          <div className='space-y-1.5 flex items-end'>
            <div className='flex items-center gap-2'>
              <input className='rounded border-slate-300 text-accent focus:ring-accent dark:border-slate-600 dark:bg-slate-800' id='emergency_contact' type='checkbox' />
              <label className='text-sm text-slate-700 dark:text-slate-300 cursor-pointer' htmlFor='emergency_contact'>Es contacto de emergencia</label>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}