// src/frontend/src/lib/apiClient.ts
//
// Thin fetch wrapper used by the React Query hooks. Pulls the base URL from
// `VITE_API_URL` (set in `.env` for dev and on Vercel for prod) and the JWT
// from `localStorage` when present.
// Build marker: 1787961856

const RAW_API_URL = import.meta.env.VITE_API_URL as string | undefined;

// When VITE_API_URL starts with `/` or `http`, treat it as a URL.
// Falls back to `http://localhost:3001` for local dev.
const BASE_URL = RAW_API_URL && RAW_API_URL.length > 0
  ? RAW_API_URL.replace(/\/$/, "")
  : "http://localhost:3001";

export const TOKEN_KEY = "sts_admin_token";

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null): void {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

export class ApiError extends Error {
  status: number;
  details: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

interface RequestOpts {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  auth?: boolean; // attach bearer token if present
  signal?: AbortSignal;
}

export async function request<T>(path: string, opts: RequestOpts = {}): Promise<T> {
  const { method = "GET", body, headers = {}, auth = false, signal } = opts;
  const finalHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
  };

  let payload: BodyInit | undefined;
  if (body !== undefined) {
    if (body instanceof FormData) {
      payload = body;
    } else {
      finalHeaders["Content-Type"] = "application/json";
      payload = JSON.stringify(body);
    }
  }

  if (auth) {
    const token = getToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  let url: string;
  if (path.startsWith("http")) {
    url = path;
  } else if (BASE_URL.startsWith("/")) {
    // Relative base (e.g. `/api`) — strip the duplicate `/api` prefix
    // from the path before joining.
    url = BASE_URL + (path.startsWith("/api/") ? path.slice(4) : path);
  } else {
    url = BASE_URL + (path.startsWith("/") ? path : `/${path}`);
  }
  const res = await fetch(url, { method, headers: finalHeaders, body: payload, signal });

  if (res.status === 204) {
    return undefined as T;
  }

  const contentType = res.headers.get("content-type") ?? "";
  const data: unknown = contentType.includes("application/json")
    ? await res.json().catch(() => undefined)
    : await res.text().catch(() => undefined);

  if (!res.ok) {
    let message: string;
    if (
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof (data as { error?: unknown }).error === "string"
    ) {
      message = (data as { error: string }).error;
    } else if (res.statusText) {
      message = res.statusText;
    } else {
      message = "Request failed";
    }
    throw new ApiError(res.status, message, data);
  }

  return data as T;
}

export function buildQuery(params: Record<string, unknown> = {}): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    sp.append(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export { BASE_URL };
