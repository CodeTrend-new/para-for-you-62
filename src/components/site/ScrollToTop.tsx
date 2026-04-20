import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrolled > 400);
      setProgress(height > 0 ? Math.min(1, scrolled / height) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const r = 22;
  const c = 2 * Math.PI * r;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", damping: 18, stiffness: 260 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full glass-strong shadow-elevated inline-flex items-center justify-center text-foreground hover:text-secondary transition-colors group"
          aria-label="Retour en haut"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r={r} fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/10" />
            <circle
              cx="25"
              cy="25"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - progress)}
              className="text-secondary transition-[stroke-dashoffset] duration-150"
            />
          </svg>
          <ArrowUp className="h-4 w-4 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
