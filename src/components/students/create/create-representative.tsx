import { User, Mail, Phone, Heart, IdCard, MapPin, Download, Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { representativeSchema } from '@/schemas/representative-schema'
import { useRepresentativeStore } from '@/store/representatice.store'
import { useCreateRepresentative } from '@/hooks/API/use-representativ'
import type { RepresentativeFormValues } from '@/dtos/inputs/responsable-input'

export const CreateRepresentative = () => {
  const { setRepresentative } = useRepresentativeStore()
  const createRepresentative = useCreateRepresentative()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RepresentativeFormValues>({
    resolver: zodResolver(representativeSchema),
    defaultValues: {
      fullName: '',
      identification: '',
      email: '',
      phoneNumber: '',
      direction: '',
      isEmergencyContact: false,
      type: 'mother',
    },
  })

  const onSubmit = async (data: RepresentativeFormValues) => {
    const response = await createRepresentative.mutateAsync(data)

    if (response) {
      setRepresentative(response)
    }
  }

  return (
    <CardContent className='p-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6'>
        <div className='space-y-2 lg:col-span-2'>
          <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>
            Nombre Completo

            <span className='text-red-500 ml-1'>*</span>
          </label>
          <div className='relative'>
            <User className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400' />
            <Input
              {...register('fullName')}
              className={`pl-9 ${errors.fullName ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              placeholder='Ej. María Pérez'
            />
          </div>
          {errors.fullName && (
            <p className='text-xs font-medium text-destructive mt-1'>
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>
            Identificación

            <span className='text-red-500 ml-1'>*</span>
          </label>
          <div className='relative'>
            <IdCard className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400' />
            <Input
              {...register('identification')}
              className={`pl-9 ${errors.identification ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              placeholder='Ej. 0912345678'
            />
          </div>
          {errors.identification && (
            <p className='text-xs font-medium text-destructive mt-1'>
              {errors.identification.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>
            Parentesco
            <span className='text-red-500 ml-1'>*</span>
          </label>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={`w-full ${errors.type ? 'border-destructive focus-visible:ring-destructive' : ''}`}>
                  <SelectValue placeholder="Seleccionar parentesco" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mother">Madre</SelectItem>
                  <SelectItem value="father">Padre</SelectItem>
                  <SelectItem value="grandfather">Abuelo/a</SelectItem>
                  <SelectItem value="uncle">Tío/a</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <p className='text-xs font-medium text-destructive mt-1'>
              {errors.type.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>
            Teléfono Móvil

            <span className='text-red-500 ml-1'>*</span>
          </label>
          <div className='relative'>
            <Phone className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400' />
            <Input
              {...register('phoneNumber')}
              className={`pl-9 ${errors.phoneNumber ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              placeholder='Ej. 98765432'
              type='tel'
            />
          </div>
          {errors.phoneNumber && (
            <p className='text-xs font-medium text-destructive mt-1'>
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>
            Correo Electrónico

            <span className='text-red-500 ml-1'>*</span>
          </label>
          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400' />
            <Input
              {...register('email')}
              className={`pl-9 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              placeholder='tutor@email.com'
              type='email'
            />
          </div>
          {errors.email && (
            <p className='text-xs font-medium text-destructive mt-1'>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className='space-y-2 lg:col-span-3'>
          <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight'>
            Dirección

            <span className='text-red-500 ml-1'>*</span>
          </label>
          <div className='relative'>
            <MapPin className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400' />
            <Input
              {...register('direction')}
              className={`pl-9 ${errors.direction ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              placeholder='Ej. Av. Siempre Viva 742'
            />
          </div>
          {errors.direction && (
            <p className='text-xs font-medium text-destructive mt-1'>
              {errors.direction.message}
            </p>
          )}
        </div>

        <div className='lg:col-span-3 pt-2'>
          <Separator className='mb-6' />
          <label
            htmlFor='emergency_contact'
            className='flex items-center gap-3 p-4 bg-accent/5 rounded-xl border border-accent/10 transition-all hover:bg-accent/10 group cursor-pointer'
          >
            <div className='flex items-center justify-center size-5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-has-checked:bg-accent group-has-checked:border-accent transition-colors'>
              <input
                {...register('isEmergencyContact')}
                className='sr-only peer'
                id='emergency_contact'
                type='checkbox'
              />
              <Heart className='size-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity' />
            </div>
            <span className='text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer flex-1'>
              Designar como contacto de emergencia principal
            </span>
            <div className='text-xs font-bold text-accent opacity-0 group-has-checked:opacity-100 transition-opacity uppercase tracking-widest'>
              Seleccionado
            </div>
          </label>
          {errors.isEmergencyContact && (
            <p className='text-xs font-medium text-destructive mt-1'>
              {errors.isEmergencyContact.message}
            </p>
          )}
        </div>

        <div className='lg:col-span-3 flex justify-end gap-3 mt-10'>
          {createRepresentative.error &&
            <p className='text-xs font-medium text-red-500 mt-1'>
              {createRepresentative.error.message}
            </p>
          }

          <Button
            type='button'
            disabled={createRepresentative.isPending}
            className='bg-accent px-6 hover:bg-accent/90'
            onClick={handleSubmit(onSubmit)}
          >
            {createRepresentative.isPending ? (
              <>
                <Loader2 className='size-4 mr-1 animate-spin' />
                Creando...
              </>
            ) : (
              <>
                <Download className='size-4 mr-1' />
                Crear y Guardar Tutor
              </>
            )}
          </Button>
        </div>
      </div>
    </CardContent>
  )
}