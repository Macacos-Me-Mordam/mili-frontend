// macacos-me-mordam/mili-frontend/Macacos-Me-Mordam-mili-frontend-b68b767b9a6cc7b2708e8fe470d88cd16023e1c1/src/components/sign-in/login-form.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation'; // Importar useRouter

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Importar componentes de Card

// Esquema de validação do formulário
const formSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

export function LoginForm() {
  const router = useRouter(); // Inicializar o router

  // 1. Defina seu formulário.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // funcao falsa de login so pra mostrar
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.email === 'admin@example.com' && values.password === 'admin123') {
      console.log('Credenciais de admin corretas, redirecionando para ocorrências...');
      router.push('/occurrences')
    } else {
      console.log('Tentativa de login:', values);
      console.log('Credenciais inválidas ou outro usuário. Não redirecionando.');
      form.setError('email', { message: 'E-mail ou senha inválidos.' });
      form.setError('password', { message: 'E-mail ou senha inválidos.' });
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">MILI</CardTitle>
        <CardDescription>Entre na sua conta Mili.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="seu_email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Entrar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}