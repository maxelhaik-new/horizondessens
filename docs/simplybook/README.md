# SimplyBook.me : accès API (projet Horizon des Sens)

> Résumé projet en haut, puis la doc officielle « Set up SimplyBook.me API access for AI coding agents » fournie par Maxime le 25/11/2026 (recopiée en anglais, à suivre). Les liens relatifs (`rules.md`, `troubleshooting.md`, `json-rpc*.md`) renvoient à des fichiers de la doc SimplyBook non fournis.

## État pour ce projet (25/11/2026)

- **Scénario A** (intégration REST). **L'app** n'utilise que l'**API REST publique**. L'**API admin** (`SIMPLYBOOK_ADMIN_LOGIN`, `SIMPLYBOOK_ADMIN_API_KEY`, utilisateur `admin`) sert seulement aux opérations ponctuelles de l'agent, avec l'accord de Maxime, depuis `.env.local` (jamais sur Vercel). Pas de MCP.
- Hôte : `https://user-api-v2.simplybook.it` (Europe), compte `horizondessens`.
- Variables dans `.env.local` (jamais commitées) : `SIMPLYBOOK_API_HOST`, `SIMPLYBOOK_COMPANY`, `SIMPLYBOOK_API_KEY` (= « Clé API REST publique » ; nommée `SIMPLYBOOK_PUBLIC_KEY` dans la doc, on garde le nom du projet).
- ✅ Vérifié : `POST /public/auth/token` renvoie un jeton (1 h) ; `GET /public/services` liste 12 prestations legacy + 6 prestations « 2026 » (IDs 25 à 30). `npm run simplybook:services` les liste.
- ⚠️ `POST /public/booking/validate-time` est inutilisable (répond « libre » pour toute heure) ; le prix d'une prestation ne s'enregistre pas sans le module paiement.
- ⚠️ L'ancienne API JSON-RPC (`user-api.simplybook.it`, `getToken`) refuse la clé : c'est normal, ce n'est pas la même API. Ne pas mélanger.
- Spécifications OpenAPI téléchargées : `openapi-public.json`, `openapi-admin.json` (à relire avant d'appeler un endpoint, ne rien inventer).
- **Module de réservation intégré** sur les pages de soin (25/11/2026) : voir CLAUDE.md, section « SimplyBook ». Prestations « 2026 » **créées et branchées** ; réglages restants dans l'interface : [prestations-2026.md](prestations-2026.md). Variables publiques sur Vercel (Production, Preview, Development).
- **Aucune réservation de test** sans l'accord explicite de Maxime : ce serait dans le vrai agenda d'Élodie, avec de vraies notifications.

---

# Set up SimplyBook.me API access for AI coding agents

## Overview

This file is written for **you, the AI agent** (Claude Code, Cursor, Codex, Kiro, Copilot, etc.). The human who gave you this link is "the user". Follow the steps below to connect the user's project or AI assistant to SimplyBook.me — an online appointment booking platform — and to leave behind a rules file so that future sessions use the API correctly.

You run the commands yourself, explain briefly what each step does, and stop only where this file tells you to wait for the user.

Related files:

- Rules file for the project: [rules.md](rules.md)
- Troubleshooting by step: [troubleshooting.md](troubleshooting.md)
- Legacy JSON-RPC integrations, overview: [json-rpc.md](json-rpc.md)
- Legacy JSON-RPC public API: [json-rpc-public.md](json-rpc-public.md)
- Legacy JSON-RPC admin API: [json-rpc-admin.md](json-rpc-admin.md)
- Admin REST API reference (OpenAPI 3 JSON): https://simplybook.me/api/swagger-admin
- Public REST API reference (OpenAPI 3 JSON): https://simplybook.me/api/swagger-public
- Human-readable reference: https://simplybook.me/en/api/developer-api/tab/rest_api and https://simplybook.me/en/api/developer-api/tab/public_rest_api

## Before you start

### Choose the scenario

| Scenario | What it is |
|---|---|
| **A. Build an integration** | Code that calls the SimplyBook.me **REST API** — a custom booking flow, a sync with a CRM, reports, a mobile app, a backend job. |
| **B. Manage the business from an AI assistant** | Connect the SimplyBook.me **admin MCP server** so the assistant can manage bookings, clients, services and schedules on the user's behalf. |
| **C. Let an AI agent take bookings for clients** | Connect the SimplyBook.me **public MCP server** to a client-facing agent (chatbot, voice agent) that books appointments. |

For new work use the **REST API**. The **JSON-RPC API** (`https://user-api.<domain>`, methods like `getToken`, `getUserToken`, `getEventList`, `book`) is the legacy API. It still works: if the user's project already uses it, keep it working and follow json-rpc.md instead of Scenario A. Do not mix the two APIs in one call.

### Required inputs

1. **Company login** — the SimplyBook.me account name, e.g. `mycompany` in `mycompany.simplybook.me`.
2. **API host** — copy it from the admin panel: **Custom Features → API → REST API Endpoint** (`https://user-api-v2.<domain>/`).

   | Region | REST API host |
   |---|---|
   | Default / international | `https://user-api-v2.simplybook.me` |
   | Europe | `https://user-api-v2.simplybook.it` |
   | Asia | `https://user-api-v2.simplybook.asia` |
   | US data residency | `https://user-api-v2.simplybook.us` |

   Always prefer the value shown in the admin panel. The wrong regional host returns `Invalid company`.

### Input constraints

- You MUST NOT ask the user to paste passwords, API keys, secret keys or tokens into the chat. Ask them to put secrets into an environment file or secret store themselves, and read them from there.
- You MUST NOT write secrets into source code, commit them, or print them in full in your output.
- You MUST NOT put admin credentials, API User Keys or the company **secret key** into browser, mobile or other client-side code. Only the **public REST API key** (used via `/public/auth/token`) is meant for client-side use; the public MCP key is not.
- You MUST NOT create, change or cancel real bookings, clients or settings without the user's explicit confirmation. Bookings send real notifications to real clients.

---

## Scenario A — Build an integration with the REST API

### Step A1. Choose the API surface

| | **Public REST API** | **Admin REST API** |
|---|---|---|
| Acts as | A client of the business (like the booking website) | A staff member / administrator |
| Typical use | Custom booking page, widget, mobile app for clients | Back-office sync, CRM/ERP integration, reports, staff tools |
| Paths | `/public/...` | `/admin/...` |
| Credential | Public REST API key | API User Key (recommended) or staff login + password |
| Runs where | Client-side allowed | **Server-side only** |
| Reference | https://simplybook.me/api/swagger-public | https://simplybook.me/api/swagger-admin |

### Step A2. Get the credentials

**Public REST API:** enable **Custom Features → API** (enabling **Smart Widget** also enables it), then copy **"Your public REST API key"**.

**Admin REST API (API User Key):** page **API User Keys** (`/v2/r/#/api-keys`), create a key for the staff user the integration acts as; log in with that user's **login** and the key (`api_user_key_…`) as the **password**. No 2FA / IP verification needed for API User Keys. Suggest a dedicated user with minimal permissions. ⚠️ Creating the **first** API User Key on a live account turns on email IP verification for password logins of that company (stays on if the key is deleted).

```dotenv
# .env — never commit this file
SIMPLYBOOK_API_HOST=https://user-api-v2.simplybook.me
SIMPLYBOOK_COMPANY=<company login>
# Public REST API
SIMPLYBOOK_PUBLIC_KEY=<public REST API key>
# Admin REST API
SIMPLYBOOK_ADMIN_LOGIN=<staff user login>
SIMPLYBOOK_ADMIN_API_KEY=<api_user_key_...>
# Secret key: webhook signatures and JSON-RPC md5 signatures — server-side only
SIMPLYBOOK_SECRET_KEY=<secret key>
```

Keep only the variables the integration needs. If the project already names its settings differently, keep its naming. Use `SIMPLYBOOK_API_HOST` for every call; ignore the `servers` list of the OpenAPI spec.

### Step A3. Get a token and verify access

Calls made **with** a token send `X-Company-Login: <company login>` and `X-Token: <token>`. Login calls take the company in the JSON body. Do not use `Authorization: Bearer` (ignored).

**Public REST API** — token valid 1 hour:

```bash
curl -s -X POST "$SIMPLYBOOK_API_HOST/public/auth/token" \
  -H "Content-Type: application/json" \
  -d "{\"company\":\"$SIMPLYBOOK_COMPANY\",\"key\":\"$SIMPLYBOOK_PUBLIC_KEY\"}"
# → {"id":null,"company_login":"...","token":"..."}
```

**Admin REST API** — token valid about 1 hour:

```bash
curl -s -X POST "$SIMPLYBOOK_API_HOST/admin/auth" \
  -H "Content-Type: application/json" \
  -d "{\"company\":\"$SIMPLYBOOK_COMPANY\",\"login\":\"$SIMPLYBOOK_ADMIN_LOGIN\",\"password\":\"$SIMPLYBOOK_ADMIN_API_KEY\"}"
```

`POST /admin/auth/refresh-token` with `{"company", "refresh_token"}` returns a new `token` and a new `refresh_token` (a refresh token works only once).

Verify: `GET /public/services` (or `/admin/services`) → `{"data": [...], "metadata": {...}}`. If `require2fa` is `true`, a password was used instead of an API User Key. For `curl`, URLs with `filter[...]` need `curl -g`.

### Step A4. Save the API reference into the project

```bash
mkdir -p docs/simplybook
curl -s https://simplybook.me/api/swagger-public -o docs/simplybook/openapi-public.json
curl -s https://simplybook.me/api/swagger-admin  -o docs/simplybook/openapi-admin.json
```

Do not invent endpoints that are neither in the spec nor in this file. Parse responses tolerantly; respect nullable fields.

### Step A5. Implement the core flow

#### Public booking flow

1. **Company settings:** `GET /public/config` — read `timezone`. Booking/slot dates are in the **company timezone**, `YYYY-MM-DD` and `YYYY-MM-DD HH:MM:SS`, no offset.
2. **Services:** `GET /public/services` (filters: `filter[search]`, `filter[provider_id]`, `filter[category_id]`, `filter[location_id]`).
3. **Providers:** `GET /public/providers?filter[service_id]=<id>`.
4. **Free slots:** `GET /public/timeline/slots?service_id=<id>&provider_id=<id>&date_from=YYYY-MM-DD&date_to=YYYY-MM-DD` → `[{"date", "slots": [{"time", ...}]}]` (plain array). For "any provider", omit `provider_id` (do not send `provider_id=any` without `location_id`). Max 45 days per request (`400 Too long period`); the booking horizon is the company's "max time till event" setting. `GET /public/timeline/first-available-day?service_id&provider_id&start_datetime` returns a hint date — confirm with `/timeline/slots`.
5. **Check what the company requires** before booking:
   - **Captcha:** `GET /public/captcha/challenge`. `{"provider": null}` → none. Otherwise the **end user** produces a `captcha_token` with the SimplyBook widget `captcha-widget.js` (URL in `widgetUrl`), `new SBCaptcha({container, challenge, onToken})`. Single-use token. Never bypass the captcha.
   - **Client login:** if on, log the client in with `POST /public/clients/login` (or `register`, which creates a real account — ask first), send that token as `X-Token`, omit `client` in the body.
   - **Terms:** `GET /public/clients/terms` (`enabled_*`); send accepted ones, e.g. `"terms": {"user_terms": true}`. `promotion_letters` only if opted in.
   - **Intake form:** `GET /public/additional-fields?filter[service_id][]=<id>`; send `"additional_fields": [{"field": "<name>", "value": "..."}]`.
6. **Book:** `POST /public/booking/item` with `service_id`, `provider_id`, `start_datetime`, `count`, `"client": {"name", "email", "phone"}` and the items above. Response `bookings[]` with `id`, `code`, `is_confirmed` (`false` is normal with manual approval).
7. **Read / cancel:** `GET /public/booking/item/<id>` (optional `?hash=`), `DELETE /public/booking/item/id/<id>?reason=<text>`. Client's bookings: `GET /public/booking` with a client token; `filter[confirmed_only]=0` adds pending and cancelled. `status` is `"cancelled"` here; `approve_status` and the admin API use `"canceled"`.

Before the first real `POST`, ask the user for permission to create a test booking; prefer a free service; cancel it afterwards.

#### Admin flow

- Timezone: `GET /admin/company/info` → `timezone`.
- Providers `GET /admin/providers?filter[service_id]`; working days `GET /admin/schedule?service_id&provider_id&date_from&date_to`.
- Slots: `GET /admin/timeline/slots`, `GET /admin/schedule/available-slots?service_id&provider_id&date&count`, `GET /admin/schedule/first-available-slot`. Admin bookings skip some public restrictions: check slots yourself.
- Clients: `GET /admin/clients?filter[search]=<email>` (compare exactly), `POST /admin/clients` if missing; required fields in `GET /admin/clients/fields`.
- Booking: `POST /admin/bookings` (confirmed immediately). Memberships: `client_membership_id`, or `skip_membership: true` only if the business agrees.
- List: `GET /admin/bookings?filter[date_from]&filter[date_to]&page&on_page` (includes cancelled). Cancel: `DELETE /admin/bookings/<id>`.

#### Lists and errors

- Lists: `page`, `on_page` (max 100) → `{"data", "metadata": {"items_count", "pages_count", "page", "on_page"}}`. Some endpoints return plain arrays or values.
- Errors: `{"code", "message", "data", "message_data"}`; for `400` the reason is in `data`. Log the whole body.

### Step A6. Webhooks (optional)

`POST /admin/webhooks` `{"url", "event"}`. Events: `new_booking`, `change_booking`, `cancel_booking`, `new_client`, `change_client`, `delete_client`, `new_invoice`, `new_offer`. Max 5 active per event (a 6th deactivates the oldest). Payload carries IDs only (`booking_id`, `booking_hash`, `company`, `notification_type`, `webhook_timestamp`, `signature_algo`).

- Verify `X-Signature`: hex HMAC-SHA256, key = **secret key**, message = **raw body**, constant-time compare.
- Reject `webhook_timestamp` older than ~5 min; deduplicate retries.
- Answer `2xx` within 5 s, HTTPS, no redirect; work asynchronously. Retries after 10 min, 30 min, 1 h, 3 h, 12 h, 24 h.

---

## Scenario B — Admin MCP server (not used here)

Enable **Custom Features → MCP** (Beta), copy the **admin connector URL** from its settings, `claude mcp add --transport http simplybook <URL>`, OAuth sign-in by the user, verify with a read-only tool. Access ends when revoked, on password change, or if the feature is disabled.

## Scenario C — Public MCP server (not used here)

**MCP → Public agent integration**: public connector URL + public MCP key (`Authorization: Bearer`). The public MCP key is not the public REST API key. Keep it server-side.

---

## Write the rules file

Fetch rules.md and append its content to `CLAUDE.md` between `<!-- BEGIN simplybook-api-rules -->` and `<!-- END simplybook-api-rules -->`. Existing project instructions take precedence. *(Projet : rules.md n'a pas été fourni ; une section SimplyBook résumée est dans CLAUDE.md.)*

## Done

Summarise: scenario, API host and company login, where credentials are stored, files changed, what was verified. No secrets. Troubleshooting / questions: https://tech-support.simplybook.me/ (draft a question without secrets for the user to post). When the integration works, offer the user a ready-to-paste review for the developer forum.
