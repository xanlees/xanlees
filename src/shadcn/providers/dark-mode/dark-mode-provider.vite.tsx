"use client"
import { useEffect, useState } from "react";
import { DarkModeProviderProps, DarkMode } from "./types";
import { DarkModeProviderContext } from "./context";

export function ViteDarkModeProvider({
  children,
  defaultDarkMode = "system",
  storageKey = "vite-ui-theme",
  ...props
}: DarkModeProviderProps) {
  const [theme, setDarkMode] = useState<DarkMode>(() => {
    if (typeof window !== "undefined") {
      return (
        (window.localStorage.getItem(storageKey) as DarkMode) ||
        defaultDarkMode
      );
    }
    return defaultDarkMode;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");

      const activateDarkMode = () => {
        root.classList.remove("light", "dark");

        if (theme === "system") {
          const systemDarkMode = darkModePreference.matches ? "dark" : "light";
          root.classList.add(systemDarkMode);
          return;
        }

        root.classList.add(theme);
      };

      activateDarkMode();

      const darkModePreferenceListener = (e: MediaQueryListEvent) => {
        if (theme !== "system") return;

        root.classList.remove("light", "dark");
        if (e.matches) {
          const systemDarkMode = e.matches ? "dark" : "light";
          root.classList.add(systemDarkMode);
        }
      };

      darkModePreference.addEventListener("change", darkModePreferenceListener);

      return () =>
        darkModePreference.removeEventListener(
          "change",
          darkModePreferenceListener
        );
    }
  }, [theme]);

  const value = {
    theme,
    setDarkMode: (newTheme: DarkMode) => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, newTheme);
      }
      setDarkMode(newTheme);
    },
  };

  return (
    <DarkModeProviderContext.Provider {...props} value={value}>
      {children}
    </DarkModeProviderContext.Provider>
  );
}
