// services/ocurrences-services.ts

import { api } from "@/lib/api-client";
import {
  HistoricOccurrence,
  PendingOccurrence,
  UpdateOccurrenceStatusPayload,
} from "@/model/interfaces/occurrence-type";

export const getPendingOccurrences = async (): Promise<PendingOccurrence[]> => {
  try {
    return await api.get<PendingOccurrence[]>("/occurrences/pending");
  } catch (error) {
    console.error("Erro ao obter ocorrências pendentes:", error);
    throw new Error("Não foi possível carregar as ocorrências pendentes.");
  }
};

export const getSuccessfulOccurrences = async (): Promise<HistoricOccurrence[]> => {
  try {
    return await api.get<HistoricOccurrence[]>("/occurrences/history/success");
  } catch (error) {
    console.error("Erro ao obter histórico de sucesso:", error);
    throw new Error("Não foi possível carregar o histórico de ocorrências.");
  }
};

export const getFailedOccurrences = async (): Promise<HistoricOccurrence[]> => {
  try {
    return await api.get<HistoricOccurrence[]>("/occurrences/history/error");
  } catch (error) {
    console.error("Erro ao obter histórico de erros:", error);
    throw new Error("Não foi possível carregar o histórico de ocorrências.");
  }
};

export const updateOccurrenceStatus = async (
  id: string,
  payload: UpdateOccurrenceStatusPayload
): Promise<void> => {
  try {
    await api.put<void>(`/occurrences/${id}/status`, payload);
    // seu doFetch já trata 204; aqui é só não usar o retorno
  } catch (error) {
    console.error(`Erro ao atualizar status da ocorrência ${id}:`, error);
    throw new Error("Não foi possível atualizar o status da ocorrência.");
  }
};

export const deleteOccurrence = async (id: string): Promise<void> => {
  try {
    await api.delete<void>(`/occurrences/${id}`);
  } catch (error) {
    console.error(`Erro ao apagar a ocorrência ${id}:`, error);
    throw new Error("Não foi possível apagar a ocorrência.");
  }
};
