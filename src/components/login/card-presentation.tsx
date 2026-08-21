import {
  ShieldCheck,
  BarChart3,
  QrCode,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

export const CardPresentation = () => {
  return (
    <div className='hidden lg:flex flex-col h-full justify-center space-y-6 select-none'>
      {/* Main Image Showcase Card */}
      <div className='relative w-full rounded-2xl overflow-hidden border border-border/60 bg-card shadow-2xl group'>
        <div className='relative aspect-[16/11] w-full overflow-hidden'>
          <img
            alt='Campus y estudiantes en entorno académico moderno'
            className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 dark:brightness-90'
            src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
          />
          {/* Gradients */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10' />
          <div className='absolute inset-0 bg-primary/15 mix-blend-overlay z-10' />

          {/* Floating Badge Top Right */}
          <div className='absolute top-4 right-4 z-20'>
            <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-lg'>
              <Sparkles className='size-3.5 text-accent' />
              <span>Plataforma Inteligente</span>
            </div>
          </div>

          {/* Bottom Card Content */}
          <div className='absolute bottom-6 left-6 right-6 z-20 text-white space-y-2.5'>
            <div className='flex items-center gap-2 text-white bg-white/15 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-white/25'>
              <ShieldCheck className='size-4 text-emerald-400' />
              <span className='text-xs font-bold uppercase tracking-wider'>Acceso Seguro SSL</span>
            </div>

            <h3 className='text-2xl font-bold leading-snug drop-shadow-sm'>
              Gestión académica y administrativa centralizada.
            </h3>
            <p className='text-xs sm:text-sm text-gray-200/90 leading-relaxed drop-shadow-xs'>
              Controla asistencias en tiempo real mediante QR, gestiona expedientes estudiantiles, asignaturas y mantén sincronizada tu institución escolar.
            </p>
          </div>
        </div>

        {/* Mini quick-features pill bar inside bottom */}
        <div className='p-3 bg-muted/40 backdrop-blur-md border-t border-border/50 grid grid-cols-3 gap-2 text-center text-xs'>
          <div className='flex items-center justify-center gap-1.5 text-muted-foreground font-medium'>
            <CheckCircle2 className='size-3.5 text-primary' />
            <span>Escaneo QR</span>
          </div>
          <div className='flex items-center justify-center gap-1.5 text-muted-foreground font-medium'>
            <CheckCircle2 className='size-3.5 text-accent' />
            <span>Matrículas</span>
          </div>
          <div className='flex items-center justify-center gap-1.5 text-muted-foreground font-medium'>
            <CheckCircle2 className='size-3.5 text-emerald-500' />
            <span>Métricas</span>
          </div>
        </div>
      </div>

      {/* Feature Glass Cards Grid */}
      <div className='grid grid-cols-3 gap-3.5'>
        <div className='p-4 rounded-xl bg-card/80 backdrop-blur-md border border-border/60 shadow-sm hover:border-primary/40 hover:shadow-md transition-all group/item'>
          <div className='size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2.5 group-hover/item:scale-110 transition-transform'>
            <QrCode className='size-5' />
          </div>
          <p className='text-[11px] text-muted-foreground font-medium uppercase tracking-wider'>Asistencias</p>
          <p className='font-bold text-sm text-foreground'>Código QR</p>
        </div>

        <div className='p-4 rounded-xl bg-card/80 backdrop-blur-md border border-border/60 shadow-sm hover:border-secondary/40 hover:shadow-md transition-all group/item'>
          <div className='size-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-2.5 group-hover/item:scale-110 transition-transform'>
            <BarChart3 className='size-5' />
          </div>
          <p className='text-[11px] text-muted-foreground font-medium uppercase tracking-wider'>Reportes</p>
          <p className='font-bold text-sm text-foreground'>Tiempo Real</p>
        </div>

        <div className='p-4 rounded-xl bg-card/80 backdrop-blur-md border border-border/60 shadow-sm hover:border-accent/40 hover:shadow-md transition-all group/item'>
          <div className='size-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-2.5 group-hover/item:scale-110 transition-transform'>
            <Users className='size-5' />
          </div>
          <p className='text-[11px] text-muted-foreground font-medium uppercase tracking-wider'>Estudiantes</p>
          <p className='font-bold text-sm text-foreground'>Expedientes</p>
        </div>
      </div>
    </div>
  )
}