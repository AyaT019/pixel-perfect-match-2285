import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { business, hasPhone } from "@/config/business";
import { Logo } from "./Icons";

const links = [
  ["Accueil", "#accueil"],
  ["Services", "#services"],
  ["Réalisations", "#realisations"],
  ["À propos", "#a-propos"],
  ["Contact", "#contact"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "border-b bg-background/85 backdrop-blur-xl" : "bg-transparent"}`}>
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8" aria-label="Navigation principale">
        <a href="#accueil" className="flex min-w-0 items-center gap-3">
          <Logo className="h-9 w-9 shrink-0" />
          <span className="truncate text-sm font-bold tracking-tight sm:text-base">{business.name}</span>
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {links.map(([l, h]) => (
            <li key={h}><a href={h} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l}</a></li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-2">
          <a href="#contact" className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:glow sm:inline-flex">Demander un devis</a>
          <button className="grid h-10 w-10 place-items-center rounded-full border lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t bg-background px-5 pb-6 lg:hidden">
          <ul className="flex flex-col py-2">
            {links.map(([l, h]) => (
              <li key={h}><a href={h} onClick={() => setOpen(false)} className="block border-b py-4 text-lg font-medium">{l}</a></li>
            ))}
          </ul>
          <div className="mt-4 grid gap-3">
            <a href="#contact" onClick={() => setOpen(false)} className="rounded-full bg-primary py-3 text-center font-semibold text-primary-foreground">Demander un devis</a>
            {hasPhone() && (
              <a href={`tel:${business.phoneDisplay.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 rounded-full border py-3 font-medium"><Phone className="h-4 w-4" /> Appeler</a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
