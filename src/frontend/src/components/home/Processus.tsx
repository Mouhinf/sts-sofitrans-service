import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const PROCESS_STEPS = [
  {
    title: "Premier contact",
    description:
      "Vous décrivez votre besoin par formulaire, WhatsApp ou appel — sans engagement.",
  },
  {
    title: "Étude & devis",
    description:
      "Analyse sur 2 à 5 jours ouvrés, devis chiffré et planning indicatif fournis.",
  },
  {
    title: "Validation",
    description:
      "Signature du contrat, acompte convenu, calendrier d'exécution confirmé.",
  },
  {
    title: "Livraison",
    description:
      "Suivi pas à pas jusqu'à la remise finale, avec PV de livraison signé.",
  },
];

export function Processus() {
  return (
    <section
      className="bg-muted/30 py-20 border-y border-border"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <p className="text-primary font-semibold uppercase tracking-widest text-xs mb-3">
            Notre processus
          </p>
          <h2
            id="process-heading"
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            De la demande à la livraison
          </h2>
          <p className="text-muted-foreground">
            Un parcours clair, en quatre étapes, avec un interlocuteur unique à
            chaque phase.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-card border border-border rounded-2xl p-6 shadow-corporate"
            >
              <span className="absolute -top-4 left-6 font-display text-3xl font-bold text-primary/20">
                0{i + 1}
              </span>
              <p className="font-display text-lg font-bold text-foreground mb-2 mt-2">
                {step.title}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
            data-ocid="process-cta"
          >
            <Link to="/contact">
              Démarrer un projet
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
