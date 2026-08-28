import {
  CTABar,
  ContactFields,
  type ContactFieldsInputs,
  InfoCard,
  SuccessConfirmation,
  validateContactField,
} from "@/components/shared";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { Button } from "@/components/ui/button";
import {
  useCompanySettings,
  useSubmitMessage,
  useSubmitQuote,
} from "@/hooks/useBackend";
import { resolveContact } from "@/lib/contact";
import {
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// resolved at runtime via useCompanySettings() + lib/contact.ts
const MAPS_URL = "https://maps.google.com/?q=Zac+Mbao+Dakar+Senegal";
const CONTACT_EMAIL = "contact@sofitrans.sn";
const WHATSAPP_CHIP_STYLE = { backgroundColor: "#25D366" };

const SERVICE_OPTIONS = [
  { value: "Immobilier", label: "Immobilier" },
  { value: "Transport", label: "Transport & Logistique" },
  { value: "Agrobusiness", label: "Agrobusiness" },
  { value: "Formation", label: "Formation" },
];

type FormErrors = Partial<
  Record<
    keyof ContactFieldsInputs | "message" | "serviceType" | "requirements",
    string
  >
>;

interface TabbedFormProps {
  activeTab: "contact" | "devis";
  onTabChange: (tab: "contact" | "devis") => void;
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4"
      role="alert"
    >
      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
      <p className="text-sm font-medium text-destructive">{message}</p>
    </div>
  );
}

