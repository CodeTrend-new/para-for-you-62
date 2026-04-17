import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/promotions")({
  head: () => ({
    meta: [
      { title: "Promotions — 4YouPara" },
      { name: "description", content: "Profitez des meilleures promotions sur vos soins favoris." },
    ],
  }),
  component: PromosPage,
});

function PromosPage() {
  const promos = products.filter((p) => p.oldPrice);
  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <div className="glass-strong rounded-3xl p-10 md:p-14 text-center relative overflow-hidden shadow-elevated">
          <div className="blob blob-rose w-[400px] h-[400px] -top-20 -right-20 animate-blob" />
          <div className="relative">
            <span className="text-xs uppercase tracking-[0.3em] text-secondary">Offres limitées</span>
            <h1 className="mt-3 text-display text-5xl md:text-6xl font-semibold">
              Promotions <span className="shimmer-text">exclusives</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Une sélection de soins experts à prix doux. Stock limité, jusqu'à dimanche minuit.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {promos.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </SiteShell>
  );
}
