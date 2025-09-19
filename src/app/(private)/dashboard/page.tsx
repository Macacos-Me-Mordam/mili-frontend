// src/app/(private)/dashboard/page.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { getFailedOccurrences, getSuccessfulOccurrences } from '@/services/occurences-service'
import { getClosedAppOccurrences, getResolvedAppOccurrences } from '@/services/app-occurrence-services'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { HistoricOccurrence } from '@/model/interfaces/occurrence-type'
import { AppOccurrence } from '@/model/interfaces/app-occurrence-types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Printer, FileText } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Componentes KpiCard e Skeleton permanecem os mesmos
function KpiCard({ title, value, description }: { title: string, value: string | number, description: string }) {
    return (<Card><CardHeader><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader><CardContent><div className="text-4xl font-bold">{value}</div></CardContent></Card>);
}
function DashboardSkeleton() {
  return (<div className="space-y-6"><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"><Skeleton className="h-32 w-full" /><Skeleton className="h-32 w-full" /><Skeleton className="h-32 w-full" /><Skeleton className="h-32 w-full" /></div><div className="grid gap-6 md:grid-cols-2"><Skeleton className="h-80 w-full" /><Skeleton className="h-80 w-full" /></div><Skeleton className="h-80 w-full" /></div>)
}

type ReportableOccurrence = HistoricOccurrence | AppOccurrence;

export default function DashboardPage() {
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  const [reportData, setReportData] = useState<ReportableOccurrence[] | null>(null);
  const [filters, setFilters] = useState({
      startDate: '',
      endDate: '',
      type: 'all'
  });

  const { data: cameraSuccess, isLoading: isLoadingCamSuccess } = useQuery({ queryKey: ['resolved-occurrences'], queryFn: getSuccessfulOccurrences })
  const { data: cameraFailed, isLoading: isLoadingCamFailed } = useQuery({ queryKey: ['closed-occurrences'], queryFn: getFailedOccurrences })
  const { data: appSuccess, isLoading: isLoadingAppSuccess } = useQuery({ queryKey: ['resolved-app-occurrences'], queryFn: getResolvedAppOccurrences })
  const { data: appFailed, isLoading: isLoadingAppFailed } = useQuery({ queryKey: ['closed-app-occurrences'], queryFn: getClosedAppOccurrences })

  const isLoading = isLoadingCamSuccess || isLoadingCamFailed || isLoadingAppSuccess || isLoadingAppFailed;

  const allCameraOccurrences = useMemo(() => [...(cameraSuccess || []), ...(cameraFailed || [])], [cameraSuccess, cameraFailed]);
  const allAppOccurrences = useMemo(() => [...(appSuccess || []), ...(appFailed || [])], [appSuccess, appFailed]);

  const statusDistribution = useMemo(() => ([{ name: 'Resolvidas', value: (cameraSuccess?.length || 0) + (appSuccess?.length || 0) }, { name: 'Fechadas', value: (cameraFailed?.length || 0) + (appFailed?.length || 0) }]), [cameraSuccess, appSuccess, cameraFailed, appFailed]);

  const occurrencesByAddress = useMemo(() => {
    if (!allAppOccurrences.length) return [];
    const counts = allAppOccurrences.reduce((acc: Record<string, number>, curr: AppOccurrence) => {
        const address = curr.address || 'Endereço Desconhecido';
        const neighborhood = address.split(',').pop()?.trim() || address;
        acc[neighborhood] = (acc[neighborhood] || 0) + 1;
        return acc;
    }, {});
    return Object.entries(counts).map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total);
  }, [allAppOccurrences]);

  const occurrencesOverTime = useMemo(() => {
    const allOccurrences = [...allCameraOccurrences, ...allAppOccurrences];
    if (!allOccurrences.length) return [];
    const countsByDay = allOccurrences.reduce((acc: Record<string, number>, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString('pt-BR');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(countsByDay).map(([date, total]) => ({ date, total })).sort((a, b) => new Date(a.date.split('/').reverse().join('-')).getTime() - new Date(b.date.split('/').reverse().join('-')).getTime());
  }, [allCameraOccurrences, allAppOccurrences]);

  const handleGenerateReport = () => {
      let data: ReportableOccurrence[] = [];
      if (filters.type === 'all' || filters.type === 'camera') {
          data.push(...allCameraOccurrences);
      }
      if (filters.type === 'all' || filters.type === 'app') {
          data.push(...allAppOccurrences);
      }
      const filteredData = data.filter(occ => {
          const occDate = new Date(occ.createdAt);
          const start = filters.startDate ? new Date(filters.startDate) : null;
          const end = filters.endDate ? new Date(filters.endDate) : null;
          if (start && occDate < start) return false;
          if (end) {
            const inclusiveEndDate = new Date(end);
            inclusiveEndDate.setDate(inclusiveEndDate.getDate() + 1);
            if (occDate > inclusiveEndDate) return false;
          }
          return true;
      }).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setReportData(filteredData);
  };

  if (isLoading) {
    return (<div className="p-6 space-y-6"><h1 className="text-xl font-bold tracking-tight">Dashboard</h1><DashboardSkeleton /></div>);
  }
  
  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-xl font-bold tracking-tight">Dashboard de Análise</h1>
                <p className="text-muted-foreground">Visão geral e análises do sistema de ocorrências.</p>
            </div>
            <Button onClick={() => setShowReportGenerator(!showReportGenerator)}>
                <FileText className="mr-2 h-4 w-4" />
                {showReportGenerator ? 'Fechar Relatório' : 'Gerar Relatório'}
            </Button>
        </div>
      
      {showReportGenerator && (
          <Card>
              <CardHeader><CardTitle>Gerador de Relatórios</CardTitle><CardDescription>Filtre os dados e gere um relatório para impressão.</CardDescription></CardHeader>
              <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                      <div className="space-y-2"><Label htmlFor="start-date">Data de Início</Label><Input id="start-date" type="date" value={filters.startDate} onChange={e => setFilters({...filters, startDate: e.target.value})} /></div>
                      <div className="space-y-2"><Label htmlFor="end-date">Data de Fim</Label><Input id="end-date" type="date" value={filters.endDate} onChange={e => setFilters({...filters, endDate: e.target.value})} /></div>
                      <div className="space-y-2"><Label htmlFor="type">Tipo de Ocorrência</Label>
                          <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                              <SelectTrigger><SelectValue/></SelectTrigger>
                              <SelectContent><SelectItem value="all">Todas</SelectItem><SelectItem value="camera">Câmeras</SelectItem><SelectItem value="app">Aplicativo</SelectItem></SelectContent>
                          </Select>
                      </div>
                  </div>
                  <Button onClick={handleGenerateReport}>Gerar Relatório</Button>
                  
                  {reportData !== null && (
                      <div className="pt-6">
                          <Separator/>
                          <div id="report-section" className="mt-6 space-y-4">
                              <div className="flex justify-between items-center">
                                  <div>
                                      <h3 className="text-lg font-bold">Relatório de Ocorrências</h3>
                                      <p className="text-sm text-muted-foreground">Total de {reportData.length} ocorrências encontradas.</p>
                                  </div>
                                  <Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" /> Imprimir / Guardar como PDF</Button>
                              </div>
                              <div className="border rounded-md">
                                  {reportData.map(occ => (
                                      <div key={occ.id} className="p-4 border-b last:border-b-0">
                                          <p className="font-semibold">{occ.description}</p>
                                          <p className="text-sm text-muted-foreground">
                                              {'address' in occ ? `Endereço: ${occ.address}` : `Câmera: ${occ.evidences?.[0]?.cameraId || 'N/A'}`}
                                          </p>
                                          <p className="text-xs text-muted-foreground">Data: {new Date(occ.createdAt).toLocaleString('pt-BR')}</p>
                                      </div>
                                  ))}
                                  {reportData.length === 0 && <p className="p-4 text-sm text-muted-foreground">Nenhuma ocorrência encontrada para os filtros selecionados.</p>}
                              </div>
                          </div>
                      </div>
                  )}
              </CardContent>
          </Card>
      )}

      {/* TODA A SEÇÃO DE GRÁFICOS ESTÁ AQUI */}
      <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KpiCard title="Total Ocorrências (Câmeras)" value={allCameraOccurrences.length} description="Total de eventos gerados pela IA." />
              <KpiCard title="Total Ocorrências (App)" value={allAppOccurrences.length} description="Total de reportes de usuários." />
              <KpiCard title="Ocorrências Resolvidas" value={statusDistribution[0].value} description="Casos concluídos com sucesso." />
              <KpiCard title="Ocorrências Fechadas" value={statusDistribution[1].value} description="Casos descartados ou falsos positivos." />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-1">
                  <CardHeader><CardTitle>Distribuição de Status</CardTitle><CardDescription>Proporção de ocorrências resolvidas vs. fechadas.</CardDescription></CardHeader>
                  <CardContent>
                      <ResponsiveContainer width="100%" height={300}><PieChart><Pie data={statusDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>{statusDistribution.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer>
                  </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                  <CardHeader><CardTitle>Ocorrências por Bairro (App)</CardTitle><CardDescription>Total de reportes de utilizadores agrupados por bairro.</CardDescription></CardHeader>
                  <CardContent>
                      {occurrencesByAddress.length > 0 ? (<ResponsiveContainer width="100%" height={300}><BarChart data={occurrencesByAddress}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis allowDecimals={false}/><Tooltip /><Legend /><Bar dataKey="total" fill="#82ca9d" name="Total de Ocorrências" /></BarChart></ResponsiveContainer>) : <p className="text-sm text-muted-foreground">Nenhum dado de ocorrências do app para exibir.</p>}
                  </CardContent>
              </Card>
          </div>

          <Card>
              <CardHeader><CardTitle>Ocorrências ao Longo do Tempo</CardTitle><CardDescription>Volume de ocorrências por dia (câmeras e app combinados).</CardDescription></CardHeader>
              <CardContent>
                  {occurrencesOverTime.length > 0 ? (<ResponsiveContainer width="100%" height={300}><LineChart data={occurrencesOverTime}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis allowDecimals={false}/><Tooltip /><Legend /><Line type="monotone" dataKey="total" stroke="#8884d8" name="Total de Ocorrências"/></LineChart></ResponsiveContainer>) : <p className="text-sm text-muted-foreground">Nenhum dado para exibir a linha do tempo.</p>}
              </CardContent>
          </Card>
      </div>
    </div>
  )
}