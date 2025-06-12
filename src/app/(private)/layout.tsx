import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
     
    <SidebarProvider className='inset'>
      <AppSidebar/>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>

  )
}

