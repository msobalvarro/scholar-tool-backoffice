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
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, BookOpen, Layers } from 'lucide-react';
import { taskScheduleSchema, type TaskScheduleSchema } from '@/schemas/task-schedule-schema';
import { useAsignatures } from '@/hooks/API/use-asignatures';
import Select from 'react-select';


interface TaskScheduleDialogFormProps {
  onSubmit: (data: TaskScheduleSchema) => void;
  triggerButtonText?: string;
}

export const TaskScheduleDialogForm = ({ onSubmit, triggerButtonText = 'Crear Nuevo Cronograma' }: TaskScheduleDialogFormProps) => {
  const { data: asignatures, isLoading, error } = useAsignatures()
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
          diciplineName: '',
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

  // Field array para las Unidades
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

      <DialogContent className='max-h-[95vh] overflow-y-auto'>
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
              {/* <FormField
                control={form.control}
                name='asignatureId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID de Asignatura</FormLabel>
                    <FormControl>
                      <Input placeholder='Ej. MAT-101' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}



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
                    <FormLabel>Mes (1-12)</FormLabel>
                    <FormControl>
                      <Input type='number' min={1} max={12} {...field} />
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
                    diciplineName: '',
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

// --- Subcomponente para gestionar las tareas dentro de cada Unidad ---
interface UnitItemFieldProps {
  form: any;
  unitIndex: number;
  removeUnit: (index: number) => void;
  canRemove: boolean;
}

const UnitItemField: React.FC<UnitItemFieldProps> = ({ form, unitIndex, removeUnit, canRemove }) => {
  const {
    fields: taskFields,
    append: appendTask,
    remove: removeTask
  } = useFieldArray({
    control: form.control,
    name: `scheduleUnit.${unitIndex}.tasks`,
  });

  return (
    <div className='p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4'>
      <div className='flex flex-col gap-4 border-b border-slate-100 pb-3'>
        <div className='flex flex-col gap-3 flex-1'>
          <FormField
            control={form.control}
            name={`scheduleUnit.${unitIndex}.unitName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Nombre de Unidad</FormLabel>
                <FormControl>
                  <Input placeholder='Ej. Unidad 1: Álgebra' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`scheduleUnit.${unitIndex}.diciplineName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Disciplina</FormLabel>
                <FormControl>
                  <Input placeholder='Ej. Matemáticas' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {canRemove && (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='text-red-500 hover:text-red-700 hover:bg-red-50 mt-6'
            onClick={() => removeUnit(unitIndex)}
          >
            <Trash2 className='w-4 h-4' />
          </Button>
        )}
      </div>

      {/* Lista de Tareas */}
      <div className='space-y-3 pl-2 sm:pl-4 border-l-2 border-indigo-100'>
        <div className='flex items-center justify-between'>
          <span className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Tareas de la Unidad</span>
          <Button
            type='button'
            variant='secondary'
            size='sm'
            className='text-xs h-7'
            onClick={() => appendTask({ content: '', evaluationMethod: '', inNotebook: false, date: '', points: 10 })}
          >
            <Plus className='w-3 h-3 mr-1' /> Añadir Tarea
          </Button>
        </div>

        {taskFields.map((taskField, taskIndex) => (
          <div key={taskField.id} className='flex flex-col bg-slate-50 p-3 rounded-lg border border-slate-100 gap-4'>
            <FormField
              control={form.control}
              name={`scheduleUnit.${unitIndex}.tasks.${taskIndex}.content`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[11px]'>Contenido</FormLabel>
                  <FormControl><Input placeholder='Contenido de tarea' {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`scheduleUnit.${unitIndex}.tasks.${taskIndex}.evaluationMethod`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[11px]'>Método Evaluación</FormLabel>
                  <FormControl><Input placeholder='Ej. Examen' {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`scheduleUnit.${unitIndex}.tasks.${taskIndex}.date`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[11px]'>Fecha</FormLabel>
                  <FormControl><Input type='date' {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`scheduleUnit.${unitIndex}.tasks.${taskIndex}.points`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[11px]'>Pts</FormLabel>
                  <FormControl><Input type='number' {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`scheduleUnit.${unitIndex}.tasks.${taskIndex}.inNotebook`}
              render={({ field }) => (
                <FormItem className='flex flex-col items-center'>
                  <FormLabel className='text-[10px] mb-1'>Cuaderno</FormLabel>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {taskFields.length > 1 && (
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50'
                onClick={() => removeTask(taskIndex)}
              >
                <Trash2 className='w-3.5 h-3.5' />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};