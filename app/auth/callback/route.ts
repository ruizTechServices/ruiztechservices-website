import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getSafeNext(next: string | null, origin: string): string {
  if (!next) {
    return "/";
  }
  try {
    const candidate = new URL(next, origin);
    return candidate.origin === origin ? candidate.pathname + candidate.search : "/";
  } catch {
    return "/";
  }
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const safeNext = getSafeNext(requestUrl.searchParams.get("next"), requestUrl.origin);

  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  if (error) {
    const errorUrl = new URL("/", requestUrl.origin);
    errorUrl.searchParams.set("auth_error", error);
    if (errorDescription) {
      errorUrl.searchParams.set("auth_error_description", errorDescription);
    }
    return NextResponse.redirect(errorUrl);
  }

  if (!code) {
    return NextResponse.redirect(new URL(safeNext, requestUrl.origin));
  }

  const supabase = await createSupabaseServerClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    const errorUrl = new URL("/", requestUrl.origin);
    errorUrl.searchParams.set("auth_error", exchangeError.code ?? "exchange_failed");
    errorUrl.searchParams.set("auth_error_description", exchangeError.message);
    return NextResponse.redirect(errorUrl);
  }

  return NextResponse.redirect(new URL(safeNext, requestUrl.origin));
}
