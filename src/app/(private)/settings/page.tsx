// src/app/(private)/settings/page.tsx
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getEvidenceWindow, updateSetting } from '@/services/settings-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Loader2, RefreshCw, Palette, Timer } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const formSchema = z.object({
  windowSeconds: z.coerce.number()
    .min(1, { message: 'O valor deve ser maior que zero.' })
    .max(600, { message: 'O valor deve ser menor ou igual a 600 segundos.' })
});

type SettingsFormValues = z.infer<typeof formSchema>;

// Componente para o seletor de tema (usa botões; sem dependência de Select)
function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
      <div className="space-y-0.5">
        <h3 className="text-base font-semibold">Tema</h3>
        <p className="text-sm text-muted-foreground">
          Selecione o tema para o dashboard.
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}>Claro</Button>
        <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}>Escuro</Button>
        <Button variant={theme === 'system' ? 'default' : 'outline'} onClick={() => setTheme('system')}>Sistema</Button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['settings', 'evidence-window'],
    queryFn: getEvidenceWindow,
  });

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    values: { windowSeconds: data?.windowSeconds ?? 60 },
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'evidence-window'] });
      setSuccessMessage('Configuração atualizada com sucesso!');
    },
    onError: (err) => {
      console.error("Falha ao atualizar a configuração:", err);
      form.setError('windowSeconds', { message: 'Falha ao atualizar. Tente novamente.' });
    }
  });

  const onSubmit = (values: SettingsFormValues) => mutate(values);

  // Esconde a mensagem de sucesso após 3s
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-1/4" />
        <Card className="w-full">
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-64" />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold">Falha ao carregar configurações</h2>
        <p className="text-muted-foreground">{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gira as configurações gerais, de aparência e de notificação do sistema.
        </p>
      </div>

      {/* Aparência */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" /> Aparência
          </CardTitle>
          <CardDescription>Personalize a aparência do sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeSelector />
        </CardContent>
      </Card>

      {/* Janela de Evidências */}
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Timer className="h-5 w-5" /> Janela de Evidências
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={isLoading}
              aria-label="Atualizar"
            >
              <RefreshCw className={isLoading ? 'animate-spin' : ''} />
            </Button>
          </CardTitle>
          <CardDescription>
            Defina o tempo, em segundos, para agrupar múltiplas evidências de um mesmo evento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
              {successMessage && (
                <div className="bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-300 p-3 rounded-md text-sm">
                  {successMessage}
                </div>
              )}
              <FormField
                control={form.control}
                name="windowSeconds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempo em segundos</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 60"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    A guardar...
                  </>
                ) : (
                  'Guardar Alterações'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}