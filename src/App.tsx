import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './adapters/query-client'
import { ThemeProvider } from './components/ui/theme-provider'
import { BrowserRouter } from 'react-router'
import { Toaster } from './components/ui/sonner'
import { useOnlineStatus } from './hooks/use-online-status'
import { useAuth } from './hooks/use-auth'
import { toast } from 'sonner'
import {
  ProtectedRoutesTeacher,
  ProtectedRoutesUserInstitution,
  PublicRoutes
} from './views/router'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat' // ES 2015

dayjs.extend(localizedFormat);

dayjs().format("L LT");

function AppContent() {
  const { isLoading, isTeacher, isInstitution } = useAuth()

  useOnlineStatus({
    onOnline: () => {
      toast.success('Conexión restablecida', {
        description: 'Ahora estás en línea. Las funciones de sincronización están activas.',
        duration: 5000,
      })
    },
    onOffline: () => {
      toast.error('Sin conexión a internet', {
        description: 'Estás trabajando en modo local. Algunos cambios podrían no sincronizarse.',
        duration: 5000,
      })
    }
  })

  if (isLoading) return null

  return (
    <BrowserRouter>
      {!isTeacher && !isInstitution && <PublicRoutes />}
      {isTeacher && <ProtectedRoutesTeacher />}
      {isInstitution && <ProtectedRoutesUserInstitution />}
    </BrowserRouter>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <>
          <AppContent />
          <Toaster />
        </>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
