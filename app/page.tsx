"use client";

import { useState, useEffect } from "react";
import { PasswordGate } from "@/components/PasswordGate";
import { ThemeProvider } from "@/lib/ThemeContext";
import { MainLayout } from "@/components/MainLayout";

function AppContent() {
  return (
    <div>
      <MainLayout />
    </div>
  );
}

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <p className="text-[var(--color-text-muted)]">Loading...</p>
      </div>
    );
  }

  return (
    <PasswordGate>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </PasswordGate>
  );
}
