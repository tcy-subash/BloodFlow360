import { createContext, useContext, useState, useMemo, useEffect } from "react";
import type { ReactNode } from "react";

type ColorMode = "light" | "dark";

interface ColorModeContextType {
  mode: ColorMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ColorMode>(() => {
    const saved = localStorage.getItem("color-mode");
    return (saved === "light" || saved === "dark") ? saved : "light";
  });

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("color-mode", next);
      return next;
    });
  };

  const value = useMemo(() => ({ mode, toggleColorMode }), [mode]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
}
