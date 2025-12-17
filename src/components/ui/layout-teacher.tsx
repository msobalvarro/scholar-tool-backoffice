import { AppSidebar } from './app-sidebar'
import { SidebarProvider } from './sidebar'

export function LayoutTeacher({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex-1 flex flex-col'>
        {/* <NavbarLayout /> */}
        <div className='flex-1 flex flex-col p-8 dark:bg-background-dark bg-background-light'>
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}