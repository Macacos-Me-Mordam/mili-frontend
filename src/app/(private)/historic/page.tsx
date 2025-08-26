// O código para esta página já foi alterado na resposta anterior,
// e o espaçamento já está consistente.
'use client'

import '@/app/globals.css'
import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useQuery } from '@tanstack/react-query'
import { getFailedOccurrences, getSuccessfulOccurrences, downloadOccurrenceProof } from '@/services/occurences-service'
import { HistoricOccurrence } from '@/model/interfaces/occurrence-type'
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

function OccurrenceGrid({ data, isLoading, isError, error, title, type }: { data: HistoricOccurrence[] | undefined, isLoading: boolean, isError: boolean, error: Error | null, title: string, type: 'success' | 'error' }) {
    const [downloadingId, setDownloadingId] = useState<string | null>(null)

    const handleDownload = async (id: string) => {
        setDownloadingId(id)
        try {
            const { blob, filename } = await downloadOccurrenceProof(id)
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
        } catch (err) {
            console.error("Falha no download:", err)
        } finally {
            setDownloadingId(null)
        }
    }

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
                                    ID da Câmera
                                    </CardDescription>
                                    <p className="text-sm font-medium">{occurrence.evidences?.[0]?.cameraId || 'N/A'}</p>
                                </div>
                                
                                <div>
                                    <CardDescription className="text-xs text-muted-foreground mb-0.5">
                                        Data da Evidência
                                    </CardDescription>
                                    <p className="text-xs text-muted-foreground">
                                        {occurrence.evidences?.[0] ? new Date(occurrence.evidences[0].createdAt).toLocaleString('pt-BR', {
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

export default function HistoricOfCollect() {
    const { 
        data: successfulOccurrences, 
        isLoading: isLoadingSuccess, 
        isError: isErrorSuccess,
        error: errorSuccess
    } = useQuery({
        queryKey: ['resolved-occurrences'],
        queryFn: getSuccessfulOccurrences,
    });

    const { 
        data: failedOccurrences, 
        isLoading: isLoadingFailed, 
        isError: isErrorFailed,
        error: errorFailed
    } = useQuery({
        queryKey: ['closed-occurrences'],
        queryFn: getFailedOccurrences,
    });

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredSuccessful = useMemo(() => {
        if (!successfulOccurrences) return [];
        return successfulOccurrences.filter(occurrence => {
            const occurrenceDate = new Date(occurrence.createdAt);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            if (start && occurrenceDate < start) return false;
            if (end && occurrenceDate > end) return false;
            return true;
        });
    }, [successfulOccurrences, startDate, endDate]);

    const filteredFailed = useMemo(() => {
        if (!failedOccurrences) return [];
        return failedOccurrences.filter(occurrence => {
            const occurrenceDate = new Date(occurrence.createdAt);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            if (start && occurrenceDate < start) return false;
            if (end && occurrenceDate > end) return false;
            return true;
        });
    }, [failedOccurrences, startDate, endDate]);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold tracking-tight">Histórico de Ocorrências (Câmeras)</h1>

            <div className="flex flex-col sm:flex-row items-end gap-4 p-4 border rounded-md">
                <div className="flex-1 w-full space-y-2">
                    <Label htmlFor="start-date">Data de Início</Label>
                    <Input id="start-date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className="flex-1 w-full space-y-2">
                    <Label htmlFor="end-date">Data de Fim</Label>
                    <Input id="end-date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
                {/* O botão não é estritamente necessário pois o filtro já é reativo, mas mantemos para a UX */}
                <Button className="w-full sm:w-auto">Aplicar Filtro</Button>
            </div>

            <OccurrenceGrid 
                title="Ocorrências Resolvidas"
                data={filteredSuccessful} 
                isLoading={isLoadingSuccess}
                isError={isErrorSuccess}
                error={errorSuccess as Error | null}
                type="success"
            />
            
            <div className="w-full h-px bg-border my-6"/>

            <OccurrenceGrid 
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