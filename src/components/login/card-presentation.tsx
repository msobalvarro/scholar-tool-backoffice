import {
  ShieldCheck,
  BarChart3,
  Shield,
} from 'lucide-react'

export const CardPresentation = () => {
  return (
    <div className='hidden lg:flex flex-col h-full justify-center space-y-6'>
      <div className='relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg group'>
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10'></div>

        <img alt='Modern university library hallway with students walking'
          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
          data-alt='Modern university library hallway with students walking'
          src='https://lh3.googleusercontent.com/aida-public/AB6AXuCzDpg-H_0CLDce611BAkS_xIfbP7vWzeZ1CrgqDrwwvuLryG0ySgXPkm-POUiIsMjLg29dW290xkKym9XMy57iQz-QTbKboUqhDG5A2g_OLoZooIlaNbUAzT6WoIZctZwMGsrHN5tbi7YwQRtEqsjparH-dWrUUdRhQxw_0YbzTGEI-C0XFV26OtDqUWNAufvnyLtJEcNHZHxmKA4iP7CP3oW0UaDhjS1K4haLkqPDHFrlH8mbnpOo125oWsO9KbsP6bCMY9YpByCo' />
        <div className='absolute bottom-6 left-6 z-20 text-white max-w-md'>
          <div
            className='flex items-center gap-2 mb-2 text-primary/80 bg-white/10 backdrop-blur-sm w-fit px-2 py-1 rounded'>
            <ShieldCheck className='text-sm text-white' size={14} />
            <span className='text-xs font-semibold uppercase tracking-wider text-white'>Entorno
              Seguro</span>
          </div>
          <h3 className='text-2xl font-bold leading-tight'>Gestión escolar integral al alcance de tu mano.
          </h3>
          <p className='mt-2 text-sm text-gray-200'>Optimiza los procesos administrativos, gestiona
            expedientes y controla el acceso con nuestra plataforma centralizada.</p>
        </div>
      </div>


      <div className='flex gap-4'>
        <div
          className='flex-1 bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm'>
          <div className='p-2 bg-secondary/50 rounded-full text-primary'>
            <BarChart3 size={24} />
          </div>
          <div>
            <p className='text-xs text-slate-800 font-medium uppercase'>Reportes</p>
            <p className='font-bold text-sm text-black/80'>Tiempo Real</p>
          </div>
        </div>

        <div
          className='flex-1 bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm'>
          <div className='p-2 bg-secondary/50 rounded-full text-primary'>
            <Shield size={24} />
          </div>
          <div>
            <p className='text-xs text-slate-800 font-medium uppercase'>Seguridad</p>
            <p className='font-bold text-sm text-black/80'>Encriptada</p>
          </div>
        </div>
      </div>
    </div>
  )
}