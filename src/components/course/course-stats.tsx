import { Card, CardContent } from "@/components/ui/card"
import { Users, Bookmark } from "lucide-react"

export const GroupsStats = () => {
  const stats = [
    {
      title: "TOTAL GRUPOS",
      value: "24",
      icon: Bookmark,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "ESTUDIANTES",
      value: "850",
      icon: Users,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
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
