'use client'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
// Correção 1: Importando o hook com o nome correto do seu arquivo.
import { useIsMobile } from '@/hooks/use-mobile'
import {
  Home,
  Menu,
  Video,
  Camera,
  History,
  LogOut,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function AppSidebar() {
  const pathname = usePathname()
  // Correção 2: Chamando o hook corretamente e atribuindo o resultado (booleano) à constante.
  const isMobile = useIsMobile()

  const navItems = [
    {
      href: '/dashboard',
      icon: Home,
      label: 'Início',
    },
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

  const content = (
    <aside className="flex h-full w-full flex-col p-4">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">Mili</h1>
      </div>
      <Separator className="my-4" />
      <nav className="flex flex-1 flex-col justify-between">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Button
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/sign-in">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Link>
        </Button>
      </nav>
    </aside>
  )

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          {content}
        </SheetContent>
      </Sheet>
    )
  }

  return <div className="hidden lg:block lg:w-72">{content}</div>
}