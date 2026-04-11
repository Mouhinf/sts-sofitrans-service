import { InputField } from "@/components/ui/InputField";
import { Modal } from "@/components/ui/Modal";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProperties, useSubmitQuote } from "@/hooks/useBackend";
import type {
  Property,
  PropertyFilter,
  PropertyType,
  QuoteInput,
} from "@/types";
import {
  Bath,
  Bed,
  Building2,
  CheckCircle2,
  MapPin,
  Square,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  apartment: "Appartement",
  house: "Maison",
  land: "Terrain",
  office: "Bureau",
};

function formatFCFA(amount: bigint): string {
  return `${new Intl.NumberFormat("fr-FR").format(Number(amount))} FCFA`;
}

function PropertyCard({
  property,
  onClick,
}: {
  property: Property;
  onClick: () => void;
}) {
  const imageUrl =
    property.images[0]?.getDirectURL() ?? "/assets/images/placeholder.svg";
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-card border border-border rounded-xl overflow-hidden shadow-corporate hover-lift cursor-pointer text-left w-full"
      onClick={onClick}
      aria-label={`Voir ${property.title}`}
      data-ocid="property-card"
    >
      <div className="relative h-52 overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary text-primary-foreground text-xs font-semibold">
            {PROPERTY_TYPE_LABELS[property.propertyType] ??
              property.propertyType}
          </Badge>
        </div>
        {property.featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="text-xs font-semibold">
              En vedette
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-foreground text-lg mb-1 truncate group-hover:text-primary transition-colors duration-200">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          {Number(property.bedrooms) > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              {String(property.bedrooms)} ch.
            </span>
          )}
          {Number(property.bathrooms) > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              {String(property.bathrooms)} sdb.
            </span>
          )}
          {Number(property.areaSqm) > 0 && (
            <span className="flex items-center gap-1">
              <Square className="w-3.5 h-3.5" />
              {String(property.areaSqm)} m²
            </span>
          )}
        </div>
        <p className="text-primary font-bold text-lg">
          {formatFCFA(property.price)}
        </p>
      </div>
    </motion.button>
  );
}

