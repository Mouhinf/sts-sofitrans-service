import { InputField } from "@/components/ui/InputField";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEnrollInTraining, useTrainings } from "@/hooks/useBackend";
import type { EnrollmentInput, Training } from "@/types";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function formatFCFA(amount: bigint): string {
  return `${new Intl.NumberFormat("fr-FR").format(Number(amount))} FCFA`;
}

function TrainingCard({
  training,
  onClick,
}: {
  training: Training;
  onClick: () => void;
}) {
  const imageUrl =
    training.image?.getDirectURL() ?? "/assets/images/placeholder.svg";
  const enrolled = training.enrollments.length;
  const capacity = Number(training.maxCapacity);
  const isFull = enrolled >= capacity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-card border border-border rounded-xl overflow-hidden shadow-corporate hover-lift"
      data-ocid={`training-card-${training.id}`}
    >
      <div className="relative h-44 overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={training.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        {isFull && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="bg-card text-foreground text-sm font-semibold px-3 py-1 rounded-full">
              Complet
            </span>
          </div>
        )}
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
            {String(training.durationDays)} jours
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

function EnrollmentForm({
  training,
  onSuccess,
}: {
  training: Training;
  onSuccess: () => void;
}) {
  const { mutate, isPending, isSuccess, isError } = useEnrollInTraining();
  const [form, setForm] = useState<EnrollmentInput>({
    trainingId: training.id,
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, { onSuccess });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <CheckCircle2 className="w-12 h-12 text-primary" />
        <h3 className="text-xl font-display font-bold text-foreground">
          Inscription confirmée !
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Votre inscription à <strong>{training.title}</strong> a été
          enregistrée. Vous recevrez les détails de la formation par email.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      data-ocid="enrollment-form"
    >
      <div className="bg-muted/50 rounded-lg p-4 border border-border mb-2">
        <p className="text-sm font-semibold text-foreground">
          {training.title}
        </p>
        <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {String(training.durationDays)} jours
          </span>
          <span className="font-medium text-primary">
            {formatFCFA(training.price)}
          </span>
        </div>
      </div>
      <InputField
        label="Nom complet"
        required
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        placeholder="Votre nom"
        data-ocid="enrollment-name"
      />
      <InputField
        label="Email"
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        placeholder="votre@email.com"
        data-ocid="enrollment-email"
      />
      <InputField
        label="Téléphone"
        type="tel"
        required
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        placeholder="+221 XX XXX XX XX"
        data-ocid="enrollment-phone"
      />
      {isError && (
        <p className="text-sm text-destructive text-center" role="alert">
          Une erreur s'est produite. Veuillez réessayer.
        </p>
      )}
      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={isPending}
        data-ocid="enrollment-submit"
      >
        {isPending ? "Inscription en cours..." : "Confirmer l'inscription"}
      </Button>
    </form>
  );
}

const benefits = [
  { icon: BookOpen, label: "Formateurs experts" },
  { icon: GraduationCap, label: "Certifications reconnues" },
  { icon: Users, label: "Groupes de 10 à 30 personnes" },
  { icon: Clock, label: "Formations courtes et intensives" },
];

export default function FormationPage() {
  const { data: trainings, isLoading } = useTrainings();
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(
    null,
  );

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary py-16 px-4 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary-foreground translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-8 h-8" />
              <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
                Services
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Formation
            </h1>
            <p className="text-lg opacity-90 max-w-2xl leading-relaxed">
              Des formations professionnelles certifiées pour développer vos
              compétences en logistique, transport et gestion d'entreprise.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-foreground/30 transition-smooth"
                data-ocid="contact-nous-cta"
              >
                <GraduationCap className="w-4 h-4" />
                Nous contacter
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/40 py-10 px-4 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {benefit.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Training grid */}
      <section className="bg-background py-12 px-4 min-h-[400px]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Nos Formations Disponibles
            </h2>
            {trainings && trainings.length > 0 && (
              <p className="text-muted-foreground text-sm">
                {trainings.length} formation
                {trainings.length > 1 ? "s" : ""} disponible
                {trainings.length > 1 ? "s" : ""}
              </p>
            )}
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => (
                <Skeleton key={sk} className="h-64 rounded-xl" />
              ))}
            </div>
          ) : !trainings?.length ? (
            <div
              className="flex flex-col items-center gap-4 py-20 text-center"
              data-ocid="empty-trainings"
            >
              <GraduationCap className="w-16 h-16 text-muted-foreground/40" />
              <h3 className="text-xl font-display font-semibold text-foreground">
                Aucune formation disponible
              </h3>
              <p className="text-muted-foreground max-w-sm">
                Nos prochaines formations seront annoncées bientôt.
                Contactez-nous pour être informé en priorité.
              </p>
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
              >
                <a
                  href="https://wa.me/221770000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="empty-whatsapp-cta"
                >
                  Être informé via WhatsApp
                </a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainings.map((training) => (
                <TrainingCard
                  key={String(training.id)}
                  training={training}
                  onClick={() => setSelectedTraining(training)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enrollment modal */}
      <Modal
        isOpen={!!selectedTraining}
        onClose={() => setSelectedTraining(null)}
        title="Inscription à la formation"
        size="md"
      >
        {selectedTraining && (
          <EnrollmentForm
            training={selectedTraining}
            onSuccess={() => setSelectedTraining(null)}
          />
        )}
      </Modal>
    </div>
  );
}
