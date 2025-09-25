'use client'

import '@/app/globals.css'
import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useQuery } from '@tanstack/react-query'
import { getClosedAppOccurrences, getResolvedAppOccurrences, downloadAppOccurrenceProof } from '@/services/app-occurrence-services'
import { AppOccurrence } from '@/model/interfaces/app-occurrence-types'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

function HistoricCardSkeleton() {
    return (
        <div className="h-52 w-60 p-1">
            <div className="flex flex-col gap-3 p-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-24 mt-1" />
            </div>
        </div>
    );
}

function AppOccurrenceGrid({ data, isLoading, isError, error, title, type }: { data: AppOccurrence[] | undefined, isLoading: boolean, isError: boolean, error: Error | null, title: string, type: 'success' | 'error' }) {
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    const handleDownload = async (id: string) => {
        setDownloadingId(id);
        try {
            const { blob, filename } = await downloadAppOccurrenceProof(id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Falha no download:", err);
        } finally {
            setDownloadingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="grid gap-4 auto-cols-fr justify-center [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
                {Array.from({ length: 3 }).map((_, index) => <HistoricCardSkeleton key={index} />)}
            </div>
        );
    }

    if (isError) {
        return (
             <div className="flex flex-col items-center justify-center text-center p-4">
                <AlertTriangle className="w-12 h-12 text-destructive mb-2" />
                <h3 className="font-semibold">Falha ao carregar dados</h3>
                <p className="text-sm text-muted-foreground">{error?.message}</p>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return <p className="text-sm text-muted-foreground px-4">Nenhuma ocorrência encontrada.</p>
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            <div className="grid gap-4 auto-cols-fr justify-center [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
                {data.map((occurrence) => {
                    const isDownloading = downloadingId === occurrence.id;
                    return (
                        <Card
                            key={occurrence.id}
                            onClick={() => !isDownloading && handleDownload(occurrence.id)}
                            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-52 w-60 flex flex-col p-0 relative"
                        >
                            {isDownloading && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                                </div>
                            )}
                            <CardContent className="flex flex-col justify-between flex-1 gap-2 p-3">
                                <div>
                                    <CardDescription className="text-xs text-muted-foreground mb-0.5">
                                        Descrição
                                    </CardDescription>
                                    <CardTitle className="text-sm font-semibold truncate line-clamp-2">
                                        {occurrence.description}
                                    </CardTitle>
                                </div>

                                <div>
                                    <CardDescription className="text-xs text-muted-foreground mb-0.5">
                                    Endereço
                                    </CardDescription>
                                    <p className="text-sm font-medium">{occurrence.address}</p>
                                </div>
                                
                                <div>
                                    <CardDescription className="text-xs text-muted-foreground mb-0.5">
                                        Data da Finalização
                                    </CardDescription>
                                    <p className="text-xs text-muted-foreground">
                                        {occurrence.finalizedAt ? new Date(occurrence.finalizedAt).toLocaleString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                        }) : 'Data inválida'}
                                    </p>
                                </div>

                                {type === 'success' ? (
                                    <Badge
                                        variant="outline"
                                        className="border-green-500 text-green-500 text-xs"
                                    >
                                        <span className="w-2 h-2 mr-1.5 rounded-full bg-green-500" />
                                        Resolvido
                                    </Badge>
                                ) : (
                                    <Badge
                                        variant="outline"
                                        className="border-red-500 text-red-500 text-xs"
                                    >
                                        <span className="w-2 h-2 mr-1.5 rounded-full bg-red-500" />
                                        Fechado
                                    </Badge>
                                )}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}

export default function HistoricOfApp() {
    const { 
        data: successfulOccurrences, 
        isLoading: isLoadingSuccess, 
        isError: isErrorSuccess,
        error: errorSuccess
    } = useQuery({
        queryKey: ['resolved-app-occurrences'],
        queryFn: getResolvedAppOccurrences,
    });

    const { 
        data: failedOccurrences, 
        isLoading: isLoadingFailed, 
        isError: isErrorFailed,
        error: errorFailed
    } = useQuery({
        queryKey: ['closed-app-occurrences'],
        queryFn: getClosedAppOccurrences,
    });

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredSuccessful = useMemo(() => {
        if (!successfulOccurrences) return [];
        return successfulOccurrences
            .filter(occurrence => {
                const occurrenceDate = new Date(occurrence.createdAt);
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;

                if (start && occurrenceDate < start) return false;
                if (end && occurrenceDate > end) return false;
                return true;
            })
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // ordenação
    }, [successfulOccurrences, startDate, endDate]);

    const filteredFailed = useMemo(() => {
        if (!failedOccurrences) return [];
        return failedOccurrences
            .filter(occurrence => {
                const occurrenceDate = new Date(occurrence.createdAt);
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;

                if (start && occurrenceDate < start) return false;
                if (end && occurrenceDate > end) return false;
                return true;
            })
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // ordenação
    }, [failedOccurrences, startDate, endDate]);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold tracking-tight">Histórico de Ocorrências (App)</h1>

            <div className="flex flex-col sm:flex-row items-end gap-4 p-4 border rounded-md">
                <div className="flex-1 w-full space-y-2">
                    <Label htmlFor="start-date">Data de Início</Label>
                    <Input id="start-date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className="flex-1 w-full space-y-2">
                    <Label htmlFor="end-date">Data de Fim</Label>
                    <Input id="end-date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
                <Button className="w-full sm:w-auto">Aplicar Filtro</Button>
            </div>

            <AppOccurrenceGrid 
                title="Ocorrências Resolvidas"
                data={filteredSuccessful} 
                isLoading={isLoadingSuccess}
                isError={isErrorSuccess}
                error={errorSuccess as Error | null}
                type="success"
            />
            
            <div className="w-full h-px bg-border my-6"/>

            <AppOccurrenceGrid 
                title="Ocorrências Fechadas"
                data={filteredFailed} 
                isLoading={isLoadingFailed}
                isError={isErrorFailed}
                error={errorFailed as Error | null}
                type="error"
            />
        </div>
    );
}
