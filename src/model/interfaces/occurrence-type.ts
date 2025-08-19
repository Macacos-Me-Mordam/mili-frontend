// Interface única e correta para Evidências (camelCase)
export interface Evidence {
  id: string;
  filePath: string;
  createdAt: string;
  cameraId: string;
}

// Interface única e correta para todas as Ocorrências (camelCase)
export interface Occurrence {
  id: string;
  description: string;
  status: 'processing' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  finalizedAt: string | null;
  evidences: Evidence[];
}

// Apelidos para manter a semântica nas páginas
export type PendingOccurrence = Occurrence;
export type HistoricOccurrence = Occurrence;

// Payload para atualização (continua o mesmo)
export interface UpdateOccurrenceStatusPayload {
    status: 'sucesso' | 'erro';
}