import type { AcademicGroup } from '@/utils/types'
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"

interface GroupCardProps {
  group: AcademicGroup
  isActive: boolean
  onClick: () => void
}

export const GroupCard = ({ group, isActive, onClick }: GroupCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all border-2 mb-3 ${isActive
        ? "border-blue-500 bg-white shadow-md relative group-active"
        : "border-transparent hover:bg-gray-50 bg-white"
        }`}
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className={`font-bold ${isActive ? "text-blue-600" : "text-gray-900"}`}>
          {group.name}
        </h4>
        <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-medium">
          {group.studentCount} Alumnos
        </Badge>
      </div>
      <p className="text-sm text-gray-500 mb-2">{group.subject}</p>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
          <User className="w-3 h-3" />
        </div>
        <span>{group.teacher.name}</span>
      </div>
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-xl" />
      )}
    </div>
  )
}
