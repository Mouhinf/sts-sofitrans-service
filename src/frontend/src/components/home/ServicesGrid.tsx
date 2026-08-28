import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  ChevronRight,
  GraduationCap,
  Leaf,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";

const SERVICES = [
  {
    icon: Building2,
    title: "Immobilier",
    description:
      "Achat, vente et location de biens immobiliers de prestige au Sénégal.",
    href: "/services/immobilier",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Truck,
    title: "Transport",
    description: "Solutions de transport professionnel et logistique intégrée.",
    href: "/services/transport",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Leaf,
    title: "Agrobusiness",
    description:
      "Investissement et conseil en agrobusiness pour une agriculture moderne.",
    href: "/services/agrobusiness",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: GraduationCap,
    title: "Formation",
    description:
      "Formations professionnelles certifiées pour booster votre carrière.",
    href: "/services/formation",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
];

export function ServicesGrid() {
  return (
    <section className="bg-background py-20" data-ocid="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold uppercase tracking-widest text-xs mb-3">
            Nos Domaines
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Des services d'excellence
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Nous vous accompagnons dans tous vos projets avec expertise et
            professionnalisme.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={svc.href}
                aria-label={`En savoir plus sur ${svc.title}`}
              >
                <Card
                  className="h-full hover-lift border-border hover:border-primary/30 group cursor-pointer"
                  data-ocid={`service-card-${svc.title.toLowerCase()}`}
                >
                  <CardContent className="p-8 flex flex-col gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl ${svc.bg} flex items-center justify-center`}
                    >
                      <svc.icon className={`w-7 h-7 ${svc.color}`} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">
                        {svc.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {svc.description}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm font-semibold mt-auto ${svc.color} group-hover:gap-2 transition-smooth`}
                    >
                      En savoir plus <ChevronRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
