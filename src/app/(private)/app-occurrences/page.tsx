'use client'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getProcessingAppOccurrences } from '@/services/app-occurrence-services'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertTriangle } from 'lucide-react'

function AppOccurrenceCardSkeleton() {
  return (
    <div className="h-52 w-60 p-1">
      <div className="flex flex-col gap-3 p-3">

        <Skeleton className="h-4 w-3-4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-24 mt-1" />
      </div>
    </div>
  );
}

export default function AppOccurrencesPage() {
  const {
    data: occurrences,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['processing-app-occurrences'],
    queryFn: getProcessingAppOccurrences,
  })

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-wrap justify-start gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <AppOccurrenceCardSkeleton key={index} />
          ))}
        </div>
      )
    }
    
    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-4">
          <AlertTriangle className="w-12 h-12 text-destructive mb-2" />
          <h3 className="font-semibold">Falha ao carregar ocorrências do app</h3>
          <p className="text-sm text-muted-foreground">{error?.message}</p>
        </div>
      )
    }

    if (!occurrences || occurrences.length === 0) {
      return <p className="text-sm text-muted-foreground px-4">Nenhuma ocorrência pendente encontrada.</p>
    }

    return (
      <div className="flex flex-wrap justify-start gap-6">
        {occurrences.map((occurrence) => (
          <Link key={occurrence.id} href={`/app-occurrences/${occurrence.id}`} passHref>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-52 w-60 flex flex-col p-0">
              <CardContent className="flex flex-col justify-between flex-1 gap-2 p-3">
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
                    Endereço
                  </CardDescription>
                  <p className="text-sm font-medium truncate">{occurrence.address}</p>
                </div>

                <div>
                  <CardDescription className="text-xs text-muted-foreground mb-0.5">
                    Data
                  </CardDescription>
                  <p className="text-xs text-muted-foreground">
                    {occurrence.createdAt
                      ? new Date(occurrence.createdAt).toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Data inválida'}
                  </p>
                </div>

                <Badge variant="outline" className="border-orange-500 text-orange-500 text-xs">
                  <span className="w-2 h-2 mr-1.5 rounded-full bg-orange-500"></span>
                  Não Verificado
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold tracking-tight">Ocorrências Pendentes (App)</h1>
      <div className="space-y-4">
        {renderContent()}
      </div>
    </div>
  )
}
