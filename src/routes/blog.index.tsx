import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { blogPosts } from "@/data/products";
import blogImg from "@/assets/blog-conseils.jpg";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Conseils Beauté — Le journal 4YouPara" },
      { name: "description", content: "Routines, conseils experts et rituels beauté par les pharmaciens 4YouPara." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [first, ...rest] = blogPosts;
  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-secondary">Le journal</span>
          <h1 className="mt-3 text-display text-5xl md:text-6xl font-semibold">Conseils & rituels</h1>
          <p className="mt-4 text-muted-foreground">
            L'expertise de nos pharmaciens, des routines naturelles et des inspirations beauté.
          </p>
        </div>

        <Link
          to="/blog/$slug"
          params={{ slug: first.slug }}
          className="group mt-12 grid lg:grid-cols-2 gap-8 glass-strong rounded-3xl overflow-hidden shadow-elevated hover:shadow-elevated transition-all"
        >
          <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
            <img src={blogImg} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" width={1280} height={896} />
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <span className="text-secondary">{first.category}</span> · <span>{first.readTime}</span> · <span>{first.date}</span>
            </div>
            <h2 className="mt-4 text-display text-3xl md:text-4xl text-foreground leading-tight group-hover:text-secondary transition-colors">
              {first.title}
            </h2>
            <p className="mt-4 text-muted-foreground">{first.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm text-secondary font-medium">
              Lire l'article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {rest.map((post, i) => (
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
                className="group block glass rounded-3xl overflow-hidden hover:shadow-elevated hover:-translate-y-1 transition-all h-full"
              >
                <div className="aspect-[4/3] gradient-hero relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-display text-7xl text-white/40">✿</div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-wider text-secondary">{post.category}</div>
                  <h3 className="mt-2 text-display text-lg leading-snug text-foreground group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
