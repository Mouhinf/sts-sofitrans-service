import {
  CatalogGrid,
  ContactFields,
  type ContactFieldsInputs,
  ServiceHero,
  SuccessConfirmation,
  TrainingCard,
  formatFCFA,
  validateContactField,
} from "@/components/shared";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import {
  useCompanySettings,
  useEnrollInTraining,
  useTrainings,
} from "@/hooks/useBackend";
import { resolveContact } from "@/lib/contact";
import type { Training } from "@/types";
import { Award, BookOpen, Clock, GraduationCap, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const benefits = [
  { icon: GraduationCap, label: "Formations certifiées" },
  { icon: BookOpen, label: "Supports inclus" },
  { icon: Users, label: "Cohortes restreintes" },
  { icon: Award, label: "Attestation officielle" },
];

function EnrollmentForm({
  training,
  onSuccess,
}: {
  training: Training;
  onSuccess: () => void;
}) {
  const { mutate, isPending, isSuccess, isError } = useEnrollInTraining();
  const [contact, setContact] = useState<ContactFieldsInputs>({
    customerName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFieldsInputs, string>>
  >({});

  function setError(field: keyof typeof errors, msg: string) {
    setErrors((prev) => ({ ...prev, [field]: msg }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    for (const f of ["customerName", "email", "phone"] as const) {
      newErrors[f] = validateContactField(f, contact[f], true);
    }
    setErrors(newErrors);
    if (Object.values(newErrors).some((v) => v)) return;

    mutate(
      {
        trainingId: training.id,
        name: contact.customerName,
        email: contact.email,
        phone: contact.phone,
      },
      { onSuccess },
    );
  };

  if (isSuccess) {
    return (
      <SuccessConfirmation
        title="Inscription confirmée !"
        description={
          <>
            Votre inscription à <strong>{training.title}</strong> a été
            enregistrée. Vous recevrez les détails de la formation par email.
          </>
        }
        ocid="enrollment-success"
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      data-ocid="enrollment-form"
      noValidate
    >
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <p className="text-sm font-semibold text-foreground">
          {training.title}
        </p>
        <div className="flex flex-wrap gap-4 mt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {training.durationDays.toString()} jours
          </span>
          <span className="font-semibold text-primary">
            {formatFCFA(training.price)}
          </span>
        </div>
      </div>
      <ContactFields
        idPrefix="enroll"
        value={contact}
        onChange={setContact}
        errors={errors}
        onBlurValidate={(f) =>
          setError(f, validateContactField(f, contact[f], true))
        }
      />
      {isError ? (
        <p className="text-destructive text-sm text-center" role="alert">
          Une erreur est survenue. Veuillez réessayer.
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        data-ocid="enrollment-submit"
      >
        {isPending ? "Envoi en cours..." : "Confirmer mon inscription"}
      </Button>
    </form>
  );
}

export default function FormationPage() {
  const { data: trainings, isLoading } = useTrainings();
  const { data: settings } = useCompanySettings();
  const contact = resolveContact(settings);
  const [selected, setSelected] = useState<Training | null>(null);

  const totalCount = trainings?.length ?? 0;

  return (
    <div className="flex flex-col">
      <ServiceHero
        title="Formation"
        subtitle="Des formations professionnelles certifiées pour développer vos compétences en logistique, transport, gestion d'entreprise et agrobusiness."
        actions={
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/30"
            data-ocid="formation-hero-cta"
          >
            <a href="/contact">Nous contacter</a>
          </Button>
        }
      />

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

      {/* Trainings grid */}
      <section className="bg-background py-12 px-4 min-h-[400px]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Nos Formations Disponibles
            </h2>
            {totalCount > 0 ? (
              <p className="text-muted-foreground text-sm">
                {totalCount} formation{totalCount > 1 ? "s" : ""} disponible
                {totalCount > 1 ? "s" : ""}
              </p>
            ) : null}
          </div>
          <CatalogGrid
            items={trainings ?? []}
            isLoading={isLoading}
            skeletonCount={6}
            skeletonHeight={64}
            emptyIcon={GraduationCap}
            emptyTitle="Aucune formation disponible"
            emptyDescription="Nos prochaines sessions seront annoncées bientôt. Contactez-nous pour être informé en priorité."
            emptyAction={
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="empty-whatsapp-cta"
              >
                <a
                  href={contact.whatsappHref ?? "https://wa.me/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Être informé via WhatsApp
                </a>
              </Button>
            }
            emptyOcid="empty-trainings"
            getKey={(t) => String(t.id)}
            renderItem={(training) => (
              <TrainingCard
                training={training}
                onClick={() => setSelected(training)}
              />
            )}
          />
        </div>
      </section>

      {/* Enrollment modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Inscription à la formation"
        size="md"
      >
        {selected ? (
          <EnrollmentForm
            training={selected}
            onSuccess={() => setSelected(null)}
          />
        ) : null}
      </Modal>
    </div>
  );
}
