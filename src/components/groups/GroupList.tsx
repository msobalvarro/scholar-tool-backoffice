import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { GroupCard } from "./GroupCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { AcademicGroup } from '@/utils/types'

interface GroupListProps {
  groups: AcademicGroup[]
  selectedGroupId?: string
  onSelectGroup: (id: string) => void
}

export const GroupList = ({ groups, selectedGroupId, onSelectGroup }: GroupListProps) => {
  return (
    <div className="w-full lg:w-80 flex-shrink-0">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Select defaultValue="2024">
            <SelectTrigger className="bg-white border-gray-200 rounded-xl">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">Año 2024</SelectItem>
              <SelectItem value="2025">Año 2025</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="bg-white border-gray-200 rounded-xl">
              <SelectValue placeholder="Grados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Grados</SelectItem>
              <SelectItem value="3">3° Grado</SelectItem>
              <SelectItem value="4">4° Grado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Filtrar grupos..."
            className="pl-10 bg-gray-50 border-none rounded-xl focus-visible:ring-blue-500"
          />
        </div>

        <div className="space-y-1 max-h-[calc(100vh-350px)] overflow-y-auto pr-1">
          {groups.map((group) => (
            <GroupCard
              key={group._id}
              group={group}
              isActive={selectedGroupId === group._id}
              onClick={() => onSelectGroup(group._id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
