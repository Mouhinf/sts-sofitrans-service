import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { Button } from "@/components/ui/button";
import { useSubmitMessage, useSubmitQuote } from "@/hooks/useBackend";
import type { MessageInput, QuoteInput } from "@/types";
import {
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const WHATSAPP_URL = "https://wa.me/221771234567";
const TEL_HREF = "tel:+22133XXXXXXX";
const MAPS_URL = "https://maps.google.com/?q=Zac+Mbao+Dakar+Senegal";

const SERVICE_OPTIONS = [
  { value: "Immobilier", label: "Immobilier" },
  { value: "Transport", label: "Transport & Logistique" },
  { value: "Agrobusiness", label: "Agrobusiness" },
  { value: "Formation", label: "Formation" },
];

type FormErrors = Record<string, string>;

interface ContactFormState {
  customerName: string;
  email: string;
  phone: string;
  message: string;
}

interface QuoteFormState {
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  requirements: string;
  budgetRange: string;
}

function validateContact(f: ContactFormState): FormErrors {
  const e: FormErrors = {};
  if (!f.customerName.trim()) e.customerName = "Le nom complet est requis.";
  if (!f.email.trim()) e.email = "L'adresse email est requise.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Veuillez entrer une adresse email valide.";
  if (!f.message.trim()) e.message = "Le message est requis.";
  return e;
}

function validateQuote(f: QuoteFormState): FormErrors {
  const e: FormErrors = {};
  if (!f.customerName.trim()) e.customerName = "Le nom complet est requis.";
  if (!f.email.trim()) e.email = "L'adresse email est requise.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Veuillez entrer une adresse email valide.";
  if (!f.phone.trim()) e.phone = "Le numéro de téléphone est requis.";
  return e;
}

function FeedbackBanner({ ok, msg }: { ok: boolean; msg: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 rounded-lg border p-4 ${
        ok
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-destructive/30 bg-destructive/5 text-destructive"
      }`}
      role="alert"
    >
      {ok ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
      ) : (
        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
      )}
      <p className="text-sm font-medium">{msg}</p>
    </motion.div>
  );
}

/* ─── Contact Form ─── */
function ContactForm() {
  const [form, setForm] = useState<ContactFormState>({
    customerName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
  const { mutateAsync, isPending } = useSubmitMessage();

  function set(field: keyof ContactFormState, val: string) {
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  }

  function blur(field: keyof ContactFormState) {
    const v = validateContact(form);
    if (v[field]) setErrors((p) => ({ ...p, [field]: v[field] }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateContact(form);
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    const input: MessageInput = {
      customerName: form.customerName,
      email: form.email,
      phone: form.phone,
      message: form.message,
    };
    try {
      await mutateAsync(input);
      setFeedback("success");
      setForm({ customerName: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch {
      setFeedback("error");
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
      {feedback && (
        <FeedbackBanner
          ok={feedback === "success"}
          msg={
            feedback === "success"
              ? "Votre message a bien été envoyé ! Nous vous répondrons dans les plus brefs délais."
              : "Une erreur est survenue. Veuillez réessayer."
          }
        />
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Nom complet"
          id="c-name"
          value={form.customerName}
          onChange={(e) => set("customerName", e.target.value)}
          onBlur={() => blur("customerName")}
          error={errors.customerName}
          required
          placeholder="Amadou Diallo"
          data-ocid="contact-form-nom"
        />
        <InputField
          label="Adresse email"
          id="c-email"
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          onBlur={() => blur("email")}
          error={errors.email}
          required
          placeholder="amadou@exemple.sn"
          data-ocid="contact-form-email"
        />
      </div>
      <InputField
        label="Téléphone"
        id="c-phone"
        type="tel"
        value={form.phone}
        onChange={(e) => set("phone", e.target.value)}
        placeholder="+221 77 000 00 00"
        data-ocid="contact-form-tel"
      />
      <TextareaField
        label="Message"
        id="c-message"
        value={form.message}
        onChange={(e) => set("message", e.target.value)}
        onBlur={() => blur("message")}
        error={errors.message}
        required
        placeholder="Comment pouvons-nous vous aider ?"
        rows={5}
        data-ocid="contact-form-message"
      />
      <Button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
        data-ocid="contact-form-submit"
      >
        {isPending ? "Envoi en cours…" : "Envoyer le message"}
      </Button>
    </form>
  );
}

/* ─── Quote Form ─── */
function QuoteForm() {
  const [form, setForm] = useState<QuoteFormState>({
    customerName: "",
    email: "",
    phone: "",
    serviceType: "",
    requirements: "",
    budgetRange: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
  const { mutateAsync, isPending } = useSubmitQuote();

  function set(field: keyof QuoteFormState, val: string) {
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  }

  function blur(field: keyof QuoteFormState) {
    const v = validateQuote(form);
    if (v[field]) setErrors((p) => ({ ...p, [field]: v[field] }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateQuote(form);
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    const input: QuoteInput = {
      customerName: form.customerName,
      email: form.email,
      phone: form.phone,
      serviceType: form.serviceType || "Non précisé",
      requirements: form.requirements,
      budgetRange: form.budgetRange,
    };
    try {
      await mutateAsync(input);
      setFeedback("success");
      setForm({
        customerName: "",
        email: "",
        phone: "",
        serviceType: "",
        requirements: "",
        budgetRange: "",
      });
      setErrors({});
    } catch {
      setFeedback("error");
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
      {feedback && (
        <FeedbackBanner
          ok={feedback === "success"}
          msg={
            feedback === "success"
              ? "Votre demande de devis a bien été envoyée ! Nous vous répondrons dans les plus brefs délais."
              : "Une erreur est survenue. Veuillez réessayer."
          }
        />
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Nom complet"
          id="q-name"
          value={form.customerName}
          onChange={(e) => set("customerName", e.target.value)}
          onBlur={() => blur("customerName")}
          error={errors.customerName}
          required
          placeholder="Amadou Diallo"
          data-ocid="devis-form-nom"
        />
        <InputField
          label="Adresse email"
          id="q-email"
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          onBlur={() => blur("email")}
          error={errors.email}
          required
          placeholder="amadou@exemple.sn"
          data-ocid="devis-form-email"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Téléphone"
          id="q-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          onBlur={() => blur("phone")}
          error={errors.phone}
          required
          placeholder="+221 77 000 00 00"
          data-ocid="devis-form-tel"
        />
        <SelectField
          label="Service concerné"
          id="q-service"
          value={form.serviceType}
          onChange={(e) => set("serviceType", e.target.value)}
          options={SERVICE_OPTIONS}
          placeholder="Choisir un service"
          data-ocid="devis-form-service"
        />
      </div>
      <TextareaField
        label="Description de vos besoins"
        id="q-requirements"
        value={form.requirements}
        onChange={(e) => set("requirements", e.target.value)}
        placeholder="Décrivez votre projet ou vos besoins en détail…"
        rows={4}
        data-ocid="devis-form-besoins"
      />
      <InputField
        label="Budget estimé"
        id="q-budget"
        value={form.budgetRange}
        onChange={(e) => set("budgetRange", e.target.value)}
        placeholder="Ex : 500 000 – 1 000 000 FCFA"
        data-ocid="devis-form-budget"
      />
      <Button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90"
        data-ocid="devis-form-submit"
      >
        {isPending ? "Envoi en cours…" : "Envoyer la demande de devis"}
      </Button>
    </form>
  );
}

/* ─── Page ─── */
export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"contact" | "devis">("contact");

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border bg-card py-20 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,currentColor 39px,currentColor 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,currentColor 39px,currentColor 40px)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto max-w-3xl px-6"
        >
          <span className="mb-4 inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
            Contactez-nous
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Nous Sommes à Votre Écoute
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Notre équipe est disponible pour répondre à toutes vos questions et
            vous accompagner dans vos projets.
          </p>
        </motion.div>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className="bg-background py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: MapPin,
                title: "Adresse",
                value: "Zac Mbao, Rond Point Sipres, Dakar, Sénégal",
                href: undefined,
                color: "bg-emerald-50 text-emerald-700",
                delay: 0,
              },
              {
                icon: Phone,
                title: "Téléphone",
                value: "+221 33 XXX XX XX",
                href: TEL_HREF,
                color: "bg-blue-50 text-blue-700",
                delay: 0.05,
              },
              {
                icon: Mail,
                title: "Email",
                value: "contact@sofitrans.sn",
                href: "mailto:contact@sofitrans.sn",
                color: "bg-emerald-50 text-emerald-700",
                delay: 0.1,
              },
              {
                icon: MessageSquare,
                title: "WhatsApp",
                value: "Discutez sur WhatsApp",
                href: WHATSAPP_URL,
                color: "text-white",
                isWhatsApp: true,
                delay: 0.15,
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: card.delay }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-corporate transition-smooth hover-lift"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full ${card.isWhatsApp ? "" : card.color}`}
                  style={card.isWhatsApp ? { backgroundColor: "#25D366" } : {}}
                >
                  <card.icon className="h-7 w-7" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {card.title}
                </p>
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.isWhatsApp ? "_blank" : undefined}
                    rel={card.isWhatsApp ? "noopener noreferrer" : undefined}
                    className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                    data-ocid={
                      card.isWhatsApp ? "contact-whatsapp-btn" : undefined
                    }
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground">
                    {card.value}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map + Forms ── */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Styled Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="sticky top-24 flex flex-col gap-4">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Notre Localisation
                </h2>
                <div className="overflow-hidden rounded-2xl border border-border shadow-corporate">
                  <div
                    className="relative h-72 lg:h-96"
                    style={{ backgroundColor: "#e8f5e9" }}
                  >
                    {/* Grid lines */}
                    <div
                      className="absolute inset-0 opacity-25"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg,transparent,transparent 31px,#81c784 31px,#81c784 32px),repeating-linear-gradient(90deg,transparent,transparent 31px,#81c784 31px,#81c784 32px)",
                      }}
                    />
                    {/* Horizontal road */}
                    <div
                      className="absolute left-0 right-0 top-1/2 h-3 -translate-y-1/2 opacity-40"
                      style={{ backgroundColor: "#a5d6a7" }}
                    />
                    {/* Vertical road */}
                    <div
                      className="absolute bottom-0 left-1/2 top-0 w-3 -translate-x-1/2 opacity-40"
                      style={{ backgroundColor: "#a5d6a7" }}
                    />
                    {/* Pin */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                      <div className="flex flex-col items-center">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-full shadow-elevated"
                          style={{ backgroundColor: "#2e7d32" }}
                        >
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <div
                          className="h-2.5 w-0.5"
                          style={{ backgroundColor: "#2e7d32" }}
                        />
                        <div
                          className="h-1 w-3 rounded-full opacity-30"
                          style={{ backgroundColor: "#2e7d32" }}
                        />
                      </div>
                    </div>
                    {/* Location label */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-card px-3 py-1.5 text-sm font-semibold text-foreground shadow-corporate">
                      Zac Mbao, Dakar, Sénégal
                    </div>
                  </div>
                </div>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:underline"
                  data-ocid="contact-maps-link"
                >
                  <ExternalLink className="h-4 w-4" />
                  Voir sur Google Maps
                </a>
              </div>
            </motion.div>

            {/* Forms Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {/* Tab switcher */}
              <div
                className="mb-6 flex rounded-xl border border-border bg-card p-1 shadow-corporate"
                role="tablist"
              >
                <button
                  role="tab"
                  aria-selected={activeTab === "contact"}
                  onClick={() => setActiveTab("contact")}
                  type="button"
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-smooth ${
                    activeTab === "contact"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid="contact-tab-contact"
                >
                  Envoyer un message
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === "devis"}
                  type="button"
                  onClick={() => setActiveTab("devis")}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-smooth ${
                    activeTab === "devis"
                      ? "bg-secondary text-secondary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid="contact-tab-devis"
                >
                  Demande de Devis
                </button>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-corporate md:p-8">
                {activeTab === "contact" ? (
                  <>
                    <div className="mb-6">
                      <h2 className="font-display text-2xl font-bold text-foreground">
                        Envoyez-nous un message
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Nous vous répondrons dans les 24 heures ouvrables.
                      </p>
                    </div>
                    <ContactForm />
                  </>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="font-display text-2xl font-bold text-foreground">
                        Demande de Devis
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Décrivez votre projet et recevez une offre
                        personnalisée.
                      </p>
                    </div>
                    <QuoteForm />
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Bar ── */}
      <section
        className="py-14 text-white"
        style={{
          background: "linear-gradient(135deg, #1b5e20 0%, #1565c0 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Besoin d'une réponse immédiate ?
            </h2>
            <p className="max-w-xl text-base opacity-90">
              Notre équipe est disponible pour vous accompagner. Appelez-nous
              directement ou contactez-nous sur WhatsApp.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <a
                href={TEL_HREF}
                className="inline-flex items-center gap-2.5 rounded-xl border-2 border-white px-8 py-3.5 text-sm font-bold transition-smooth hover:bg-white hover:text-blue-900 active:scale-95"
                data-ocid="cta-appel-btn"
              >
                <Phone className="h-5 w-5" />
                Appel direct
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-bold transition-smooth active:scale-95"
                style={{ backgroundColor: "#25D366" }}
                data-ocid="cta-whatsapp-btn"
              >
                <MessageSquare className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
