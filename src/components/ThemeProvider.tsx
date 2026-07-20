import { createContext, useContext, useEffect, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type Theme = "dark" | "light";

type ThemeContextType = [
  Theme | undefined,
  Dispatch<SetStateAction<Theme | undefined>>
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getPreferredTheme = () => "dark" as const;

const THEME_STORAGE_KEY = "jsonhero-theme";

export function ThemeProvider({
  children,
  specifiedTheme,
  themeOverride,
}: {
  children: ReactNode;
  specifiedTheme?: Theme;
  themeOverride?: Theme;
}) {
  const [theme, setTheme] = useState<Theme | undefined>(() => {
    if (specifiedTheme) {
      if (specifiedTheme === "light" || specifiedTheme === "dark") {
        return specifiedTheme;
      } else {
        return;
      }
    }

    // there's no way for us to know what the theme should be in this context
    // the client will have to figure it out before hydration.
    if (typeof window !== "object") {
      return;
    }

    // Try localStorage first, then fall back to preferred theme
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }

    return getPreferredTheme();
  });

  useEffect(() => {
    if (!theme) {
      return;
    }

    const cl = document.documentElement.classList;
    cl.toggle("dark", theme === "dark");
    cl.toggle("light", theme === "light");
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={[themeOverride ?? theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && ["light", "dark"].includes(value);
}
