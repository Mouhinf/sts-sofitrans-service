import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const SERVICE_HIGHLIGHTS = [
  {
    icon: "Building2",
    title: "Immobilier",
    description: "Achat, vente et location de biens de prestige.",
  },
  {
    icon: "Truck",
    title: "Transport",
    description: "Solutions professionnelles et logistique intégrée.",
  },
  {
    icon: "Leaf",
    title: "Agrobusiness",
    description: "Conseil et investissement agricole moderne.",
  },
  {
    icon: "GraduationCap",
    title: "Formation",
    description: "Formations certifiées pour booster votre carrière.",
  },
];

export function Hero() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.22 0.1 145) 0%, oklch(0.18 0.12 249) 60%, oklch(0.12 0.08 249) 100%)",
      }}
      data-ocid="hero-section"
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-logistics.dim_1200x700.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Radial glows */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 80%, oklch(0.55 0.15 145) 0%, transparent 45%), radial-gradient(circle at 85% 20%, oklch(0.55 0.15 249) 0%, transparent 45%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-elevated bg-white/10 flex items-center justify-center border border-white/20">
              <img
                src="/assets/logo-mark.svg"
                alt="Logo STS SOFITRANS SERVICE"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-0.5">
                Dakar, Sénégal
              </p>
              <p className="text-white/80 text-sm font-medium">
                Votre partenaire de confiance
              </p>
            </div>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            STS SOFITRANS
            <br />
            <span className="text-white/85">SERVICE</span>
          </h1>

          <p className="font-display text-xl md:text-2xl italic text-white/75 mb-6 font-medium">
            "Pour Mieux Vous Servir."
          </p>

          <p className="text-white/65 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            Solutions d'excellence en immobilier, transport professionnel,
            agrobusiness et formation au Sénégal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-elevated font-semibold px-8 w-full sm:w-auto"
              asChild
              data-ocid="hero-cta-services"
            >
              <Link to="/services">
                Découvrir nos services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/40 text-white bg-transparent hover:bg-white/10 px-8 w-full sm:w-auto"
              asChild
              data-ocid="hero-cta-contact"
            >
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </motion.div>

        {/* Right: service tiles (visual catalogue) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:grid grid-cols-2 gap-4"
        >
          {SERVICE_HIGHLIGHTS.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-smooth"
            >
              <p className="font-display font-bold text-white text-sm mb-1">
                {svc.title}
              </p>
              <p className="text-white/55 text-xs leading-relaxed">
                {svc.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, oklch(0.98 0 0 / 0.08), transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
