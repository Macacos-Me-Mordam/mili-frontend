// src/lib/ConnectionApi.ts

'use client';

import { ERROR_ACCESS_DANIED, ERROR_CONNECTION } from "@/model/constants/erroStatus";
import { MethodsEnum, MethodType } from "@/model/enums/methods-enum";

/**
 * Extrai o nome do arquivo do header Content-Disposition
 */
function getFilenameFromHeader(header: string | null): string {
  if (!header) return "download.pdf";
  const match = header.match(/filename\*?=(?:UTF-8''|")?([^\";]+)/i);
  if (match && match[1]) {
    try {
      // Tenta decodificar caso venha percent-encoded (RFC5987)
      return decodeURIComponent(match[1].replace(/"/g, "").trim());
    } catch {
      return match[1].replace(/"/g, "").trim();
    }
  }
  return "download.pdf";
}

/**
 * Obtém token (se existir) — ajuste a chave conforme seu app
 */
function getAuthToken(): string | null {
  try {
    const fromLocalStorage = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (fromLocalStorage && fromLocalStorage.trim()) return fromLocalStorage;

    // fallback simples via cookie (se usar cookie tipo "token=...")
    if (typeof document !== "undefined") {
      const m = document.cookie.match(/(?:^|; )token=([^;]*)/);
      if (m && m[1]) return decodeURIComponent(m[1]);
    }
  } catch {
    // ignore
  }
  return null;
}

/**
 * Aplica cabeçalhos de autenticação quando isPrivate = true
 */
function applyPrivateHeaders(headers: HeadersInit, isPrivate: boolean): HeadersInit {
  if (!isPrivate) return headers;

  const token = getAuthToken();
  const h: Record<string, string> = { ...(headers as Record<string, string>) };

  if (token) h["Authorization"] = `Bearer ${token}`;

  // Útil para alguns backends / middlewares
  h["X-Requested-With"] = "XMLHttpRequest";

  return h;
}

/**
 * Download de arquivo (blob)
 */
async function doFetchFile(
  url: string,
  method: MethodType,
  isPrivate = false
): Promise<{ blob: Blob; filename: string }> {
  let headers: HeadersInit = {};
  headers = applyPrivateHeaders(headers, isPrivate);

  try {
    const res = await fetch(url, {
      method,
      headers,
      credentials: "include",
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        throw new Error(ERROR_ACCESS_DANIED);
      }
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const blob = await res.blob();
    const filename = getFilenameFromHeader(res.headers.get("Content-Disposition"));
    return { blob, filename };
  } catch (error) {
    if (error instanceof Error && error.message === ERROR_ACCESS_DANIED) {
      throw error;
    }
    throw new Error(ERROR_CONNECTION);
  }
}

/**
 * Requisições JSON (ou sem corpo)
 */
async function doFetch<T>(
  url: string,
  method: MethodType,
  body?: unknown,
  isPrivate = false
): Promise<T> {
  let headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  headers = applyPrivateHeaders(headers, isPrivate);

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      credentials: "include",
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        throw new Error(ERROR_ACCESS_DANIED);
      }
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    // 204 No Content
    if (res.status === 204) {
      return undefined as unknown as T;
    }

    // Alguns backends não mandam content-length; confie no content-type
    const contentType = res.headers.get("content-type") || "";

    // Se for JSON, parseia
    if (contentType.toLowerCase().includes("application/json")) {
      return (await res.json()) as T;
    }

    // Se não for JSON, tenta ver se há texto vazio
    const text = await res.text();
    if (!text || !text.trim()) {
      return undefined as unknown as T;
    }

    // Caso venha outro tipo de resposta (ex.: texto), você pode adaptar aqui.
    // Para manter compatibilidade, retorna undefined se não for JSON.
    return undefined as unknown as T;
  } catch (error) {
    if (error instanceof Error && error.message === ERROR_ACCESS_DANIED) {
      throw error;
    }
    throw new Error(ERROR_CONNECTION);
  }
}

function createApiClient(isPrivate = false) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
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
