'use client'
import {
  Home,
  Video,
  Camera,
  History,
  LogOut,
  FileText,
  LogOutIcon,
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
    {
    href: '/logout',
    icon: LogOutIcon,
    label: 'Sair',
  },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent className="flex flex-col justify-between">
        <div className="p-2">
          <h1 className="text font-semibold mb-4 ml-4 text-white">username</h1>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.slice(0,3).map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} className='text-black'>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors
    ${pathname ===  item.href? 'bg-muted text-black' : 'text-white hover:bg-muted hover:text-black'}`}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>


        <div className="p-2 mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.slice(3,4).map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} className='text-black'>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors
    ${pathname ===  item.href? 'bg-muted text-black' : 'text-white hover:bg-muted hover:text-black'}`}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}