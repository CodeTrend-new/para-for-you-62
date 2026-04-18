import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { useShop } from "@/contexts/ShopContext";

export const Route = createFileRoute("/favoris")({
  head: () => ({
    meta: [
      { title: "Mes favoris — 4YouPara" },
      { name: "description", content: "Retrouvez vos produits favoris 4YouPara." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { getFavoriteProducts } = useShop();
  const items = getFavoriteProducts();

  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <nav className="text-xs uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Accueil</Link> · <span className="text-foreground">Favoris</span>
        </nav>

        <h1 className="mt-6 text-display text-4xl md:text-5xl font-semibold">Mes favoris</h1>
        <p className="mt-2 text-muted-foreground">{items.length} produit{items.length > 1 ? "s" : ""}</p>

        {items.length === 0 ? (
          <div className="mt-12 glass-strong rounded-3xl p-12 text-center max-w-xl mx-auto">
            <div className="h-16 w-16 mx-auto rounded-full glass inline-flex items-center justify-center">
              <Heart className="h-7 w-7 text-secondary" />
            </div>
            <h2 className="mt-4 text-display text-2xl">Aucun favori pour l'instant</h2>
            <p className="mt-2 text-sm text-muted-foreground">Ajoutez des produits que vous aimez en cliquant sur le cœur.</p>
            <Link
              to="/categories"
              className="mt-6 inline-flex items-center gap-2 gradient-button text-white rounded-full px-6 py-3 text-sm font-medium shadow-soft hover:shadow-glow-rose transition-all"
            >
              Découvrir les soins <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
