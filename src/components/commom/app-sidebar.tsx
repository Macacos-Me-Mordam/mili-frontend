// src/components/commom/app-sidebar.tsx
'use client'
import {
  Video,
  History,
  LogOutIcon,
  Smartphone,
  FileClock,
  Settings,
  UserPlus,
  Home,
  ChartColumnStacked,
  LayoutDashboard, // 1. Importar o novo ícone
} from 'lucide-react'
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
} from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/auth-provider'
import { Skeleton } from '../ui/skeleton'
import { useEffect, useState } from 'react'
import { getProfile } from '@/services/auth-service' 

const navItems = [
  // 2. Adicionar o novo item de menu (sugiro no topo)
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/menu',
    icon: Home,
    label: 'Início',
  },
  {
    href: '/dashboard',
    icon: ChartColumnStacked,
    label: 'Estatísticas',
  },
  {
    href: '/occurrences',
    icon: Video,
    label: 'Ocorrências (Câmeras)',
  },
  {
    href: '/app-occurrences',
    icon: Smartphone,
    label: 'Ocorrências (App)',
  },
  {
    href: '/historic',
    icon: History,
    label: 'Histórico (Câmeras)',
  },
  {
    href: '/historic-app',
    icon: FileClock,
    label: 'Histórico (App)',
  },
  {
    href: '/settings',
    icon: Settings,
    label: 'Configurações',
  },
  {
    href: '/createUser',
    icon: UserPlus,
    label: 'Criação de Usuário',
  },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { user, logout, isLoggingOut } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    getProfile()
      .then((profile) => {
        if (profile.role === 'admin') {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
      })
      .catch(() => {
        setIsAdmin(false)
      })
  }, [])

  const handleLogout = () => {
    logout()
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent className="flex flex-col justify-between">
        <div className="p-2">
          <div className="mb-4 ml-4">
            {user ? (
              <h1 className="text font-semibold text-white">{user.name}</h1>
            ) : (
              <Skeleton className="h-6 w-32" />
            )}
          </div>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => {
                  if (item.label === 'Criação de Usuário' && !isAdmin) {
                    return null
                  }

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} className="text-black">
                        <Link
                          href={item.href}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors
                            ${pathname === item.href ? 'bg-muted text-black' : 'text-white hover:bg-muted hover:text-black'}`}
                        >
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <div className="p-2 mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full text-black"
                  >
                    <div className="flex items-center gap-2 text-white hover:text-black">
                      <LogOutIcon />
                      <span>{isLoggingOut ? 'A sair...' : 'Sair'}</span>
                    </div>
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