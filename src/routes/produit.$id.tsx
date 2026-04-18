import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/produit/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Produit"} — 4YouPara` },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:title", content: loaderData?.product.name ?? "" },
      { property: "og:description", content: loaderData?.product.description ?? "" },
    ],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-display text-4xl">Produit introuvable</h1>
        <Link to="/categories" className="mt-6 inline-block text-secondary">Voir les catégories</Link>
      </div>
    </SiteShell>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <Link to="/categories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Link>

        <div className="mt-6 grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square rounded-[2rem] overflow-hidden shadow-elevated"
            style={{ background: product.gradient }}
          >
            <img
              src={product.image}
              alt={product.name}
              width={1200}
              height={1200}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-5 left-5 glass-strong rounded-full px-4 py-1.5 text-xs uppercase tracking-wider text-foreground">
                {product.badge}
              </span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-secondary">{product.brand}</p>
            <h1 className="mt-2 text-display text-4xl md:text-5xl font-semibold leading-tight">{product.name}</h1>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">· {product.reviews} avis vérifiés</span>
            </div>

            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="text-display text-4xl font-semibold">{product.price} <span className="text-xl">DH</span></span>
              {product.oldPrice && <span className="text-lg text-muted-foreground line-through">{product.oldPrice} DH</span>}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 gradient-button text-white rounded-full px-7 py-3.5 text-sm font-medium shadow-soft hover:shadow-glow-rose transition-all">
                <ShoppingBag className="h-4 w-4" /> Ajouter au panier
              </button>
              <button className="inline-flex items-center gap-2 glass-strong rounded-full px-5 py-3.5 text-sm font-medium hover:bg-rose-soft/40 transition-all">
                <Heart className="h-4 w-4 text-secondary" /> Favori
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="glass rounded-2xl p-4 flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Livraison 24h</div>
                  <div className="text-xs text-muted-foreground">Partout au Maroc</div>
                </div>
              </div>
              <div className="glass rounded-2xl p-4 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">100% authentique</div>
                  <div className="text-xs text-muted-foreground">Conseil pharmacien</div>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-5">
              <Detail title="Composition" content={product.ingredients} />
              <Detail title="Mode d'emploi" content={product.usage} />
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="text-display text-3xl mb-8">Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </SiteShell>
  );
}

function Detail({ title, content }: { title: string; content: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="text-display text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
    </div>
  );
}
