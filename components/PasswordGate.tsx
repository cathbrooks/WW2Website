"use client";

import { useState, FormEvent, useEffect } from "react";

const AUTH_KEY = "ww2-auth";

function PasswordForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const correct = process.env.NEXT_PUBLIC_SITE_PASSWORD || "XYZ";
    if (password === correct) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(AUTH_KEY, "true");
      }
      setError("");
      onSuccess();
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--color-bg)]">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text)] font-sans">
            WW2: Form Factory
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Enter password to continue
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            autoFocus
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(AUTH_KEY) === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <PasswordForm onSuccess={() => setIsAuthenticated(true)} />;
  }

  return <>{children}</>;
}
