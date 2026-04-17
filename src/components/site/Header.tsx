import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Search, Heart } from "lucide-react";
import logo from "@/assets/logo-4youpara.jpeg";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/categories", label: "Catégories" },
  { to: "/marques", label: "Marques" },
  { to: "/promotions", label: "Promotions" },
  { to: "/blog", label: "Conseils" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`glass-strong rounded-full flex items-center justify-between px-4 md:px-6 py-2.5 transition-all duration-500 ${
            scrolled ? "shadow-elevated" : "shadow-soft"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <img
              src={logo}
              alt="4YouPara"
              className="h-10 w-10 md:h-11 md:w-11 rounded-full object-cover ring-1 ring-rose-soft transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-display text-lg font-semibold tracking-wide text-foreground">
                4You<span className="text-secondary">Para</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Parapharmacie & Cosmétiques
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="relative px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground transition-colors rounded-full"
                activeProps={{ className: "text-foreground bg-rose-soft/50" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-rose-soft/40 transition-colors text-foreground/70 hover:text-foreground" aria-label="Recherche">
              <Search className="h-4 w-4" />
            </button>
            <button className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-rose-soft/40 transition-colors text-foreground/70 hover:text-foreground" aria-label="Favoris">
              <Heart className="h-4 w-4" />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-rose-soft/40 text-foreground"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass-strong rounded-3xl p-3 shadow-elevated animate-in fade-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-2xl text-sm text-foreground/85 hover:bg-rose-soft/40"
                  activeProps={{ className: "bg-rose-soft/60 text-foreground" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
