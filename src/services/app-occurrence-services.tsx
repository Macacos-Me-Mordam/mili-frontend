import { apiPrivate } from "@/lib/ConnectionApi";
import { 
  AppOccurrence, 
  UpdateAppOccurrenceStatusPayload 
} from "@/model/interfaces/app-occurrence-types";


export const getProcessingAppOccurrences = (): Promise<AppOccurrence[]> => {
  return apiPrivate.get<AppOccurrence[]>("/app-occurrence/processing");
};

export const getResolvedAppOccurrences = (): Promise<AppOccurrence[]> => {
  return apiPrivate.get<AppOccurrence[]>("/app-occurrence/resolved");
};


export const getClosedAppOccurrences = (): Promise<AppOccurrence[]> => {
  return apiPrivate.get<AppOccurrence[]>("/app-occurrence/closed");
};


export const updateAppOccurrenceStatus = (
  payload: UpdateAppOccurrenceStatusPayload
): Promise<void> => {
  return apiPrivate.put<void>('/app-occurrence', payload);
};


export const deleteAppOccurrence = (id: string): Promise<void> => {
  return apiPrivate.delete<void>(`/app-occurrence/${id}`);
};

export const downloadAppOccurrenceProof = (id: string): Promise<{ blob: Blob; filename: string }> => {
  return apiPrivate.download(`/app-occurrence/${id}/download`);
};