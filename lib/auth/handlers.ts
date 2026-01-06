// lib/auth/handlers.ts
// Authentication-related handler functions

/**
 * Handles the login button click event.
 * Logs to console and triggers the modal open callback.
 */
export function handleLoginClick(openModal: () => void): void {
  console.log("[Auth] Login button clicked");
  openModal();
}
    