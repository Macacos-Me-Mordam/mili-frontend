import { api } from "@/lib/api";
import { HistoricOccurrence, PendingOccurrence, UpdateOccurrenceStatusPayload } from "@/model/interfaces/occurrence-type";

export const getPendingOccurrences = async (): Promise<PendingOccurrence[]> => {
  try {
    const response = await api.get<PendingOccurrence[]>('/occurrences/pending');
    return response;
  } catch (error) {
    console.error('Erro ao obter ocorrências pendentes:', error);
    throw new Error('Não foi possível carregar as ocorrências pendentes.');
  }
};


export const getSuccessfulOccurrences = async (): Promise<HistoricOccurrence[]> => {
    try {
        const response = await api.get<HistoricOccurrence[]>('/occurrences/history/success');
        return response;
    } catch (error) {
        console.error('Erro ao obter histórico de sucesso:', error);
        throw new Error('Não foi possível carregar o histórico de ocorrências.');
    }
}

export const getFailedOccurrences = async (): Promise<HistoricOccurrence[]> => {
    try {
        const response = await api.get<HistoricOccurrence[]>('/occurrences/history/error');
        return response;
    } catch (error) {
        console.error('Erro ao obter histórico de erros:', error);
        throw new Error('Não foi possível carregar o histórico de ocorrências.');
    }
}

export const updateOccurrenceStatus = async (id: string, payload: UpdateOccurrenceStatusPayload): Promise<void> => {
    try {
        await api.put(`/occurrences/${id}/status`, { body: payload });
        console.log(`Status da ocorrência ${id} atualizado com sucesso!`);
    } catch (error) {
        console.error(`Erro ao atualizar status da ocorrência ${id}:`, error);
        throw new Error('Não foi possível atualizar o status da ocorrência.');
    }
}

export const deleteOccurrence = async (id: string): Promise<void> => {
    try {
        await api.delete(`/occurrences/${id}`);
        console.log(`Ocorrência ${id} apagada com sucesso!`);
    } catch (error) {
        console.error(`Erro ao apagar a ocorrência ${id}:`, error);
        throw new Error('Não foi possível apagar a ocorrência.');
    }
}