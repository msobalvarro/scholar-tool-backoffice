import { authLoginUserInstitutionService } from '@/services/auth'
import type { StatusType } from '@/utils/types'
import {
  User,
  Lock,
  EyeOff,
  ArrowRight
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const FormInstitution = () => {
  const [, setStatus] = useState<StatusType>('idle')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await authLoginUserInstitutionService(email, password)
      setStatus('success')
    } catch (error) {
      toast('Error al iniciar sesión', {
        description: String(error)
      })

      setStatus({ error: String(error) })
    }
  }

  return (
    <div
      className='w-full max-w-md mx-auto bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-input-border-light dark:border-input-border-dark p-6 sm:p-10 relative overflow-hidden text-slate-700'>
      <div className='absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-blue-400'></div>
      <div className='mb-8'>
        <h1 className='text-3xl font-black tracking-tight mb-2'>Bienvenido Administrador</h1>
        <p className='text-gray-500 dark:text-gray-400 text-sm sm:text-base'>
          Ingresa tus credenciales para acceder al sistema en modo administrador.
        </p>
      </div>
      <form onSubmit={submitHandler} className='flex flex-col gap-5'>

        <div className='space-y-2'>
          <label className='text-sm font-semibold' htmlFor='username'>Correo Electronico</label>
          <div className='relative group'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <User
                className='text-gray-400 group-focus-within:text-primary transition-colors' size={20} />
            </div>
            <input
              className='w-full h-12 pl-10 pr-4 rounded-lg bg-background-light dark:bg-background-dark border border-input-border-light dark:border-input-border-dark text-[#111418] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm sm:text-base'
              id='username'
              placeholder='admin@escuela.edu'
              required
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <label className='text-sm font-semibold'
              htmlFor='password'>Contraseña</label>
          </div>
          <div className='relative group'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Lock
                className='text-gray-400 group-focus-within:text-primary transition-colors' size={20} />
            </div>
            <input
              className='w-full h-12 pl-10 pr-10 rounded-lg bg-background-light dark:bg-background-dark border border-input-border-light dark:border-input-border-dark text-[#111418] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm sm:text-base'
              id='password'
              placeholder='••••••••'
              required
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer'
              type='button'>
              <EyeOff className='text-[20px]' size={20} />
            </button>
          </div>
        </div>

        <div className='flex items-center justify-between mt-1'>
          <label className='flex items-center gap-2 cursor-pointer group'>
            <input
              className='w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary dark:border-gray-600 dark:bg-gray-700'
              type='checkbox' />
            <span
              className='text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'>Recordarme</span>
          </label>
          <a className='text-sm font-medium text-primary text-blue-400 hover:underline transition-colors'
            href='#'>¿Olvidaste tu contraseña?</a>
        </div>

        <button
          className='mt-4 w-full h-12 bg-primary text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2'
          type='submit'>
          <span>Iniciar Sesión</span>
          <ArrowRight className='text-sm' size={16} />
        </button>
      </form>
      <div className='mt-8 text-center border-t border-input-border-light dark:border-input-border-dark pt-6'>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          <span>¿Problemas para acceder? </span>
          <a className='text-blue-400 hover:underline transition-colors'
            href='#'>Contactar al administrador del sistema</a>
        </p>
      </div>
    </div>
  )
}