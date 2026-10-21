import { useFieldArray, useWatch, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'
import type { TaskScheduleSchema } from '@/schemas/task-schedule-schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Trash2, Plus, Calendar, Award, BookOpen, Layers } from 'lucide-react'
import dayjs from 'dayjs'

interface ScheduleUnitCardProps {
  control: Control<TaskScheduleSchema>
  register: UseFormRegister<TaskScheduleSchema>
  errors: FieldErrors<TaskScheduleSchema>
  unitIndex: number
  removeUnit: (index: number) => void
  canRemove: boolean
}

export const ScheduleUnitCard = ({
  control,
  register,
  errors,
  unitIndex,
  removeUnit,
  canRemove,
}: ScheduleUnitCardProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `scheduleUnit.${unitIndex}.tasks`,
  })

  const watchedTasks = useWatch({
    control,
    name: `scheduleUnit.${unitIndex}.tasks`,
  }) || []

  const unitTotalPoints = watchedTasks.reduce((acc, curr) => acc + (Number(curr?.points) || 0), 0)
  const unitErrors = errors.scheduleUnit?.[unitIndex]

  const handleAddTask = () => {
    append({
      content: '',
      evaluationMethod: 'Rúbrica',
      page: '',
      inNotebook: false,
      date: dayjs().format('YYYY-MM-DD'),
      points: 10,
    })
  }

  return (
    <Card className="border border-border/70 bg-card shadow-xs transition-all hover:border-border">
      <CardHeader className="p-4 sm:p-5 border-b border-border/40 bg-muted/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-6 px-2.5 text-xs font-semibold tracking-wide border-primary/20 text-primary bg-primary/5">
              <Layers className="size-3 mr-1" />
              Unidad {unitIndex + 1}
            </Badge>
            <Badge variant="secondary" className="h-6 px-2 text-xs font-medium text-muted-foreground">
              {fields.length} {fields.length === 1 ? 'tarea' : 'tareas'} • {unitTotalPoints} pts
            </Badge>
          </div>

          {canRemove && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeUnit(unitIndex)}
              className="text-muted-foreground hover:text-destructive h-8 px-2.5 text-xs self-end sm:self-auto"
            >
              <Trash2 className="size-3.5 mr-1.5" />
              Eliminar unidad
            </Button>
          )}
        </div>

        {/* Unit metadata inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Nombre de la Unidad <span className="text-destructive">*</span>
            </label>
            <Input
              {...register(`scheduleUnit.${unitIndex}.unitName`)}
              placeholder="Ej: Unidad 1: Ecuaciones e Inecuaciones"
              className="h-9 text-sm bg-background border-border/80 focus-visible:ring-1"
            />
            {unitErrors?.unitName && (
              <p className="text-xs text-destructive">{unitErrors.unitName.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Disciplina o Área <span className="text-destructive">*</span>
            </label>
            <Input
              {...register(`scheduleUnit.${unitIndex}.diciplineName`)}
              placeholder="Ej: Álgebra / Aritmética"
              className="h-9 text-sm bg-background border-border/80 focus-visible:ring-1"
            />
            {unitErrors?.diciplineName && (
              <p className="text-xs text-destructive">{unitErrors.diciplineName.message}</p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between pb-1">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tareas de la Unidad
          </h4>
          <span className="text-xs text-muted-foreground">
            Total asignado: <strong className="text-foreground">{unitTotalPoints} pts</strong>
          </span>
        </div>

        {fields.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/80 p-6 text-center text-sm text-muted-foreground">
            <p>No hay tareas agregadas en esta unidad.</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddTask}
              className="mt-3 text-xs"
            >
              <Plus className="size-3.5 mr-1" />
              Agregar primera tarea
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {fields.map((field, taskIndex) => {
              const taskErrors = unitErrors?.tasks?.[taskIndex]
              return (
                <div
                  key={field.id}
                  className="group relative rounded-xl border border-border/60 bg-muted/10 p-3 sm:p-4 hover:border-border transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary text-[11px] font-bold shrink-0">
                      {taskIndex + 1}
                    </span>

                    <div className="flex-1 space-y-1">
                      <Input
                        {...register(`scheduleUnit.${unitIndex}.tasks.${taskIndex}.content`)}
                        placeholder="Descripción detallada de la tarea o actividad..."
                        className="h-9 text-sm bg-background border-border/70"
                      />
                      {taskErrors?.content && (
                        <p className="text-xs text-destructive">{taskErrors.content.message}</p>
                      )}
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(taskIndex)}
                      className="size-8 text-muted-foreground hover:text-destructive shrink-0"
                      title="Eliminar tarea"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 pt-1 text-xs">
                    {/* Evaluation Method */}
                    <div className="col-span-2 sm:col-span-1 space-y-1">
                      <label className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Award className="size-3 text-muted-foreground" />
                        Evaluación
                      </label>
                      <Input
                        {...register(`scheduleUnit.${unitIndex}.tasks.${taskIndex}.evaluationMethod`)}
                        placeholder="Ej: Rúbrica / Cuaderno"
                        className="h-8 text-xs bg-background border-border/70"
                      />
                      {taskErrors?.evaluationMethod && (
                        <p className="text-[10px] text-destructive">{taskErrors.evaluationMethod.message}</p>
                      )}
                    </div>

                    {/* Points */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Award className="size-3 text-muted-foreground" />
                        Puntos (pts)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        {...register(`scheduleUnit.${unitIndex}.tasks.${taskIndex}.points`)}
                        className="h-8 text-xs bg-background border-border/70"
                      />
                      {taskErrors?.points && (
                        <p className="text-[10px] text-destructive">{taskErrors.points.message}</p>
                      )}
                    </div>

                    {/* Due Date */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Calendar className="size-3 text-muted-foreground" />
                        Fecha Entrega
                      </label>
                      <Input
                        type="date"
                        {...register(`scheduleUnit.${unitIndex}.tasks.${taskIndex}.date`)}
                        className="h-8 text-xs bg-background border-border/70"
                      />
                      {taskErrors?.date && (
                        <p className="text-[10px] text-destructive">{taskErrors.date.message}</p>
                      )}
                    </div>

                    {/* Page (Optional) */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <BookOpen className="size-3 text-muted-foreground" />
                        Páginas (opcional)
                      </label>
                      <Input
                        {...register(`scheduleUnit.${unitIndex}.tasks.${taskIndex}.page`)}
                        placeholder="Ej: 45-48"
                        className="h-8 text-xs bg-background border-border/70"
                      />
                    </div>

                    {/* In Notebook Toggle */}
                    <div className="col-span-2 sm:col-span-4 md:col-span-1 flex items-end pb-1.5">
                      <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs text-foreground font-medium">
                        <input
                          type="checkbox"
                          {...register(`scheduleUnit.${unitIndex}.tasks.${taskIndex}.inNotebook`)}
                          className="size-4 rounded border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                        />
                        <span>¿En cuaderno?</span>
                      </label>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddTask}
            className="w-full border-dashed border-border/80 hover:bg-accent/40 text-xs font-medium h-8.5 text-muted-foreground hover:text-foreground"
          >
            <Plus className="size-3.5 mr-1" />
            Añadir tarea a esta unidad
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
