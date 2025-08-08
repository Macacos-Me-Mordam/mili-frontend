import api from './api';


export type SettingKey = 'OCCURRENCE_GROUPING_WINDOW_MINUTES';


export interface UpdateSettingPayload {
  value: string;
}

/**
 * Atualiza o valor de uma configuração específica.
 * @param key - A chave da configuração a ser atualizada.
 * @param payload - O novo valor para a configuração.
 */
export const updateSetting = async (key: SettingKey, payload: UpdateSettingPayload): Promise<void> => {
  try {
    await api.patch(`/settings/${key}`, payload);
    console.log(`Configuração '${key}' atualizada com sucesso para '${payload.value}'!`);
  } catch (error) {
    console.error(`Erro ao atualizar a configuração '${key}':`, error);
    throw new Error('Não foi possível atualizar a configuração. Verifique o valor e tente novamente.');
  }
};  