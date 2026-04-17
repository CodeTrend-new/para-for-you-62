import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.cat.name ?? "Catégorie"} — 4YouPara` },
      { name: "description", content: loaderData?.cat.description ?? "" },
    ],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-display text-4xl">Catégorie introuvable</h1>
        <Link to="/categories" className="mt-6 inline-block text-secondary">Retour aux catégories</Link>
      </div>
    </SiteShell>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const [sort, setSort] = useState<"pop" | "asc" | "desc">("pop");
  const list = products.filter((p) => p.category === cat.slug);
  const sorted = [...list].sort((a, b) =>
    sort === "asc" ? a.price - b.price : sort === "desc" ? b.price - a.price : b.rating - a.rating
  );

  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <nav className="text-xs uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Accueil</Link> ·{" "}
          <Link to="/categories" className="hover:text-foreground">Catégories</Link> ·{" "}
          <span className="text-foreground">{cat.name}</span>
        </nav>

        <div className="mt-6 glass-strong rounded-3xl p-8 md:p-12 shadow-soft relative overflow-hidden">
          <div className="blob blob-rose w-80 h-80 -top-20 -right-20 animate-blob" />
          <div className="relative">
            <div className="text-display text-6xl text-foreground/30">{cat.emoji}</div>
            <h1 className="mt-3 text-display text-4xl md:text-5xl font-semibold">{cat.name}</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">{cat.description}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{list.length} produit{list.length > 1 ? "s" : ""}</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="glass rounded-full px-4 py-2 text-sm text-foreground border-none focus:ring-2 focus:ring-secondary outline-none"
          >
            <option value="pop">Tri : Popularité</option>
            <option value="asc">Prix croissant</option>
            <option value="desc">Prix décroissant</option>
          </select>
        </div>

        {sorted.length === 0 ? (
          <div className="mt-16 glass rounded-3xl p-12 text-center">
            <p className="text-muted-foreground">Aucun produit pour cette catégorie pour le moment.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {sorted.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
