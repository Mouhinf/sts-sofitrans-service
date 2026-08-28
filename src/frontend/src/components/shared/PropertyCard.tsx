import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Property } from "@/types";
import { Bath, BedDouble, Building2, MapPin } from "lucide-react";
import { motion } from "motion/react";
import type { KeyboardEvent } from "react";
import { formatFCFA } from "./format";

interface PropertyCardProps {
  property: Property;
  index?: number;
  /** When provided, the card becomes an interactive button. */
  onClick?: () => void;
  className?: string;
}

export function PropertyCard({
  property,
  index = 0,
  onClick,
  className,
}: PropertyCardProps) {
  const hasImage = property.images.length > 0;
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
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
      data-ocid="property-card"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      <div className="relative h-52 overflow-hidden bg-muted">
        {hasImage ? (
          <img
            src={property.images[0].getDirectURL()}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
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
