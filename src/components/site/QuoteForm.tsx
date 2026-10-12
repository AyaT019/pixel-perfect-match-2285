import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { business, hasWhatsapp, services, whatsappLink } from "@/config/business";
import { submitQuoteRequest } from "@/functions/quote-requests.functions";
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

const messageFrom = (f: Fields) =>
  `${business.whatsappMessage}\n\nNom : ${f.name}\nTéléphone : ${f.phone}\nService : ${f.service}\nLieu : ${f.location}\n\nProjet : ${f.message}`;

const input = "w-full rounded-xl border bg-background min-h-12 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 transition focus:border-primary focus:outline-none";

export function QuoteForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "saved" | "error">("idle");
  const send = useServerFn(submitQuoteRequest);
  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    // WhatsApp only opens while the click is still the active gesture, so the tab is
    // created now and pointed at the message once the request has been stored.
    const tab = hasWhatsapp() ? window.open("", "_blank") : null;
    const msg = messageFrom(f);
    try {
      const res = await send({ data: f });
      if (res.ok) {
        setF(empty);
        if (tab) {
          tab.opener = null;
          tab.location.href = whatsappLink(msg);
          setStatus("sent");
        } else {
          setStatus("saved");
        }
        return;
      }
      tab?.close();
      if (res.errors && Object.keys(res.errors).length) setErrors(res.errors);
      setStatus("error");
    } catch {
      tab?.close();
      setStatus("error");
    }
  };

  const err = (k: keyof Fields) => errors[k] && <p id={`${k}-err`} className="mt-1.5 text-sm text-destructive">{errors[k]}</p>;
  const field = (k: keyof Fields, label: string, el: React.ReactNode) => (
    <div><label htmlFor={k} className="mb-2 block text-sm font-medium">{label}</label>{el}{err(k)}</div>
  );
  const a = (k: keyof Fields) => ({ id: k, value: f[k], onChange: set(k), "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined, className: input });

  return (
    <form id="devis" onSubmit={submit} noValidate className="grid scroll-mt-24 gap-5 rounded-2xl sm:rounded-none">
      <h3 className="text-xl font-bold sm:hidden">Demande de devis</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Nom complet", <input {...a("name")} autoComplete="name" autoCapitalize="words" enterKeyHint="next" placeholder="Votre nom" />)}
        {field("phone", "Téléphone", <input {...a("phone")} type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" placeholder="+216 …" />)}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("service", "Service souhaité", (
          <select {...a("service")}>
            <option value="">Sélectionner…</option>
            {services.map((s) => <option key={s.title}>{s.title}</option>)}
            <option>Autre</option>
          </select>
        ))}
        {field("location", "Ville / région", <input {...a("location")} autoComplete="address-level2" enterKeyHint="next" placeholder="Ex. Kélibia, Menzel Temime…" />)}
      </div>
      {field("message", "Description du projet", <textarea {...a("message")} rows={4} placeholder="Type de logement, travaux envisagés, délais…" />)}
      <button type="submit" disabled={status === "sending"} className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base sm:w-auto font-semibold text-primary-foreground transition hover:glow disabled:opacity-60">
        <WhatsappIcon /> {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
      <p className="text-xs text-muted-foreground">
        Votre demande est enregistrée et transmise à {business.name}.{" "}
        {hasWhatsapp() ? "WhatsApp s'ouvre ensuite avec votre message, prêt à être envoyé." : ""}
      </p>
      <div aria-live="polite">
        {status === "sent" && <p className="rounded-xl border border-success/40 bg-success/10 p-4 text-sm">Votre demande est bien enregistrée. WhatsApp s'est ouvert : appuyez sur « Envoyer » pour nous la transmettre.</p>}
        {status === "saved" && (
          <p className="rounded-xl border border-success/40 bg-success/10 p-4 text-sm">
            Votre demande est bien enregistrée.{" "}
            {hasWhatsapp() && <a href={whatsappLink(messageFrom(f))} target="_blank" rel="noopener noreferrer" className="font-semibold underline">L'envoyer aussi sur WhatsApp</a>}
          </p>
        )}
        {status === "error" && (
          <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
            Votre demande n'a pas pu être envoyée. Réessayez, appelez le {business.phoneDisplay} ou écrivez à {business.email}.
          </p>
        )}
      </div>
    </form>
  );
}
