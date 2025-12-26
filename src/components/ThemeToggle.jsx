import React, { useEffect } from "react";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const ThemeToggle = ({ className }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    const storeTheme = localStorage.getItem("theme");
    if (storeTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "rounded-full transition duration-300 cursor-pointer",
        "focus:outline-hidden",
        className
      )}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-[rgb(255,222,172)]" />
      ) : (
        <Moon className="h-6 w-6 text-primary" />
      )}
    </button>
  );
};

export default ThemeToggle;
