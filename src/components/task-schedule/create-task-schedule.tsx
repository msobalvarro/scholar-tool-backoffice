import { useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, BookOpen, Layers } from 'lucide-react'
import { taskScheduleSchema, type TaskScheduleSchema } from '@/schemas/task-schedule-schema'
import { useAsignatureByTeacher } from '@/hooks/API/use-asignatures'
import Select from 'react-select'
import { UnitItemField } from '@/components/task-schedule/unit-item-field'
import { MONTH_NAMES } from '@/constants/calendar-events.constant'
import { useTaskScheduleActions } from '@/hooks/API/use-task-schedule'
import { useCoursesByTeacher } from '@/hooks/API/use-course'


interface TaskScheduleDialogFormProps {
  triggerButtonText?: string
  defaultValues?: TaskScheduleSchema
  isUpdate?: boolean
  taskId?: string
}

export const TaskScheduleDialogForm = ({ triggerButtonText = 'Crear Nuevo Cronograma', defaultValues, taskId, isUpdate = false }: TaskScheduleDialogFormProps) => {
  const { data: asignatures } = useAsignatureByTeacher()
  const { createTaskSchedule, updateTaskSchedule, isLoading, error } = useTaskScheduleActions()
  const { data: courses } = useCoursesByTeacher()
  const [open, setOpen] = useState(false)

  const form = useForm<TaskScheduleSchema>({
    resolver: zodResolver(taskScheduleSchema),
    defaultValues: defaultValues || {
      asignatureId: '',
      courseId: '',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      scheduleUnit: [
        {
          unitName: '',
          tasks: [
            {
              content: '',
              evaluationMethod: '',
              inNotebook: false,
              date: new Date().toISOString(),
              points: 10,
              page: '',
            }
          ]
        }
      ]
    },
  })

  const {
    fields: unitFields,
    append: appendUnit,
    remove: removeUnit
  } = useFieldArray({
    control: form.control,
    name: 'scheduleUnit',
  })

  const handleSubmitForm = async (data: TaskScheduleSchema) => {
    if (isUpdate && isUpdate) {
      await updateTaskSchedule({
        taskSchedule: data,
        taskId: taskId!,
      })
    } else {
      await createTaskSchedule(data)
    }
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          {triggerButtonText}
        </Button>
      </DialogTrigger>

      <DialogContent className='max-h-[95vh] overflow-y-auto sm:w-[80vw]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-xl'>
            <Layers className='w-5 h-5 text-indigo-600' />
            Nuevo Cronograma de Tareas
          </DialogTitle>
          <DialogDescription>
            Complete los datos generales, unidades académicas y las tareas correspondientes.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitForm)} className='space-y-6 mt-4'>

            {/* Datos Generales */}
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200'>
              <Controller
                control={form.control}
                name="asignatureId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asignatura</FormLabel>
                    <FormControl>
                      <Select
                        options={
                          asignatures?.map(asignature => ({ value: asignature._id, label: asignature.name })) || []
                        }
                        placeholder='Seleccionar asignatura'
                        defaultInputValue={asignatures?.find(asignature => asignature._id === field.value)?.name}
                        onChange={(val) => field.onChange(val?.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Curso</FormLabel>
                    <FormControl>
                      <Select
                        options={
                          courses?.map(course => ({ value: course._id, label: course.name })) || []
                        }
                        placeholder='Seleccionar curso'
                        defaultInputValue={courses?.find(course => course._id === field.value)?.name}
                        onChange={(val) => field.onChange(val?.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='month'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mes</FormLabel>
                    <FormControl>
                      <Select
                        options={MONTH_NAMES.map((m, i) => ({ value: i + 1, label: m }))}
                        onChange={(val) => field.onChange(val?.value)}
                        defaultValue={{ value: field.value, label: MONTH_NAMES[field.value - 1] }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='year'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Unidades y Tareas Anidadas */}
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-base font-bold text-slate-800 flex items-center gap-2'>
                  <BookOpen className='w-4 h-4 text-indigo-600' />
                  Unidades del Cronograma
                </h3>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => appendUnit({
                    unitName: '',
                    tasks: [{ content: '', evaluationMethod: '', inNotebook: false, date: '', points: 10 }]
                  })}
                >
                  <Plus className='w-4 h-4 mr-1' /> Añadir Unidad
                </Button>
              </div>

              {unitFields.map((unitField, unitIndex) => (
                <UnitItemField
                  key={unitField.id}
                  form={form}
                  unitIndex={unitIndex}
                  removeUnit={removeUnit}
                  canRemove={unitFields.length > 1}
                />
              ))}
            </div>

            <DialogFooter className='pt-4 border-t border-slate-200 items-center w-full'>
              {error && <span className='text-destructive'>{error}</span>}
              <Button disabled={isLoading} type='button' variant='outline' onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar Cronograma'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

