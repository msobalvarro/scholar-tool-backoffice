import { Check, ChevronsUpDown, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from 'react'

interface Props {
  data: { value: string, label: string }[]
}

export function MultiSelect({ data }: Props) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  const handleUnselect = (item: string) => {
    setSelected(selected.filter((i) => i !== item))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-75 justify-between h-auto min-h-10">
          <div className="flex flex-wrap gap-1">
            {selected.length > 0 ? (
              selected.map((item) => (
                <Badge key={item} variant="secondary" className="mr-1">
                  {item}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring"
                    onKeyDown={(e) => { if (e.key === "Enter") handleUnselect(item) }}
                    onClick={(e) => { e.stopPropagation(); handleUnselect(item) }}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">Selecciona opciones...</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-75 p-0">
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup>
              {data.map((framework) => (
                <CommandItem
                  key={framework.value}
                  onSelect={() => {
                    setSelected(
                      selected.includes(framework.value)
                        ? selected.filter((item) => item !== framework.value)
                        : [...selected, framework.value]
                    )
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${selected.includes(framework.value) ? "opacity-100" : "opacity-0"}`}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}