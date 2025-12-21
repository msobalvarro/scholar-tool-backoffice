import { AppSidebar } from './app-sidebar'
import { NavbarLayout } from './navbar-layout'
import { SidebarProvider } from './sidebar'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex-1 flex flex-col'>
        <NavbarLayout />
        <div className='flex-1 flex flex-col p-4 dark:bg-[#020617] bg-[#e8e9e9]'>
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}