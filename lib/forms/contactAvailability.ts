import "server-only";
import { env } from "@/lib/env";

// Availability affects presentation only. Every submission still validates and
// handles insert failures. No private inbox data is read for this health check.
export async function isContactBackendAvailable(): Promise<boolean> {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings`,
      {
        headers: { apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY },
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(2000),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
}
