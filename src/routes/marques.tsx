import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { brands } from "@/data/products";

export const Route = createFileRoute("/marques")({
  head: () => ({
    meta: [
      { title: "Marques — 4YouPara" },
      { name: "description", content: "Découvrez les marques expertes sélectionnées par 4YouPara." },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12 relative">
        <div className="blob blob-rose w-[400px] h-[400px] -top-10 -right-10 animate-blob" />
        <div className="text-center max-w-2xl mx-auto relative">
          <span className="text-xs uppercase tracking-[0.3em] text-secondary">Sélection experte</span>
          <h1 className="mt-3 text-display text-5xl md:text-6xl font-semibold">Nos marques de confiance</h1>
          <p className="mt-4 text-muted-foreground">
            Chaque marque est choisie pour son expertise, son authenticité et son engagement qualité.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {brands.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="glass rounded-3xl aspect-[4/3] flex items-center justify-center text-center p-6 hover:shadow-elevated hover:-translate-y-1 transition-all"
            >
              <span className="text-display text-2xl text-foreground">{b}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
