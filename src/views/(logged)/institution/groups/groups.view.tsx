import { useState } from "react"
import { GroupsStats } from "@/components/groups/GroupsStats"
import { GroupList } from "@/components/groups/GroupList"
import { GroupDetail } from "@/components/groups/GroupDetail"
import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"
import { toast } from "sonner"
import type { AcademicGroup, GroupStudent } from '@/utils/types'

const MOCK_GROUPS: AcademicGroup[] = [
  {
    _id: "1",
    name: "Grupo 3-A",
    subject: "Matemáticas Avanzadas",
    grade: "3° Grado",
    semester: "Semestre 1",
    status: "active",
    teacher: { name: "Prof. Sarah Connor" },
    studentCount: 32,
  },
  {
    _id: "2",
    name: "Grupo 3-B",
    subject: "Matemáticas Avanzadas",
    grade: "3° Grado",
    semester: "Semestre 1",
    status: "active",
    teacher: { name: "Prof. John Smith" },
    studentCount: 28,
  },
  {
    _id: "3",
    name: "Grupo 4-A",
    subject: "Física Elemental",
    grade: "4° Grado",
    semester: "Semestre 1",
    status: "active",
    teacher: { name: "Prof. Alan Turing" },
    studentCount: 30,
  },
  {
    _id: "4",
    name: "Grupo 4-B",
    subject: "Física Elemental",
    grade: "4° Grado",
    semester: "Semestre 1",
    status: "active",
    teacher: { name: "Prof. Marie Curie" },
    studentCount: 25,
  },
]

const MOCK_STUDENTS: GroupStudent[] = [
  {
    _id: "s1",
    firstName: "Ana",
    lastName: "García",
    email: "ana.garcia@escuela.edu",
    enrollmentId: "2023-0045",
    status: "regular",
  },
  {
    _id: "s2",
    firstName: "Luis",
    lastName: "Méndez",
    email: "luis.m@escuela.edu",
    enrollmentId: "2023-0128",
    status: "conditional",
  },
  {
    _id: "s3",
    firstName: "Jorge",
    lastName: "Perez",
    email: "jorge.p@escuela.edu",
    enrollmentId: "2023-0341",
    status: "regular",
  },
  {
    _id: "s4",
    firstName: "Maria",
    lastName: "Sanchez",
    email: "maria.s@escuela.edu",
    enrollmentId: "2023-0102",
    status: "regular",
  },
  {
    _id: "s5",
    firstName: "Carlos",
    lastName: "Ramirez",
    email: "carlos.r@escuela.edu",
    enrollmentId: "2023-0512",
    status: "suspended",
  },
]

export const GroupsView = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(MOCK_GROUPS[0]._id)

  const selectedGroup = MOCK_GROUPS.find((g) => g._id === selectedGroupId) || MOCK_GROUPS[0]

  const handleEdit = (group: AcademicGroup) => {
    toast.info(`Editar grupo: ${group.name}`)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este grupo?")) {
      toast.error("Grupo eliminado (simulado)")
    }
  }

  return (
    <div className="p-1 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-1">
            Grupos Académicos
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            Gestiona la asignación de estudiantes y profesores.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-gray-200 h-11 px-6 font-bold shadow-sm hover:bg-gray-50">
            <Download className="w-5 h-5 mr-2" />
            Importar
          </Button>
          <Button className="rounded-xl h-11 px-6 font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Grupo
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <GroupsStats />

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <GroupList
          groups={MOCK_GROUPS}
          selectedGroupId={selectedGroupId}
          onSelectGroup={setSelectedGroupId}
        />
        <GroupDetail
          group={selectedGroup}
          students={MOCK_STUDENTS}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}