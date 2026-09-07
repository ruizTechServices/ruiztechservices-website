"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/main/Brand";
import { AccountMenu } from "@/components/main/AccountMenu";

const links = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Work" },
  { href: "/about_us", label: "Meet Gio" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="site-nav wrap">
        <Link href="/" aria-label="ruizTechServices home">
          <Brand />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link className="cta cta-small" href="/contact">
            Request help
          </Link>
          <Suspense
            fallback={
              <span className="account-placeholder" aria-hidden="true" />
            }
          >
            <AccountMenu />
          </Suspense>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="mobile-trigger"
              aria-label="Open navigation"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="px-6 py-6">
            <SheetHeader>
              <SheetTitle>
                <Brand />
              </SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile navigation" className="mobile-nav">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/tech-rescue-sprint" onClick={() => setOpen(false)}>
                Tech Rescue · $300
              </Link>
              <Link
                href="/contact"
                className="cta"
                onClick={() => setOpen(false)}
              >
                Request help
              </Link>
              <Suspense fallback={null}>
                <AccountMenu mobile onNavigate={() => setOpen(false)} />
              </Suspense>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
