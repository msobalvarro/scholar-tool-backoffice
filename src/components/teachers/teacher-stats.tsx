import { Card, CardContent } from "@/components/ui/card"
import { Users, CheckCircle2, Umbrella } from "lucide-react"

interface TeacherStatsProps {
  total: number
  active: number
  onLeave: number
}

export const TeacherStats = ({ total, active, onLeave }: TeacherStatsProps) => {
  const stats = [
    {
      label: "Total Profesores",
      value: total,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Activos",
      value: active,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "En Licencia",
      value: onLeave,
      icon: Umbrella,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardContent className="flex items-center p-6">
            <div className={`p-3 rounded-xl ${stat.bgColor} mr-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
