import "server-only";

/**
 * Client minimal de l'API REST **publique** SimplyBook (docs/simplybook/).
 *
 * Jeton : `POST /public/auth/token` {company, key}, valable 1 h, gardé en
 * mémoire du processus et renouvelé avant expiration (ou après un 401).
 * Appels : en-têtes `X-Company-Login` + `X-Token`. Jamais côté navigateur :
 * le site appelle ces fonctions depuis ses Server Actions.
 *
 * Variables : SIMPLYBOOK_API_HOST, SIMPLYBOOK_COMPANY, SIMPLYBOOK_API_KEY.
 */

const TOKEN_TTL_MS = 50 * 60 * 1000;
const TIMEOUT_MS = 10_000;

let cached: { token: string; expires: number } | null = null;

function config() {
  const host = process.env.SIMPLYBOOK_API_HOST?.replace(/\/$/, "");
  const company = process.env.SIMPLYBOOK_COMPANY;
  const key = process.env.SIMPLYBOOK_API_KEY;
  return host && company && key ? { host, company, key } : null;
}

export function isSimplybookConfigured() {
  return config() !== null;
}

/** Erreur de l'API : `status` HTTP et corps (`data` = détail par champ). */
export class SimplybookError extends Error {
  constructor(
    readonly status: number,
    readonly body: unknown,
  ) {
    super(`SimplyBook ${status}: ${JSON.stringify(body).slice(0, 500)}`);
  }
}

async function request(url: string, init: RequestInit) {
  const res = await fetch(url, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const text = await res.text();
  let body: unknown = text;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    // Corps non JSON : on le garde tel quel pour le journal.
  }
  if (!res.ok) throw new SimplybookError(res.status, body);
  return body;
}

async function getToken(force = false) {
  const cfg = config();
  if (!cfg) throw new Error("SimplyBook n'est pas configuré.");
  if (!force && cached && cached.expires > Date.now()) return cached.token;
  const body = (await request(`${cfg.host}/public/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ company: cfg.company, key: cfg.key }),
  })) as { token?: string };
  if (!body?.token) throw new Error("SimplyBook : jeton absent.");
  cached = { token: body.token, expires: Date.now() + TOKEN_TTL_MS };
  return cached.token;
}

/** Appel authentifié ; un 401 renouvelle le jeton et réessaie une fois. */
export async function simplybook<T>(
  path: string,
  init: { method?: "GET" | "POST" | "DELETE"; body?: unknown } = {},
): Promise<T> {
  const cfg = config();
  if (!cfg) throw new Error("SimplyBook n'est pas configuré.");
  const call = async (token: string) =>
    request(`${cfg.host}${path}`, {
      method: init.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Company-Login": cfg.company,
        "X-Token": token,
      },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
    });
  try {
    return (await call(await getToken())) as T;
  } catch (error) {
    if (error instanceof SimplybookError && error.status === 401) {
      return (await call(await getToken(true))) as T;
    }
    throw error;
  }
}

// --- Types utiles (sous-ensemble de docs/simplybook/openapi-public.json) ---

export type SbService = {
  id: number;
  name: string;
  duration: number | null;
  is_active: boolean;
  is_visible: boolean;
  providers: number[];
};

export type SbTimelineDay = {
  date: string;
  slots: { time: string; datetime: string }[];
};

export type SbBookingResult = {
  bookings: {
    id: number;
    code: string;
    is_confirmed: boolean;
    start_datetime: string;
    end_datetime: string;
  }[];
};
