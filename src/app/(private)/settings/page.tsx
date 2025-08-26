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
import { AlertTriangle, Loader2, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react'; // Importar useEffect e useState

const formSchema = z.object({
  windowSeconds: z.coerce.number()
    .min(1, { message: 'O valor deve ser maior que zero.' })
    .max(600, { message: 'O valor deve ser menor ou igual a 600 segundos.' })
});

type SettingsFormValues = z.infer<typeof formSchema>;

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Novo estado para a mensagem de sucesso

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['settings', 'evidence-window'],
    queryFn: getEvidenceWindow,
  });

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    values: {
      windowSeconds: data?.windowSeconds ?? 60,
    },
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'evidence-window'] });
      setSuccessMessage('Configuração atualizada com sucesso!'); // Definir a mensagem de sucesso
    },
    onError: (err) => {
      console.error("Falha ao atualizar a configuração:", err);
      form.setError('windowSeconds', { message: 'Falha ao atualizar. Tente novamente.' });
    }
  });

  const onSubmit = (values: SettingsFormValues) => {
    mutate(values);
  };
  
  // Efeito para esconder a mensagem de sucesso após 3 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000); 
      return () => clearTimeout(timer); // Limpar o timer no unmount
    }
  }, [successMessage]);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-1/4" />
        <Card className="w-full max-w-lg">
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-32" />
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
      <h1 className="text-xl font-bold tracking-tight">Configurações</h1>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Janela de Evidências
            <Button
              variant="outline"
              size="icon"
              onClick={() => refetch()}
              disabled={isLoading}
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {successMessage && (
                <div className="bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-300 p-3 rounded-md">
                  {successMessage}
                </div>
              )}
              <FormField
                control={form.control}
                name="windowSeconds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Janela de tempo (em segundos)</FormLabel>
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