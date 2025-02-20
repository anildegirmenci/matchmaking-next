"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check if a theme is already stored
    let savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;

    if (!savedTheme) {
      // If no saved theme, detect system preference
      savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    setTheme(savedTheme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(savedTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.replace(theme, newTheme);
  };

  // Prevent flashing issue
  if (!mounted) return <div className="opacity-0">{children}</div>;

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
