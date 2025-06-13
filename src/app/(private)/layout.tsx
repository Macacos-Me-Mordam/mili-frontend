import { ReactNode } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'; //
import '@/app/globals.css';
import { AppSidebar } from '@/components/commom/app-sidebar';

export default async function PrivateLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-muted/40"> 
            <SidebarProvider> 
                <AppSidebar variant="inset"/> 
                <SidebarInset> 
                  <SidebarTrigger className="ml-2 mt-2" /> 
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
