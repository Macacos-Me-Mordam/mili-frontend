export interface Evidence {
  id: string; // Uuid  
  file_path: string;
  created_at: string; 
  camera_id: string;
  occurrence_id: string;
}


export interface PendingOccurrence {
  id: string;
  description: string;
  status: string;
  created_at: string;
  camera_name: string;
  camera_region: string;
  evidences: Evidence[];
}

export interface HistoricOccurrence {
  id: string;
  description: string;
  status: string;
  finalized_at: string;
}

export interface UpdateOccurrenceStatusPayload {
    status: 'sucesso' | 'erro'; 
}