import { View, GalleryHorizontalEnd, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Visualizar Ocorrencias",
    url: "#",
    icon: View,
  },
  {
    title: "Histórico de Ocorrencias",
    url: "#",
    icon: GalleryHorizontalEnd,
  },
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    
    <Sidebar>
      <SidebarContent className='h-screen w-64 bg-gray-800 text-white'>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">Monitorador Intilgente de Lixo Indevido</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}