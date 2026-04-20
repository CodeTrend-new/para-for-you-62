import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const KEY = "4youpara_theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem(KEY)) as "light" | "dark" | null;
    const initial: "light" | "dark" =
      stored ??
      (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem(KEY, next);
  };

  return (
    <button
      onClick={toggle}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-rose-soft/40 transition-colors text-foreground/70 hover:text-foreground overflow-hidden"
      aria-label="Changer de thème"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 inline-flex items-center justify-center"
          >
            <Sun className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 inline-flex items-center justify-center"
          >
            <Moon className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
