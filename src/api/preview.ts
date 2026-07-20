import { apiFetch } from "./client";

export type PreviewResult = {
  url?: string;
  contentType?: string;
  mimeType?: string;
  title?: string;
  description?: string;
  error?: string;
  [key: string]: unknown;
};

export function getUriPreview(uri: string): Promise<PreviewResult> {
  return apiFetch<PreviewResult>(`/api/preview/${encodeURIComponent(uri)}`);
}
