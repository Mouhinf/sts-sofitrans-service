import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Training } from "@/types";
import { Clock, GraduationCap, Users } from "lucide-react";
import { motion } from "motion/react";
import type { KeyboardEvent } from "react";
import { formatFCFA } from "./format";

interface TrainingCardProps {
  training: Training;
  index?: number;
  /** When provided, the card becomes an interactive button. */
  onClick?: () => void;
  className?: string;
}

export function TrainingCard({
  training,
  index = 0,
  onClick,
  className,
}: TrainingCardProps) {
  const imageUrl = training.image?.getDirectURL();
  const enrolled = training.enrollments.length;
  const capacity = Number(training.maxCapacity);
  const isFull = enrolled >= capacity;
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
        "group bg-card border border-border rounded-xl overflow-hidden shadow-corporate hover-lift",
        interactive &&
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
      data-ocid={`training-card-${training.id}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      <div className="relative h-44 overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={training.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <GraduationCap className="w-16 h-16 text-primary/30" />
          </div>
        )}
        {isFull ? (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="bg-card text-foreground text-sm font-semibold px-3 py-1 rounded-full">
              Complet
            </span>
          </div>
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {training.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {training.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="flex items-center gap-1 text-xs">
            <Clock className="w-3 h-3" />
            {training.durationDays.toString()} jours
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 text-xs">
            <Users className="w-3 h-3" />
            {enrolled}/{capacity} inscrits
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-primary font-bold text-lg">
            {formatFCFA(training.price)}
          </p>
          <Button
            size="sm"
            onClick={onClick}
            disabled={isFull}
            className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            data-ocid={`enroll-${training.id}`}
          >
            {isFull ? "Complet" : "S'inscrire"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
