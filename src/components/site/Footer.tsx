import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo-4youpara.jpeg";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">
      <div className="blob blob-rose w-[400px] h-[400px] -top-20 -left-20 animate-blob" />
      <div className="blob blob-sage w-[500px] h-[500px] -bottom-32 -right-32 animate-blob-2" />

      <div className="container mx-auto px-4 relative">
        <div className="glass-strong rounded-[2.5rem] p-8 md:p-14 shadow-elevated">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <img src={logo} alt="4YouPara" className="h-14 w-14 rounded-full object-cover ring-1 ring-rose-soft" />
                <div>
                  <div className="text-display text-2xl font-semibold">4You<span className="text-secondary">Para</span></div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Parapharmacie & Cosmétiques</div>
                </div>
              </div>
              <p className="mt-5 text-sm text-muted-foreground max-w-md leading-relaxed">
                Votre parapharmacie de confiance au Maroc. Une sélection experte de soins authentiques,
                conseillés par nos pharmaciens, livrés partout au royaume.
              </p>
              <div className="mt-6 flex gap-2">
                <a href="#" className="h-10 w-10 inline-flex items-center justify-center rounded-full glass hover:shadow-glow-rose transition-all">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="h-10 w-10 inline-flex items-center justify-center rounded-full glass hover:shadow-glow-rose transition-all">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="h-10 w-10 inline-flex items-center justify-center rounded-full glass hover:shadow-glow-rose transition-all">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-display text-lg mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/categories" className="hover:text-foreground">Catégories</Link></li>
                <li><Link to="/marques" className="hover:text-foreground">Marques</Link></li>
                <li><Link to="/promotions" className="hover:text-foreground">Promotions</Link></li>
                <li><Link to="/blog" className="hover:text-foreground">Conseils beauté</Link></li>
                <li><Link to="/a-propos" className="hover:text-foreground">À propos</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-display text-lg mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-secondary shrink-0" /> Casablanca, Maroc</li>
                <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-secondary shrink-0" /> +212 5 22 00 00 00</li>
                <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-secondary shrink-0" /> contact@4youpara.ma</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row gap-3 justify-between items-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} 4YouPara — Tous droits réservés.</p>
            <p>Livraison 24h/24 partout au Maroc · Paiement à la livraison disponible</p>
          </div>
        </div>
        <div className="h-10" />
      </div>
    </footer>
  );
}
