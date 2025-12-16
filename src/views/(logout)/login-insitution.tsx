import { CardPresentation } from '@/components/login/card-presentation'
import { FormInstitution } from '@/components/login/form-institution'
import { FooterLogout } from '@/components/ui/footer-logout'
import { HeaderLogout } from '@/components/ui/header-logout'


export function LoginInstitution() {
  return (
    <div className='flex min-h-screen flex-col'>
      <HeaderLogout />

      <main className='flex-grow flex items-center justify-center p-4 lg:p-8'>
        <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
          <CardPresentation />

          <FormInstitution />
        </div>
      </main >

      <FooterLogout />
    </div>
  )
}