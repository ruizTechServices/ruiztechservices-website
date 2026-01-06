// components/navbar.tsx
"use client";

import { useState } from "react";
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
  const { user, loading } = useAuth();

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
          onGoogleSignIn={signInWithGoogleOAuth}
        />
      )}
    </NavigationMenu>
  );
}
