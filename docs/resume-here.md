# Resume here — November 4, 2026

## Current checkpoint

Gio authorized a fresh database for the existing inquiry form and owner inbox. The new `ruiztechservices-db` project is healthy; its two-table schema is applied, database access checks pass, and a labeled browser test inquiry reached the new database through a Vercel preview. On November 4, Gio chose to finish the inquiry preview first and do login later. Google owner sign-in and the production cutover remain pending. Bae's Berries is a separate site whose current source is still on Gio's other laptop.

## Current source and production

- Local checkout: `/Users/ruiztechservices/Projects/ruiztechservices-website`.
- Canonical repository: https://github.com/ruizTechServices/ruiztechservices-website.
- Production branch: `main`; verified deployed revision: `5a6c2d2cb63a1f09fe1cff60a45172b3952e1374`.
- Vercel project: `ruiz-tech-services-nextjs`, ID `prj_m75tD2GbR8Y6L9QZs6QGdrcwBG2O`.
- Current stack: Next.js 15.5.9, React 19, Tailwind, Supabase. Keep this framework.
- This branch pins Node.js 24.x in `package.json`, matching local verification. The first preview was blocked before compilation because the Vercel project still selects discontinued Node.js 20.x. The package setting overrides it for this branch's deployments without editing project-wide settings.

## Existing inquiry implementation

1. `app/contact/page.tsx` checks backend availability and prefills the service/project context.
2. `components/forms/ContactForm.tsx` renders the inquiry form. When the backend is unavailable, the primary action prepares an email for the visitor to review and send.
3. `lib/forms/contactSchema.ts` validates requests; `lib/actions/contact.ts` inserts new requests into the existing `contact_submissions` table without reading private inbox data back.
4. `lib/auth/admin.ts` requires a signed-in member of `admins`. `lib/actions/admin-contact.ts` protects inbox reads, status changes, and deletion.
5. `/admin` displays inquiries with new/read/replied statuses. Email alerts are not implemented.

This branch repairs two gaps in that flow: email-mode primary submissions now use the same validation and normalized draft context as database submissions; the inbox status menu reflects saved server data and reports interrupted actions without showing an unsaved status as confirmed.

## Fresh database and remaining cutover

The original project was `kzirwwuywztjpxrotpwz`. On November 2, the project open in Chrome was a different project with the same name: `wvkfwtuobrzwpomvfsbk` / `ruiztechservices-db`, in `Gio'sPrivateOrg`. Both the reloaded dashboard and provider metadata reported it healthy on Micro compute. Its public schema was empty. The public production bundle still referenced the original project at this inspection; a healthy replacement alone does not switch the running website.

Gio explicitly chose **Initialize a fresh database**. The provider migration `20261102183026` creates only `public.admins` and `public.contact_submissions`; its source is `supabase/migrations/20261102183026_initialize_inquiry_inbox.sql`. No old inquiries, user accounts, or history were restored or claimed to be migrated. The portfolio, Nucleus, and Home Services databases were not substituted.

Both new tables have RLS. Public clients can insert new inquiries but cannot read the inbox, assign admin membership, choose IDs/timestamps, or edit submitted messages. Authenticated inbox access requires an existing admin membership; status updates are limited to the status column. The SQL verification fixture uses temporary synthetic identities, scopes every contact mutation to its uniquely identified fixture row, and rolls the transaction back. The initial 16 role/privilege assertions passed; the replay-safe fixture should be rerun whenever policies change. Provider security advisors reported no issues.

The [Vercel preview](https://ruiz-tech-services-nextjs-7j57lp1yf-ruiztechservices-projects.vercel.app/contact) deployed as `dpl_8mAzeUL2NuiMCoCD7fUdAhf8Pg7c`. A browser submission to that preview showed **Request received**; a provider read confirmed the labeled synthetic inquiry as row `2`, status `new`. That test row is intentionally retained. It is a verification fixture, not a customer lead or evidence of owner-inbox access. The new public Supabase URL/key are configured only for the Preview branch `jarvis/inquiry-reliability`; production variables still reference the earlier project.

Google is disabled in the new project's Auth settings and no Google client values were configured at the inspection. Owner sign-in requires the existing Google OAuth client setup and the appropriate callback/redirect configuration. Provision Gio's `admins` membership only for his exact verified Auth user UUID through a trusted operator; do not trust user-editable metadata or grant the first signup admin access. Complete owner sign-in, inbox verification, and the production environment/release step before describing the recovery as live on the public domain.

No real customer inquiry, email send, or payment operation was performed. The fresh schema and labeled synthetic inquiry are the new persistent writes. The earlier local checks used test-only configuration; the preview inquiry separately demonstrates persistence to the fresh project.

## Generated schema types

`lib/inquiry-database.types.ts` is generated from the fresh project's public schema. The active contact client and submission insert/update types use this type. `npm run gen-types` targets project `wvkfwtuobrzwpomvfsbk` and this new file; do not regenerate it against the original project.

`lib/database.types.ts` remains an untouched historical generated snapshot for the shared server/admin clients and deferred legacy AI/chat/billing code. `requireAdminUser` still uses that shared server client; the matching owner-inbox fields remain compatible. The contact display type permits the historical nullable status while deriving its other fields from the fresh generated row. This compatibility typing is not evidence that `user_credits`, `chats`, `messages`, or `decrement_credits` exist in the fresh database. Those legacy features are not restored by this two-table migration. Avoid adding their tables or payment behavior merely to satisfy historical TypeScript declarations.

## Broader CMS work

The checked-out application has an inquiry inbox, static marketing content in `lib/content`, and an internal chat page. It does not yet implement a blog/project editor or a draft → preview → publish workflow. Those remain a subsequent milestone after owner access and inquiry verification. Preserve the owner-only dashboard and the existing approved service/pricing terms.

## Bridget's website

Gio identified the domain as `baesberries.com` and clarified that the desired website was created in another Codex session on his other laptop. The current GoDaddy domain is parked and has an unpublished Coming Soon draft. The historical Hostinger site found in the Internet Archive is not the source Gio wants connected.

No matching accessible repository or Codex session was found on this Mac. The other laptop is not connected through the current app tools, and both older PC bridge endpoints are unavailable. Gio can open that laptop now. The next input is its existing repository link or a transferred ZIP of the current website source/assets/package files/setup instructions, excluding credentials, `.env` files, `.git`, dependency directories, and build caches. Keep the domain configuration intact until the actual project is built and its hosting destination verified. Do not substitute the separate chatbot-for-Chris project or publish the GoDaddy placeholder as the requested site.

## Verification

- Local regression checks: 54 passed, including the earlier validation/inbox checks and 10 OAuth availability checks.
- `npm run lint`: no errors; four pre-existing warnings in unrelated chat/AI files.
- `npm run typecheck`: passed.
- `npm run build`: passed with local test-only configuration.
- Local browser: whitespace-only requests and unsupported website schemes display validation errors, preserve the form values, and do not open an email draft. No browser console errors were observed.
- Valid normalized email payloads and URL encoding are covered by the regression checks.
- Fresh database: all 16 access/privilege assertions also passed using the replay-safe committed SQL fixture after the persistent preview test row existed; the fixture rolled back. Security advisors reported no issues.
- Preview-to-database persistence: a labeled synthetic request reached row `2` with status `new` and showed **Request received** in the browser. Owner sign-in, authenticated inbox operation, public-domain cutover, and live mail delivery remain unverified.
