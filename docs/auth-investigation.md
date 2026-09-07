# Auth investigation — September 7, 2026

## Current blocker

The production site uses Supabase project `kzirwwuywztjpxrotpwz`, named `ruiztechservices-db`. A fresh provider metadata check returned `INACTIVE`; an auth settings request returned HTTP 502 with connection refused. The live Login → Continue with Google flow stays on the site and shows: “Sign-in is temporarily unavailable. You can request help without an account.” The failure occurs before Google OAuth.

The project belongs to `ruizTechServices's Org` (`lxqjmeztwpwklqnpfomj`, Free plan). The connected organization list contains only `Gio'sPrivateOrg` (`uzesytfzdxtwnskcopuk`); its project list contains the portfolio, Nucleus, and Ruiz Home Services. The prior restore request returned `Project not found`. This investigation did not repeat that failed mutation or substitute another database.

Supabase may pause Free plan projects for inactivity, but the reason and date for this project's inactive status were not available. Do not claim inactivity, billing, or Google credentials caused the pause without evidence.

## Source defect repaired

An independent executable reproduction found that `lib/supabase/middleware.ts` constructed downstream request headers before session refresh and dropped response cookies on redirects. This could forward an expired session to Server Components or discard the newly refreshed session when an admin moves from `/dashboard` to `/admin`.

The middleware now constructs the downstream response after updating request cookies and preserves response cookies, including deleted cookie chunks and cookie options, on every auth redirect. Existing route and role decisions are retained.

Five regression checks execute the actual middleware with real Next.js request/response classes and only Supabase/environment boundaries stubbed. They cover server/browser cookie synchronization, admin redirect, admin denial, invalid-session cleanup, and public-route independence. The existing contact tests remain included in `npm test`.

## What remains unverified

- Google provider enablement and OAuth credentials in the inactive project.
- Supabase Site URL and redirect allowlist for `https://www.ruiztechservices.com/auth/callback`.
- A real sign-in, session refresh, and admin access against the restored project.
- Database RLS and successful inquiry delivery against the restored project.

The callback source uses the Supabase SSR code exchange and restricts return paths to the same origin. A source review is not proof that the remote provider configuration matches it.

The existing UI also hides the login modal when a user is already signed in, and role lookup errors can be treated as “not admin.” These are follow-up diagnostics after backend restoration, not the cause of the observed pre-Google failure.

## Required recovery

1. Open the existing project in `ruizTechServices's Org` using an account with access, and resume/restore it.
2. Connect Supabase here with access to that organization.
3. Confirm auth health, Google provider settings, and the production callback allowlist.
4. Complete an authorized Google sign-in and verify the resulting account/admin session. Do not share passwords, verification codes, or secrets in chat.

## Validation commands

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Use the configured application environment for a full build. The regression checks make no live Supabase or OAuth requests and cannot prove successful production authentication while the project is inactive.

References: [Supabase SSR cookie guidance](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs), [Supabase availability guidance](https://supabase.com/docs/guides/deployment/going-into-prod#availability).
