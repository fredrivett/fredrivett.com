import React, { useEffect, useState } from "react";

import { Sun, Moon, SunMoon } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

import Tooltip from "./Tooltip";

type Theme = "light" | "dark" | "auto";

const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "auto");
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "light") {
      // Force light mode by removing dark class and adding style override
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    } else if (theme === "dark") {
      // Force dark mode
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      // Auto mode - use system preference and remove override
      root.style.colorScheme = "";
      const darkSystemPref = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (darkSystemPref) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    let nextTheme: Theme;

    if (theme === "auto") {
      nextTheme = "light";
    } else if (theme === "light") {
      nextTheme = "dark";
    } else {
      nextTheme = "auto";
    }

    setTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <button className="flex items-center px-3 py-2 cursor-pointer opacity-70">
        <SunMoon size={20} />
      </button>
    );
  }

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun size={20} />;
      case "dark":
        return <Moon size={20} />;
      default:
        return <SunMoon size={20} />;
    }
  };

  const getTooltipContent = () => {
    if (theme === "light") return "Light";
    if (theme === "dark") return "Dark";
    return "Auto";
  };

  return (
    <Tooltip content={getTooltipContent()} className="flex">
      <button
        onClick={toggleTheme}
        className="flex items-center text-blue-300 hover:text-blue-500 dark:text-blue-700 dark:hover:text-blue-500 px-3 py-2 cursor-pointer opacity-70 hover:opacity-100 focus:opacity-100 dark:bg-gray-950"
      >
        {getIcon()}
      </button>
    </Tooltip>
  );
};

export default ThemeToggle;
