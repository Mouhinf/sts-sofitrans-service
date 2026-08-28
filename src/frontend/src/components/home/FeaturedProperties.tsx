import { CardSkeleton } from "@/components/shared/CardSkeleton";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { Button } from "@/components/ui/button";
import { useProperties } from "@/hooks/useBackend";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2 } from "lucide-react";
import { motion } from "motion/react";

export function FeaturedProperties() {
  const { data: properties, isLoading } = useProperties();
  const featuredProperties = (properties ?? []).slice(0, 3);

  return (
    <section
      className="bg-muted/30 py-20 border-y border-border"
      data-ocid="properties-section"
      aria-labelledby="featured-properties-heading"
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
            <h2
              id="featured-properties-heading"
              className="font-display text-3xl md:text-4xl font-bold text-foreground"
            >
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

        {isLoading ? (
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
            <p className="text-sm">Notre catalogue sera bientôt disponible.</p>
          </div>
        )}
      </div>
    </section>
  );
}
