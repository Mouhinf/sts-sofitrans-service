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

// ── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "15+", label: "Ans d'expérience" },
  { value: "500+", label: "Clients satisfaits" },
  { value: "4", label: "Secteurs d'activité" },
  { value: "100%", label: "Engagement qualité" },
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

const TEAM = [
  {
    initials: "MD",
    name: "Moussa Diallo",
    title: "Directeur Général",
    gradientClass: "from-primary to-primary/70",
    quote: "L'excellence au service du progrès",
  },
  {
    initials: "AF",
    name: "Aissatou Fall",
    title: "Responsable Immobilier",
    gradientClass: "from-secondary to-secondary/70",
    quote: "Trouver votre espace de vie idéal",
  },
  {
    initials: "IS",
    name: "Ibrahim Sow",
    title: "Chef Transport & Logistique",
    gradientClass: "from-primary/80 to-secondary/80",
    quote: "Chaque livraison, une promesse tenue",
  },
];

const SECTORS = [
  "Transport & Logistique",
  "Immobilier",
  "Agrobusiness",
  "Formation",
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[480px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/about-company-hero.dim_1400x600.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-ocid="about-hero"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.25_0.14_136/0.92)] via-[oklch(0.20_0.10_200/0.85)] to-[oklch(0.22_0.16_249/0.90)]" />

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
              agrobusiness et formation professionnelle depuis plus de 15 ans au
              Sénégal.
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
                Plus de 15 ans d'expertise au service de nos clients
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
                    "Pour Mieux Vous Servir !"
                  </em>
                  , traduit notre engagement quotidien envers l'excellence.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {SECTORS.map((sector) => (
                  <span
                    key={sector}
                    className="inline-flex items-center gap-1.5 bg-primary/8 border border-primary/20 text-primary text-sm px-3 py-1.5 rounded-full font-medium"
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
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src="/assets/generated/about-team-story.dim_700x500.jpg"
                  alt="L'équipe STS SOFITRANS SERVICE"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-sm">
                    L'équipe STS SOFITRANS SERVICE — Dakar, Sénégal
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-white rounded-xl px-5 py-4 shadow-elevated hidden sm:block">
                <div className="font-display text-2xl font-bold">15+</div>
                <div className="text-xs text-white/80">Ans d'expertise</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/30" data-ocid="about-mission-vision">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20 text-xs uppercase tracking-widest">
              Ce qui nous guide
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Mission & Vision
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {MISSIONS.map((item, index) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.15 }}
                  className={`bg-gradient-to-br ${item.gradientClass} border ${item.borderClass} rounded-2xl p-8 hover-lift`}
                >
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-5 shadow-corporate">
                    <Icon className={`w-6 h-6 ${item.iconClass}`} />
                  </div>
                  <h3
                    className={`font-display text-xl font-bold mb-3 ${item.iconClass}`}
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

      {/* ── Notre Équipe ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/30" data-ocid="about-equipe">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20 text-xs uppercase tracking-widest">
              Les hommes & femmes derrière STS
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Notre Équipe
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Des professionnels passionnés, experts dans leurs domaines, unis
              par la même vision d'excellence au service de l'Afrique de
              l'Ouest.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {TEAM.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                className="bg-card border border-border rounded-2xl p-8 text-center hover-lift"
              >
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradientClass} flex items-center justify-center mx-auto mb-5 shadow-elevated`}
                >
                  <span className="font-display text-2xl font-bold text-white">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-3">
                  {member.title}
                </p>
                <p className="text-muted-foreground text-xs italic leading-relaxed">
                  "{member.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section
        className="py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden"
        data-ocid="about-cta"
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/70 text-sm uppercase tracking-widest mb-3 font-medium">
              Construisons ensemble
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight max-w-2xl mx-auto">
              Rejoignez notre réseau de partenaires
            </h2>
            <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Que vous soyez entrepreneur, investisseur ou particulier, nous
              avons les solutions adaptées à vos ambitions. Prenons contact.
            </p>
            <Link to="/contact" data-ocid="about-cta-btn">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-base rounded-xl shadow-elevated transition-smooth group"
              >
                Nous contacter
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
