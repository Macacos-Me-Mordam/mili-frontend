// src/app/(private)/createUser/page.tsx
'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createUser } from '@/services/user-service';
import { getProfile } from '@/services/auth-service'; // Importamos getProfile

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

// Esquema de validação com Zod
const formSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  password: z.string().min(8, { message: 'A palavra-passe deve ter pelo menos 8 caracteres.' }),
  role: z.enum(['user', 'admin'], { required_error: 'A função é obrigatória.' }),
});

type UserFormValues = z.infer<typeof formSchema>;

export default function CreateUserPage() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Estados para controlar o acesso
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Voltamos a usar o useEffect com getProfile para a verificação
  useEffect(() => {
    getProfile()
      .then((profile) => {
        // A verificação pelo e-mail do admin, como estava antes
        if (profile.email === 'admin@admin.com') {
          setIsAuthorized(true);
        } else {
          // Se não for admin, redireciona
          router.push('/occurrences');
        }
      })
      .catch(() => {
        // Em caso de erro, também redireciona
        router.push('/occurrences');
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, [router]);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', password: '', role: 'user' },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: UserFormValues) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      await createUser(values);
      setSuccessMessage('Usuário criado com sucesso!');
      form.reset();
    } catch {
      setErrorMessage('Falha ao criar usuário. Verifique se o e-mail já existe.');
    }
  };
  
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Enquanto verifica a autorização, mostra um spinner
  if (authLoading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }
  
  // Se não estiver autorizado, não renderiza o formulário
  if (!isAuthorized) {
    return null; // A página será redirecionada pelo useEffect
  }

  return (
    <div className="p-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Criar Novo Usuário</CardTitle>
          <CardDescription>
            Preencha os detalhes abaixo para adicionar um novo usuário ao sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {successMessage && (
                  <div className="bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-300 p-3 rounded-md text-sm">
                      {successMessage}
                  </div>
              )}
              {errorMessage && (
                  <div className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-red-300 p-3 rounded-md text-sm">
                      {errorMessage}
                  </div>
              )}
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl><Input placeholder="Nome do usuário" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="exemplo@email.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Palavra-passe</FormLabel>
                    <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Função</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Selecione uma função" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user">Utilizador</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> A Criar...</> : 'Criar Usuário'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}