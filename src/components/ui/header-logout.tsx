import { GraduationCap, Headphones } from "lucide-react"

export const HeaderLogout = () => {
  return (
    <header
      className='w-full text-secondary bg-white shadow-sm border-input-border-light dark:border-input-border-dark px-6 py-4 lg:px-10'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='size-8 flex items-center justify-center bg-gray-700/10 rounded-lg'>
            <GraduationCap className='text-2xl ' size={24} />
          </div>
          <h2 className='text-lg lg:text-xl font-bold tracking-tight text-gray-700'>Portal
            Administrativo
          </h2>
        </div>
        <button
          className='hidden sm:flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'>
          <Headphones className='text-lg' size={18} />
          <span>Contactar Soporte</span>
        </button>
      </div>
    </header>
  )
}