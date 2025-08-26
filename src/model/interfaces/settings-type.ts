// src/model/interfaces/settings-type.ts

export interface UpdateSettingPayload {
  windowSeconds: number;
}

// Novo: Interface para a resposta do GET
export interface EvidenceWindowPayload {
  windowSeconds: number;
}