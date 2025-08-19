import { apiPrivate } from "@/lib/ConnectionApi";
import { UpdateSettingPayload } from "@/model/interfaces/settings-type";

export const updateSetting = (
  payload: UpdateSettingPayload
): Promise<void> => {
  return apiPrivate.put<void>("/settings/evidence-window", payload);
};