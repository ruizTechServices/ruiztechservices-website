// components/main/LoginModal.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoogleSignIn: () => Promise<void>;
  initialError?: string | null;
}

export function LoginModal({ open, onOpenChange, onGoogleSignIn, initialError }: LoginModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialError) {
      setError(initialError);
    }
  }, [initialError]);

  useEffect(() => {
    if (!open) {
      setError(null);
      setLoading(false);
    }
  }, [open]);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await onGoogleSignIn();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign in failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Sign in to your ruizTechServices account.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <Button className="w-full" onClick={handleSignIn} disabled={loading}>
            {loading ? "Redirecting…" : "Continue with Google"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
