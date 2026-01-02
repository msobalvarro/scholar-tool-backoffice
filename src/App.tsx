import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/query-client'
import { ThemeProvider } from './components/ui/theme-provider'
import { BrowserRouter } from 'react-router'
import { Toaster } from './components/ui/sonner'
import { KEYSTORE_NAMES } from './utils/constant'
import { useSimpleLocalStorage } from './hooks/use-localstorage'
import { useOnlineStatus } from './hooks/use-online-status'
import { toast } from 'sonner'
import {
  ProtectedRoutesTeacher,
  ProtectedRoutesUserInstitution,
  PublicRoutes
} from './views/router'

function App() {
  const [isAuthTeacher] = useSimpleLocalStorage<string | null>(KEYSTORE_NAMES.TOKEN_TEACHER)
  const [isAuthUserInstitution] = useSimpleLocalStorage<string | null>(KEYSTORE_NAMES.TOKEN_USER_INSTITUTION)

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

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <>
          <BrowserRouter>
            {!isAuthTeacher && !isAuthUserInstitution && <PublicRoutes />}

            {Boolean(isAuthTeacher) && <ProtectedRoutesTeacher />}
            {Boolean(isAuthUserInstitution) && <ProtectedRoutesUserInstitution />}
          </BrowserRouter>

          <Toaster />
        </>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
