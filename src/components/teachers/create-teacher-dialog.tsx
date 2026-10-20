import { useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import MultiSelect from 'react-select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTeacherActions } from '@/hooks/API/use-teachers'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Loader2, Plus } from 'lucide-react'
import { useAsignatures } from '@/hooks/API/use-asignatures'

interface CreateTeacherFormValues {
  name: string
  email: string
  phoneNumber: string
  birthday: string
  status: 'active' | 'inactive'
  asignatureIds: string[]
}

interface CreateTeacherDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateTeacherDialog = ({ open, onOpenChange }: CreateTeacherDialogProps) => {
  const { postTeacher, error: actionError, isLoading: isCreating } = useTeacherActions()
  const queryClient = useQueryClient()
  const { data: asignatures, isLoading: isLoadingAsignatures } = useAsignatures()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTeacherFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      birthday: '',
      status: 'active',
      asignatureIds: [],
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        name: '',
        email: '',
        phoneNumber: '',
        birthday: '',
        status: 'active',
        asignatureIds: [],
      })
    }
  }, [open, reset])

  const asignatureOptions = useMemo(() => {
    if (!asignatures || !Array.isArray(asignatures)) return []
    return asignatures.map((asig) => ({
      value: asig._id,
      label: asig.name,
    }))
  }, [asignatures])

  const onSubmit = async (data: CreateTeacherFormValues) => {
    try {
      await postTeacher({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        birthday: data.birthday,
        status: data.status,
        asignatureIds: data.asignatureIds,
      })
      toast.success('Profesor creado exitosamente')
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      reset()
      onOpenChange(false)
    } catch (error) {
      toast.error('Error al crear el profesor')
      console.error(error)
    }
  }

  const isLoading = isSubmitting || isCreating

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Profesor</DialogTitle>
          <DialogDescription>
            Ingresa los datos del nuevo profesor para registrarlo en el sistema.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Nombre Completo</label>
            <Input
              {...register('name', { required: 'El nombre es obligatorio' })}
              placeholder="Nombre y Apellido"
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Correo Electrónico</label>
            <Input
              type="email"
              {...register('email', {
                required: 'El correo electrónico es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido',
                },
              })}
              placeholder="correo@escuela.edu"
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Teléfono</label>
              <Input
                {...register('phoneNumber', { required: 'El teléfono es obligatorio' })}
                placeholder="+1 234 567 890"
              />
              {errors.phoneNumber && (
                <p className="text-xs text-destructive">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Fecha de Nacimiento</label>
              <Input
                type="date"
                {...register('birthday', { required: 'La fecha de nacimiento es obligatoria' })}
              />
              {errors.birthday && (
                <p className="text-xs text-destructive">{errors.birthday.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Asignaturas</label>
            <Controller
              control={control}
              name="asignatureIds"
              render={({ field }) => (
                <MultiSelect
                  isMulti
                  closeMenuOnSelect={false}
                  isLoading={isLoadingAsignatures}
                  placeholder="Selecciona las asignaturas..."
                  options={asignatureOptions}
                  value={asignatureOptions.filter((opt) => (field.value || []).includes(opt.value))}
                  onChange={(selected: unknown) => {
                    const optionsArray = (selected as Array<{ value: string }> | null) ?? []
                    field.onChange(optionsArray.map((opt) => opt.value))
                  }}
                  className="text-sm"
                  menuPlacement="auto"
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  noOptionsMessage={() => 'No hay asignaturas disponibles'}
                />
              )}
            />
            {errors.asignatureIds && (
              <p className="text-xs text-destructive">{errors.asignatureIds.message}</p>
            )}
          </div>

          {actionError && <p className="text-xs text-destructive">{actionError}</p>}

          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Registrar Profesor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
