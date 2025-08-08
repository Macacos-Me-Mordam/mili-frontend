import api from './api';

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




/**
 * Obtém a lista de todas as ocorrências pendentes.
 * @returns Uma lista de ocorrências pendentes.
 */
export const getPendingOccurrences = async (): Promise<PendingOccurrence[]> => {
  try {
    const response = await api.get<PendingOccurrence[]>('/occurrences/pending');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter ocorrências pendentes:', error);
    throw new Error('Não foi possível carregar as ocorrências pendentes.');
  }
};

/**
 * Obtém o histórico de ocorrências que foram concluídas com sucesso.
 * @returns Uma lista de ocorrências com status "sucesso".
 */
export const getSuccessfulOccurrences = async (): Promise<HistoricOccurrence[]> => {
    try {
        const response = await api.get<HistoricOccurrence[]>('/occurrences/history/success');
        return response.data;
    } catch (error) {
        console.error('Erro ao obter histórico de sucesso:', error);
        throw new Error('Não foi possível carregar o histórico de ocorrências.');
    }
}

/**
 * Obtém o histórico de ocorrências que resultaram em erro.
 * @returns Uma lista de ocorrências com status "erro".
 */
export const getFailedOccurrences = async (): Promise<HistoricOccurrence[]> => {
    try {
        const response = await api.get<HistoricOccurrence[]>('/occurrences/history/error');
        return response.data;
    } catch (error) {
        console.error('Erro ao obter histórico de erros:', error);
        throw new Error('Não foi possível carregar o histórico de ocorrências.');
    }
}

/**
 * Atualiza o status de uma ocorrência específica.
 * @param id - O ID da ocorrência a ser atualizada.
 * @param payload - O novo status para a ocorrência.
 */
export const updateOccurrenceStatus = async (id: string, payload: UpdateOccurrenceStatusPayload): Promise<void> => {
    try {
        await api.patch(`/occurrences/${id}/status`, payload);
        console.log(`Status da ocorrência ${id} atualizado com sucesso!`);
    } catch (error) {
        console.error(`Erro ao atualizar status da ocorrência ${id}:`, error);
        throw new Error('Não foi possível atualizar o status da ocorrência.');
    }
}

/**
 * Apaga uma ocorrência específica.
 * @param id - O ID da ocorrência a ser apagada.
 */
export const deleteOccurrence = async (id: string): Promise<void> => {
    try {
        await api.delete(`/occurrences/${id}`);
        console.log(`Ocorrência ${id} apagada com sucesso!`);
    } catch (error) {
        console.error(`Erro ao apagar a ocorrência ${id}:`, error);
        throw new Error('Não foi possível apagar a ocorrência.');
    }
}