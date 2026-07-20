import { apiFetch } from "./client";

export type JsonDocument = {
  id: string;
  title: string;
  readOnly: boolean;
  type: "raw" | "url";
  contents?: string;
  url?: string;
};

export type DocResponse = {
  doc: JsonDocument;
  json: unknown;
  path: string | null;
  minimal?: boolean;
};

export function getDoc(id: string, path?: string, minimal?: boolean): Promise<DocResponse> {
  const params = new URLSearchParams();
  if (path) params.set("path", path);
  if (minimal) params.set("minimal", "true");
  const qs = params.toString() ? `?${params.toString()}` : "";
  return apiFetch<DocResponse>(`/api/docs/${id}${qs}`);
}

export function deleteDoc(id: string): Promise<{ redirect: string }> {
  return apiFetch(`/api/docs/${id}`, { method: "DELETE" });
}

export function updateDocTitle(
  id: string,
  title: string
): Promise<JsonDocument> {
  return apiFetch(`/api/docs/${id}/update`, {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export function getRawJson(id: string): Promise<unknown> {
  return apiFetch(`/api/docs/${id}/raw`);
}
