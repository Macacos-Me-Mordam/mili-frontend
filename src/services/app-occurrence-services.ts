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

export const downloadAppOccurrenceProof = async (id: string): Promise<void> => {
  const response = await fetch(`http://localhost:8080/app-occurrence/${id}/download`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Falha ao descarregar o comprovativo.');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `comprovativo-ocorrencia-${id}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};