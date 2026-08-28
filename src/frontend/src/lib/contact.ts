import type { CompanySettings } from "@/types";

/**
 * Sanitises a raw phone string into the international E.164 digit-only form
 * suitable for `wa.me/<digits>` links. Strips spaces, dashes, parens and the
 * leading `+`. Returns null when no usable digit sequence remains.
 */
export function toE164Digits(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  let digits = trimmed.replace(/[^0-9+]/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("+")) digits = digits.slice(1);
  return digits.length >= 7 ? digits : null;
}

/**
 * Produces a clickable `tel:` link. Returns null when no usable number.
 * Keeps the `+` prefix and groups digits visually with spaces.
 */
export function toTelHref(raw: string | null | undefined): string | undefined {
  const digits = toE164Digits(raw);
  return digits ? `tel:+${digits}` : undefined;
}

export function toWhatsAppUrl(
  raw: string | null | undefined,
  presetMessage?: string,
): string | undefined {
  const digits = toE164Digits(raw);
  if (!digits) return undefined;
  const base = `https://wa.me/${digits}`;
  return presetMessage
    ? `${base}?text=${encodeURIComponent(presetMessage)}`
    : base;
}

/**
 * Display form: keeps spacing for visual readability (e.g. "+221 77 123 45 67").
 * Falls back to a dash when nothing usable is configured.
 */
export function formatPhone(raw: string | null | undefined): string {
  if (!raw) return "—";
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : "—";
}

export interface ResolvedContact {
  phone: string; // human form
  phoneHref: string | undefined;
  whatsapp: string; // human form
  whatsappHref: string | undefined;
  whatsappDigits: string | null;
  email: string;
  address: string;
  isConfigured: boolean;
}

const DEFAULT_PRESET =
  "Bonjour STS SOFITRANS, je souhaite obtenir des informations.";

export function resolveContact(
  settings: CompanySettings | null | undefined,
): ResolvedContact {
  const phoneRaw = settings?.phone ?? "";
  const whatsappRaw = settings?.whatsapp ?? "";
  const phoneHref = toTelHref(phoneRaw);
  const whatsappHref = toWhatsAppUrl(whatsappRaw, DEFAULT_PRESET);
  const whatsappDigits = toE164Digits(whatsappRaw);

  return {
    phone: formatPhone(phoneRaw),
    phoneHref,
    whatsapp: formatPhone(whatsappRaw),
    whatsappHref,
    whatsappDigits,
    email: settings?.email ?? "",
    address: settings?.address ?? "",
    isConfigured: Boolean(phoneHref || whatsappHref),
  };
}
