import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — 4YouPara" },
      { name: "description", content: "Contactez l'équipe 4YouPara. Conseils, commandes, partenariats." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-secondary">On vous écoute</span>
          <h1 className="mt-3 text-display text-5xl md:text-6xl font-semibold">Contact</h1>
          <p className="mt-4 text-muted-foreground">
            Une question, un conseil, une demande sur-mesure ? Notre équipe vous répond avec attention.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-strong rounded-3xl p-8 shadow-soft">
            {sent ? (
              <div className="py-16 text-center">
                <div className="text-display text-3xl">Merci ✿</div>
                <p className="mt-3 text-muted-foreground">Votre message a bien été envoyé. Nous revenons vers vous très vite.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Nom complet" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <Field label="Sujet" name="subject" required />
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="mt-2 w-full glass rounded-2xl px-4 py-3 text-sm text-foreground border-none focus:ring-2 focus:ring-secondary outline-none resize-none"
                    placeholder="Dites-nous tout..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 gradient-button text-white rounded-full px-7 py-3.5 text-sm font-medium shadow-soft hover:shadow-glow-rose transition-all"
                >
                  Envoyer le message <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          <div className="space-y-4">
            <Info icon={MapPin} title="Adresse" lines={["Boulevard Anfa", "Casablanca, Maroc"]} />
            <Info icon={Phone} title="Téléphone" lines={["+212 5 22 00 00 00", "Lun – Sam · 9h – 20h"]} />
            <Info icon={Mail} title="Email" lines={["contact@4youpara.ma"]} />
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full glass rounded-full px-5 py-3 text-sm text-foreground border-none focus:ring-2 focus:ring-secondary outline-none"
      />
    </div>
  );
}

function Info({ icon: Icon, title, lines }: { icon: React.ComponentType<{ className?: string }>; title: string; lines: string[] }) {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="h-10 w-10 rounded-2xl gradient-sage inline-flex items-center justify-center text-white mb-3">
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-display text-lg font-semibold">{title}</div>
      {lines.map((l) => <div key={l} className="text-sm text-muted-foreground">{l}</div>)}
    </div>
  );
}
