// src/app/(private)/menu/page.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/auth-provider'
import { getPendingOccurrences } from '@/services/occurences-service'
import { getProcessingAppOccurrences } from '@/services/app-occurrence-services'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Video, Smartphone, History, Settings, UserPlus, LayoutDashboard, FileClock } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react' // Importar useEffect e useState
import { getProfile } from '@/services/auth-service' // Importar getProfile

// ... (Componentes KpiCard e NavCard não mudam)
function KpiCard({ title, value, icon }: { title: string, value: string | number, icon: ReactNode }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}

function NavCard({ href, icon, title, description }: { href: string, icon: ReactNode, title: string, description: string }) {
    return (
        <Link href={href}>
            <Card className="hover:bg-muted/50 transition-colors h-full flex flex-col">
                <CardHeader className="flex-1">
                    <div className="mb-4 flex justify-center items-center h-12 w-12 rounded-lg bg-primary text-primary-foreground">
                        {icon}
                    </div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
}


export default function MenuPage() {
    const { user } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false); // Estado para controlar se é admin

    // Efeito para verificar a permissão de admin
    useEffect(() => {
        getProfile().then(profile => {
            if (profile.role === 'admin' || profile.email === 'admin@admin.com') {
                setIsAdmin(true);
            }
        }).catch(() => setIsAdmin(false));
    }, []);

    const { data: pendingCam, isLoading: isLoadingCam } = useQuery({
        queryKey: ['processing-occurrences'],
        queryFn: getPendingOccurrences,
    });

    const { data: pendingApp, isLoading: isLoadingApp } = useQuery({
        queryKey: ['processing-app-occurrences'],
        queryFn: getProcessingAppOccurrences,
    });

    const isLoading = isLoadingCam || isLoadingApp;

    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Bem-vindo(a), {user?.name || 'Utilizador'}!
                </h1>
                <p className="text-muted-foreground">
                    Aqui está um resumo do sistema e atalhos para as principais funcionalidades.
                </p>
            </div>
            
            <div className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight">Resumo de Atividades</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-28 w-full" />
                            <Skeleton className="h-28 w-full" />
                        </>
                    ) : (
                        <>
                            <KpiCard
                                title="Ocorrências Pendentes (Câmeras)"
                                value={pendingCam?.length ?? 0}
                                icon={<Video className="h-4 w-4 text-muted-foreground" />}
                            />
                            <KpiCard
                                title="Ocorrências Pendentes (App)"
                                value={pendingApp?.length ?? 0}
                                icon={<Smartphone className="h-4 w-4 text-muted-foreground" />}
                            />
                        </>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight">Navegação Principal</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <NavCard
                        href="/occurrences"
                        icon={<Video className="h-6 w-6" />}
                        title="Ocorrências da Câmera"
                        description="Valide novas detecções feitas pelo sistema de IA."
                    />
                     <NavCard
                        href="/app-occurrences"
                        icon={<Smartphone className="h-6 w-6" />}
                        title="Ocorrências do App"
                        description="Analise os relatos enviados pelos utilizadores do aplicativo."
                    />
                    <NavCard
                        href="/historic"
                        icon={<History className="h-6 w-6" />}
                        title="Histórico (Câmeras)"
                        description="Explore o arquivo de ocorrências processadas das câmeras."
                    />
                    <NavCard
                        href="/historic-app"
                        icon={<FileClock className="h-6 w-6" />}
                        title="Histórico (App)"
                        description="Consulte o histórico de relatos já analisados do aplicativo."
                    />
                    <NavCard
                        href="/dashboard"
                        icon={<LayoutDashboard className="h-6 w-6" />}
                        title="Estatísticas"
                        description="Visualize gráficos e análises sobre os dados de ocorrências."
                    />
                    <NavCard
                        href="/settings"
                        icon={<Settings className="h-6 w-6" />}
                        title="Configurações"
                        description="Ajuste as definições gerais e de aparência do sistema."
                    />
                    {/* Cartão de navegação que só aparece para administradores */}
                    {isAdmin && (
                        <NavCard
                            href="/createUser"
                            icon={<UserPlus className="h-6 w-6" />}
                            title="Criar Usuário"
                            description="Adicione novos utilizadores (administradores ou padrão) ao sistema."
                        />
                    )}
                </div>
            </div>
        </div>
    );
}