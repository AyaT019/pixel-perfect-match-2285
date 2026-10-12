import { describe, expect, it } from "vitest";
import { normalizeQuote } from "@/functions/quote-requests.functions";

describe("quote request rules", () => {
  it("accepts a complete request and trims it", () => {
    const { data, errors } = normalizeQuote({
      name: "  Eya Tarhouni ",
      phone: "+216 50 405 403",
      service: "Éclairage intérieur et extérieur",
      location: " Kélibia ",
      message: "Installer des spots dans un salon de 25 m2.",
    });
    expect(errors).toEqual({});
    expect(data.name).toBe("Eya Tarhouni");
    expect(data.location).toBe("Kélibia");
  });

  it("rejects a phone number with fewer than 8 digits", () => {
    const { errors } = normalizeQuote({
      name: "Eya",
      phone: "12 34 56",
      service: "Dépannage électrique",
      location: "Kélibia",
      message: "Une prise ne fonctionne plus dans la cuisine.",
    });
    expect(errors.phone).toBe("Téléphone invalide.");
  });

  it("rejects a description shorter than 10 characters", () => {
    const { errors } = normalizeQuote({
      name: "Eya",
      phone: "+21650405403",
      service: "Câblage et raccordements",
      location: "Kélibia",
      message: "urgent",
    });
    expect(errors.message).toBe("Description trop courte.");
  });

  it("caps long values instead of storing them whole", () => {
    const { data } = normalizeQuote({
      name: "a".repeat(300),
      phone: "+21650405403",
      service: "Autre",
      location: "Kélibia",
      message: "b".repeat(3000),
    });
    expect(data.name).toHaveLength(100);
    expect(data.message).toHaveLength(2000);
  });
});
