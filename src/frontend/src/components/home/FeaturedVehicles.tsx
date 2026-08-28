import { CardSkeleton } from "@/components/shared/CardSkeleton";
import { VehicleCard } from "@/components/shared/VehicleCard";
import { Button } from "@/components/ui/button";
import { useVehicles } from "@/hooks/useBackend";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Truck } from "lucide-react";
import { motion } from "motion/react";

export function FeaturedVehicles() {
  const { data: vehicles, isLoading } = useVehicles();
  const featuredVehicles = (vehicles ?? []).slice(0, 3);

  return (
    <section
      className="bg-background py-20"
      data-ocid="vehicles-section"
      aria-labelledby="featured-vehicles-heading"
    >
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
            <h2
              id="featured-vehicles-heading"
              className="font-display text-3xl md:text-4xl font-bold text-foreground"
            >
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
                Voir tous les véhicules <ArrowRight className="ml-2 w-4 h-4" />
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
            <p className="text-sm">Nos véhicules seront bientôt disponibles.</p>
          </div>
        )}
      </div>
    </section>
  );
}
