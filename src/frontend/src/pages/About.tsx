import { CTABar } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

// Factual company data — no fabricated numbers.
const STATS = [
  { value: "4", label: "Secteurs d'activité" },
  { value: "1", label: "Siège à Dakar" },
  { value: "100%", label: "Engagement qualité" },
  { value: "365j/7", label: "Disponibilité" },
];

const MISSIONS = [
  {
    key: "mission",
    title: "Notre Mission",
    Icon: CheckCircle2,
    gradientClass: "from-primary/10 to-primary/5",
    borderClass: "border-primary/30",
    iconClass: "text-primary",
    text: "Connecter entreprises et particuliers avec des opportunités immobilières de qualité, des solutions de transport fiables, des projets agribusiness rentables et des formations professionnelles d'excellence — pour mieux vous servir à chaque étape.",
  },
  {
    key: "vision",
    title: "Notre Vision",
    Icon: Star,
    gradientClass: "from-secondary/10 to-secondary/5",
    borderClass: "border-secondary/30",
    iconClass: "text-secondary",
    text: "Devenir la référence incontournable des services multi-sectoriels en Afrique de l'Ouest : un groupe intégré qui inspire confiance, crée de la valeur et contribue au développement économique de la région à l'horizon 2035.",
  },
];

const VALUES = [
  {
    Icon: Shield,
    title: "Confiance",
    description:
      "Chaque engagement est tenu. Nous bâtissons des relations durables fondées sur la transparence et l'intégrité absolue envers nos clients et partenaires.",
  },
  {
    Icon: Star,
    title: "Excellence",
    description:
      "Nous visons l'excellence dans chaque prestation, en combinant expertise locale et standards internationaux pour dépasser les attentes.",
  },
  {
    Icon: Lightbulb,
    title: "Innovation",
    description:
      "Nous adoptons les meilleures pratiques et technologies pour proposer des solutions modernes adaptées aux réalités du marché ouest-africain.",
  },
  {
    Icon: Users,
    title: "Proximité",
    description:
      "Présents à vos côtés à chaque étape, nos équipes offrent un accompagnement personnalisé, réactif et humain — au Sénégal et au-delà.",
  },
];

const SECTORS = [
  "Transport & Logistique",
  "Immobilier",
  "Agrobusiness",
  "Formation",
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[480px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[oklch(0.25_0.14_136)] via-[oklch(0.20_0.10_200)] to-[oklch(0.22_0.16_249)]"
        data-ocid="about-hero"
      >
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30 text-sm px-4 py-1.5 backdrop-blur-sm">
              STS SOFITRANS SERVICE
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              À propos de nous
            </h1>
            <p className="text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Votre partenaire de confiance en logistique, immobilier,
              agrobusiness et formation professionnelle au Sénégal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-4 text-center"
              >
                <div className="font-display text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-white/70 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Notre Histoire ───────────────────────────────────────────────── */}
      <section className="py-20 bg-background" data-ocid="about-histoire">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs uppercase tracking-widest">
                Notre Histoire
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
                Un groupe multi-services ancré au Sénégal
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fondée à Dakar avec la conviction que l'Afrique de l'Ouest
                  mérite des services professionnels de classe mondiale,{" "}
                  <strong className="text-foreground">
                    STS SOFITRANS SERVICE
                  </strong>{" "}
                  a progressivement construit un groupe multi-services ancré
                  dans les réalités du terrain sénégalais.
                </p>
                <p>
                  De ses débuts dans le transport et la logistique, la société a
                  étendu son expertise à l'immobilier résidentiel et commercial,
                  à l'agrobusiness, et à la formation professionnelle — quatre
                  piliers complémentaires qui répondent aux besoins croissants
                  des entreprises et des particuliers.
                </p>
                <p>
                  Établis à{" "}
                  <strong className="text-foreground">
                    Zac Mbao, Rond Point Sipres, Dakar
                  </strong>
                  , nous opérons à travers tout le Sénégal et accompagnons nos
                  clients dans leur expansion régionale. Notre slogan,{" "}
                  <em className="text-primary font-semibold">
                    « Pour Mieux Vous Servir ! »
                  </em>
                  , traduit notre engagement quotidien envers l'excellence.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {SECTORS.map((sector) => (
                  <span
                    key={sector}
                    className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-sm px-3 py-1.5 rounded-full font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                    {sector}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 lg:p-10 border border-border">
                <div className="grid grid-cols-2 gap-4">
                  {MISSIONS.map((item, i) => {
                    const Icon = item.Icon;
                    return (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`bg-card rounded-2xl p-5 border-2 ${item.borderClass} bg-gradient-to-br ${item.gradientClass}`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-corporate">
                          <Icon className={`w-5 h-5 ${item.iconClass}`} />
                        </div>
                        <h3
                          className={`font-display text-lg font-bold mb-2 ${item.iconClass}`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {item.text}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Nos Valeurs ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-background" data-ocid="about-valeurs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs uppercase tracking-widest">
              Nos piliers
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Nos Valeurs
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Quatre piliers fondamentaux qui guident chacune de nos actions et
              décisions depuis notre création.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, index) => {
              const Icon = val.Icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 text-center group hover-lift cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary transition-smooth">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-smooth" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">
                    {val.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CTABar
        title="Rejoignez notre réseau de partenaires"
        description="Que vous soyez entrepreneur, investisseur ou particulier, nous avons les solutions adaptées à vos ambitions. Prenons contact."
        actions={
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/30"
            data-ocid="about-cta-btn"
          >
            <Link to="/contact">
              Nous contacter
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        }
        backgroundClassName="bg-gradient-to-br from-primary via-primary/90 to-secondary"
      />
    </div>
  );
}
