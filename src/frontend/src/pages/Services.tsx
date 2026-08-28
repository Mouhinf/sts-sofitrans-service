import { useCompanySettings } from "@/hooks/useBackend";
import { resolveContact } from "@/lib/contact";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Leaf,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Building2,
    title: "Immobilier",
    description:
      "Achat, vente et location de biens immobiliers à Dakar et environs. Un catalogue complet d'appartements, maisons, terrains et bureaux.",
    href: "/services/immobilier",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badge: "Catalogue disponible",
  },
  {
    icon: Truck,
    title: "Transport",
    description:
      "Location et affrètement de véhicules professionnels. Voitures, bus, camions et minibus pour tous vos besoins de mobilité.",
    href: "/services/transport",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    badge: "Réservation en ligne",
  },
  {
    icon: Leaf,
    title: "Agrobusiness",
    description:
      "Conseil, investissement et développement en agrobusiness. Opportunités agricoles durables au Sénégal et en Afrique de l'Ouest.",
    href: "/services/agrobusiness",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badge: "Conseil & Investissement",
  },
  {
    icon: GraduationCap,
    title: "Formation",
    description:
      "Formations professionnelles certifiées en logistique et gestion. Développez vos compétences avec nos experts du secteur.",
    href: "/services/formation",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    badge: "Certifié",
  },
];

export default function ServicesPage() {
  const { data: settings } = useCompanySettings();
  const contact = resolveContact(settings);
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary py-20 px-4 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-foreground translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-foreground -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-3 opacity-80">
              STS SOFITRANS SERVICE
            </p>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-5 leading-tight">
              Nos Services
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl leading-relaxed">
              Une plateforme multi-service complète pour répondre à tous vos
              besoins : immobilier, transport, agrobusiness et formation
              professionnelle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-background py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={service.href}
                    className="group block bg-card border border-border rounded-2xl p-8 shadow-corporate hover-lift hover:border-primary/30 transition-smooth h-full"
                    data-ocid={`service-card-${service.title.toLowerCase()}`}
                  >
                    <div className="flex items-start gap-5">
                      <div
                        className={`p-4 rounded-xl ${service.iconBg} shrink-0 group-hover:scale-110 transition-smooth`}
                      >
                        <Icon className={`w-8 h-8 ${service.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h2 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                            {service.title}
                          </h2>
                          <span className="text-xs font-semibold bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                            {service.badge}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-5">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                          <span>Découvrir</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-muted/40 py-16 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Besoin d'un service personnalisé ?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Notre équipe est disponible pour répondre à toutes vos demandes
              spécifiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-smooth shadow-corporate"
                data-ocid="services-contact-cta"
              >
                Nous contacter
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={contact.whatsappHref ?? "https://wa.me/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground px-8 py-3.5 rounded-xl font-semibold hover:border-primary/40 transition-smooth shadow-corporate"
                data-ocid="services-whatsapp-cta"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
