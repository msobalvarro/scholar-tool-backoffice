import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/query-client'
import { ThemeProvider } from './components/ui/theme-provider'
import { BrowserRouter } from 'react-router'
import { Toaster } from './components/ui/sonner'
import { KEYSTORE_NAMES } from './utils/constant'
import { useSimpleLocalStorage } from './hooks/use-localstorage'
import {
  ProtectedRoutesTeacher,
  ProtectedRoutesUserInstitution,
  PublicRoutes
} from './views/routes'

function App() {
  const [isAuthTeacher] = useSimpleLocalStorage<string | null>(KEYSTORE_NAMES.TOKEN_TEACHER)
  const [isAuthUserInstitution] = useSimpleLocalStorage<string | null>(KEYSTORE_NAMES.TOKEN_USER_INSTITUTION)

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
