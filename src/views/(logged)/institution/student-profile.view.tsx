import { useParams, useNavigate } from 'react-router'
import { useStudents } from '@/hooks/API/use-students'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Mail, Phone, Calendar, User } from 'lucide-react'
import { Loader2 } from 'lucide-react'

export const StudentProfileView = () => {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const { data: students, isLoading } = useStudents()

  // In a real app, we would fetch a single student by ID. 
  // Since useStudents fetches all, we find the one we need.
  const student = students?.find(s => s._id === studentId)

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!student) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-xl text-muted-foreground">Estudiante no encontrado</p>
        <Button onClick={() => navigate('/students')}>Volver a Estudiantes</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-8 py-8">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          className="mb-4 pl-0 hover:bg-transparent hover:text-primary"
          onClick={() => navigate('/students')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Directorio
        </Button>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
              <AvatarImage src={student.photo} alt={student.firstName} />
              <AvatarFallback className="text-2xl">{student.firstName[0]}{student.lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{student.firstName} {student.lastName}</h1>
              <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-xs">ID: {student._id.slice(-8).toUpperCase()}</span>
                <span>•</span>
                <span>10º Grado</span> {/* Mock Data */}
                <span>•</span>
                <Badge variant={student.status === 'active' ? 'default' : 'destructive'} className="capitalize">
                  {student.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <User className="mr-2 h-4 w-4" />
              Reporte
            </Button>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Editar Perfil
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Mock) */}
      <div className="flex w-full border-b">
        <button className="border-b-2 border-primary px-4 py-2 text-sm font-medium text-primary">Resumen</button>
        <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Información Personal</button>
        <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Historial Académico</button>
        <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Familia y Tutores</button>
      </div>

      {/* Overview Content */}
      <div className="space-y-6">
        {/* Quick Stats Row (Mock Data based on image) */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-blue-100 p-2 text-blue-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Asistencia</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold">95%</span>
                <span className="text-sm text-green-600">+2%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-purple-100 p-2 text-purple-600">
                  {/* Mock Icon */}
                  <div className="h-5 w-5 font-bold">A+</div>
                </div>
                <span className="text-sm font-medium text-muted-foreground">Promedio Actual</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold">3.8</span>
                <span className="text-sm text-muted-foreground">/ 4.0</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-orange-100 p-2 text-orange-600">
                  <div className="h-5 w-5 text-center font-bold">!</div>
                </div>
                <span className="text-sm font-medium text-muted-foreground">Incidentes</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold">0</span>
                <span className="text-sm text-muted-foreground">Este periodo</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Current Subjects (Mock) */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Materias Actuales</CardTitle>
              <Button variant="link" className="text-primary">Ver Todas</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Matemáticas 101', teacher: 'Mr. Roberts', schedule: 'Lun, Mié 09:00 AM', grade: '92% (A)' },
                  { name: 'Historia Universal', teacher: 'Ms. Davis', schedule: 'Mar, Jue 11:00 AM', grade: '88% (B+)' },
                  { name: 'Laboratorio de Física', teacher: 'Dr. Chen', schedule: 'Vie 01:00 PM', grade: '95% (A)' },
                  { name: 'Literatura Inglesa', teacher: 'Mrs. Wilson', schedule: 'Lun, Mié 02:00 PM', grade: '90% (A-)' },
                ].map((subject, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{subject.name}</p>
                      <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{subject.grade}</p>
                      <p className="text-xs text-muted-foreground">{subject.schedule}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personal Info Box */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Información Personal</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">Fecha de Nacimiento</p>
                  <p>{new Date(student.birthday).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">Género</p>
                  <p className="capitalize">{student.gender}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">Institución</p>
                  <p>{student.institution.name}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">Dirección</p>
                  <p>Av. Reforma 123, Col. Centro, México, 06600</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-medium text-muted-foreground">Email del Estudiante</p>
                    <p className="truncate font-medium">{student.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Teléfono Móvil</p>
                    <p className="font-medium">+52 55 1234 5678</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {student.responsable && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Tutores</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{student.responsable.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.responsable.fullName}</p>
                      <p className="text-xs text-muted-foreground">Contacto Principal</p>
                      <p className="mt-1 text-xs font-medium">{student.responsable.phoneNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
