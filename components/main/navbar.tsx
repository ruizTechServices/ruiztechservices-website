// components/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/main/LoginButton";
import { LoginModal } from "@/components/main/LoginModal";
import { handleLoginClick } from "@/lib/auth/handlers";
import { signInWithGoogleOAuth, signOut } from "@/lib/auth/oauth";
import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
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

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("[Auth] Sign out error:", error);
    }
  };

  return (
    <NavigationMenu className="w-full bg-white border-b">
      <NavigationMenuList className="flex justify-around p-4">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/about_us">About Us</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/contact">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/projects">Projects</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/pricing">Pricing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          {loading ? (
            <Button variant="outline" disabled>
              Loading...
            </Button>
          ) : user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{user.email}</span>
              <Button variant="outline" onClick={handleSignOut}>
                Logout
              </Button>
            </div>
          ) : (
            <LoginButton onClick={() => handleLoginClick(() => setIsLoginModalOpen(true))} />
          )}
        </NavigationMenuItem>
      </NavigationMenuList>

      {!user && (
        <LoginModal
          open={isLoginModalOpen}
          onOpenChange={setIsLoginModalOpen}
          onGoogleSignIn={() => {
            const nextFromParams = searchParams.get("next");
            const cleanParams = new URLSearchParams(searchParams.toString());
            cleanParams.delete("auth_error");
            cleanParams.delete("auth_error_description");
            cleanParams.delete("next");
            const cleanSearch = cleanParams.toString();
            const currentPath = `${pathname}${cleanSearch ? '?' + cleanSearch : ''}`;
            const next = nextFromParams || currentPath;
            return signInWithGoogleOAuth(next);
          }}
          initialError={authError}
        />
      )}
    </NavigationMenu>
  );
}
