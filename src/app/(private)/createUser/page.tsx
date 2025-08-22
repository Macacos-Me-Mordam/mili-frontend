'use client'

import { useState, useEffect } from 'react';
import { createUser } from '@/services/user-service';
import { NewUserPayload } from '@/model/interfaces/user-data';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/services/auth-service'; 

export default function CreateUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    getProfile()
      .then((profile) => {
        if (profile.email !== 'admin@admin.com') {
          setError('Acesso restrito: apenas o administrador pode criar novos usuários.');
          router.push('/occurrences'); 
        }
      })
      .catch((err) => {
        setError('Erro ao verificar o perfil do usuário.');
        console.error(err);
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const newUser: NewUserPayload = {
        name,
        email,
        password,
      };

      await createUser(newUser); 
      setSuccessMessage('Usuário criado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Erro ao criar o usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Criar Novo Usuário</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white px-4 py-2 mt-4 rounded-md">
          {loading ? 'Criando...' : 'Criar Usuário'}
        </button>
      </form>
    </div>
  );
}
