import { InputField } from "@/components/ui/InputField";
import { Modal } from "@/components/ui/Modal";
import { TextareaField } from "@/components/ui/TextareaField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubmitBooking, useVehicles } from "@/hooks/useBackend";
import type { BookingInput, Vehicle, VehicleType } from "@/types";
import { CalendarDays, CheckCircle2, Truck, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const VEHICLE_TYPE_LABELS: Record<string, string> = {
  car: "Voiture",
  bus: "Bus",
  truck: "Camion",
  minibus: "Minibus",
};

function formatFCFA(amount: bigint): string {
  return `${new Intl.NumberFormat("fr-FR").format(Number(amount))} FCFA`;
}

function VehicleCard({
  vehicle,
  onClick,
}: {
  vehicle: Vehicle;
  onClick: () => void;
}) {
  const imageUrl =
    vehicle.images[0]?.getDirectURL() ?? "/assets/images/placeholder.svg";
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-card border border-border rounded-xl overflow-hidden shadow-corporate hover-lift cursor-pointer text-left w-full"
      onClick={onClick}
      aria-label={`Voir ${vehicle.title}`}
      data-ocid="vehicle-card"
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={vehicle.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-secondary text-secondary-foreground text-xs font-semibold">
            {VEHICLE_TYPE_LABELS[vehicle.vehicleType] ?? vehicle.vehicleType}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-foreground text-lg mb-1 truncate group-hover:text-secondary transition-colors duration-200">
          {vehicle.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-1">{vehicle.model}</p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {String(vehicle.capacity)} places
          </span>
        </div>
        <p className="text-secondary font-bold text-lg">
          {formatFCFA(vehicle.pricePerDay)}
          <span className="text-sm font-normal text-muted-foreground">
            {" "}
            / jour
          </span>
        </p>
      </div>
    </motion.button>
  );
}

function BookingForm({
  vehicle,
  onSuccess,
}: {
  vehicle: Vehicle;
  onSuccess: () => void;
}) {
  const { mutate, isPending, isSuccess, isError } = useSubmitBooking();
  const [form, setForm] = useState<BookingInput>({
    customerName: "",
    vehicleId: vehicle.id,
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    specialRequests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, { onSuccess });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <CheckCircle2 className="w-12 h-12 text-secondary" />
        <h3 className="text-xl font-display font-bold text-foreground">
          Réservation envoyée !
        </h3>
        <p className="text-muted-foreground">
          Votre demande de réservation a été soumise. Notre équipe vous
          confirmera sous 24h.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      data-ocid="booking-form"
    >
      <InputField
        label="Nom complet"
        required
        value={form.customerName}
        onChange={(e) =>
          setForm((f) => ({ ...f, customerName: e.target.value }))
        }
        placeholder="Votre nom"
        data-ocid="booking-name"
      />
      <InputField
        label="Email"
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        placeholder="votre@email.com"
        data-ocid="booking-email"
      />
      <InputField
        label="Téléphone"
        type="tel"
        required
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        placeholder="+221 XX XXX XX XX"
        data-ocid="booking-phone"
      />
      <div className="grid grid-cols-2 gap-3">
        <InputField
          label="Date de début"
          type="date"
          required
          value={form.startDate}
          onChange={(e) =>
            setForm((f) => ({ ...f, startDate: e.target.value }))
          }
          data-ocid="booking-start-date"
        />
        <InputField
          label="Date de fin"
          type="date"
          required
          value={form.endDate}
          onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
          data-ocid="booking-end-date"
        />
      </div>
      <TextareaField
        label="Demandes spéciales"
        value={form.specialRequests}
        onChange={(e) =>
          setForm((f) => ({ ...f, specialRequests: e.target.value }))
        }
        placeholder="Informations supplémentaires..."
        rows={3}
        data-ocid="booking-requests"
      />
      {isError && (
        <p className="text-sm text-destructive text-center" role="alert">
          Une erreur s'est produite. Veuillez réessayer.
        </p>
      )}
      <Button
        type="submit"
        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        disabled={isPending}
        data-ocid="booking-submit"
      >
        {isPending ? "Envoi en cours..." : "Confirmer la réservation"}
      </Button>
      <a
        href={`https://wa.me/221770000000?text=Je souhaite réserver : ${encodeURIComponent(vehicle.title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full border border-border text-muted-foreground px-4 py-2.5 rounded-md text-sm font-medium hover:border-primary/40 hover:text-foreground transition-smooth"
        data-ocid="booking-whatsapp"
      >
        Réserver via WhatsApp
      </a>
    </form>
  );
}

const TYPE_FILTERS = [
  { value: "", label: "Tous" },
  { value: "car", label: "Voiture" },
  { value: "bus", label: "Bus" },
  { value: "truck", label: "Camion" },
  { value: "minibus", label: "Minibus" },
];

export default function TransportPage() {
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>("");
  const [maxPriceFilter, setMaxPriceFilter] = useState<string>("");
  const backendFilter = vehicleTypeFilter
    ? { vehicleType: vehicleTypeFilter as VehicleType }
    : {};
  const { data: vehicles, isLoading } = useVehicles(backendFilter);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const filteredVehicles = vehicles?.filter((v) => {
    if (!maxPriceFilter) return true;
    const maxPrice = Number(maxPriceFilter.replace(/\s/g, ""));
    if (Number.isNaN(maxPrice)) return true;
    return Number(v.pricePerDay) <= maxPrice;
  });

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-secondary py-16 px-4 text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-secondary-foreground translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-8 h-8" />
              <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
                Services
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Transport
            </h1>
            <p className="text-lg opacity-90 max-w-xl">
              Location et affrètement de véhicules professionnels pour tous vos
              déplacements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-card border-b border-border py-5 px-4 sticky top-0 z-30 shadow-corporate">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-wrap gap-2 items-center">
              <p className="text-sm font-medium text-muted-foreground">
                Type :
              </p>
              {TYPE_FILTERS.map((opt) => (
                <button
                  key={opt.value}
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
            </div>
            <div className="flex items-center gap-2">
              <InputField
                label=""
                id="max-price-filter"
                type="number"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(e.target.value)}
                placeholder="Prix max/jour (FCFA)"
                data-ocid="filter-max-price"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-background py-12 px-4 min-h-[400px]">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => (
                <div
                  key={sk}
                  className="rounded-xl overflow-hidden border border-border"
                >
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 flex flex-col gap-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : !filteredVehicles?.length ? (
            <div
              className="flex flex-col items-center gap-4 py-20 text-center"
              data-ocid="empty-state-vehicles"
            >
              <Truck className="w-16 h-16 text-muted-foreground/40" />
              <h3 className="text-xl font-display font-semibold text-foreground">
                Aucun véhicule disponible
              </h3>
              <p className="text-muted-foreground max-w-sm">
                Aucun véhicule ne correspond à ce filtre. Essayez un autre type.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={String(vehicle.id)}
                  vehicle={vehicle}
                  onClick={() => setSelectedVehicle(vehicle)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Vehicle detail + booking modal */}
      <Modal
        isOpen={!!selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        title={selectedVehicle?.title}
        size="xl"
      >
        {selectedVehicle && (
          <div className="flex flex-col gap-5">
            {selectedVehicle.images[0] && (
              <div className="rounded-lg overflow-hidden h-48 bg-muted">
                <img
                  src={selectedVehicle.images[0].getDirectURL()}
                  alt={selectedVehicle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                {VEHICLE_TYPE_LABELS[selectedVehicle.vehicleType] ??
                  selectedVehicle.vehicleType}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {String(selectedVehicle.capacity)} places
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                {formatFCFA(selectedVehicle.pricePerDay)}/jour
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {selectedVehicle.description}
            </p>
            <div className="border-t border-border pt-4">
              <h3 className="font-display font-semibold text-foreground mb-4">
                Formulaire de réservation
              </h3>
              <BookingForm
                vehicle={selectedVehicle}
                onSuccess={() => setSelectedVehicle(null)}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
