import {
  CatalogGrid,
  ContactFields,
  type ContactFieldsInputs,
  EmptyState,
  ServiceHero,
  SuccessConfirmation,
  formatFCFA,
  validateContactField,
} from "@/components/shared";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { InputField } from "@/components/ui/InputField";
import { Modal } from "@/components/ui/Modal";
import { TextareaField } from "@/components/ui/TextareaField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProperties, useSubmitQuote } from "@/hooks/useBackend";
import { Bath, Bed, Building2, MapPin, Square } from "lucide-react";
import { useState } from "react";

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  apartment: "Appartement",
  house: "Maison",
  land: "Terrain",
  office: "Bureau",
};

const PROPERTY_TYPE_FILTERS = [
  { value: "", label: "Tous" },
  { value: "apartment", label: "Appartements" },
  { value: "house", label: "Maisons" },
  { value: "land", label: "Terrains" },
  { value: "office", label: "Bureaux" },
];

interface QuoteFormProps {
  propertyTitle: string;
  onSuccess: () => void;
}

function QuoteForm({ propertyTitle, onSuccess }: QuoteFormProps) {
  const { mutate, isPending, isSuccess, isError } = useSubmitQuote();
  const [contact, setContact] = useState<ContactFieldsInputs>({
    customerName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<
    Partial<
      Record<keyof ContactFieldsInputs | "requirements" | "budgetRange", string>
    >
  >({});
  const [requirements, setRequirements] = useState(
    `Intéressé(e) par : ${propertyTitle}`,
  );
  const [budgetRange, setBudgetRange] = useState("");

  function setError(field: keyof typeof errors, msg: string) {
    setErrors((prev) => ({ ...prev, [field]: msg }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {
      requirements: requirements.trim() ? "" : "Décrivez votre besoin.",
      budgetRange: "",
    };
    for (const f of ["customerName", "email", "phone"] as const) {
      newErrors[f] = validateContactField(f, contact[f], true);
      if (newErrors[f]) return;
    }
    setErrors(newErrors);
    if (Object.values(newErrors).some((v) => v)) return;

    mutate(
      {
        serviceType: "Immobilier",
        requirements,
        budgetRange,
        ...contact,
      },
      { onSuccess },
    );
  };

  if (isSuccess) {
    return (
      <SuccessConfirmation
        title="Demande envoyée !"
        description="Notre équipe vous contactera dans les 24h pour discuter de votre projet immobilier."
        ocid="quote-success"
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      data-ocid="quote-form"
      noValidate
    >
      <ContactFields
        idPrefix="quote"
        value={contact}
        onChange={setContact}
        errors={errors}
        onBlurValidate={(f) =>
          setError(f, validateContactField(f, contact[f], true))
        }
      />
      <TextareaField
        label="Décrivez votre besoin"
        id="quote-requirements"
        required
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
        error={errors.requirements}
        rows={3}
        data-ocid="quote-requirements"
      />
      <InputField
        label="Budget estimé (optionnel)"
        id="quote-budget"
        value={budgetRange}
        onChange={(e) => setBudgetRange(e.target.value)}
        placeholder="Ex: 50 000 000 – 100 000 000 FCFA"
        data-ocid="quote-budget"
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
        data-ocid="quote-submit"
      >
        {isPending ? "Envoi en cours..." : "Envoyer ma demande"}
      </Button>
    </form>
  );
}

interface PropertyDetailProps {
  property: import("@/types").Property;
  onClose: () => void;
  onRequestQuote: () => void;
}

function PropertyDetail({
  property,
  onClose,
  onRequestQuote,
}: PropertyDetailProps) {
  return (
    <div className="flex flex-col gap-5">
      {property.images[0] ? (
        <div className="rounded-lg overflow-hidden h-56 bg-muted">
          <img
            src={property.images[0]?.url}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-primary/10 text-primary border-primary/20">
          {PROPERTY_TYPE_LABELS[property.propertyType] ?? property.propertyType}
        </Badge>
        {property.featured ? (
          <Badge variant="secondary">En vedette</Badge>
        ) : null}
      </div>
      <DetailStatsGrid property={property} />
      <p className="text-muted-foreground leading-relaxed text-sm">
        {property.description}
      </p>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <p className="text-2xl font-bold text-primary font-display">
          {formatFCFA(property.price)}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="property-close-btn"
          >
            Fermer
          </Button>
          <Button
            onClick={onRequestQuote}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-ocid="request-quote-btn"
          >
            Demander un devis
          </Button>
        </div>
      </div>
    </div>
  );
}

function DetailStatsGrid({
  property,
}: {
  property: import("@/types").Property;
}) {
  const items: { label: string; value: string; icon: typeof Bed }[] = [];
  if (Number(property.bedrooms) > 0) {
    items.push({
      label: "Chambres",
      value: String(property.bedrooms),
      icon: Bed as typeof Bath,
    });
  }
  if (Number(property.bathrooms) > 0) {
    items.push({
      label: "Salles de bain",
      value: String(property.bathrooms),
      icon: Bath as typeof Bath,
    });
  }
  if (Number(property.areaSqm) > 0) {
    items.push({
      label: "m²",
      value: String(property.areaSqm),
      icon: Square as typeof Bath,
    });
  }
  items.push({
    label: "Localisation",
    value: property.location,
    icon: MapPin as typeof Bath,
  });
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label} className="bg-muted/50 rounded-lg p-3 text-center">
          <Icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <p className="font-bold text-foreground text-xs truncate">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
}

export default function ImmobilierPage() {
  const { data: properties, isLoading } = useProperties();
  const [typeFilter, setTypeFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selected, setSelected] = useState<import("@/types").Property | null>(
    null,
  );
  const [showQuote, setShowQuote] = useState(false);

  const filtered = (properties ?? []).filter((p) => {
    if (typeFilter && p.propertyType !== typeFilter) return false;
    if (minPrice && Number(p.price) < Number(minPrice)) return false;
    if (maxPrice && Number(p.price) > Number(maxPrice)) return false;
    return true;
  });

  const resetFilters = () => {
    setTypeFilter("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="flex flex-col">
      <ServiceHero
        title="Immobilier"
        subtitle="Découvrez nos propriétés disponibles : appartements, villas, terrains et bureaux à Dakar et ses environs. Un accompagnement professionnel pour l'achat, la vente ou la location."
        actions={
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/30"
            data-ocid="immobilier-hero-cta"
          >
            <a href="/contact">Demander un devis</a>
          </Button>
        }
      />

      {/* Filters */}
      <section className="bg-muted/40 py-6 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 items-center">
          <p className="text-sm font-medium text-muted-foreground">Type :</p>
          {PROPERTY_TYPE_FILTERS.map((opt) => (
            <button
              key={opt.value || "all"}
              type="button"
              onClick={() => setTypeFilter(opt.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                typeFilter === opt.value
                  ? "bg-primary text-primary-foreground shadow-corporate"
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
              id="min-price"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Prix min (FCFA)"
              data-ocid="filter-min-price"
            />
            <InputField
              label=""
              id="max-price"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Prix max (FCFA)"
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
            emptyIcon={Building2}
            emptyTitle="Aucune propriété ne correspond à vos critères"
            emptyDescription="Élargissez votre recherche ou réinitialisez les filtres."
            emptyAction={
              <Button
                variant="outline"
                onClick={resetFilters}
                data-ocid="empty-reset-filters"
              >
                Effacer les filtres
              </Button>
            }
            emptyOcid="empty-properties"
            getKey={(p) => String(p.id)}
            renderItem={(property) => (
              <PropertyCard
                property={property}
                onClick={() => setSelected(property)}
              />
            )}
          />
        </div>
      </section>

      {/* Detail modal */}
      <Modal
        isOpen={!!selected && !showQuote}
        onClose={() => setSelected(null)}
        title={selected?.title}
        size="xl"
      >
        {selected ? (
          <PropertyDetail
            property={selected}
            onClose={() => setSelected(null)}
            onRequestQuote={() => setShowQuote(true)}
          />
        ) : null}
      </Modal>

      {/* Quote modal */}
      <Modal
        isOpen={showQuote && !!selected}
        onClose={() => setShowQuote(false)}
        title="Demande de devis"
        size="md"
      >
        {selected ? (
          <QuoteForm
            propertyTitle={selected.title}
            onSuccess={() => {
              setShowQuote(false);
              setSelected(null);
            }}
          />
        ) : null}
      </Modal>
    </div>
  );
}
