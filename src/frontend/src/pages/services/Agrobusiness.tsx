import { InputField } from "@/components/ui/InputField";
import { TextareaField } from "@/components/ui/TextareaField";
import { Button } from "@/components/ui/button";
import { useSubmitQuote } from "@/hooks/useBackend";
import type { QuoteInput } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  ShoppingBasket,
  Sprout,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const offerings = [
  {
    icon: Sprout,
    title: "Conseil en Agriculture",
    description:
      "Accompagnement technique et stratégique pour le développement de vos projets agricoles. Analyse de sol, choix des cultures, optimisation des rendements pour le contexte sénégalais et ouest-africain.",
    details: [
      "Études de faisabilité agricole",
      "Conseil en cultures tropicales",
      "Optimisation des intrants",
      "Formation des exploitants",
    ],
  },
  {
    icon: TrendingUp,
    title: "Investissement Agricole",
    description:
      "Opportunités d'investissement dans le secteur agricole sénégalais. Accompagnement pour les investisseurs locaux et internationaux souhaitant profiter du potentiel de l'agriculture africaine.",
    details: [
      "Identification d'opportunités",
      "Montage de business plans",
      "Accès au foncier agricole",
      "Partenariats stratégiques",
    ],
  },
  {
    icon: ShoppingBasket,
    title: "Commercialisation",
    description:
      "Mise en marché de vos productions agricoles au niveau local et à l'export. Accès aux marchés régionaux et internationaux via notre réseau de partenaires commerciaux.",
    details: [
      "Accès aux marchés locaux",
      "Export vers l'Europe et la diaspora",
      "Conditionnement et logistique",
      "Certification qualité",
    ],
  },
];

const stats = [
  { value: "14M", label: "Hectares de terres arables au Sénégal" },
  { value: "30%", label: "Du PIB sénégalais provient de l'agriculture" },
  { value: "60%", label: "De la population active dans le secteur" },
  { value: "2035", label: "Vision Sénégal cible l'agro-industrie" },
];

function InquiryForm() {
  const { mutate, isPending, isSuccess, isError } = useSubmitQuote();
  const [form, setForm] = useState<QuoteInput>({
    customerName: "",
    serviceType: "Agrobusiness",
    email: "",
    phone: "",
    requirements: "",
    budgetRange: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <CheckCircle2 className="w-14 h-14 text-primary" />
        <h3 className="text-2xl font-display font-bold text-foreground">
          Message envoyé !
        </h3>
        <p className="text-muted-foreground max-w-md">
          Merci pour votre intérêt. Notre équipe agrobusiness vous contactera
          sous 48h pour discuter de vos projets.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      data-ocid="agro-inquiry-form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Nom complet"
          required
          value={form.customerName}
          onChange={(e) =>
            setForm((f) => ({ ...f, customerName: e.target.value }))
          }
          placeholder="Votre nom"
          data-ocid="agro-name"
        />
        <InputField
          label="Téléphone"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          placeholder="+221 XX XXX XX XX"
          data-ocid="agro-phone"
        />
      </div>
      <InputField
        label="Email"
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        placeholder="votre@email.com"
        data-ocid="agro-email"
      />
      <InputField
        label="Budget estimé"
        value={form.budgetRange}
        onChange={(e) =>
          setForm((f) => ({ ...f, budgetRange: e.target.value }))
        }
        placeholder="Ex: 5 000 000 – 20 000 000 FCFA"
        data-ocid="agro-budget"
      />
      <TextareaField
        label="Décrivez votre projet"
        required
        value={form.requirements}
        onChange={(e) =>
          setForm((f) => ({ ...f, requirements: e.target.value }))
        }
        placeholder="Parlez-nous de votre projet, vos besoins et vos attentes..."
        rows={4}
        data-ocid="agro-requirements"
      />
      {isError && (
        <p className="text-sm text-destructive text-center" role="alert">
          Une erreur s'est produite. Veuillez réessayer.
        </p>
      )}
      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={isPending}
        data-ocid="agro-submit"
      >
        {isPending ? "Envoi en cours..." : "Soumettre ma demande"}
      </Button>
    </form>
  );
}

export default function AgrobusinessPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary py-16 px-4 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary-foreground translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="w-8 h-8" />
              <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
                Services
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Agrobusiness
            </h1>
            <p className="text-lg opacity-90 max-w-2xl leading-relaxed">
              L'Afrique de l'Ouest dispose d'un potentiel agricole immense. Nous
              vous accompagnons pour en tirer le meilleur parti.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/40 py-12 px-4 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-1"
              >
                <p className="text-3xl font-display font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service offerings */}
      <section className="bg-background py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Nos Domaines d'Expertise
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Une approche complète pour transformer vos projets agricoles en
              succès durables.
            </p>
          </motion.div>
          <div className="flex flex-col gap-8">
            {offerings.map((offering, index) => {
              const Icon = offering.icon;
              return (
                <motion.div
                  key={offering.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-corporate"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="p-4 bg-primary/10 rounded-xl h-fit shrink-0 self-start">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                        {offering.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-5">
                        {offering.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                        {offering.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-center gap-2 text-sm text-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-200"
                        data-ocid={`agro-cta-${index}`}
                      >
                        Nous contacter <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="bg-muted/40 py-16 px-4 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">
              Parlez-nous de votre projet
            </h2>
            <p className="text-muted-foreground">
              Remplissez ce formulaire et notre expert agrobusiness vous
              rappellera sous 48h.
            </p>
          </motion.div>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-corporate">
            <InquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
