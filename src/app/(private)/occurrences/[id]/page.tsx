'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPendingOccurrences, updateOccurrenceStatus } from '@/services/occurences-service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertTriangle, Check, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useMemo } from 'react'

function OccurrenceDetailSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-8 w-1/2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div>
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full rounded-md" />
        ))}
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
}

export default function OccurrenceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const { data: occurrences, isLoading, isError, error } = useQuery({
    queryKey: ['processing-occurrences'],
    queryFn: getPendingOccurrences,
    // A query só será executada se o ID existir, o que é uma boa prática
    enabled: !!id, 
  })

  const occurrence = useMemo(() => {
    if (!occurrences || !id) return undefined
    return occurrences.find((o) => o.id === id)
  }, [occurrences, id])

  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: ({ status }: { status: 'resolved' | 'closed' }) => {
      // **CORREÇÃO PRINCIPAL AQUI**
      // Lançamos um erro se o ID não existir, para a mutação falhar de forma controlada.
      if (!id) {
        throw new Error('ID da ocorrência não encontrado para atualização.');
      }
      return updateOccurrenceStatus(id, { status })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processing-occurrences'] })
      queryClient.invalidateQueries({ queryKey: ['resolved-occurrences'] })
      queryClient.invalidateQueries({ queryKey: ['closed-occurrences'] })
      router.push('/occurrences')
    },
    onError: (err) => {
      console.error("Falha ao atualizar o status:", err);
      // Aqui você poderia adicionar um toast ou alerta de erro para o usuário
    }
  })
  
  // Verificação inicial para carregar o esqueleto da página
  if (isLoading) {
    return <OccurrenceDetailSkeleton />
  }

  // Se houver um ID, mas a busca falhar por outro motivo (ex: erro de conexão)
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold">Falha ao carregar dados</h2>
        <p className="text-muted-foreground">{error?.message}</p>
      </div>
    )
  }

  // Se o carregamento terminou e a ocorrência específica não foi encontrada na lista
  if (!occurrence) {
     return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold">Ocorrência não encontrada</h2>
        <p className="text-muted-foreground">Pode já ter sido processada ou o ID é inválido.</p>
         <Button onClick={() => router.push('/occurrences')} className="mt-4">Voltar</Button>
      </div>
    )
  }

  // A partir daqui, temos certeza que `occurrence` existe.
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold tracking-tight">Detalhes da Ocorrência</h1>

      <Card>
        <CardHeader>
          <CardTitle>Informações</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CardDescription>Descrição</CardDescription>
            <p className="font-medium">{occurrence.description}</p>
          </div>
          <div>
            <CardDescription>Data</CardDescription>
            <p className="font-medium">
              {new Date(occurrence.createdAt).toLocaleString('pt-BR')}
            </p>
          </div>
          <div>
            <CardDescription>Status</CardDescription>
            <Badge
              variant="outline"
              className="border-orange-500 text-orange-500 text-xs mt-1"
            >
              <span className="w-2 h-2 mr-1.5 rounded-full bg-orange-500"></span>
              Não Verificado
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Evidências</CardTitle>
        </CardHeader>
        <CardContent>
          {occurrence.evidences && occurrence.evidences.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {occurrence.evidences.map((evidence) => (
                <div key={evidence.id} className="relative aspect-square w-full">
                  <Image
                    src={evidence.filePath || 'https://picsum.photos/200'}
                    alt="Evidência da ocorrência"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Nenhuma evidência encontrada.</p>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          onClick={() => updateStatus({ status: 'resolved' })}
          disabled={isUpdatingStatus}
          className="bg-green-600 hover:bg-green-700"
        >
          <Check className="mr-2 h-4 w-4" />
          {isUpdatingStatus ? 'Aprovando...' : 'Aprovar'}
        </Button>
        <Button
          variant="destructive"
          onClick={() => updateStatus({ status: 'closed' })}
          disabled={isUpdatingStatus}
        >
          <X className="mr-2 h-4 w-4" />
          {isUpdatingStatus ? 'Rejeitando...' : 'Rejeitar'}
        </Button>
      </div>
    </div>
  )
}