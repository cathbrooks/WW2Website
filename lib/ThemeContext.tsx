"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { ThemeId } from "./themes";

interface ThemeContextValue {
  themeId: ThemeId;
  isDark: boolean;
  setTheme: (id: ThemeId) => void;
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_KEY = "ww2-theme";
const MODE_KEY = "ww2-mode";
const VALID_THEMES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>("1");
  const [isDark, setIsDark] = useState(false);

  // Restore persisted theme and mode on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedTheme = localStorage.getItem(THEME_KEY) as ThemeId | null;
    if (storedTheme && VALID_THEMES.includes(storedTheme)) {
      setThemeIdState(storedTheme);
    }
    if (localStorage.getItem(MODE_KEY) === "dark") {
      setIsDark(true);
    }
  }, []);

  // Keep data-theme and data-mode on <html> in sync
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", themeId);
    if (isDark) {
      document.documentElement.setAttribute("data-mode", "dark");
    } else {
      document.documentElement.removeAttribute("data-mode");
    }
  }, [themeId, isDark]);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeIdState(id);
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_KEY, id);
    }
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem(MODE_KEY, next ? "dark" : "light");
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ themeId, isDark, setTheme, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
