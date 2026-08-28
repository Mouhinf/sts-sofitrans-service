import {
  CatalogGrid,
  ContactFields,
  type ContactFieldsInputs,
  ServiceHero,
  SuccessConfirmation,
  VehicleCard,
  validateContactField,
} from "@/components/shared";
import { InputField } from "@/components/ui/InputField";
import { Modal } from "@/components/ui/Modal";
import { TextareaField } from "@/components/ui/TextareaField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useCompanySettings,
  useSubmitBooking,
  useVehicles,
} from "@/hooks/useBackend";
import { toE164Digits } from "@/lib/contact";
import type { BookingInput, Vehicle } from "@/types";
import { CalendarDays, Truck, Users } from "lucide-react";
import { useState } from "react";

const VEHICLE_TYPE_LABELS: Record<string, string> = {
  car: "Voiture",
  bus: "Bus",
  truck: "Camion",
  minibus: "Minibus",
};

const VEHICLE_TYPE_FILTERS = [
  { value: "", label: "Tous" },
  { value: "car", label: "Voitures" },
  { value: "minibus", label: "Minibus" },
  { value: "bus", label: "Bus" },
  { value: "truck", label: "Camions" },
];

function BookingForm({
  vehicle,
  onSuccess,
}: {
  vehicle: Vehicle;
  onSuccess: () => void;
}) {
  const { data: settings } = useCompanySettings();
  const { mutate, isPending, isSuccess, isError } = useSubmitBooking();
  const whatsappNumber = toE164Digits(settings?.whatsapp);

  const [contact, setContact] = useState<ContactFieldsInputs>({
    customerName: "",
    email: "",
    phone: "",
  });
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [specialRequests, setSpecialRequests] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFieldsInputs | "startDate" | "endDate", string>>
  >({});

  function setError(field: keyof typeof errors, msg: string) {
    setErrors((prev) => ({ ...prev, [field]: msg }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {
      startDate: dates.startDate ? "" : "La date de début est requise.",
      endDate: dates.endDate ? "" : "La date de fin est requise.",
    };
    for (const f of ["customerName", "email", "phone"] as const) {
      newErrors[f] = validateContactField(f, contact[f], true);
    }
    if (dates.startDate && dates.endDate && dates.endDate < dates.startDate) {
      newErrors.endDate = "La date de fin doit suivre la date de début.";
    }
    setErrors(newErrors);
    if (Object.values(newErrors).some((v) => v)) return;

    const payload: BookingInput = {
      ...contact,
      vehicleId: vehicle.id,
      startDate: dates.startDate,
      endDate: dates.endDate,
      specialRequests,
    };
    mutate(payload, { onSuccess });
  };

  if (isSuccess) {
    return (
      <SuccessConfirmation
        title="Réservation envoyée !"
        description={
          whatsappNumber
            ? "Notre équipe vous contactera dans les 24h pour confirmer votre réservation."
            : "Notre équipe vous contactera dans les 24h pour confirmer votre réservation."
        }
        ocid="booking-success"
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      data-ocid="booking-form"
      noValidate
    >
      <ContactFields
        idPrefix="booking"
        value={contact}
        onChange={setContact}
        errors={errors}
        onBlurValidate={(f) =>
          setError(f, validateContactField(f, contact[f], true))
        }
      />
      <div className="grid grid-cols-2 gap-3">
        <InputField
          label="Date de début"
          id="booking-start"
          type="date"
          required
          value={dates.startDate}
          onChange={(e) =>
            setDates((d) => ({ ...d, startDate: e.target.value }))
          }
          error={errors.startDate}
          data-ocid="booking-start"
        />
        <InputField
          label="Date de fin"
          id="booking-end"
          type="date"
          required
          value={dates.endDate}
          onChange={(e) => setDates((d) => ({ ...d, endDate: e.target.value }))}
          error={errors.endDate}
          data-ocid="booking-end"
        />
      </div>
      <TextareaField
        label="Demandes particulières (optionnel)"
        id="booking-requests"
        value={specialRequests}
        onChange={(e) => setSpecialRequests(e.target.value)}
        rows={3}
        placeholder="Itinéraire, passagers, équipements..."
        data-ocid="booking-requests"
      />
      {isError ? (
        <p className="text-destructive text-sm text-center" role="alert">
          Une erreur est survenue. Veuillez réessayer.
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        data-ocid="booking-submit"
      >
        {isPending ? "Envoi en cours..." : "Envoyer la réservation"}
      </Button>
    </form>
  );
}

function VehicleDetail({
  vehicle,
  onBook,
}: {
  vehicle: Vehicle;
  onBook: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      {vehicle.images[0] ? (
        <div className="rounded-lg overflow-hidden h-56 bg-muted">
          <img
            src={vehicle.images[0].getDirectURL()}
            alt={vehicle.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-secondary/10 text-secondary border-secondary/20">
          {VEHICLE_TYPE_LABELS[vehicle.vehicleType] ?? vehicle.vehicleType}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {vehicle.capacity.toString()} places
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <CalendarDays className="w-3 h-3" />
          {vehicle.model}
        </Badge>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {vehicle.description}
      </p>
      <div className="border-t border-border pt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Tarif journalier</p>
          <p className="text-secondary font-display font-bold text-2xl">
            {vehicle.pricePerDay.toString() !== "0"
              ? `${new Intl.NumberFormat("fr-FR").format(Number(vehicle.pricePerDay))} FCFA / jour`
              : "Sur devis"}
          </p>
        </div>
        <Button
          onClick={onBook}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          data-ocid="vehicle-book-cta"
        >
          Réserver
        </Button>
      </div>
    </div>
  );
}

export default function TransportPage() {
  const { data: vehicles, isLoading } = useVehicles();
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  const filtered = (vehicles ?? []).filter((v) => {
    if (vehicleTypeFilter && v.vehicleType !== vehicleTypeFilter) return false;
    if (maxPriceFilter && Number(v.pricePerDay) > Number(maxPriceFilter))
      return false;
    return true;
  });

  const resetFilters = () => {
    setVehicleTypeFilter("");
    setMaxPriceFilter("");
  };

  return (
    <div className="flex flex-col">
      <ServiceHero
        title="Transport"
        subtitle="Une flotte moderne et des chauffeurs professionnels pour tous vos déplacements : location de véhicules avec ou sans chauffeur, transport de personnel et logistique événementielle au Sénégal et dans la sous-région."
        actions={
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/30"
            data-ocid="transport-hero-cta"
          >
            <a href="/contact">Demander un devis</a>
          </Button>
        }
      />

      {/* Filters */}
      <section className="bg-muted/40 py-6 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 items-center">
          <p className="text-sm font-medium text-muted-foreground">Type :</p>
          {VEHICLE_TYPE_FILTERS.map((opt) => (
            <button
              key={opt.value || "all"}
              type="button"
              onClick={() => setVehicleTypeFilter(opt.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                vehicleTypeFilter === opt.value
                  ? "bg-secondary text-secondary-foreground shadow-corporate"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              data-ocid={`filter-${opt.value || "all"}`}
            >
              {opt.label}
            </button>
          ))}
          <div className="ml-auto flex flex-wrap gap-2 items-center">
            <InputField
              label=""
              id="max-price"
              type="number"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(e.target.value)}
              placeholder="Prix max / jour (FCFA)"
              data-ocid="filter-max-price"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-background py-12 px-4 min-h-[400px]">
        <div className="max-w-6xl mx-auto">
          <CatalogGrid
            items={filtered}
            isLoading={isLoading}
            skeletonCount={6}
            skeletonHeight={64}
            emptyIcon={Truck}
            emptyTitle="Aucun véhicule disponible"
            emptyDescription="Aucun véhicule ne correspond à vos critères. Essayez un autre type ou un budget plus élevé."
            emptyAction={
              <Button
                variant="outline"
                onClick={resetFilters}
                data-ocid="empty-reset-filters"
              >
                Effacer les filtres
              </Button>
            }
            emptyOcid="empty-vehicles"
            getKey={(v) => String(v.id)}
            renderItem={(vehicle) => (
              <VehicleCard
                vehicle={vehicle}
                onClick={() => setSelected(vehicle)}
              />
            )}
          />
        </div>
      </section>

      {/* Detail modal */}
      <Modal
        isOpen={!!selected && !showBooking}
        onClose={() => setSelected(null)}
        title={selected?.title}
        size="xl"
      >
        {selected ? (
          <VehicleDetail
            vehicle={selected}
            onBook={() => setShowBooking(true)}
          />
        ) : null}
      </Modal>

      {/* Booking modal */}
      <Modal
        isOpen={showBooking && !!selected}
        onClose={() => setShowBooking(false)}
        title="Réserver ce véhicule"
        size="md"
      >
        {selected ? (
          <BookingForm
            vehicle={selected}
            onSuccess={() => {
              setShowBooking(false);
              setSelected(null);
            }}
          />
        ) : null}
      </Modal>
    </div>
  );
}
