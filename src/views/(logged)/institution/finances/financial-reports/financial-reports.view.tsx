import { TitlePageView } from '@/components/ui/title-page'
import { ViewContainer } from '@/components/ui/view-container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, LineChart } from 'lucide-react'

export const FinancialReportsView = () => {
  return (
    <ViewContainer className='flex flex-col gap-6'>
      <TitlePageView
        title='Reportes Financieros'
        subtitle='Consulta balances, ingresos y estados financieros relacionados a matrículas'
      />

      <Card className='border-dashed'>
        <CardHeader className='text-center items-center pb-2'>
          <div className='p-3 rounded-full bg-accent/10 text-accent mb-2'>
            <DollarSign className='size-8' />
          </div>
          <CardTitle className='text-xl'>Módulo de Reportes Financieros</CardTitle>
          <CardDescription className='max-w-md'>
            Esta vista está lista para visualizar gráficos financieros, cobros, balances y estados de pago.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center p-8 text-center text-muted-foreground'>
          <div className='flex items-center gap-2 text-sm'>
            <LineChart className='size-4' />
            <span>Sin datos financieros para mostrar actualmente.</span>
          </div>
        </CardContent>
      </Card>
    </ViewContainer>
  )
}