/* ─── Contact Form ─── */
function ContactForm() {
  const [contact, setContact] = useState<ContactFieldsInputs>({
    customerName: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const { mutate, isPending, isSuccess, isError } = useSubmitMessage();

  function setError(field: keyof FormErrors, msg: string) {
    setErrors((p) => ({ ...p, [field]: msg }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {
      message: message.trim() ? "" : "Le message est requis.",
    };
    for (const f of ["customerName", "email", "phone"] as const) {
      newErrors[f] = validateContactField(f, contact[f], false);
    }
    setErrors(newErrors);
    if (Object.values(newErrors).some((v) => v)) return;

    mutate({
      customerName: contact.customerName,
      email: contact.email,
      phone: contact.phone,
      message,
    });
  };

  if (isSuccess) {
    return (
      <SuccessConfirmation
        title="Message envoyé !"
        description="Votre message a bien été reçu. Nous vous répondrons dans les 24 heures ouvrables."
        ocid="contact-success"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {isError ? (
        <ErrorBanner message="Une erreur est survenue. Veuillez réessayer." />
      ) : null}
      <ContactFields
        idPrefix="contact-form"
        value={contact}
        onChange={setContact}
        errors={errors}
        phoneRequired={false}
        onBlurValidate={(f) =>
          setError(f, validateContactField(f, contact[f], false))
        }
      />
      <TextareaField
        label="Message"
        id="contact-form-message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onBlur={() =>
          setError("message", message.trim() ? "" : "Le message est requis.")
        }
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
  const [contact, setContact] = useState<ContactFieldsInputs>({
    customerName: "",
    email: "",
    phone: "",
  });
  const [serviceType, setServiceType] = useState("");
  const [requirements, setRequirements] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const { mutate, isPending, isSuccess, isError } = useSubmitQuote();

  function setError(field: keyof FormErrors, msg: string) {
    setErrors((p) => ({ ...p, [field]: msg }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    for (const f of ["customerName", "email", "phone"] as const) {
      newErrors[f] = validateContactField(f, contact[f], true);
    }
    setErrors(newErrors);
    if (Object.values(newErrors).some((v) => v)) return;

    mutate({
      customerName: contact.customerName,
      email: contact.email,
      phone: contact.phone,
      serviceType: serviceType || "Non précisé",
      requirements,
      budgetRange,
    });
  };

  if (isSuccess) {
    return (
      <SuccessConfirmation
        title="Demande de devis envoyée !"
        description="Votre demande a bien été reçue. Nous vous répondrons dans les 24 heures ouvrables avec une offre personnalisée."
        ocid="devis-success"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {isError ? (
        <ErrorBanner message="Une erreur est survenue. Veuillez réessayer." />
      ) : null}
      <ContactFields
        idPrefix="devis-form"
        value={contact}
        onChange={setContact}
        errors={errors}
        onBlurValidate={(f) =>
          setError(f, validateContactField(f, contact[f], true))
        }
      />
      <SelectField
        label="Service concerné"
        id="devis-form-service"
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
        options={SERVICE_OPTIONS}
        placeholder="Choisir un service"
        data-ocid="devis-form-service"
      />
      <TextareaField
        label="Description de vos besoins"
        id="devis-form-besoins"
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
        placeholder="Décrivez votre projet ou vos besoins en détail…"
        rows={4}
        data-ocid="devis-form-besoins"
      />
      <InputField
        label="Budget estimé"
        id="devis-form-budget"
        value={budgetRange}
        onChange={(e) => setBudgetRange(e.target.value)}
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

function FormsPanel({ activeTab, onTabChange }: TabbedFormProps) {
  return (
    <div className="lg:col-span-3">
      <div
        className="mb-6 flex rounded-xl border border-border bg-card p-1 shadow-corporate"
        role="tablist"
      >
        <button
          role="tab"
          aria-selected={activeTab === "contact"}
          onClick={() => onTabChange("contact")}
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
          onClick={() => onTabChange("devis")}
          type="button"
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
                Décrivez votre projet et recevez une offre personnalisée.
              </p>
            </div>
            <QuoteForm />
          </>
        )}
      </div>
    </div>
  );
}

function MapPanel() {
  return (
    <div className="lg:col-span-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="sticky top-24 flex flex-col gap-4"
      >
        <h2 className="font-display text-2xl font-bold text-foreground">
          Notre Localisation
        </h2>
        <div className="overflow-hidden rounded-2xl border border-border shadow-corporate">
          <div
            className="relative h-72 lg:h-96"
            style={{ backgroundColor: "#e8f5e9" }}
          >
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,transparent,transparent 31px,#81c784 31px,#81c784 32px),repeating-linear-gradient(90deg,transparent,transparent 31px,#81c784 31px,#81c784 32px)",
              }}
            />
            <div
              className="absolute left-0 right-0 top-1/2 h-3 -translate-y-1/2 opacity-40"
              style={{ backgroundColor: "#a5d6a7" }}
            />
            <div
              className="absolute bottom-0 left-1/2 top-0 w-3 -translate-x-1/2 opacity-40"
              style={{ backgroundColor: "#a5d6a7" }}
            />
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
      </motion.div>
    </div>
  );
}

function ContactHero() {
  return (
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
  );
}

export default function ContactPage() {
  const { data: settings } = useCompanySettings();
  const contact = resolveContact(settings);
  const whatsappHref = contact.whatsappHref ?? "https://wa.me/";
  const telHref = contact.phoneHref ?? "tel:";
  const [activeTab, setActiveTab] = useState<"contact" | "devis">("contact");

  return (
    <div className="flex flex-col">
      <ContactHero />

      {/* Info cards */}
      <section className="bg-background py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              icon={MapPin}
              title="Adresse"
              value="Zac Mbao, Rond Point Sipres, Dakar, Sénégal"
              delay={0}
            />
            <InfoCard
              icon={Phone}
              title="Téléphone"
              value={contact.phone}
              href={telHref}
              iconClassName="bg-blue-50 text-blue-700"
              delay={0.05}
            />
            <InfoCard
              icon={Mail}
              title="Email"
              value={CONTACT_EMAIL}
              href={`mailto:${CONTACT_EMAIL}`}
              delay={0.1}
            />
            <InfoCard
              icon={MessageSquare}
              title="WhatsApp"
              value="Discutez sur WhatsApp"
              href={whatsappHref}
              external
              iconClassName="text-white"
              iconStyle={WHATSAPP_CHIP_STYLE}
              ocid="contact-whatsapp-btn"
              delay={0.15}
            />
          </div>
        </div>
      </section>

      {/* Map + Forms */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-5">
            <MapPanel />
            <FormsPanel activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABar
        title="Besoin d'une réponse immédiate ?"
        description="Notre équipe est disponible pour vous accompagner. Appelez-nous directement ou contactez-nous sur WhatsApp."
        actions={
          <>
            <a
              href={telHref}
              className="inline-flex items-center gap-2.5 rounded-xl border-2 border-white px-8 py-3.5 text-sm font-bold transition-smooth hover:bg-white hover:text-blue-900 active:scale-95"
              data-ocid="cta-appel-btn"
            >
              <Phone className="h-5 w-5" />
              Appel direct
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-bold transition-smooth active:scale-95"
              style={{ backgroundColor: "#25D366" }}
              data-ocid="cta-whatsapp-btn"
            >
              <MessageSquare className="h-5 w-5" />
              WhatsApp
            </a>
          </>
        }
      />
    </div>
  );
}
