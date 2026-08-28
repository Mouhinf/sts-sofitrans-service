import { CheckCircle2, FileText, MessageCircle, Users } from "lucide-react";
import { motion } from "motion/react";

// Verifiable commitments only — no fabricated counts or testimonials.
const ENGAGEMENTS = [
  {
    title: "Réponse sous 24 h",
    description:
      "Toute demande reçoit une première réponse écrite en moins d'une journée ouvrable.",
    icon: MessageCircle,
  },
  {
    title: "Devis détaillé",
    description:
      "Chaque proposition chiffre ligne par ligne — pas de frais cachés ni de conditions ambiguës.",
    icon: CheckCircle2,
  },
  {
    title: "Interlocuteur unique",
    description:
      "Un référent dédié suit votre dossier du premier contact jusqu'à la livraison.",
    icon: Users,
  },
  {
    title: "Documents à jour",
    description:
      "Contrats, factures et attestations conformes à la réglementation sénégalaise.",
    icon: FileText,
  },
];

export function Engagements() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.22 0.1 145) 0%, oklch(0.2 0.12 249) 100%)",
      }}
      data-ocid="engagements-section"
      aria-labelledby="engagements-heading"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-white/60 font-semibold uppercase tracking-widest text-xs mb-3">
            Nos engagements
          </p>
          <h2
            id="engagements-heading"
            className="font-display text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Quatre principes au quotidien
          </h2>
          <p className="text-white/70 text-base">
            Nous nous engageons sur des principes vérifiables, pas sur des
            promesses.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGAGEMENTS.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/30 flex items-center justify-center mb-4">
                <e.icon className="w-5 h-5 text-white" />
              </div>
              <p className="font-display text-lg font-bold text-white mb-2">
                {e.title}
              </p>
              <p className="text-white/65 text-sm leading-relaxed">
                {e.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
