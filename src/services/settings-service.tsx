import { apiAuth } from '@/lib/api';
import { SettingKey, UpdateSettingPayload } from './types';


export const updateSetting = (
  key: SettingKey,
  payload: UpdateSettingPayload,
): Promise<void> => {
  return apiAuth.put(`/settings/${key}`, { body: payload });
};