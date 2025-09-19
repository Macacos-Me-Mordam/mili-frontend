// src/app/(private)/dashboard/page.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { getFailedOccurrences, getSuccessfulOccurrences } from '@/services/occurences-service'
import { getClosedAppOccurrences, getResolvedAppOccurrences } from '@/services/app-occurrence-services'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertTriangle } from 'lucide-react'
import { HistoricOccurrence } from '@/model/interfaces/occurrence-type'
import { AppOccurrence } from '@/model/interfaces/app-occurrence-types'

function DashboardSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}


export default function DashboardPage() {
  const { data: cameraSuccess, isLoading: isLoadingCamSuccess } = useQuery({
    queryKey: ['resolved-occurrences'],
    queryFn: getSuccessfulOccurrences,
  })

  const { data: cameraFailed, isLoading: isLoadingCamFailed } = useQuery({
    queryKey: ['closed-occurrences'],
    queryFn: getFailedOccurrences,
  })

  const { data: appSuccess, isLoading: isLoadingAppSuccess } = useQuery({
    queryKey: ['resolved-app-occurrences'],
    queryFn: getResolvedAppOccurrences,
  })

  const { data: appFailed, isLoading: isLoadingAppFailed } = useQuery({
    queryKey: ['closed-app-occurrences'],
    queryFn: getClosedAppOccurrences,
  })

  const isLoading = isLoadingCamSuccess || isLoadingCamFailed || isLoadingAppSuccess || isLoadingAppFailed;

  const occurrencesByCamera = useMemo(() => {
    const allCameraOccurrences = [...(cameraSuccess || []), ...(cameraFailed || [])];
    if (!allCameraOccurrences.length) return [];

    const counts = allCameraOccurrences.reduce((acc: Record<string, number>, curr: HistoricOccurrence) => {
      const cameraId = curr.evidences?.[0]?.cameraId || 'Desconhecida';
      acc[cameraId] = (acc[cameraId] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total);
  }, [cameraSuccess, cameraFailed]);
  
  const occurrencesByAddress = useMemo(() => {
    const allAppOccurrences = [...(appSuccess || []), ...(appFailed || [])];
    if (!allAppOccurrences.length) return [];

    const counts = allAppOccurrences.reduce((acc: Record<string, number>, curr: AppOccurrence) => {
        const address = curr.address || 'Endereço Desconhecido';
        acc[address] = (acc[address] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(counts).map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total);
  }, [appSuccess, appFailed]);


  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold tracking-tight">Dashboard de Análise</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ocorrências por Câmera</CardTitle>
            <CardDescription>Número total de ocorrências detectadas por cada câmera.</CardDescription>
          </CardHeader>
          <CardContent>
            {occurrencesByCamera.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={occurrencesByCamera} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" name="Total de Ocorrências" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
                <p className="text-sm text-muted-foreground">Nenhum dado de câmera para exibir.</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Ocorrências por Endereço (App)</CardTitle>
                <CardDescription>Número total de ocorrências reportadas por endereço.</CardDescription>
            </CardHeader>
            <CardContent>
                {occurrencesByAddress.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={occurrencesByAddress} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" allowDecimals={false} />
                            <YAxis type="category" dataKey="name" width={100} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total" fill="#82ca9d" name="Total de Ocorrências" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-sm text-muted-foreground">Nenhum dado de aplicativo para exibir.</p>
                )}
            </CardContent>
        </Card>

      </div>
    </div>
  )
}