import { User, Camera, Mail, Phone, MapPin, Save, } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CreateSelectRepresentative } from './create-select-representative'
import { Button } from '@/components/ui/button'
import { useRepresentativeStore } from '@/store/representatice.store'
import { useCourses } from '@/hooks/API/use-course'

export const PersonalInformationForm = () => {
  const { data: dataCourses } = useCourses()
  const { representative } = useRepresentativeStore()
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log("se envio el formulario")
    console.log(representative)

  }

  return (
    <form className='space-y-8 ' onSubmit={onSubmit}>
      {/* Sección de Información Personal */}
      <Card className='overflow-hidden border-none shadow-md from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/50'>
        <CardHeader className='border-b bg-white/50 dark:bg-slate-900/50 px-8 py-6'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-accent/10 rounded-lg'>
              <User className='size-6 text-accent' />
            </div>
            <div>
              <CardTitle className='text-xl font-bold'>Información Personal</CardTitle>
              <CardDescription>Datos básicos del estudiante y su perfil</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className='p-8'>
          <div className='flex flex-col lg:flex-row gap-10'>
            {/* Columna de Foto de Perfil */}
            <div className='flex flex-col items-center space-y-4 shrink-0'>
              <div className='relative group'>
                <div className='absolute -inset-0.5 from-accent to-accent/30 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500'></div>
                <Avatar className='h-36 w-36 border-4 border-white dark:border-slate-800 shadow-xl'>
                  <AvatarImage src="" />
                  <AvatarFallback className='bg-slate-100 dark:bg-slate-800'>
                    <Camera className='size-12 text-slate-400' />
                  </AvatarFallback>
                </Avatar>
                <div className='absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-sm'>
                  <span className='text-white text-xs font-semibold'>Cambiar Foto</span>
                </div>
              </div>
              <div className='text-center space-y-1'>
                <p className='text-[10px] font-medium text-slate-500 uppercase tracking-wider'>Formatos: JPG, PNG</p>
                <p className='text-[10px] font-medium text-slate-500 uppercase tracking-wider'>Máx: 2MB</p>
              </div>
            </div>

            {/* Grid de Campos */}
            <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5'>
              <div className='space-y-2 lg:col-span-1'>
                <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>
                  Nombre(s) <span className='text-red-500'>*</span>
                </label>
                <Input placeholder='Ej. Juan Pablo' required />
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>
                  Apellido Paterno <span className='text-red-500'>*</span>
                </label>
                <Input placeholder='Ej. Pérez' required />
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>
                  Apellido Materno
                </label>
                <Input placeholder='Ej. López' />
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>
                  Fecha de Nacimiento <span className='text-red-500'>*</span>
                </label>
                <Input type='date' required />
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>
                  Género <span className='text-red-500'>*</span>
                </label>
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

              <div className='space-y-2'>
                <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>
                  Dirección
                </label>
                <div className='relative'>
                  <MapPin className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400' />
                  <Input className='pl-9' placeholder='Av. Reforma 123' />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>
                  Teléfono
                </label>
                <div className='relative'>
                  <Phone className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400' />
                  <Input className='pl-9' placeholder='12345678' maxLength={8} type='tel' />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>
                  Email
                </label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400' />
                  <Input className='pl-9' placeholder='alumno@email.com' type='email' />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>Nivel Académico <span className='text-red-500'>*</span></label>
                <Select required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataCourses?.map((course) => (
                      <SelectItem key={course._id} value={course.name}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección de Datos del Tutor */}
      <CreateSelectRepresentative />


      <div className='flex justify-end'>
        <Button size='lg' className='bg-accent px-6' type='submit'>
          <Save className='size-5 mr-2' />
          Guardar
        </Button>
      </div>
    </form>
  )
}