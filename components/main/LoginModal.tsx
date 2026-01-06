// components/main/LoginModal.tsx
"use client";

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
}

export function LoginModal({ open, onOpenChange, onGoogleSignIn }: LoginModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Sign in to your ruizTechServices account.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Button className="w-full" onClick={onGoogleSignIn}>
            Continue with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
