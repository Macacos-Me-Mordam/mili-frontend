// src/services/settings-service.tsx

import { apiPrivate } from "@/lib/ConnectionApi";
import { UpdateSettingPayload, EvidenceWindowPayload } from "@/model/interfaces/settings-type";

// Função para buscar a configuração atual
export const getEvidenceWindow = (): Promise<EvidenceWindowPayload> => {
  return apiPrivate.get<EvidenceWindowPayload>("/settings/evidence-window");
};

export const updateSetting = (
  payload: UpdateSettingPayload
): Promise<void> => {
  return apiPrivate.put<void>("/settings/evidence-window", payload);
};