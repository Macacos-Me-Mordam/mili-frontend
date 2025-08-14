import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { QueryProvider } from '@/components/query-provider' // 1. Importar
import { AuthProvider } from '@/contexts/auth-provider'    // 2. Importar

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mili - Monitoramento',
  description: 'Sistema de Monitoramento de Ocorrências',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </QueryProvider>
          
        </ThemeProvider>
      </body>
    </html>
  )
}