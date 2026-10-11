import { useState, type FormEvent } from "react";
import { business, hasWhatsapp, services, whatsappLink } from "@/config/business";
import { WhatsappIcon } from "./Icons";

type Fields = { name: string; phone: string; service: string; location: string; message: string };
const empty: Fields = { name: "", phone: "", service: "", location: "", message: "" };

export function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) e.name = "Veuillez indiquer votre nom.";
  if (!/^\+?[\d\s.-]{8,20}$/.test(f.phone.trim())) e.phone = "Numéro de téléphone invalide.";
  if (!f.service) e.service = "Choisissez un service.";
  if (f.location.trim().length < 2) e.location = "Indiquez votre ville ou région.";
  if (f.message.trim().length < 10) e.message = "Décrivez brièvement votre projet (10 caractères min.).";
  return e;
}

const input = "w-full rounded-xl border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/60 transition focus:border-primary focus:outline-none";

export function QuoteForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (!hasWhatsapp()) { setStatus("error"); return; }
    const msg = `${business.whatsappMessage}\n\nNom : ${f.name}\nTéléphone : ${f.phone}\nService : ${f.service}\nLieu : ${f.location}\n\nProjet : ${f.message}`;
    const w = window.open(whatsappLink(msg), "_blank", "noopener");
    setStatus(w === null ? "error" : "sent");
  };

  const err = (k: keyof Fields) => errors[k] && <p id={`${k}-err`} className="mt-1.5 text-sm text-destructive">{errors[k]}</p>;
  const field = (k: keyof Fields, label: string, el: React.ReactNode) => (
    <div><label htmlFor={k} className="mb-2 block text-sm font-medium">{label}</label>{el}{err(k)}</div>
  );
  const a = (k: keyof Fields) => ({ id: k, value: f[k], onChange: set(k), "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined, className: input });

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Nom complet", <input {...a("name")} autoComplete="name" placeholder="Votre nom" />)}
        {field("phone", "Téléphone", <input {...a("phone")} type="tel" autoComplete="tel" placeholder="+216 …" />)}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("service", "Service souhaité", (
          <select {...a("service")}>
            <option value="">Sélectionner…</option>
            {services.map((s) => <option key={s.title}>{s.title}</option>)}
            <option>Autre</option>
          </select>
        ))}
        {field("location", "Ville / région", <input {...a("location")} placeholder="Ex. Tunis, Sousse…" />)}
      </div>
      {field("message", "Description du projet", <textarea {...a("message")} rows={5} placeholder="Type de logement, travaux envisagés, délais…" />)}
      <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground transition hover:glow">
        <WhatsappIcon /> Envoyer ma demande via WhatsApp
      </button>
      <p className="text-xs text-muted-foreground">Votre demande s'ouvre dans WhatsApp, prête à être envoyée. Aucune donnée n'est stockée sur ce site.</p>
      <div aria-live="polite">
        {status === "sent" && <p className="rounded-xl border border-success/40 bg-success/10 p-4 text-sm">WhatsApp s'est ouvert avec votre demande. Pensez à appuyer sur « Envoyer » pour la transmettre.</p>}
        {status === "error" && <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">{hasWhatsapp() ? "Impossible d'ouvrir WhatsApp. Autorisez les fenêtres pop-up ou contactez-nous par téléphone." : "Configuration requise : le numéro WhatsApp n'est pas encore renseigné. Votre demande n'a pas été envoyée."}</p>}
      </div>
    </form>
  );
}
