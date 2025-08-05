'use client';

import { useState } from 'react';
// Importamos nossa nova função de atalho para o método POST.
import { connectionAPIPost } from '@/services/connection-api';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Define uma interface para a resposta que esperamos do login.
  // Isso nos dá autocompletar e segurança de tipo.
  interface LoginResponse {
    token: string;
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // A chamada à API agora é uma única linha, super legível!
      // Usamos a função auxiliar, informando a tipagem que esperamos (<LoginResponse>),
      // a rota, e o corpo (body) da requisição[cite: 123].
      const result = await connectionAPIPost<LoginResponse>('/users/login', {
        email,
        password,
      });

      // Lidamos com o sucesso
      setMessage(`Login bem-sucedido!`);
      console.log('Token recebido:', result.token);

    } catch (error) {
      // Lidamos com o erro
      const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido.";
      setMessage(`Falha no login: ${errorMessage}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login - Mili</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {/* O restante do formulário JSX continua exatamente o mesmo */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </main>
  );
}