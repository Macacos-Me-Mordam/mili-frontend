// src/lib/ConnectionApi.ts

'use client';

import { ERROR_ACCESS_DANIED, ERROR_CONNECTION } from "@/model/constants/erroStatus";
import { MethodsEnum, MethodType } from "@/model/enums/methods-enum";

// Função para extrair o nome do arquivo do header 'Content-Disposition'
function getFilenameFromHeader(header: string | null): string {
  if (!header) return 'download.pdf';
  const match = header.match(/filename="?([^"]+)"?/);
  return match ? match[1] : 'download.pdf';
}

// NOVA FUNÇÃO PARA DOWNLOAD DE ARQUIVOS
async function doFetchFile(
  url: string,
  method: MethodType,
  isPrivate = false
): Promise<{ blob: Blob; filename: string }> {
  const headers: HeadersInit = {};

  try {
    const res = await fetch(url, {
      method,
      headers,
      credentials: 'include',
    });

    if (!res.ok) {
       if (res.status === 401 || res.status === 403) {
        throw new Error(ERROR_ACCESS_DANIED);
      }
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const blob = await res.blob();
    const filename = getFilenameFromHeader(res.headers.get('Content-Disposition'));
    
    return { blob, filename };

  } catch (error) {
     if (error instanceof Error && error.message === ERROR_ACCESS_DANIED) {
      throw error;
    }
    throw new Error(ERROR_CONNECTION);
  }
}


async function doFetch<T>(
  url: string,
  method: MethodType,
  body?: unknown,
  isPrivate = false 
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include', 
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        throw new Error(ERROR_ACCESS_DANIED);
      }
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    
    // CORREÇÃO: Verifica se a resposta não tem corpo antes de tentar o .json()
    const contentType = res.headers.get("content-type");
    const contentLength = res.headers.get("content-length");
    
    if (contentLength === '0' || (contentType && !contentType.includes('application/json'))) {
        return undefined as unknown as T;
    }

    return (await res.json()) as T;
  } catch (error) {
    if (error instanceof Error && error.message === ERROR_ACCESS_DANIED) {
      throw error;
    }
    throw new Error(ERROR_CONNECTION);
  }
}

function createApiClient(isPrivate = false) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';
  const u = (path: string) => `${baseUrl}${path}`;

  return {
    get: <T>(path: string) =>
      doFetch<T>(u(path), MethodsEnum.GET, undefined, isPrivate),

    post: <T>(path: string, body: unknown) =>
      doFetch<T>(u(path), MethodsEnum.POST, body, isPrivate),

    put: <T>(path: string, body: unknown) =>
      doFetch<T>(u(path), MethodsEnum.PUT, body, isPrivate),

    patch: <T>(path: string, body: unknown) =>
      doFetch<T>(u(path), MethodsEnum.PATCH, body, isPrivate),

    delete: <T>(path: string) =>
      doFetch<T>(u(path), MethodsEnum.DELETE, undefined, isPrivate),
    
    download: (path: string) =>
      doFetchFile(u(path), MethodsEnum.GET, isPrivate),
  };
}


export const apiPublic = createApiClient(false);

export const apiPrivate = createApiClient(true);