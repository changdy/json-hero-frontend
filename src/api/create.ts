import { apiFetch } from "./client";

export type CreateResult = {
  id: string;
  redirect: string;
};

export function createFromUrl(
  jsonUrl: string,
  title?: string
): Promise<CreateResult> {
  return apiFetch<CreateResult>("/api/create/url", {
    method: "POST",
    body: JSON.stringify({ jsonUrl, title }),
  });
}

export function createFromFile(
  filename: string,
  rawJson: string
): Promise<CreateResult> {
  return apiFetch<CreateResult>("/api/create/file", {
    method: "POST",
    body: JSON.stringify({ filename, rawJson }),
  });
}

export function createFromQueryParams(params: string): Promise<CreateResult> {
  return apiFetch<CreateResult>(`/api/create?${params}`);
}
