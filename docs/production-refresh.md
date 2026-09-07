# Production refresh — September 7, 2026

## Objective

Help visitors understand the service, inspect real work, and send a useful inquiry. The public priority is one pre-qualified website blocker fixed for $300. Local NYC troubleshooting and new development remain separately scoped services.

## Verified production identity

- Domain: https://www.ruiztechservices.com
- Repository: https://github.com/ruizTechServices/ruiztechservices-website
- Vercel project: `ruiz-tech-services-nextjs` / `prj_m75tD2GbR8Y6L9QZs6QGdrcwBG2O`
- Vercel team: `team_P4xD1xmJiYtIesCwpFWQd3Zv`
- Baseline commit: `ca7251534b749ba23ab3fdbba116a0eb91c4e4c1`
- Baseline production deployment: `dpl_H2u612e5h74urMVANWTmvrddeSnE`
- Existing Supabase project: `kzirwwuywztjpxrotpwz` / `ruiztechservices-db`

## What was good

The original homepage described recognizable local tech problems, offered direct contact, and set reasonable expectations about scope. Its reusable service catalog and existing Supabase auth/inbox provided a basis to preserve.

## What needed correction

- The $300 page promised multiple improvements, a $150 deposit, and a generic 1–2 day turnaround. That contradicted the approved one-blocker offer.
- The projects page asserted five anonymous client successes, numerical results, and “results verified” without supporting evidence in the source. Those claims were removed.
- The form pitched fractional CTO services and large budgets to visitors asking for everyday help. Service links did not prefill the inquiry.
- Contact validation accepted missing message text because it validated a nonempty composed header. Insert-and-select unnecessarily depended on reading the private inbox. Routine logs included contact details.
- Public navigation was inside an auth/search-parameter suspense boundary. Project links and consistent search metadata were missing.
- The existing Supabase project is inactive, so a public marketing page could load while submissions and sign-in failed.

## What changed

Public pages now use a consistent ink/cobalt visual system with the exact `ruizTechServices|` wordmark. The caret has reserved width and reduced-motion support. The homepage leads to website fixes, local support, and real project demonstrations. `/services` includes current pricing; `/pricing` permanently redirects there. `/local-tech-help` is a dedicated local service page. The historical `/tech-rescue-sprint` URL remains valid with the corrected offer.

The form accepts a service, issue, contact details, and relevant optional context. Tech Rescue requires a complete website URL. It validates on the server, handles failures without discarding typed text, and never reports a failed insert as a success. The existing `contact_submissions.message` holds structured context, so no migration is required. Administrative inbox actions check the existing admin role before reading or changing submissions.

The form checks the existing auth service’s availability with a two-second timeout. While unavailable, its primary action prepares an email. The visitor must review and send that email; opening the email app is not reported as delivery. Database submissions are offered again when the backend health check succeeds (cache up to 60 seconds). Actual insert errors still provide an email/copy fallback. The health check is not a guarantee that table policies are correct.

Existing Vercel Web Analytics remains in place, limited to known public routes, with query strings and fragments removed. No advertising pixels, session recordings, custom paid analytics, or new tracking database were introduced. The privacy notice now describes the existing providers; the Tech Rescue payment paragraph matches the offer. No new cancellation, retention, liability, or refund policy was established by this release.

## Project evidence

These are owned projects, not invented client work. No revenue, conversion, traffic, uptime, or time-savings results are asserted.

| Project | Evidence |
| --- | --- |
| Just Tools | Live public UI inspected September 7, 2026; screenshot captured directly at 1348×926. JSON logic source pinned to `ff1fcf1c629b7121fecb5a33573d3a046acf744d`. |
| Gio’s Soundboard | Live `/soundboard` inspected September 7, 2026. Screenshot reused from `luis_ruiz_3/public/images/projects/soundboard-controls.webp`; original provenance is `docs/case-study-evidence.md` in that repo. Audio logic pinned to `d74b310eb2ca8b4202b173b39198fe48ba057d84`. |
| Nucleus | Source walkthrough only, pinned to `7bde3082885fadac4cc96304f214b77903f41747`. Chat authentication, model access, and usage accounting are described. No checkout or model availability claim. |

## Validation

- Contact regression checks cover missing/blank/oversized fields, file payloads, unsafe and incomplete URLs, required Tech Rescue URL, service allowlist, honeypot, privacy acknowledgment, normalized input, insert without readback, failure without false success, and non-admin inbox denial.
- Tests use the actual TypeScript modules with network/framework boundaries stubbed. They do not prove live database delivery, notification, or RLS behavior.
- Local build uses the existing public Supabase configuration. Optional AI provider keys are local build placeholders; no provider request is made and no placeholder is deployed as an environment variable. Production retains its existing Vercel environment.
- Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` with the appropriate environment.

## Remaining operational blocker

Supabase returned metadata for the existing project with status `INACTIVE`. Public auth/REST probes failed. A connector restore returned `Project not found`; the project is in a different organization from the currently listed active projects. Its owner must restore the same project or provide the matching Supabase account access. Do not silently substitute the portfolio, Nucleus, or Home Services database.

After restore:

1. Confirm auth settings and the existing table are available.
2. Verify RLS: anonymous senders can insert a new submission but cannot select, update, or delete inbox records; only admins can manage the inbox.
3. Send a clearly labeled test inquiry with Gio’s authorization and verify it reaches the admin inbox. Remove that test record only with appropriate authorization.
4. Verify Gio’s Google sign-in and admin access. Credentials must be entered through a secure sign-in flow.
5. The current source does not implement email alerts on submission. Check the admin inbox for new records; do not assume notifications exist.

The email fallback has been prepared, not deliverability-tested. No message was sent to the business mailbox during development. No paid checkout or AI generation was run.

## Next milestone

One real inquiry received, reviewed, and followed up; one accepted Tech Rescue scope with a testable success criterion. This release improves presentation and removes blockers in the inquiry interface, but increased traffic or client hiring has not yet been measured.

## Rollback

Use Vercel’s verified prior production deployment `dpl_H2u612e5h74urMVANWTmvrddeSnE` for an immediate hosting rollback if required. Revert the refresh commit in Git for a durable source rollback; do not force-push the shared production branch. No database migration or environment replacement is part of this release.
