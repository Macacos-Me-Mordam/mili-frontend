'use client'

import '@/app/globals.css'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useQuery } from '@tanstack/react-query'
import { getFailedOccurrences, getSuccessfulOccurrences } from '@/services/occurences-service'
import { HistoricOccurrence } from '@/model/interfaces/occurrence-type'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertTriangle } from 'lucide-react'


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

function OccurrenceGrid({ data, isLoading, isError, error, type }: { data: HistoricOccurrence[] | undefined, isLoading: boolean, isError: boolean, error: Error | null, type: 'success' | 'error' }) {
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
        <div className="grid gap-4 auto-cols-fr justify-center [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {data.map((occurrence) => {
                const firstEvidence = occurrence.evidences?.[0];
                
                return (
                    <Card
                        key={occurrence.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-52 w-60 flex flex-col p-0"
                    >
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
                                {/* CORREÇÃO: Usando cameraId (camelCase) */}
                                <p className="text-sm font-medium">{firstEvidence?.cameraId || 'N/A'}</p>
                            </div>
                            
                            <div>
                                <CardDescription className="text-xs text-muted-foreground mb-0.5">
                                    Data da Evidência
                                </CardDescription>
                                <p className="text-xs text-muted-foreground">
                                    {}
                                    {firstEvidence ? new Date(firstEvidence.createdAt).toLocaleString('pt-BR', {
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

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold tracking-tight">Histórico de Ocorrências</h1>

            <Accordion type="multiple" className="w-full" defaultValue={['resolved', 'closed']}>
                <AccordionItem value="resolved">
                    <AccordionTrigger>Ocorrências Resolvidas</AccordionTrigger>
                    <AccordionContent>
                        <OccurrenceGrid 
                            data={successfulOccurrences} 
                            isLoading={isLoadingSuccess}
                            isError={isErrorSuccess}
                            error={errorSuccess as Error | null}
                            type="success"
                        />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="closed">
                    <AccordionTrigger>Ocorrências Fechadas</AccordionTrigger>
                    <AccordionContent>
                        <OccurrenceGrid 
                            data={failedOccurrences} 
                            isLoading={isLoadingFailed}
                            isError={isErrorFailed}
                            error={errorFailed as Error | null}
                            type="error"
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}