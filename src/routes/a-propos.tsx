import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, HeartHandshake, Leaf, Award } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import aboutImg from "@/assets/about-skincare.jpg";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — 4YouPara" },
      { name: "description", content: "Découvrez l'histoire et les valeurs de 4YouPara, parapharmacie en ligne au Maroc." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs uppercase tracking-[0.3em] text-secondary">Notre histoire</span>
            <h1 className="mt-3 text-display text-5xl md:text-6xl font-semibold leading-[1.05]">
              Une parapharmacie <span className="shimmer-text">pensée comme un rituel.</span>
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              4YouPara est née d'une conviction simple : prendre soin de soi devrait être une expérience
              élégante, accessible et guidée par l'expertise. Au cœur du Maroc, nous sélectionnons les soins
              les plus authentiques et les marques les plus respectueuses, pour vous offrir le meilleur de
              la parapharmacie moderne.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Derrière chaque produit, il y a un pharmacien qui l'a validé. Derrière chaque commande,
              une équipe qui prend le temps de bien faire. C'est ça, la différence 4YouPara.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-elevated"
          >
            <img src={aboutImg} alt="L'univers 4YouPara" className="w-full h-full object-cover" loading="lazy" width={1024} height={1280} />
          </motion.div>
        </div>

        <section className="mt-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-secondary">Nos valeurs</span>
            <h2 className="mt-3 text-display text-4xl md:text-5xl font-semibold">Ce qui nous anime</h2>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Sparkles, title: "Excellence", desc: "Une sélection rigoureuse des marques expertes les plus reconnues." },
              { icon: HeartHandshake, title: "Conseil humain", desc: "Nos pharmaciens vous accompagnent à chaque étape." },
              { icon: Leaf, title: "Naturalité", desc: "Une attention particulière portée aux formules respectueuses." },
              { icon: Award, title: "Authenticité", desc: "Produits originaux, traçabilité et qualité garanties." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-3xl p-6 hover:shadow-elevated hover:-translate-y-1 transition-all"
              >
                <div className="h-12 w-12 rounded-2xl gradient-button inline-flex items-center justify-center text-white mb-4">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="text-display text-xl">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
