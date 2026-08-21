export const FooterLogout = () => {
  return (
    <footer className='py-6 border-t border-border/40 bg-background/50 backdrop-blur-xs text-xs text-muted-foreground transition-colors'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <span className='size-2 rounded-full bg-emerald-500 animate-pulse' />
          <span>Plataforma operativa y segura</span>
        </div>
        <p>© {new Date().getFullYear()} Lúmina. Todos los derechos reservados.</p>
        <div className='flex items-center gap-4 text-xs'>
          <a className='hover:text-foreground transition-colors' href='#'>Privacidad</a>
          <span className='text-border'>•</span>
          <a className='hover:text-foreground transition-colors' href='#'>Términos</a>
          <span className='text-border'>•</span>
          <a className='hover:text-foreground transition-colors' href='#'>Soporte</a>
        </div>
      </div>
    </footer>
  )
}