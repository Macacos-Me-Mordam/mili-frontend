// Definição dos tipos para as ocorrências geradas pela aplicação

export interface AppOccurrence {
  id: string;
  photoUrl: string;
  description: string;
  address: string;
  frequency: 'one_time' | 'recurring';
  createdAt: string;
  updatedAt: string;
  finalizedAt: string | null;
}

// Payload para atualizar o status de uma ocorrência
export interface UpdateAppOccurrenceStatusPayload {
  id: string;
  status: 'processing' | 'resolved' | 'closed';
}