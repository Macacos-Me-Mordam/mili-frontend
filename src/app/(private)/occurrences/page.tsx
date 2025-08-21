'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getPendingOccurrences } from '@/services/occurences-service'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertTriangle } from 'lucide-react'

function OccurrenceCardSkeleton() {
  return (
    <div className="h-52 w-60 p-1">
        <div className="flex flex-col gap-3 p-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-24 mt-auto" />
        </div>
    </div>
  )
}

export default function OccurrencesPage() {
  const {
    data: occurrences,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['processing-occurrences'],
    queryFn: getPendingOccurrences,
  })

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold">Falha ao carregar ocorrências</h2>
        <p className="text-muted-foreground max-w-sm">
          Não foi possível buscar os dados. Verifique sua conexão ou tente novamente.
        </p>
        <pre className="mt-4 text-xs bg-muted p-2 rounded-md">{error.message}</pre>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold tracking-tight">Visualizar Ocorrências (Câmeras)</h1>
      <div className="grid gap-4 auto-cols-fr justify-center [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <OccurrenceCardSkeleton key={index} />
            ))
          : occurrences?.map((occurrence) => {
              const firstEvidence = occurrence.evidences?.[0];

              return (
                <Link key={occurrence.id} href={`/occurrences/${occurrence.id}`} passHref>
                  <Card
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-52 w-60 flex flex-col p-0"
                  >
                    {/* A correção principal está aqui: justify-between no CardContent */}
                    <CardContent className="flex flex-col justify-between flex-1 p-3">
                      {/* Agrupador para as informações de texto */}
                      <div className="space-y-3">
                        <div>
                          <CardDescription className="text-xs text-muted-foreground mb-0.5">
                            Descrição
                          </CardDescription>
                          <CardTitle className="text-sm font-semibold line-clamp-2">
                            {occurrence.description}
                          </CardTitle>
                        </div>
                        <div>
                          <CardDescription className="text-xs text-muted-foreground mb-0.5">
                            ID da Câmera
                          </CardDescription>
                          <p className="text-sm font-medium">{firstEvidence?.cameraId || 'N/A'}</p>
                        </div>
                        <div>
                          <CardDescription className="text-xs text-muted-foreground mb-0.5">
                            Data
                          </CardDescription>
                          <p className="text-xs text-muted-foreground">
                            {occurrence.createdAt ? new Date(occurrence.createdAt).toLocaleString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 'Data inválida'}
                          </p>
                        </div>
                      </div>
                      <Badge
                          variant="outline"
                          className="border-orange-500 text-orange-500 text-xs">
                          <span className="w-2 h-2 mr-1.5 rounded-full bg-orange-500"></span>
                          Não Verificado
                        </Badge>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
      </div>
    </div>
  )
}