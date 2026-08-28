import { InputField } from "@/components/ui/InputField";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ContactInfo {
  customerName: string;
  email: string;
  phone: string;
}

interface BaseProps {
  /** Field layout: "row" stacks name+email horizontally; "stack" puts them in one column. */
  layout?: "row" | "stack";
  className?: string;
  /** Optional id prefix to avoid duplicates when several forms are mounted. */
  idPrefix?: string;
}

interface ContactFieldsProps
  extends BaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: ContactInfo;
  onChange: (next: ContactInfo) => void;
  errors?: Partial<Record<keyof ContactInfo, string>>;
  /** Show the phone field as required (default true). */
  phoneRequired?: boolean;
  onBlurValidate?: (field: keyof ContactInfo) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Lightweight inline validation rules. Returns an error message or empty string.
 */
export function validateContactField(
  field: keyof ContactInfo,
  value: string,
  phoneRequired: boolean,
): string {
  switch (field) {
    case "customerName":
      return value.trim() ? "" : "Le nom complet est requis.";
    case "email":
      if (!value.trim()) return "L'adresse email est requise.";
      if (!EMAIL_REGEX.test(value.trim()))
        return "Veuillez entrer une adresse email valide.";
      return "";
    case "phone":
      if (!phoneRequired) return "";
      return value.trim() ? "" : "Le numéro de téléphone est requis.";
    default:
      return "";
  }
}

export const ContactFields = forwardRef<HTMLDivElement, ContactFieldsProps>(
  function ContactFields(
    {
      value,
      onChange,
      errors,
      layout = "row",
      className,
      idPrefix = "contact",
      phoneRequired = true,
      onBlurValidate,
      ...rest
    },
    ref,
  ) {
    function set(field: keyof ContactInfo, v: string) {
      onChange({ ...value, [field]: v });
    }

    return (
      <div ref={ref} className={cn("flex flex-col gap-4", className)}>
        <div
          className={cn(
            "grid gap-4",
            layout === "row" && "sm:grid-cols-2",
            layout === "stack" && "grid-cols-1",
          )}
        >
          <InputField
            label="Nom complet"
            id={`${idPrefix}-name`}
            required
            value={value.customerName}
            onChange={(e) => set("customerName", e.target.value)}
            onBlur={() => onBlurValidate?.("customerName")}
            error={errors?.customerName}
            placeholder="Amadou Diallo"
            data-ocid={`${idPrefix}-name`}
            autoComplete="name"
          />
          <InputField
            label="Adresse email"
            id={`${idPrefix}-email`}
            required
            type="email"
            value={value.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => onBlurValidate?.("email")}
            error={errors?.email}
            placeholder="amadou@example.com"
            data-ocid={`${idPrefix}-email`}
            autoComplete="email"
          />
        </div>
        <InputField
          label="Téléphone"
          id={`${idPrefix}-phone`}
          type="tel"
          required={phoneRequired}
          value={value.phone}
          onChange={(e) => set("phone", e.target.value)}
          onBlur={() => onBlurValidate?.("phone")}
          error={errors?.phone}
          placeholder="+221 77 000 00 00"
          data-ocid={`${idPrefix}-phone`}
          autoComplete="tel"
        />
        {/* `rest` (e.g. aria-describedby) intentionally not spread here; keep
            this component's API tight around the three core fields. */}
        <span hidden {...rest} />
      </div>
    );
  },
);

export type ContactFieldsInputs = ContactInfo;
