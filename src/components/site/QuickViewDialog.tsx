import { Link } from "@tanstack/react-router";
import { Star, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useShop } from "@/contexts/ShopContext";
import type { Product } from "@/data/products";

const badgeStyles: Record<string, string> = {
  "Nouveau": "bg-sage-soft text-primary",
  "Best-seller": "gradient-button text-white",
  "Promo": "bg-secondary text-secondary-foreground",
  "Bio": "bg-primary text-primary-foreground",
};

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { addToCart, toggleFavorite, isFavorite } = useShop();

  if (!product) return null;
  const fav = isFavorite(product.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden glass-strong border-none rounded-3xl">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <DialogDescription className="sr-only">{product.description}</DialogDescription>
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto" style={{ background: product.gradient }}>
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {product.badge && (
              <span className={`absolute top-4 left-4 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-medium ${badgeStyles[product.badge]}`}>
                {product.badge}
              </span>
            )}
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{product.brand}</p>
            <h2 className="mt-1 text-display text-2xl md:text-3xl text-foreground leading-tight">{product.name}</h2>

            <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span className="font-medium text-foreground">{product.rating}</span>
              <span>· {product.reviews} avis</span>
            </div>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-4">
              {product.description}
            </p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-display text-3xl font-semibold text-foreground">{product.price} <span className="text-base">DH</span></span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">{product.oldPrice} DH</span>
              )}
            </div>

            <div className="mt-auto pt-6 flex flex-col gap-2">
              <button
                onClick={() => addToCart(product.id)}
                className="w-full inline-flex items-center justify-center gap-2 gradient-button text-white rounded-full px-6 py-3 text-sm font-medium shadow-soft hover:shadow-glow-rose transition-all"
              >
                <ShoppingBag className="h-4 w-4" />
                Ajouter au panier
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all glass ${fav ? "text-secondary" : "text-foreground/80"}`}
                >
                  <Heart className={`h-4 w-4 ${fav ? "fill-secondary text-secondary" : ""}`} />
                  {fav ? "Aimé" : "Favoris"}
                </button>
                <Link
                  to="/produit/$id"
                  params={{ id: product.id }}
                  onClick={() => onOpenChange(false)}
                  className="inline-flex items-center justify-center gap-1 glass rounded-full px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground"
                >
                  Détails <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
