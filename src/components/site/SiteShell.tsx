import { type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Decorative background layer */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Soft gradient base */}
        <div className="absolute inset-0 gradient-soft" />

        {/* Subtle dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.62 0.055 145 / 0.18) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          }}
        />

        {/* Floating blobs */}
        <div className="blob blob-rose animate-blob h-[420px] w-[420px] -left-32 -top-24" />
        <div className="blob blob-sage animate-blob-2 h-[520px] w-[520px] -right-40 top-[30%]" />
        <div className="blob blob-rose animate-blob h-[380px] w-[380px] left-[20%] bottom-[-120px] opacity-40" />

        {/* Top & bottom soft fades for depth */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cream/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-rose-soft/40 to-transparent" />
      </div>

      <Header />
      <main className="relative pt-28 md:pt-32">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
