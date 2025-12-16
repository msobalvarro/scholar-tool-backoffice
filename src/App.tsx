import { QueryClientProvider } from '@tanstack/react-query'
import { LoginTeacher } from './views/(logout)/login-teacher'
import { queryClient } from './utils/query-client'
import { ThemeProvider } from './components/ui/theme-provider'
import { BrowserRouter } from 'react-router'
import { Toaster } from './components/ui/sonner'
import { KEYSTORE_NAMES } from './utils/constant'
import { useSimpleLocalStorage } from './hooks/use-localstorage'
import {
  ProtectedRoutesTeacher,
  ProtectedRoutesUserInstitution
} from './views/routes'

function App() {
  const [isAuthTeacher] = useSimpleLocalStorage<string | null>(KEYSTORE_NAMES.TOKEN_TEACHER)
  const [isAuthUserInstitution] = useSimpleLocalStorage<string | null>(KEYSTORE_NAMES.TOKEN_USER_INSTITUTION)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <LoginTeacher />

        <>
          <BrowserRouter>
            {Boolean(isAuthTeacher) && <ProtectedRoutesTeacher />}
            {Boolean(isAuthUserInstitution) && <ProtectedRoutesUserInstitution />}

            {/* {!isAuth && <PublicRoutes />}
            {Boolean(isAuth) && <ProtectedRoutes />} */}
          </BrowserRouter>

          <Toaster />
        </>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
