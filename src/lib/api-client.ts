// lib/api-client.ts
import {
  connectionAPIGet,
  connectionAPIPost,
  connectionAPIPut,
  connectionAPIPatch,
  connectionAPIDelete,
} from "@/lib/ConnectionApi"; // <- o arquivo onde está seu ConnectionAPIClient

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
const u = (path: string) => `${API_URL}${path}`;

export const api = {
  get:   <T>(path: string) => connectionAPIGet<T>(u(path)),
  post:  <T>(path: string, body: unknown) => connectionAPIPost<T>(u(path), body),
  put:   <T>(path: string, body: unknown) => connectionAPIPut<T>(u(path), body),
  patch: <T>(path: string, body: unknown) => connectionAPIPatch<T>(u(path), body),
  delete:<T>(path: string) => connectionAPIDelete<T>(u(path)),
};
