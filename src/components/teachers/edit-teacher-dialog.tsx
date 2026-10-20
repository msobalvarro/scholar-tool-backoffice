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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTeacherActions } from '@/hooks/API/use-teachers'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'
import type { Teacher } from '@/dtos/types'
import { useAsignatures } from '@/hooks/API/use-asignatures'

interface EditTeacherFormValues {
  name: string
  email: string
  phoneNumber: string
  birthday: string
  status: 'active' | 'inactive'
  asignatureIds: string[]
}

interface EditTeacherDialogProps {
  teacher: Teacher | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const EditTeacherDialog = ({ teacher, open, onOpenChange }: EditTeacherDialogProps) => {
  const { patchTeacher, isLoading: isPatching } = useTeacherActions()
  const queryClient = useQueryClient()
  const { data: asignatures, isLoading: isLoadingAsignatures } = useAsignatures()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditTeacherFormValues>({
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
    if (teacher && open) {
      const initialAsignatureIds = (teacher.asignatures || [])
        .map((a) => (typeof a === 'string' ? a : a._id))
        .filter((id): id is string => Boolean(id))

      reset({
        name: teacher.name || '',
        email: teacher.email || '',
        phoneNumber: teacher.phoneNumber || '',
        birthday: teacher.birthday || '',
        status: teacher.status || 'active',
        asignatureIds: initialAsignatureIds,
      })
    }
  }, [teacher, open, reset])

  const asignatureOptions = useMemo(() => {
    const list: Array<{ value: string; label: string }> = []
    const seen = new Set<string>()

    if (Array.isArray(asignatures)) {
      asignatures.forEach((asig) => {
        if (asig._id && !seen.has(asig._id)) {
          seen.add(asig._id)
          list.push({ value: asig._id, label: asig.name })
        }
      })
    }

    if (teacher?.asignatures && Array.isArray(teacher.asignatures)) {
      teacher.asignatures.forEach((asig) => {
        if (typeof asig !== 'string' && asig._id && !seen.has(asig._id)) {
          seen.add(asig._id)
          list.push({ value: asig._id, label: asig.name })
        }
      })
    }

    return list
  }, [asignatures, teacher])

  const onSubmit = async (data: EditTeacherFormValues) => {
    if (!teacher) return

    try {
      await patchTeacher({
        id: teacher._id,
        teacher: {
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          birthday: data.birthday,
          status: data.status,
          asignatureIds: data.asignatureIds,
        },
      })
      toast.success('Profesor actualizado correctamente')
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      onOpenChange(false)
    } catch (error) {
      toast.error('Error al actualizar el profesor')
      console.error(error)
    }
  }

  const isLoading = isSubmitting || isPatching

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Editar Profesor</DialogTitle>
          <DialogDescription>
            Actualiza la información del profesor aquí.
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
              placeholder="correo@ejemplo.com"
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
                {...register('birthday')}
              />
              {errors.birthday && (
                <p className="text-xs text-destructive">{errors.birthday.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Estado</label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-xs text-destructive">{errors.status.message}</p>
            )}
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
                <Save className="mr-2 h-4 w-4" />
              )}
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
