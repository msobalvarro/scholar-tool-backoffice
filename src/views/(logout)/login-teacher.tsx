import { CardPresentation } from '@/components/login/card-presentation'
import { FormTeacher } from '@/components/login/form-teacher'
import { FooterLogout } from '@/components/ui/footer-logout'
import { HeaderLogout } from '@/components/ui/header-logout'

export function LoginTeacher() {
  return (
    <div className='relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden selection:bg-secondary/20'>
      {/* Background Ambient Glow Orbs */}
      <div className='pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-secondary/15 blur-3xl' />
      <div className='pointer-events-none absolute top-1/3 -right-40 size-96 rounded-full bg-primary/15 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-40 left-1/3 size-96 rounded-full bg-accent/15 blur-3xl' />

      <HeaderLogout />

      <main className='relative z-10 grow flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8'>
        <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
          <CardPresentation />
          <FormTeacher />
        </div>
      </main>

      <FooterLogout />
    </div>
  )
}