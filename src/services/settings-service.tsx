// services/settings-service.ts
import { api } from "@/lib/api-client";
import { SettingKey, UpdateSettingPayload } from "./types";

export const updateSetting = (
  key: SettingKey,
  payload: UpdateSettingPayload
): Promise<void> => {
  // doFetch já trata 204 (No Content) => retorna void sem tentar .json()
  return api.put<void>(`/settings/${key}`, payload);
};
