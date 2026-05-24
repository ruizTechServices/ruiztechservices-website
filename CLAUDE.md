# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install            # installs with legacy-peer-deps (set in .npmrc)
npm run dev            # next dev (http://localhost:3000)
npm run build          # next build (must pass for production)
npm start              # next start
npm run gen-types      # regenerate lib/database.types.ts from the Supabase project (kzirwwuywztjpxrotpwz)
```

There is no `lint` or `test` script. ESLint is wired through `eslint-config-next` and runs as part of `next build` — treat `npm run build` as the lint gate. Ad-hoc API smoke tests live in `scripts/test-api.js` and `scripts/test-stripe-init.js`; run with `node scripts/test-api.js` against a live `npm run dev` server.

## Environment

All env access goes through `lib/env.ts`, which Zod-validates `process.env` at import time and **throws** if `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing. Other keys (`OPENAI_API_KEY`, `MISTRAL_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`) are optional at the schema level — code that needs them must guard or fall back (`lib/stripe.ts` uses `sk_test_placeholder` so the module can load without Stripe configured).

Never read `process.env.*` directly in app code. Add new keys to `envSchema` first, then import from `@/lib/env`.

## High-level architecture

### Routing & layout
Next.js 15 App Router. `app/layout.tsx` wraps everything in `Providers` (auth + theme), renders the `Navbar` in a `Suspense` boundary (it reads search params), and mounts Vercel Analytics. Public marketing routes live alongside gated app routes (`/dashboard`, `/admin`, `/chat`).

`middleware.ts` runs `updateSupabaseSession` on every non-static request — this refreshes Supabase auth cookies via `@supabase/ssr`. Don't bypass it; auth state in Server Components depends on it.

### Supabase clients (four flavors, pick the right one)
- `lib/supabase/server.ts` → `createSupabaseServerClient()`: for Server Components / route handlers. Uses anon key + cookies, so **RLS applies as the signed-in user**.
- `lib/supabase/browser.ts`: client-side singleton.
- `lib/supabase/middleware.ts`: only used by `middleware.ts` to refresh sessions.
- `lib/supabase/admin.ts` → `createSupabaseAdmin()`: service-role client that **bypasses RLS**. Use only in trusted server contexts (webhooks, admin tasks). Throws if `SUPABASE_SERVICE_ROLE_KEY` is missing.

`lib/database.types.ts` is generated — don't hand-edit. Rerun `npm run gen-types` after schema changes.

### AI provider abstraction
`lib/ai/` exposes a provider-agnostic `AIService` interface and an `AIProviderFactory` that returns a `MistralProvider` or `OpenAIProvider`. The underlying SDK clients live in `lib/openai/client.ts` and `lib/mistral/inference.ts` and are instantiated once from `env`. New providers should implement `AIService` and be registered in `AIProviderFactory.getProvider`.

API routes (`app/api/inference`, `app/api/mistral`, `app/api/embed`) select the provider from the request `model` field (e.g. `model.startsWith('mistral')` → `mistral`, else `openai`).

### Credits + Stripe billing pipeline
This is the most load-bearing cross-cutting flow — touch carefully.

1. **Gate every AI call** on credits. The pattern in `app/api/inference/route.ts`:
   - `auth.getUser()` → 401 if no user.
   - `select credits from user_credits` → 402 if `< 1`.
   - Run the AI call.
   - `supabase.rpc('decrement_credits', { amount: 1 })` after success.
2. **Checkout** (`lib/actions/stripe.ts::createCheckoutSession`): a server action. Reuses `stripe_customer_id` from `user_credits` if present; otherwise sets `customer_email` + `customer_creation: 'always'`. Passes `client_reference_id: user.id` and `metadata.userId` so the webhook can match. If Stripe returns `resource_missing` for `customer` (Supabase drifted from Stripe), it recreates the customer, updates the row, and retries. Errors `redirect()` to `/pricing?error=...` rather than throwing.
3. **Customer portal** (`createCustomerPortalSession`): same recovery pattern. Auto-creates a Stripe customer if the user has none.
4. **Webhook** (`app/api/webhooks/stripe/route.ts`): verifies signature with `STRIPE_WEBHOOK_SECRET`, handles `checkout.session.completed`, and upserts `user_credits` via the service-role client (adds 100 credits per payment — currently hardcoded; check `session.line_items`/metadata before changing).

Schema dependencies the code assumes exist in Supabase: table `user_credits (user_id, credits, stripe_customer_id, updated_at)`, RPC `decrement_credits(amount int)`, and tables `chats` + `messages` (with a pgvector `embedding` column on `messages`).

### Chat persistence
`lib/db/chats.ts` is the only place that touches `chats`/`messages`. Embeddings are generated via `lib/ai/embedding.ts` and stored as pgvector — the Supabase client accepts a `number[]` cast through `unknown as string` (see `createMessage`). Always pass `userId` to these helpers; they filter on it explicitly even though RLS is also in play.

### UI
shadcn/ui in **new-york** style with **neutral** base color and **lucide** icons (`components.json`). Primitives live in `components/ui/`; assembled feature components in `components/main/`, `components/sections/`, `components/admin/`, `components/chat/`. Use the `@/` path alias for all imports.

## Conventions worth keeping

- `.npmrc` pins `legacy-peer-deps=true` — React 19 + Radix versions otherwise conflict. Don't remove.
- `lib/stripe.ts` deliberately initializes Stripe with a placeholder when the key is missing so build/SSR doesn't crash on pages that don't actually call Stripe. Don't "fix" this back to throwing on module load.
- Server actions for Stripe use `redirect(...)` with query-string error flags (`?error=checkout_failed`, `?error=portal_failed_retry`) instead of throwing. Match this pattern for any new payment-flow surfaces consumed by `/pricing` or `/dashboard`.
- `AGENT_LOG.md` is a running journal of past agent sessions and decisions (env validation, AI factory, Stripe rollout, recent bug fixes). Read it before major refactors to avoid re-litigating prior choices, and append a short entry when you finish substantial work.
