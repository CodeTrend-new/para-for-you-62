import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useShop } from "@/contexts/ShopContext";

type Props = { open: boolean; onClose: () => void };

export function CartDrawer({ open, onClose }: Props) {
  const { getCartProducts, updateQuantity, removeFromCart, cartTotal, cartCount } = useShop();
  const items = getCartProducts();
  const shipping = cartTotal >= 400 ? 0 : 35;
  const total = cartTotal + shipping;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-foreground/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 z-[71] h-full w-full sm:w-[440px] glass-strong shadow-elevated flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Votre panier</p>
                <h3 className="text-display text-2xl text-foreground">
                  {cartCount} article{cartCount > 1 ? "s" : ""}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-rose-soft/40 text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
                <div className="h-20 w-20 rounded-full glass flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-display text-xl text-foreground">Votre panier est vide</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Découvrez nos soins authentiques et conseils experts.
                  </p>
                </div>
                <Link
                  to="/categories"
                  onClick={onClose}
                  className="mt-2 inline-flex items-center gap-2 rounded-full gradient-button px-6 py-2.5 text-sm font-medium text-white shadow-soft hover:shadow-glow-rose transition-all"
                >
                  Explorer les produits
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                  {items.map(({ product, quantity }) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-3 p-3 rounded-2xl glass"
                    >
                      <Link
                        to="/produit/$id"
                        params={{ id: product.id }}
                        onClick={onClose}
                        className="h-20 w-20 rounded-xl overflow-hidden shrink-0"
                        style={{ background: product.gradient }}
                      >
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{product.brand}</p>
                        <Link
                          to="/produit/$id"
                          params={{ id: product.id }}
                          onClick={onClose}
                          className="text-sm text-foreground line-clamp-2 hover:text-secondary transition-colors"
                        >
                          {product.name}
                        </Link>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="inline-flex items-center rounded-full glass">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="h-7 w-7 inline-flex items-center justify-center hover:bg-rose-soft/40 rounded-full text-foreground/70"
                              aria-label="Diminuer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-xs font-medium text-foreground min-w-[20px] text-center">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="h-7 w-7 inline-flex items-center justify-center hover:bg-rose-soft/40 rounded-full text-foreground/70"
                              aria-label="Augmenter"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">{(product.price * quantity).toFixed(0)} DH</span>
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="h-7 w-7 inline-flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                              aria-label="Retirer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-foreground/5 px-6 py-5 space-y-3">
                  {shipping > 0 && (
                    <div className="text-xs text-muted-foreground glass rounded-full px-3 py-2 text-center">
                      Plus que <span className="font-semibold text-foreground">{(400 - cartTotal).toFixed(0)} DH</span> pour la livraison offerte
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="text-foreground">{cartTotal.toFixed(0)} DH</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="text-foreground">{shipping === 0 ? "Offerte" : `${shipping} DH`}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-foreground/5">
                    <span className="text-display text-lg text-foreground">Total</span>
                    <span className="text-display text-2xl text-foreground">{total.toFixed(0)} DH</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full gradient-button px-6 py-3 text-sm font-medium text-white shadow-soft hover:shadow-glow-rose transition-all"
                  >
                    Passer commande
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/panier"
                    onClick={onClose}
                    className="w-full inline-flex items-center justify-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Voir le panier complet
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function useCartDrawer() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}
