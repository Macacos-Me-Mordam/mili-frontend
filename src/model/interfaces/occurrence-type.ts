// Interface única e correta para Evidências (camelCase)
export interface Evidence {
  id: string;
  filePath: string;
  createdAt: string;
  cameraId: string;
}

export interface Occurrence {
  id: string;
  description: string;
  status: 'processing' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  finalizedAt: string | null;
  evidences: Evidence[];
}

export type PendingOccurrence = Occurrence;
export type HistoricOccurrence = Occurrence;

// Mantemos 'sucesso' | 'erro' aqui para o frontend
export interface UpdateOccurrenceStatusPayload {
    status: 'sucesso' | 'erro';
}