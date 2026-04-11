import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useProperties,
  useSubscribeNewsletter,
  useVehicles,
} from "@/hooks/useBackend";
import type { Property, Vehicle } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Car,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Truck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ─── Utilities ────────────────────────────────────────────────────────────────

function formatFCFA(amount: bigint): string {
  return `${new Intl.NumberFormat("fr-FR").format(Number(amount))} FCFA`;
}

// ─── Static data ──────────────────────────────────────────────────────────────

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

const STATS = [
  { value: "15+", label: "Ans d'expérience", icon: Star },
  { value: "500+", label: "Clients satisfaits", icon: Users },
  { value: "50+", label: "Propriétés", icon: Building2 },
  { value: "100+", label: "Véhicules", icon: Car },
];

const TESTIMONIALS = [
  {
    name: "Amadou Diallo",
    company: "Import-Export Dakar",
    text: "STS SOFITRANS a transformé notre chaîne logistique. Service impeccable et équipe très professionnelle.",
    rating: 5,
  },
  {
    name: "Fatou Ndiaye",
    company: "Groupe Immobilier Sénégal",
    text: "Un partenaire de confiance pour tous nos projets immobiliers. Réactivité et expertise inégalées.",
    rating: 5,
  },
  {
    name: "Cheikh Mbaye",
    company: "Agro Distribution SA",
    text: "Grâce à STS, notre distribution agricole a gagné en efficacité. Je les recommande vivement.",
    rating: 5,
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function PropertyCard({
  property,
  index,
}: { property: Property; index: number }) {
  const hasImage = property.images.length > 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-xl overflow-hidden border border-border shadow-corporate hover-lift group"
      data-ocid="property-card"
    >
      <div className="relative h-52 overflow-hidden bg-muted">
        {hasImage ? (
          <img
            src={property.images[0].getDirectURL()}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <Building2 className="w-16 h-16 text-primary/30" />
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold capitalize">
          {property.propertyType}
        </Badge>
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-foreground text-lg leading-snug line-clamp-1 mb-1">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            {property.bedrooms.toString()} ch.
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            {property.bathrooms.toString()} sdb.
          </span>
        </div>
        <p className="text-primary font-display font-bold text-xl">
          {formatFCFA(property.price)}
        </p>
      </div>
    </motion.div>
  );
}

function VehicleCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const hasImage = vehicle.images.length > 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-xl overflow-hidden border border-border shadow-corporate hover-lift group"
      data-ocid="vehicle-card"
    >
      <div className="relative h-52 overflow-hidden bg-muted">
        {hasImage ? (
          <img
            src={vehicle.images[0].getDirectURL()}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/20 to-primary/20">
            <Truck className="w-16 h-16 text-secondary/30" />
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-semibold capitalize">
          {vehicle.vehicleType}
        </Badge>
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-foreground text-lg leading-snug line-clamp-1 mb-1">
          {vehicle.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {vehicle.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-secondary font-display font-bold text-xl">
            {formatFCFA(vehicle.pricePerDay)}
            <span className="text-muted-foreground text-sm font-normal font-body ml-1">
              /jour
            </span>
          </p>
          <span className="flex items-center gap-1 text-muted-foreground text-sm">
            <Users className="w-4 h-4" />
            {vehicle.capacity.toString()} pers.
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border">
      <Skeleton className="h-52 w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
      </div>
    </div>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess, isError } = useSubscribeNewsletter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) mutate(email.trim());
  };

  return (
    <section className="bg-muted/40 py-16 border-t border-border">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Restez informé
          </h2>
          <p className="text-muted-foreground mb-8">
            Recevez nos dernières offres immobilières et actualités directement
            dans votre boîte mail.
          </p>

          {isSuccess ? (
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Inscription réussie ! Merci de votre confiance.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                data-ocid="newsletter-email"
              />
              <Button
                type="submit"
                disabled={isPending}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
                data-ocid="newsletter-submit"
              >
                {isPending ? "Inscription..." : "S'inscrire"}
              </Button>
            </form>
          )}

          {isError && (
            <p className="text-destructive text-sm mt-3">
              Une erreur s'est produite. Veuillez réessayer.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const { data: properties, isLoading: propsLoading } = useProperties({});
  const { data: vehicles, isLoading: vecsLoading } = useVehicles({});

  const featuredProperties = (properties ?? []).slice(0, 3);
  const featuredVehicles = (vehicles ?? []).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* ── Hero ───────────────────────────────────────────────── */}
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
            {/* Logo + badge */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-elevated bg-white/10 flex items-center justify-center border border-white/20">
                <img
                  src="/assets/logo.jpg"
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
              "Pour Mieux Vous Servir !"
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

          {/* Right: service cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:grid grid-cols-2 gap-4"
          >
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-smooth"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                  <svc.icon className="w-5 h-5 text-white" />
                </div>
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

      {/* ── Services Grid ──────────────────────────────────────── */}
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
                <Link to={svc.href}>
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

      {/* ── Featured Properties ────────────────────────────────── */}
      <section
        className="bg-muted/30 py-20 border-y border-border"
        data-ocid="properties-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-primary font-semibold uppercase tracking-widest text-xs mb-2">
                Immobilier
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Propriétés en Vedette
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/5"
                asChild
                data-ocid="properties-view-all"
              >
                <Link to="/services/immobilier">
                  Voir toutes les propriétés{" "}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {propsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property, i) => (
                <PropertyCard
                  key={property.id.toString()}
                  property={property}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Building2 className="w-12 h-12 mx-auto mb-4 opacity-25" />
              <p className="font-medium mb-1">Propriétés à venir</p>
              <p className="text-sm">
                Notre catalogue sera bientôt disponible.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Featured Vehicles ──────────────────────────────────── */}
      <section className="bg-background py-20" data-ocid="vehicles-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-secondary font-semibold uppercase tracking-widest text-xs mb-2">
                Transport
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Nos Véhicules
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="outline"
                className="border-secondary/30 text-secondary hover:bg-secondary/5"
                asChild
                data-ocid="vehicles-view-all"
              >
                <Link to="/services/transport">
                  Voir tous les véhicules{" "}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {vecsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : featuredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map((vehicle, i) => (
                <VehicleCard
                  key={vehicle.id.toString()}
                  vehicle={vehicle}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Truck className="w-12 h-12 mx-auto mb-4 opacity-25" />
              <p className="font-medium mb-1">Flotte à venir</p>
              <p className="text-sm">
                Nos véhicules seront bientôt disponibles.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Statistics ─────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.1 145) 0%, oklch(0.2 0.12 249) 100%)",
        }}
        data-ocid="stats-section"
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white/60" />
                </div>
                <p className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-white/55 text-sm font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────── */}
      <section className="bg-muted/30 py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary font-semibold uppercase tracking-widest text-xs mb-3">
              Témoignages
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Ce que disent nos clients
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full shadow-corporate hover-lift">
                  <CardContent className="p-6">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={`star-${t.name}-${j}`}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4 italic text-sm">
                      "{t.text}"
                    </p>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────── */}
      <section className="bg-background py-20" data-ocid="cta-section">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-semibold uppercase tracking-widest text-xs mb-4">
              Travaillons ensemble
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Prêt à travailler avec nous ?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Notre équipe d'experts est disponible pour répondre à toutes vos
              questions et vous accompagner dans vos projets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#25D366] text-white hover:bg-[#25D366]/90 font-semibold gap-2 shadow-corporate px-8"
                asChild
                data-ocid="cta-whatsapp"
              >
                <a
                  href="https://wa.me/221770000000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/5 gap-2 px-8"
                asChild
                data-ocid="cta-devis"
              >
                <Link to="/contact">
                  <Phone className="w-5 h-5" />
                  Demander un devis
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ─────────────────────────────────────────── */}
      <NewsletterSection />
    </div>
  );
}
