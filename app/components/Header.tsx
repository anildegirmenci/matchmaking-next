"use client";

import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const themeContext = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!themeContext) return null;
  const { theme, toggleTheme } = themeContext;

  return (
    <header className="flex justify-between items-center p-4 bg-secondary text-white">
      {/* Logo Section */}
      <div className="flex items-center">
        <Image src="/legit.png" alt="Logo" width={50} height={50} className="mr-2" />
        <h1 className="text-xl font-bold">1egit Gaming 5v5 Match Making App</h1>
      </div>

      {/* Theme Toggle Button */}
      {mounted && (
        <button
          onClick={toggleTheme}
          className="p-2 bg-tertiary rounded-lg transition-all hover:scale-105"
        >
          {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
        </button>
      )}
    </header>
  );
};

export default Header;
