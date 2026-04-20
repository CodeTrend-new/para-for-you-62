import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { useShop } from "@/contexts/ShopContext";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Mon panier — 4YouPara" },
      { name: "description", content: "Consultez et finalisez votre panier 4YouPara." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { getCartProducts, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useShop();
  const items = getCartProducts();
  const shipping = cartTotal > 500 || cartTotal === 0 ? 0 : 35;

  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <nav className="text-xs uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Accueil</Link> · <span className="text-foreground">Panier</span>
        </nav>

        <h1 className="mt-6 text-display text-4xl md:text-5xl font-semibold">Mon panier</h1>
        <p className="mt-2 text-muted-foreground">{cartCount} article{cartCount > 1 ? "s" : ""}</p>

        {items.length === 0 ? (
          <div className="mt-12 glass-strong rounded-3xl p-12 text-center max-w-xl mx-auto">
            <div className="h-16 w-16 mx-auto rounded-full glass inline-flex items-center justify-center">
              <ShoppingBag className="h-7 w-7 text-secondary" />
            </div>
            <h2 className="mt-4 text-display text-2xl">Votre panier est vide</h2>
            <p className="mt-2 text-sm text-muted-foreground">Découvrez nos sélections expertes pour prendre soin de vous.</p>
            <Link
              to="/categories"
              className="mt-6 inline-flex items-center gap-2 gradient-button text-white rounded-full px-6 py-3 text-sm font-medium shadow-soft hover:shadow-glow-rose transition-all"
            >
              Explorer les soins <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-8">
            <div className="space-y-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="glass rounded-3xl p-4 flex gap-4 items-center">
                  <Link
                    to="/produit/$id"
                    params={{ id: product.id }}
                    className="h-24 w-24 shrink-0 rounded-2xl overflow-hidden"
                    style={{ background: product.gradient }}
                  >
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{product.brand}</p>
                    <Link to="/produit/$id" params={{ id: product.id }} className="text-display text-base text-foreground line-clamp-1 hover:text-secondary">
                      {product.name}
                    </Link>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="inline-flex items-center glass rounded-full">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="h-8 w-8 inline-flex items-center justify-center text-foreground/70 hover:text-foreground"
                          aria-label="Diminuer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-2 text-sm font-medium text-foreground min-w-6 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="h-8 w-8 inline-flex items-center justify-center text-foreground/70 hover:text-foreground"
                          aria-label="Augmenter"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-display text-lg font-semibold text-foreground">{product.price * quantity} DH</div>
                    {quantity > 1 && (
                      <div className="text-[11px] text-muted-foreground">{product.price} DH × {quantity}</div>
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors mt-2"
              >
                Vider le panier
              </button>
            </div>

            <aside className="glass-strong rounded-3xl p-6 h-fit lg:sticky lg:top-28 shadow-soft">
              <h2 className="text-display text-xl">Récapitulatif</h2>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-foreground/80">
                  <span>Sous-total</span>
                  <span>{cartTotal} DH</span>
                </div>
                <div className="flex justify-between text-foreground/80">
                  <span>Livraison</span>
                  <span>{shipping === 0 ? "Offerte" : `${shipping} DH`}</span>
                </div>
                {cartTotal > 0 && cartTotal < 500 && (
                  <p className="text-xs text-muted-foreground">Plus que <strong className="text-secondary">{500 - cartTotal} DH</strong> pour la livraison offerte.</p>
                )}
                <div className="h-px bg-foreground/10 my-2" />
                <div className="flex justify-between text-display text-xl font-semibold text-foreground">
                  <span>Total</span>
                  <span>{cartTotal + shipping} DH</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="mt-6 w-full gradient-button text-white rounded-full py-3 text-sm font-medium shadow-soft hover:shadow-glow-rose transition-all inline-flex items-center justify-center gap-2"
              >
                Passer commande <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/categories" className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground">
                Continuer mes achats
              </Link>
            </aside>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
