import React from 'react';
import { useFieldArray, type UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import type { TaskScheduleSchema } from '@/schemas/task-schedule-schema';

// --- Subcomponente para gestionar las tareas dentro de cada Unidad ---
interface UnitItemFieldProps {
  form: UseFormReturn<TaskScheduleSchema>;
  unitIndex: number;
  removeUnit: (index: number) => void;
  canRemove: boolean;
}

export const UnitItemField = ({ form, unitIndex, removeUnit, canRemove }: UnitItemFieldProps) => {
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
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <span className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Tareas de la Unidad</span>
          <Button
            type='button'
            size='sm'
            className='text-xs h-7'
            onClick={() => appendTask({ content: '', evaluationMethod: '', inNotebook: false, date: '', points: 10 })}
          >
            <Plus className='w-3 h-3 mr-1' /> Añadir Tarea
          </Button>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {taskFields.map((taskField, taskIndex) => (
            <div key={taskField.id} className='flex flex-col items-stretch gap-4 border p-4 rounded-xl'>
              <div className='flex justify-between items-center w-full border-b pb-2'>
                <span>Tarea # {taskIndex + 1}</span>

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
                    <FormControl><Input type='number' {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`scheduleUnit.${unitIndex}.tasks.${taskIndex}.page`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[11px]'>Página</FormLabel>
                    <FormControl><Input placeholder='Ej. 10' {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`scheduleUnit.${unitIndex}.tasks.${taskIndex}.inNotebook`}
                render={({ field }) => (
                  <FormItem className='flex gap-2'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className='text-sm'>En Cuaderno</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};