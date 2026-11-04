"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { env } from "@/lib/env";

export async function signInWithGoogleOAuth(next?: string) {
  // Avoid redirecting a visitor into an unavailable auth provider.
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings`,
      {
        headers: { apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!response.ok) throw new Error("unavailable");
    const settings = await response.json();
    if (settings?.external?.google !== true) throw new Error("unavailable");
  } catch {
    throw new Error(
      "Sign-in is temporarily unavailable. You can request help without an account.",
    );
  }
  const supabase = createSupabaseBrowserClient();

  let redirectTo: string | undefined;
  if (typeof window !== "undefined") {
    const callbackUrl = new URL("/auth/callback", window.location.origin);
    if (next) {
      callbackUrl.searchParams.set("next", next);
    }
    redirectTo = callbackUrl.toString();
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: redirectTo ? { redirectTo } : undefined,
  });

  if (error) {
    throw error;
  }
}

export async function signOut() {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
  window.location.reload();
}
