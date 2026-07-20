// Keep same-origin requests by default. Vite proxies them during development and
// Avalonia/Kestrel serves both the API and the production SPA after publishing.
const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  code: string;
  data: string;

  constructor(status: number, code: string, data: string) {
    super(`API Error ${status}: ${data}`);
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const hasBody = options?.body != null;
  const headers: Record<string, string> = {
    ...(hasBody ? { "Content-Type": "application/json" } : {}),
    ...(options?.headers as Record<string, string> | undefined),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.error?.message || `HTTP ${res.status}`;
    const code = body?.error?.code || "UNKNOWN";
    throw new ApiError(res.status, code, message);
  }

  const body = await res.json();

  // Auto-unwrap unified { success, data } response format
  if (body && typeof body === "object" && "success" in body && "data" in body) {
    return body.data as T;
  }

  return body as T;
}

export async function apiPostForm<T>(
  path: string,
  body: Record<string, string>
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body).toString(),
  });

  if (!res.ok) {
    const resBody = await res.json().catch(() => null);
    const message = resBody?.error?.message || `HTTP ${res.status}`;
    const code = resBody?.error?.code || "UNKNOWN";
    throw new ApiError(res.status, code, message);
  }

  const resBody = await res.json();

  if (resBody && typeof resBody === "object" && "success" in resBody && "data" in resBody) {
    return resBody.data as T;
  }

  return resBody as T;
}
