'use client';

import { ERROR_ACCESS_DANIED, ERROR_CONNECTION } from "@/model/constants/erroStatus";
import { MethodsEnum } from "@/model/enums/methods-enum";

export type MethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function doFetch<T>(url: string, method: MethodType, body?: unknown): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const auth = getAuthorizationToken();
  if (auth) headers['Authorization'] = auth;

  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'include', // envia cookies se precisar
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new Error(ERROR_ACCESS_DANIED);
    }
    throw new Error(ERROR_CONNECTION);
  }

  // ajuste se sua API devolver 204 (No Content)
  if (res.status === 204) return undefined as unknown as T;

  return (await res.json()) as T;
}

export class ConnectionAPIClient {
  static async call<T>(url: string, method: MethodType, body?: unknown): Promise<T> {
    return doFetch<T>(url, method, body);
  }

  static async connect<T>(url: string, method: MethodType, body?: unknown): Promise<T> {
    try {
      return await ConnectionAPIClient.call<T>(url, method, body);
    } catch (error: any) {
      // jÃ¡ mapeamos por status acima; garante fallback
      if (error instanceof Error) throw error;
      throw new Error(ERROR_CONNECTION);
    }
  }
}

export const connectionAPIGet = async <T>(url: string): Promise<T> =>
  ConnectionAPIClient.connect<T>(url, MethodsEnum.GET as MethodType);

export const connectionAPIDelete = async <T>(url: string): Promise<T> =>
  ConnectionAPIClient.connect<T>(url, MethodsEnum.DELETE as MethodType);

export const connectionAPIPost = async <T>(url: string, body: unknown): Promise<T> =>
  ConnectionAPIClient.connect<T>(url, MethodsEnum.POST as MethodType, body);

export const connectionAPIPut = async <T>(url: string, body: unknown): Promise<T> =>
  ConnectionAPIClient.connect<T>(url, MethodsEnum.PUT as MethodType, body);

export const connectionAPIPatch = async <T>(url: string, body: unknown): Promise<T> =>
  ConnectionAPIClient.connect<T>(url, MethodsEnum.PATCH as MethodType, body);