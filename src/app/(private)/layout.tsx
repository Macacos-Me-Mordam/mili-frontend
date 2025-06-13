<<<<<<< HEAD

import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'; //
import '@/app/globals.css';
import { AppSidebar } from '@/components/commom/app-sidebar';
import { Header } from '@/components/commom/custom-header'; //

export const metadata: Metadata = {
    title: 'Mili Frontend', // Título atualizado
    description: 'Mili Frontend: sistema de gerenciamento de câmeras e ocorrências.', // Descrição atualizada
};

export default async function PrivateLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-muted/40"> 
            <SidebarProvider> 
                <AppSidebar /> 
                <SidebarInset> 
                    <Header /> 
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
=======
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

>>>>>>> b29514dda9fc1af526fbaaf928280e6d0a7e4232
