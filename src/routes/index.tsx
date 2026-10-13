import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Phone, Mail, MapPin, MapPinned, CheckCircle2, MessagesSquare, ShieldCheck, Sparkles, Lightbulb, Facebook } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import portraitAsset from "@/assets/portrait.jpg.asset.json";
import { business, hasFacebook, hasPhone, hasWhatsapp, services, whatsappLink } from "@/config/business";
import { Header } from "@/components/site/Header";
import { Portfolio } from "@/components/site/Portfolio";
import { QuoteForm } from "@/components/site/QuoteForm";
import { FacebookIcon, Logo, ServiceIcon, WhatsappIcon } from "@/components/site/Icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${business.name} — Électricien bâtiment en Tunisie` },
      { name: "description", content: "Électricien indépendant en Tunisie : installation résidentielle, tableaux électriques, câblage, éclairage, rénovation. Demandez votre devis." },
      { property: "og:title", content: `${business.name} — Électricité bâtiment en Tunisie` },
      { property: "og:description", content: "Des installations électriques soignées pour vos projets de construction et de rénovation en Tunisie." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary"><span className="h-px w-8 bg-primary" />{children}</p>;
}

function Index() {
  return (
    <div className="overflow-x-clip pb-20 sm:pb-0">
      <Header />
      <main>
        {/* HERO */}
        <section id="accueil" className="relative flex min-h-[100svh] items-center">
          <img src={heroImg} alt="Électricien raccordant un tableau électrique résidentiel" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
          <div className="hero-overlay absolute inset-0" />
          <div className="circuit-bg absolute inset-0 opacity-60" />
          <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-32 lg:px-8">
            <div className="reveal max-w-2xl">
              <Eyebrow>Électricité bâtiment • Tunisie</Eyebrow>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                L'expertise électrique au service de <span className="text-primary">vos projets.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Des installations soignées, des solutions adaptées et un accompagnement professionnel pour vos projets de construction et de rénovation.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground transition hover:glow">Demander un devis <ArrowRight className="h-4 w-4" /></a>
                {hasPhone() && <a href={`tel:${business.phoneDisplay.replace(/\s/g, "")}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/50 bg-background/40 px-7 py-4 font-semibold backdrop-blur sm:hidden"><Phone className="h-4 w-4" /> Appeler {business.phoneDisplay}</a>}
                <a href="#realisations" className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-7 py-4 font-semibold backdrop-blur transition hover:border-primary">Découvrir nos réalisations</a>
              </div>
            </div>
          </div>
          <div className="glow-line absolute inset-x-0 bottom-0" />
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">Des solutions électriques adaptées à vos besoins</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.title} className="group relative bg-background p-8 transition-colors hover:bg-surface">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition group-hover:glow"><ServiceIcon name={s.icon} /></div>
                <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.description}</p>
                <div className="glow-line absolute inset-x-8 bottom-0 opacity-0 transition group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </section>

        {/* REALISATIONS */}
        <section id="realisations" className="bg-surface py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>Réalisations</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Aperçu des travaux</h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">Les images ci-dessous sont des exemples de présentation. Elles seront remplacées par des photos de chantiers réels.</p>
            </div>
            <div className="mt-14"><Portfolio /></div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="a-propos" className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div className="relative">
            <div className="circuit-bg absolute -inset-8" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border bg-surface">
              <img src={portraitAsset.url} alt={`${business.name}, électricien bâtiment`} width={896} height={1198} loading="lazy" className="h-full w-full object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5 pt-16">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">{business.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">Électricien bâtiment • Kélibia</p>
              </div>
            </div>
          </div>
          <div>
            <Eyebrow>À propos</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Un travail soigné. Un engagement professionnel.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">[Présentation : quelques phrases sur son parcours, son métier et ce qui le motive au quotidien.] Électricien indépendant, j'accompagne particuliers et professionnels dans leurs projets d'électricité bâtiment, de la construction neuve à la rénovation.</p>
            <dl className="mt-10 grid gap-6">
              {[
                [ShieldCheck, "Qualité et sécurité", "[Son approche : soin apporté aux finitions, contrôles, respect des bonnes pratiques.]"],
                [MapPin, "Zone d'intervention", business.serviceArea],
              ].map(([I, t, d]) => {
                const Icon = I as typeof MapPin;
                return (
                  <div key={t as string} className="flex gap-4">
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div><dt className="font-semibold">{t as string}</dt><dd className="mt-1 text-muted-foreground">{d as string}</dd></div>
                  </div>
                );
              })}
            </dl>
          </div>
        </section>

        {/* ENGAGEMENTS */}
        <section className="border-y bg-surface py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Eyebrow>Nos engagements</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Ce sur quoi vous pouvez compter</h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [Sparkles, "Travail soigné", "Une attention portée à chaque détail, du passage des câbles aux finitions."],
                [Lightbulb, "Conseils adaptés", "Des recommandations pensées pour votre logement, vos usages et votre budget."],
                [MessagesSquare, "Communication claire", "Des explications simples et un suivi transparent tout au long du chantier."],
                [CheckCircle2, "Sécurité électrique", "Le respect des bonnes pratiques de sécurité à chaque intervention."],
              ].map(([I, t, d]) => {
                const Icon = I as typeof Sparkles;
                return (
                  <div key={t as string} className="border-l border-primary/40 pl-6">
                    <Icon className="h-6 w-6 text-primary" />
                    <h3 className="mt-4 font-semibold">{t as string}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-7xl scroll-mt-20 px-3 py-16 sm:px-5 sm:py-24 lg:px-8 lg:py-32">
          <div className="relative overflow-hidden rounded-3xl border bg-surface">
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
            <div className="relative grid gap-10 p-5 sm:p-10 lg:grid-cols-[1fr_1.3fr] lg:p-14">
              <div>
                <Eyebrow>Contact</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Parlons de votre projet</h2>
                <p className="mt-4 text-muted-foreground">Décrivez vos besoins : vous recevrez une réponse rapide pour convenir d'une visite ou d'un devis.</p>
                <ul className="mt-8 grid gap-3">
                  <li>{hasPhone() ? (
                    <a href={`tel:${business.phoneDisplay.replace(/\s/g, "")}`} className="flex min-h-14 items-center gap-4 rounded-2xl border bg-background/60 px-4 py-3 transition hover:border-primary active:scale-[0.99]"><Phone className="h-5 w-5 shrink-0 text-primary" /><span className="min-w-0"><span className="block text-xs text-muted-foreground">Appeler</span><span className="block font-semibold">{business.phoneDisplay}</span></span></a>
                  ) : <SetupNote>Numéro de téléphone à configurer</SetupNote>}</li>
                  {hasWhatsapp() && <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center gap-4 rounded-2xl border bg-background/60 px-4 py-3 transition hover:border-whatsapp active:scale-[0.99]"><WhatsappIcon className="h-5 w-5 shrink-0 text-whatsapp" /><span className="min-w-0"><span className="block text-xs text-muted-foreground">WhatsApp</span><span className="block font-semibold">Écrire un message</span></span></a></li>}
                  {business.email && <li><a href={`mailto:${business.email}`} className="flex min-h-14 items-center gap-4 rounded-2xl border bg-background/60 px-4 py-3 transition hover:border-primary active:scale-[0.99]"><Mail className="h-5 w-5 shrink-0 text-primary" /><span className="min-w-0"><span className="block text-xs text-muted-foreground">E-mail</span><span className="block break-all font-semibold">{business.email}</span></span></a></li>}
                  {hasFacebook() && <li><a href={business.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center gap-4 rounded-2xl border bg-background/60 px-4 py-3 transition hover:border-primary"><Facebook className="h-5 w-5 shrink-0 text-primary" /><span className="font-semibold">{business.name} sur Facebook</span></a></li>}
                  <li className="flex items-start gap-4 px-4 py-2 text-sm text-muted-foreground"><MapPinned className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{business.address}</span></li>
                  <li className="flex items-start gap-4 px-4 py-2 text-sm text-muted-foreground"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{business.serviceArea}</span></li>
                </ul>
              </div>
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3"><Logo /><span className="font-bold">{business.name}</span></div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">Électricien indépendant en électricité bâtiment : installations, rénovation et dépannage en Tunisie.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">{services.slice(0, 4).map((s) => <li key={s.title}><a href="#services" className="hover:text-foreground">{s.title}</a></li>)}</ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <li>{hasPhone() ? <a href={`tel:${business.phoneDisplay.replace(/\s/g, "")}`} className="hover:text-foreground">{business.phoneDisplay}</a> : "Téléphone à configurer"}</li>
              {business.email && <li><a href={`mailto:${business.email}`} className="hover:text-foreground">{business.email}</a></li>}
              <li>{business.address}</li>
              {hasFacebook() && <li className="flex items-center gap-2"><FacebookIcon className="h-4 w-4" /><a href={business.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Facebook</a></li>}
            </ul>
          </div>
        </div>
        <div className="border-t py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} {business.name}. Tous droits réservés.</div>
      </footer>

      <a
        href={hasWhatsapp() ? whatsappLink() : "#contact"}
        {...(hasWhatsapp() ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label="Contacter sur WhatsApp"
        className="fixed bottom-5 right-5 z-40 hidden sm:grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-background shadow-lg transition hover:scale-105"
      >
        <WhatsappIcon className="h-7 w-7" />
      </a>

      <nav aria-label="Contact rapide" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-2 border-t bg-background/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:hidden">
        <a href={hasPhone() ? `tel:${business.phoneDisplay.replace(/\s/g, "")}` : "#contact"} className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl border text-xs font-semibold"><Phone className="h-5 w-5 text-primary" />Appeler</a>
        <a href={hasWhatsapp() ? whatsappLink() : "#contact"} {...(hasWhatsapp() ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl bg-whatsapp text-xs font-semibold text-background"><WhatsappIcon className="h-5 w-5" />WhatsApp</a>
        <a href="#devis" className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl bg-primary text-xs font-semibold text-primary-foreground"><ArrowRight className="h-5 w-5" />Devis</a>
      </nav>
    </div>
  );
}

function SetupNote({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-lg border border-dashed border-destructive/60 bg-destructive/10 px-3 py-1.5 text-sm text-destructive">⚙ {children}</span>;
}
