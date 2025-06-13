// macacos-me-mordam/mili-frontend/Macacos-Me-Mordam-mili-frontend-b68b767b9a6cc7b2708e8fe470d88cd16023e1c1/src/components/commom/app-sidebar.tsx
'use client'
import {
  Home,
  Video,
  Camera,
  History,
  LogOut, 
  FileText,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'

const navItems = [
  {
    href: '/occurrences',
    icon: Video,
    label: 'Ocorrências',
  },
  {
    href: '/cameras',
    icon: Camera,
    label: 'Status das Câmeras',
  },
  {
    href: '/historic',
    icon: History,
    label: 'Histórico',
  },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent className="bg-slate-600 flex flex-col justify-between">
        <div className="p-2">
          <h1 className="text-lg font-semibold mb-4">MILI</h1>
          {/* futura logo dogao se tiver}
          {/*
          <Image
            src={logoPlaceholder}
            alt="Mili Logo"
            width={100}
            height={60}
            draggable={false}
            className="select-none"
            priority
          />
          */}
          <SidebarSeparator className="my-4" />
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <span className="flex items-center gap-2">
                          <item.icon />
                          <span>{item.label}</span>
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

     
        <div className="p-2 mt-auto"> 
          <SidebarSeparator className="my-4" />
          <SidebarGroup> 
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/sign-in"> 
                      <span className="flex items-center gap-2">
                        <LogOut />
                        <span>Sair</span>
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}