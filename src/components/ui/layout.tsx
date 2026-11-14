import { AppSidebar } from './app-sidebar'
import { NavbarLayout } from './navbar-layout'
import { SidebarProvider } from './sidebar'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex-1 flex flex-col min-w-0 bg-background'>
        <NavbarLayout />
        <div className='flex-1 flex flex-col p-4 sm:p-6 bg-background text-foreground transition-colors'>
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}