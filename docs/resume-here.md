# Resume here — October 31, 2026

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

## Operational blocker

The original project is `kzirwwuywztjpxrotpwz` / `ruiztechservices-db`. Earlier investigations reported it inactive. On October 31, the connected Supabase account denied access to that project and listed only three unrelated projects. Its current status could not be confirmed. Chrome requires a Supabase sign-in before the original project can be inspected. Both separate PC bridge endpoints also returned unavailable.

The next user action is to sign into Supabase with the account that owns the original project. Then Jarvis can check its status, recover it if supported within the existing plan, inspect the existing table and access policies, and verify the inquiry-to-inbox flow. Do not replace this database with the portfolio, Nucleus, or Home Services database. See `docs/auth-investigation.md` for the original recovery evidence.

No production database writes, real inquiries, email sends, or payment operations were performed during this change. Local build/browser checks use test-only configuration with an unavailable local backend; those values are not production configuration.

## Broader CMS work

The checked-out application has an inquiry inbox, static marketing content in `lib/content`, and an internal chat page. It does not yet implement a blog/project editor or a draft → preview → publish workflow. Those remain a subsequent milestone after backend recovery and inquiry verification. Preserve the owner-only dashboard and the existing approved service/pricing terms.

## Bridget's website

The URL, repository, exact defect, expected behavior, and deadline are still unknown. The useful next input from Gio is the URL plus what currently happens and what should happen instead. Do not infer this site's identity from the separate chatbot-for-Chris project.

## Verification

- `npm test`: 44 regression checks, including validation parity and failed inbox actions.
- `npm run lint`: no errors; four pre-existing warnings in unrelated chat/AI files.
- `npm run typecheck`: passed.
- `npm run build`: passed with local test-only configuration.
- Local browser: whitespace-only requests and unsupported website schemes display validation errors, preserve the form values, and do not open an email draft. No browser console errors were observed.
- Valid normalized email payloads and URL encoding are covered by the regression checks. Live mail delivery and database delivery remain unverified.
