import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type QuoteInput = {
  name: string;
  phone: string;
  service: string;
  location: string;
  message: string;
};

const LIMITS = { name: 100, phone: 20, service: 80, location: 120, message: 2000 };

const clean = (v: unknown, max: number) =>
  String(v ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

/** Same rules the browser checks, applied again so nothing unvalidated reaches the database. */
export function normalizeQuote(input: Partial<QuoteInput>) {
  const data: QuoteInput = {
    name: clean(input.name, LIMITS.name),
    phone: clean(input.phone, LIMITS.phone),
    service: clean(input.service, LIMITS.service),
    location: clean(input.location, LIMITS.location),
    message: clean(input.message, LIMITS.message),
  };
  const errors: Partial<Record<keyof QuoteInput, string>> = {};
  if (data.name.length < 2) errors.name = "Nom trop court.";
  if (!/^\+?[\d\s.-]{8,20}$/.test(data.phone) || (data.phone.match(/\d/g) ?? []).length < 8) errors.phone = "Téléphone invalide.";
  if (!data.service) errors.service = "Service manquant.";
  if (data.location.length < 2) errors.location = "Lieu trop court.";
  if (data.message.length < 10) errors.message = "Description trop courte.";
  return { data, errors };
}

/** Public endpoint: a visitor with no account must be able to send a request. */
export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((input: Partial<QuoteInput>) => input)
  .handler(async ({ data }) => {
    const { data: clean, errors } = normalizeQuote(data);
    if (Object.keys(errors).length) return { ok: false as const, errors };

    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false },
      // Opaque sb_ keys aren't JWTs: send only apikey, never the default Authorization bearer.
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await supabase.from("quote_requests").insert(clean);
    if (error) {
      if (error.message.includes("too_many_quote_requests")) {
        return { ok: false as const, errors: { phone: "Trop de demandes récentes. Réessayez dans quelques minutes." } };
      }
      console.error("quote_requests insert failed", error.message);
      return { ok: false as const, errors: {} };
    }
    return { ok: true as const };
  });
