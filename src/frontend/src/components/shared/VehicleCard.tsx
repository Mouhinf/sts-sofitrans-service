import { Badge } from "@/components/ui/badge";
import type { Vehicle } from "@/types";
import { cn } from "@/lib/utils";
import { Truck, Users } from "lucide-react";
import { motion } from "motion/react";
import type { KeyboardEvent } from "react";
import { formatFCFA } from "./format";

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
  onClick?: () => void;
  className?: string;
}

export function VehicleCard({
  vehicle,
  index = 0,
  onClick,
  className,
}: VehicleCardProps) {
  const imageUrl = vehicle.images[0]?.url;
  const hasImage = !!imageUrl;
  const interactive = !!onClick;

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "bg-card rounded-xl overflow-hidden border border-border shadow-corporate hover-lift group",
        interactive &&
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
        className,
      )}
      data-ocid="vehicle-card"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      <div className="relative h-52 overflow-hidden bg-muted">
        {hasImage ? (
          <img
            src={imageUrl}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
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
            {vehicle.capacity} pers.
          </span>
        </div>
      </div>
    </motion.div>
  );
}
