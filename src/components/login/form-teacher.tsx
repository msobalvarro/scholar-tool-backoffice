import { authLoginTeacherService } from '@/services/auth.service'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Building2,
  UserCheck,
  GraduationCap,
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginTeacherSchema, type LoginTeacherInput } from '@/schemas/auth-schema'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate, Link } from 'react-router'

export const FormTeacher = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginTeacherInput>({
    resolver: zodResolver(loginTeacherSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginTeacherInput) => {
    try {
      await authLoginTeacherService(data.email, data.password)
      toast.success('Acceso autorizado', {
        description: 'Bienvenido profesor al portal docente.',
      })
      navigate('/')
      window.location.reload()
    } catch (error) {
      toast.error('Error al iniciar sesión', {
        description: error instanceof Error ? error.message : 'Credenciales inválidas. Verifica tu correo o contraseña.',
      })
    }
  }

  return (
    <div className='w-full max-w-md mx-auto bg-card/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/70 p-6 sm:p-10 relative overflow-hidden text-foreground transition-all'>
      {/* Decorative top accent line */}
      <div className='absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-secondary via-primary to-accent' />

      {/* Role Toggle Selector */}
      <div className='mb-7 p-1 bg-muted/70 rounded-xl border border-border/60 flex items-center gap-1 text-xs font-semibold'>
        <Link
          to='/'
          className='flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all'
        >
          <Building2 className='size-4 text-muted-foreground' />
          <span>Administración</span>
        </Link>
        <div className='flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-card text-foreground shadow-xs border border-border/40 font-bold'>
          <UserCheck className='size-4 text-secondary' />
          <span>Docente</span>
        </div>
      </div>

      {/* Header */}
      <div className='mb-7 space-y-1.5'>
        <div className='flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider'>
          <GraduationCap className='size-4 text-secondary' />
          <span>Portal de Profesores</span>
        </div>
        <h1 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground'>
          Bienvenido Docente
        </h1>
        <p className='text-xs sm:text-sm text-muted-foreground'>
          Ingresa tus credenciales docentes para acceder al registro de clases y asistencias.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' noValidate>
        {/* Email Field */}
        <div className='space-y-1.5'>
          <label className='text-xs sm:text-sm font-semibold text-foreground/90' htmlFor='teacher-email'>
            Correo Docente
          </label>
          <div className='relative group'>
            <div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-secondary transition-colors'>
              <Mail className='size-4.5' />
            </div>
            <Input
              className={`h-11 pl-11 pr-4 rounded-xl bg-background/60 border-input hover:border-secondary/40 focus-visible:border-secondary focus-visible:ring-secondary/20 text-sm transition-all ${
                errors.email ? 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20' : ''
              }`}
              id='teacher-email'
              placeholder='profesor@institucion.edu'
              type='email'
              autoComplete='email'
              disabled={isSubmitting}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className='text-xs text-destructive flex items-center gap-1 mt-1'>
              <AlertCircle className='size-3.5 shrink-0' />
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className='space-y-1.5'>
          <div className='flex justify-between items-center'>
            <label className='text-xs sm:text-sm font-semibold text-foreground/90' htmlFor='teacher-password'>
              Contraseña
            </label>
          </div>
          <div className='relative group'>
            <div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-secondary transition-colors'>
              <Lock className='size-4.5' />
            </div>
            <Input
              className={`h-11 pl-11 pr-11 rounded-xl bg-background/60 border-input hover:border-secondary/40 focus-visible:border-secondary focus-visible:ring-secondary/20 text-sm transition-all ${
                errors.password ? 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20' : ''
              }`}
              id='teacher-password'
              placeholder='••••••••••••'
              type={showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              disabled={isSubmitting}
              {...register('password')}
            />
            <button
              className='absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors focus:outline-none'
              type='button'
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className='size-4.5' />
              ) : (
                <EyeOff className='size-4.5' />
              )}
            </button>
          </div>
          {errors.password && (
            <p className='text-xs text-destructive flex items-center gap-1 mt-1'>
              <AlertCircle className='size-3.5 shrink-0' />
              <span>{errors.password.message}</span>
            </p>
          )}
        </div>

        {/* Remember & Forgot options */}
        <div className='flex items-center justify-between pt-1'>
          <label className='flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors'>
            <input
              className='size-4 rounded-md border-input text-secondary accent-secondary focus:ring-secondary/30 cursor-pointer'
              type='checkbox'
              disabled={isSubmitting}
              {...register('rememberMe')}
            />
            <span>Recordarme</span>
          </label>
          <a
            className='text-xs sm:text-sm font-semibold text-secondary hover:text-secondary/80 hover:underline transition-colors'
            href='#'
            onClick={(e) => {
              e.preventDefault()
              toast.info('Recuperación de clave docente', {
                description: 'Por favor acércate a la coordinación de tu institución para restablecer tu contraseña.',
              })
            }}
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Submit Button */}
        <Button
          type='submit'
          disabled={isSubmitting}
          className='w-full h-11 text-sm sm:text-base font-bold rounded-xl bg-gradient-to-r from-secondary via-primary to-accent hover:opacity-95 text-white shadow-lg shadow-secondary/20 hover:shadow-secondary/30 active:scale-[0.99] transition-all cursor-pointer mt-2'
        >
          {isSubmitting ? (
            <>
              <Loader2 className='size-4.5 animate-spin' />
              <span>Verificando credenciales...</span>
            </>
          ) : (
            <>
              <span>Iniciar Sesión Docente</span>
              <ArrowRight className='size-4.5 group-hover:translate-x-0.5 transition-transform' />
            </>
          )}
        </Button>
      </form>

      {/* Footer Support Info */}
      <div className='mt-8 pt-5 border-t border-border/50 text-center'>
        <p className='text-xs text-muted-foreground'>
          ¿No tienes cuenta activa de docente?{' '}
          <a
            className='font-semibold text-secondary hover:underline transition-colors'
            href='#'
            onClick={(e) => {
              e.preventDefault()
              toast.info('Registro de Docentes', {
                description: 'Las cuentas docentes son provistas por la administración escolar de tu institución.',
              })
            }}
          >
            Contactar a administración
          </a>
        </p>
      </div>
    </div>
  )
}