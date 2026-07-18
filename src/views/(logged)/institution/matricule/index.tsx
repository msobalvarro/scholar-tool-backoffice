import { MatriculeTable } from '@/components/matricule/matricule-table'
import { ViewContainer } from "@/components/ui/view-container"

export const MatriculeView = () => {
  return (
    <ViewContainer>
      <h1>Matriculas</h1>

      <MatriculeTable />
    </ViewContainer>
  )
}