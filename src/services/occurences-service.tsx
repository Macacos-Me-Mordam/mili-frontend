import { apiPrivate } from "@/lib/ConnectionApi";
import {
  HistoricOccurrence,
  PendingOccurrence,
  UpdateOccurrenceStatusPayload,
} from "@/model/interfaces/occurrence-type";

export const getPendingOccurrences = (): Promise<PendingOccurrence[]> => {
  return apiPrivate.get<PendingOccurrence[]>("/occurrences/pending");
};

export const getSuccessfulOccurrences = (): Promise<HistoricOccurrence[]> => {
  return apiPrivate.get<HistoricOccurrence[]>("/occurrences/history/success");
};

export const getFailedOccurrences = (): Promise<HistoricOccurrence[]> => {
  return apiPrivate.get<HistoricOccurrence[]>("/occurrences/history/error");
};

export const updateOccurrenceStatus = (
  id: string,
  payload: UpdateOccurrenceStatusPayload
): Promise<void> => {
  return apiPrivate.put<void>(`/occurrences/${id}/status`, payload);
};

export const deleteOccurrence = (id: string): Promise<void> => {
  return apiPrivate.delete<void>(`/occurrences/${id}`);
};