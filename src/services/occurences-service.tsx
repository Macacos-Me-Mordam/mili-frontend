import { apiPrivate } from "@/lib/ConnectionApi";
import {
  HistoricOccurrence,
  PendingOccurrence,
  UpdateOccurrenceStatusPayload,
} from "@/model/interfaces/occurrence-type";

export const getPendingOccurrences = (): Promise<PendingOccurrence[]> => {
  return apiPrivate.get<PendingOccurrence[]>("/occurrences/processing");
};

export const getSuccessfulOccurrences = (): Promise<HistoricOccurrence[]> => {
  return apiPrivate.get<HistoricOccurrence[]>("/occurrences/resolved");
};

export const getFailedOccurrences = (): Promise<HistoricOccurrence[]> => {
  return apiPrivate.get<HistoricOccurrence[]>("/occurrences/closed");
};

export const updateOccurrenceStatus = (
  id: string,
  payload: UpdateOccurrenceStatusPayload
): Promise<void> => {
  const body = {
    id: id,
    status: payload.status === 'sucesso' ? 'resolved' : 'closed',
  };
  return apiPrivate.put<void>(`/occurrences`, body);
};

export const deleteOccurrence = (id: string): Promise<void> => {
  return apiPrivate.delete<void>(`/occurrences/${id}`);
};

// NOVA FUNÇÃO DE DOWNLOAD
export const downloadOccurrenceProof = (id: string): Promise<{ blob: Blob; filename: string }> => {
  return apiPrivate.download(`/occurrences/${id}/download`);
};