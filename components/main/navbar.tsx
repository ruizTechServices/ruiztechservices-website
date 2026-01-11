// components/navbar.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/main/LoginButton";
import { LoginModal } from "@/components/main/LoginModal";
import { handleLoginClick } from "@/lib/auth/handlers";
import { signInWithGoogleOAuth, signOut } from "@/lib/auth/oauth";
import { useAuth } from "@/hooks/use-auth";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { BalanceBadge } from "@/components/sections/BalanceBadge";


const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about_us", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/projects", label: "Projects" },
  { href: "/chat", label: "AI Chat" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const AuthControls = ({ mobile = false }: { mobile?: boolean }) => {
    if (loading) {
      return (
        <Button variant="outline" disabled className={mobile ? "w-full" : ""}>
          Loading...
        </Button>
      );
    }

    if (user) {
      return (
        <div className={`flex ${mobile ? "flex-col gap-3 w-full" : "items-center gap-2"}`}>
          {!mobile && <BalanceBadge />}
          <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px] min-w-0">
            {user.email}
          </span>
          {checkingRole ? (
            <Button variant="outline" disabled className={mobile ? "w-full" : ""}>
              Checking...
            </Button>
          ) : isAdmin ? (
            <Button asChild variant="outline" className={mobile ? "w-full" : ""}>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" className={mobile ? "w-full" : ""}>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
            </Button>
          )}
          <Button variant="outline" onClick={handleSignOut} className={mobile ? "w-full" : ""}>
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
    <nav className="w-full bg-white dark:bg-gray-900 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link href="/" className="font-bold text-lg text-gray-900 dark:text-white">
            ruizTechServices
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex items-center gap-1">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <AuthControls />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu Trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-4 mt-2">
                  <AuthControls mobile />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

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
    </nav>
  );
}
