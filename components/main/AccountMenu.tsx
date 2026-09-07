// components/navbar.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/main/LoginButton";
import { LoginModal } from "@/components/main/LoginModal";
import { handleLoginClick } from "@/lib/auth/handlers";
import { signInWithGoogleOAuth, signOut } from "@/lib/auth/oauth";
import { useAuth } from "@/hooks/use-auth";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AccountMenu({
  onNavigate,
  mobile = false,
}: {
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(false);
  const { user, loading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const error = searchParams.get("auth_error");
    const errorDescription = searchParams.get("auth_error_description");

    if (error) {
      const message = errorDescription || error;
      setAuthError(message);
      setIsLoginModalOpen(true);

      const url = new URL(window.location.href);
      url.searchParams.delete("auth_error");
      url.searchParams.delete("auth_error_description");
      router.replace(url.pathname + url.search, { scroll: false });
    }
  }, [searchParams, router]);

  const checkAdminRole = useCallback(async (userId: string) => {
    setCheckingRole(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data } = await supabase
        .from("admins")
        .select("user_id")
        .eq("user_id", userId)
        .maybeSingle();
      setIsAdmin(!!data);
    } catch (err) {
      console.error("[Navbar] Error checking admin role:", err);
      setIsAdmin(false);
    } finally {
      setCheckingRole(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    checkAdminRole(user.id);
  }, [user, checkAdminRole]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("[Auth] Sign out error:", error);
    }
  };

  const renderAuthControls = (mobile: boolean) => {
    if (loading) {
      return (
        <Button variant="outline" disabled className={mobile ? "w-full" : ""}>
          Loading...
        </Button>
      );
    }

    if (user) {
      return (
        <div
          className={`flex ${mobile ? "flex-col gap-3 w-full" : "items-center gap-2"}`}
        >
          <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px] min-w-0">
            {user.email}
          </span>
          {checkingRole ? (
            <Button
              variant="outline"
              disabled
              className={mobile ? "w-full" : ""}
            >
              Checking...
            </Button>
          ) : isAdmin ? (
            <Button
              asChild
              variant="outline"
              className={mobile ? "w-full" : ""}
            >
              <Link href="/admin" onClick={onNavigate}>
                Admin
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              className={mobile ? "w-full" : ""}
            >
              <Link href="/dashboard" onClick={onNavigate}>
                Dashboard
              </Link>
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleSignOut}
            className={mobile ? "w-full" : ""}
          >
            Logout
          </Button>
        </div>
      );
    }

    return (
      <div className={mobile ? "w-full" : ""}>
        <LoginButton
          onClick={() => handleLoginClick(() => setIsLoginModalOpen(true))}
        />
      </div>
    );
  };

  return (
    <>
      {renderAuthControls(mobile)}
      {!user && (
        <LoginModal
          open={isLoginModalOpen}
          onOpenChange={setIsLoginModalOpen}
          onGoogleSignIn={() => {
            const nextFromParams = searchParams.get("next");
            return signInWithGoogleOAuth(nextFromParams || pathname);
          }}
          initialError={authError}
        />
      )}
    </>
  );
}
