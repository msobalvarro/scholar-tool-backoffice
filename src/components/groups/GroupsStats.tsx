import { Card, CardContent } from "@/components/ui/card"
import { Users, Bookmark, UserPlus, BarChart3 } from "lucide-react"

export const GroupsStats = () => {
  const stats = [
    {
      title: "TOTAL GRUPOS",
      value: "24",
      icon: Bookmark,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "ESTUDIANTES",
      value: "850",
      icon: Users,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "SIN ASIGNAR",
      value: "12",
      icon: UserPlus,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "PROMEDIO / GRUPO",
      value: "35",
      icon: BarChart3,
      color: "bg-purple-50 text-purple-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                {stat.title}
              </p>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
