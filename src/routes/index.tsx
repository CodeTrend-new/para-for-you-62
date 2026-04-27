// 4YouPara — homepage (rebuild)
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Sparkles, Truck, ShieldCheck, HeartHandshake, Leaf } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { CollectionShowcase } from "@/components/site/CollectionShowcase";
import { categories, products, blogPosts, brands } from "@/data/products";
import logo from "@/assets/logo-4youpara.jpeg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import kbeautyImg from "@/assets/kbeauty-hero.jpg";
import solaireImg from "@/assets/collection-solaire.jpg";

const heroSlides = [hero1, hero2, hero3, hero4];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "4YouPara — Parapharmacie & Cosmétiques en ligne au Maroc" },
      { name: "description", content: "Découvrez 4YouPara : sélection experte de soins visage, corps, cheveux, bébé et compléments. Livraison partout au Maroc." },
      { property: "og:title", content: "4YouPara — Parapharmacie & Cosmétiques" },
      { property: "og:description", content: "Soins authentiques et conseils experts. Livraison partout au Maroc." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = products.slice(0, 8);
  const promos = products.filter((p) => p.oldPrice).slice(0, 3);
  const kbeautyProducts = products.filter((p) => p.category === "visage").slice(0, 8);
  const solaireProducts = products.filter((p) => p.category === "solaire").slice(0, 8);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <SiteShell>
      {/* HERO */}
      <section ref={heroRef} className="relative">
        <div className="blob blob-rose w-[520px] h-[520px] -top-20 -right-32 animate-blob" />
        <div className="blob blob-sage w-[460px] h-[460px] top-40 -left-40 animate-blob-2" />

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[78vh] py-10">
            <motion.div
              style={{ y: heroTextY, opacity: heroOpacity }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/80">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />
                Nouveau · Édition Printemps 2026
              </span>
              <h1 className="mt-6 text-display text-5xl md:text-7xl leading-[0.95] font-semibold text-foreground">
                La beauté, <br />
                <span className="shimmer-text">naturellement experte.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                Une parapharmacie pensée comme un rituel. Des soins authentiques sélectionnés
                par nos pharmaciens, livrés avec délicatesse partout au Maroc.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/categories"
                  className="group inline-flex items-center gap-2 gradient-button text-white rounded-full px-7 py-3.5 text-sm font-medium shadow-soft hover:shadow-glow-rose transition-all"
                >
                  Découvrir les soins
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 glass-strong rounded-full px-7 py-3.5 text-sm font-medium text-foreground hover:bg-rose-soft/40 transition-all"
                >
                  Conseils d'experts
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6">
                {[
                  { v: "120+", l: "Marques" },
                  { v: "24h", l: "Livraison" },
                  { v: "5★", l: "Conseils" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-display text-3xl font-semibold text-foreground">{s.v}</div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              style={{ y: heroImageY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-xl mx-auto">
                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-elevated">
                  <AnimatePresence mode="sync">
                    <motion.img
                      key={slide}
                      src={heroSlides[slide]}
                      alt="Soins beauté 4YouPara"
                      className="absolute inset-0 w-full h-full object-cover"
                      width={1920}
                      height={900}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 1.1, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                  {/* slide indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Slide ${i + 1}`}
                        onClick={() => setSlide(i)}
                        className={`h-1.5 rounded-full transition-all ${i === slide ? "w-8 bg-white" : "w-3 bg-white/50"}`}
                      />
                    ))}
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -left-6 glass-strong rounded-full p-4 shadow-soft"
                >
                  <img src={logo} alt="" className="h-16 w-16 rounded-full object-cover" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 14, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -right-2 glass-strong rounded-3xl px-5 py-4 shadow-soft max-w-[200px]"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                    <Leaf className="h-3.5 w-3.5 text-primary" /> Bio · Authentique
                  </div>
                  <div className="mt-1 text-display text-base text-foreground leading-tight">
                    Sélection vérifiée par nos pharmaciens
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-10 -right-4 glass-strong rounded-2xl px-4 py-2.5 shadow-soft"
                >
                  <div className="text-display text-2xl text-foreground">-30%</div>
                  <div className="text-[10px] uppercase tracking-wider text-secondary">Promo du moment</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MARQUES MARQUEE */}
      <section className="relative py-10 overflow-hidden">
        <div className="container mx-auto px-4 mb-4">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Les marques de confiance
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="text-display text-2xl text-foreground/40 hover:text-foreground transition-colors">
                {b.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle eyebrow="Univers de soin" title="Explorez nos catégories" />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className="group relative block aspect-[4/5] rounded-3xl overflow-hidden glass hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 gradient-hero opacity-80" />
                  <div className="relative h-full p-5 flex flex-col justify-between">
                    <div className="text-display text-5xl text-foreground/30 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                      {c.emoji}
                    </div>
                    <div>
                      <h3 className="text-display text-xl text-foreground">{c.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description}</p>
                      <div className="mt-3 inline-flex items-center gap-1 text-xs text-secondary font-medium">
                        Découvrir <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUITS VEDETTES */}
      <section className="py-20 relative">
        <div className="blob blob-rose w-[400px] h-[400px] top-20 -right-20 animate-blob" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <SectionTitle eyebrow="Sélection" title="Nos produits vedettes" align="left" />
            <Link to="/categories" className="text-sm text-secondary hover:text-secondary/80 inline-flex items-center gap-1 group">
              Voir tout <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* K-BEAUTY SHOWCASE */}
      <CollectionShowcase
        eyebrow="Collection K-Beauty"
        title="Le rituel glass-skin"
        description="Sérums hydratants, essences et soins venus de Corée pour une peau lumineuse, fraîche et repulpée."
        ctaLabel="Explorer K-Beauty"
        ctaTo="/categories"
        image={kbeautyImg}
        products={kbeautyProducts}
        accent="rose"
      />

      {/* PROTECTION SOLAIRE SHOWCASE */}
      <CollectionShowcase
        eyebrow="Collection Solaire"
        title="Protection lumineuse"
        description="Crèmes SPF, brumes et after-sun pour protéger et sublimer votre peau, du quotidien aux journées ensoleillées."
        ctaLabel="Explorer la protection solaire"
        ctaTo="/categories/$slug"
        image={solaireImg}
        products={solaireProducts.length ? solaireProducts : kbeautyProducts}
        accent="sage"
      />

      {/* PROMO BANNER */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative glass-strong rounded-[2.5rem] p-8 md:p-14 overflow-hidden shadow-elevated">
            <div className="blob blob-rose w-[400px] h-[400px] -top-20 -right-20 animate-blob" />
            <div className="blob blob-sage w-[400px] h-[400px] -bottom-20 -left-20 animate-blob-2" />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-secondary">
                  Offres limitées
                </span>
                <h2 className="mt-4 text-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">
                  Jusqu'à <span className="text-secondary">-30%</span> sur les soins essentiels
                </h2>
                <p className="mt-4 text-muted-foreground max-w-md">
                  Profitez d'une sélection exceptionnelle de marques expertes à prix doux,
                  jusqu'à dimanche minuit.
                </p>
                <Link
                  to="/promotions"
                  className="mt-6 inline-flex items-center gap-2 gradient-button text-white rounded-full px-7 py-3 text-sm font-medium shadow-soft hover:shadow-glow-rose transition-all"
                >
                  Voir les promotions <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {promos.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-[3/4] rounded-2xl overflow-hidden relative shadow-soft"
                    style={{ background: p.gradient }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={600}
                      height={800}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 p-2 glass-strong">
                      <div className="text-[10px] text-muted-foreground line-through">{p.oldPrice} DH</div>
                      <div className="text-display text-base font-semibold text-foreground">{p.price} DH</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle eyebrow="L'expérience 4YouPara" title="Le soin, jusque dans les détails" />
          <div className="mt-12 grid md:grid-cols-4 gap-5">
            {[
              { icon: Truck, title: "Livraison 24h/24", desc: "Partout au Maroc, soigneusement emballé." },
              { icon: ShieldCheck, title: "Authentique", desc: "Produits originaux, traçabilité garantie." },
              { icon: HeartHandshake, title: "Conseil pharmacien", desc: "Une expertise humaine derrière chaque commande." },
              { icon: Leaf, title: "Sélection bio", desc: "Une attention particulière aux formules naturelles." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-3xl p-6 hover:shadow-elevated transition-all hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-2xl gradient-sage inline-flex items-center justify-center text-white mb-4">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG TEASER */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <SectionTitle eyebrow="Conseils & rituels" title="Le journal beauté" align="left" />
            <Link to="/blog" className="text-sm text-secondary hover:text-secondary/80 inline-flex items-center gap-1 group">
              Tous les articles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group block glass rounded-3xl overflow-hidden hover:shadow-elevated transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] gradient-hero relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-display text-7xl text-white/40">
                      ✿
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <span className="text-secondary">{post.category}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="mt-2 text-display text-lg leading-snug text-foreground group-hover:text-secondary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function SectionTitle({ eyebrow, title, align = "center" }: { eyebrow: string; title: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : ""}>
      <span className="text-xs uppercase tracking-[0.3em] text-secondary">{eyebrow}</span>
      <h2 className="mt-3 text-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">{title}</h2>
    </div>
  );
}
