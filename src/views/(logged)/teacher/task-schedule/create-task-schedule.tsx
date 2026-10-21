import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Layers } from 'lucide-react';
import { taskScheduleSchema, type TaskScheduleSchema } from '@/schemas/task-schedule-schema';
import { useAsignatureByTeacher } from '@/hooks/API/use-asignatures';
import Select from 'react-select';
import { UnitItemField } from '@/components/task-schedule/unit-item-field';
import { MONTH_NAMES } from '@/constants/calendar-events.constant';


interface TaskScheduleDialogFormProps {
  onSubmit: (data: TaskScheduleSchema) => void;
  triggerButtonText?: string;
}

export const TaskScheduleDialogForm = ({ onSubmit, triggerButtonText = 'Crear Nuevo Cronograma' }: TaskScheduleDialogFormProps) => {
  const { data: asignatures } = useAsignatureByTeacher()
  const [open, setOpen] = React.useState(false);

  const form = useForm<TaskScheduleSchema>({
    resolver: zodResolver(taskScheduleSchema),
    defaultValues: {
      asignatureId: '',
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
  });

  const {
    fields: unitFields,
    append: appendUnit,
    remove: removeUnit
  } = useFieldArray({
    control: form.control,
    name: 'scheduleUnit',
  });

  const handleSubmitForm = (data: TaskScheduleSchema) => {
    onSubmit(data);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <Plus className='w-4 h-4' />
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
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200'>
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
                        onChange={field.onChange}
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

            <DialogFooter className='pt-4 border-t border-slate-200'>
              <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type='submit'>Guardar Cronograma</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

