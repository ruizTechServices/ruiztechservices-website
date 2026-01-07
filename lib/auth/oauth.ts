"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export async function signInWithGoogleOAuth(next?: string) {
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
}
