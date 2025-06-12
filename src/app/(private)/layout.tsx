
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