function QuoteForm({
  property,
  onSuccess,
}: {
  property: Property;
  onSuccess: () => void;
}) {
  const { mutate, isPending, isSuccess, isError } = useSubmitQuote();
  const [form, setForm] = useState<QuoteInput>({
    customerName: "",
    serviceType: "Immobilier",
    email: "",
    phone: "",
    requirements: `Intéressé(e) par : ${property.title}`,
    budgetRange: "",
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
          Demande envoyée !
        </h3>
        <p className="text-muted-foreground">
          Notre équipe vous contactera dans les 24h pour discuter de votre
          projet immobilier.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      data-ocid="quote-form"
    >
      <InputField
        label="Nom complet"
        required
        value={form.customerName}
        onChange={(e) =>
          setForm((f) => ({ ...f, customerName: e.target.value }))
        }
        placeholder="Votre nom"
        data-ocid="quote-name"
      />
      <InputField
        label="Email"
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        placeholder="votre@email.com"
        data-ocid="quote-email"
      />
      <InputField
        label="Téléphone"
        type="tel"
        required
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        placeholder="+221 XX XXX XX XX"
        data-ocid="quote-phone"
      />
      <InputField
        label="Budget"
        value={form.budgetRange}
        onChange={(e) =>
          setForm((f) => ({ ...f, budgetRange: e.target.value }))
        }
        placeholder="Ex: 50 000 000 – 100 000 000 FCFA"
        data-ocid="quote-budget"
      />
      <TextareaField
        label="Détails de votre demande"
        required
        value={form.requirements}
        onChange={(e) =>
          setForm((f) => ({ ...f, requirements: e.target.value }))
        }
        rows={3}
        data-ocid="quote-requirements"
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
        data-ocid="quote-submit"
      >
        {isPending ? "Envoi en cours..." : "Envoyer la demande"}
      </Button>
    </form>
  );
}

export default function ImmobilierPage() {
  const [filter, setFilter] = useState<{
    propertyType: string;
    minPrice: string;
    maxPrice: string;
  }>({ propertyType: "", minPrice: "", maxPrice: "" });

  const backendFilter: PropertyFilter = {
    ...(filter.propertyType
      ? { propertyType: filter.propertyType as PropertyType }
      : {}),
    ...(filter.minPrice ? { minPrice: BigInt(filter.minPrice) } : {}),
    ...(filter.maxPrice ? { maxPrice: BigInt(filter.maxPrice) } : {}),
  };

  const { data: properties, isLoading } = useProperties(backendFilter);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const hasFilter =
    !!filter.propertyType || !!filter.minPrice || !!filter.maxPrice;

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
              <Building2 className="w-8 h-8" />
              <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
                Services
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Immobilier
            </h1>
            <p className="text-lg opacity-90 max-w-xl">
              Découvrez notre catalogue de biens immobiliers à Dakar et dans les
              environs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-card border-b border-border py-5 px-4 sticky top-0 z-30 shadow-corporate">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[160px]">
              <SelectField
                label="Type de bien"
                options={[
                  { value: "", label: "Tous les types" },
                  { value: "apartment", label: "Appartement" },
                  { value: "house", label: "Maison" },
                  { value: "land", label: "Terrain" },
                  { value: "office", label: "Bureau" },
                ]}
                value={filter.propertyType}
                onChange={(e) =>
                  setFilter((f) => ({ ...f, propertyType: e.target.value }))
                }
                data-ocid="filter-type"
              />
            </div>
            <div className="flex-1 min-w-[140px]">
              <InputField
                label="Prix min (FCFA)"
                type="number"
                value={filter.minPrice}
                onChange={(e) =>
                  setFilter((f) => ({ ...f, minPrice: e.target.value }))
                }
                placeholder="0"
                data-ocid="filter-min-price"
              />
            </div>
            <div className="flex-1 min-w-[140px]">
              <InputField
                label="Prix max (FCFA)"
                type="number"
                value={filter.maxPrice}
                onChange={(e) =>
                  setFilter((f) => ({ ...f, maxPrice: e.target.value }))
                }
                placeholder="Illimité"
                data-ocid="filter-max-price"
              />
            </div>
            {hasFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setFilter({ propertyType: "", minPrice: "", maxPrice: "" })
                }
                className="self-end flex items-center gap-1 text-muted-foreground"
                data-ocid="filter-reset"
              >
                <X className="w-3.5 h-3.5" /> Réinitialiser
              </Button>
            )}
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
                  <Skeleton className="h-52 w-full" />
                  <div className="p-4 flex flex-col gap-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : !properties?.length ? (
            <div
              className="flex flex-col items-center gap-4 py-20 text-center"
              data-ocid="empty-state-properties"
            >
              <Building2 className="w-16 h-16 text-muted-foreground/40" />
              <h3 className="text-xl font-display font-semibold text-foreground">
                Aucune propriété trouvée pour ces critères
              </h3>
              <p className="text-muted-foreground max-w-sm">
                Essayez d'ajuster les filtres ou revenez bientôt pour de
                nouveaux biens.
              </p>
              {hasFilter && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilter({ propertyType: "", minPrice: "", maxPrice: "" })
                  }
                  data-ocid="empty-reset-filters"
                >
                  Effacer les filtres
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={String(property.id)}
                  property={property}
                  onClick={() => {
                    setSelectedProperty(property);
                    setShowQuoteModal(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Property detail modal */}
      <Modal
        isOpen={!!selectedProperty && !showQuoteModal}
        onClose={() => setSelectedProperty(null)}
        title={selectedProperty?.title}
        size="xl"
      >
        {selectedProperty && (
          <div className="flex flex-col gap-5">
            {selectedProperty.images[0] && (
              <div className="rounded-lg overflow-hidden h-56 bg-muted">
                <img
                  src={selectedProperty.images[0].getDirectURL()}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {PROPERTY_TYPE_LABELS[selectedProperty.propertyType] ??
                  selectedProperty.propertyType}
              </Badge>
              {selectedProperty.featured && (
                <Badge variant="secondary">En vedette</Badge>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Number(selectedProperty.bedrooms) > 0 && (
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <Bed className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="font-bold text-foreground">
                    {String(selectedProperty.bedrooms)}
                  </p>
                  <p className="text-xs text-muted-foreground">Chambres</p>
                </div>
              )}
              {Number(selectedProperty.bathrooms) > 0 && (
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <Bath className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="font-bold text-foreground">
                    {String(selectedProperty.bathrooms)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Salles de bain
                  </p>
                </div>
              )}
              {Number(selectedProperty.areaSqm) > 0 && (
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <Square className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="font-bold text-foreground">
                    {String(selectedProperty.areaSqm)}
                  </p>
                  <p className="text-xs text-muted-foreground">m²</p>
                </div>
              )}
              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <MapPin className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                <p className="font-bold text-foreground text-xs truncate">
                  {selectedProperty.location}
                </p>
                <p className="text-xs text-muted-foreground">Localisation</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {selectedProperty.description}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <p className="text-2xl font-bold text-primary font-display">
                {formatFCFA(selectedProperty.price)}
              </p>
              <Button
                onClick={() => setShowQuoteModal(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="request-quote-btn"
              >
                Demander un devis
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Quote modal */}
      <Modal
        isOpen={showQuoteModal && !!selectedProperty}
        onClose={() => setShowQuoteModal(false)}
        title="Demande de devis"
        size="md"
      >
        {selectedProperty && (
          <QuoteForm
            property={selectedProperty}
            onSuccess={() => {
              setShowQuoteModal(false);
              setSelectedProperty(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
