import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware only refreshes sessions; authorization is enforced via Supabase RLS.
 * UX gating below redirects unauthenticated users for a smoother experience,
 * but actual data security must be handled by RLS policies in Supabase.
 */

type CookieToSet = {
  name: string;
  value: string;
  options?: Record<string, unknown>;
};

const PROTECTED_PREFIXES = ["/dashboard", "/admin"];
const ADMIN_PREFIXES = ["/admin"];
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "giosterr44@gmail.com").toLowerCase();

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isAdminPath(pathname: string): boolean {
  return ADMIN_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function createErrorRedirect(
  origin: string,
  error: string,
  description: string,
  next?: string
): NextResponse {
  const redirectUrl = new URL("/", origin);
  redirectUrl.searchParams.set("auth_error", error);
  redirectUrl.searchParams.set("auth_error_description", description);
  if (next) {
    redirectUrl.searchParams.set("next", next);
  }
  return NextResponse.redirect(redirectUrl);
}

export async function updateSupabaseSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach((cookie) => {
          request.cookies.set(cookie.name, cookie.value);
          response.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof response.cookies.set>[2]);
        });
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const fullPath = pathname + request.nextUrl.search;

  if (isProtectedPath(pathname)) {
    if (!user) {
      return createErrorRedirect(
        request.nextUrl.origin,
        "login_required",
        "Please sign in",
        fullPath
      );
    }

    if (isAdminPath(pathname)) {
      const userEmail = user.email?.toLowerCase();
      if (userEmail !== ADMIN_EMAIL) {
        return createErrorRedirect(
          request.nextUrl.origin,
          "forbidden",
          "Admin access only"
        );
      }
    }
  }

  return response;
}
