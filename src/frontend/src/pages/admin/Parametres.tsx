import { AdminLayout } from "@/components/AdminLayout";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAdminUpdateCompanySettings,
  useCompanySettings,
} from "@/hooks/useBackend";
import { resolveContact } from "@/lib/contact";
import type { CompanySettings } from "@/types";
import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Phone,
  Save,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EMPTY: CompanySettings = {
  phone: "",
  whatsapp: "",
  email: "",
  address: "Zac Mbao Rond Point Sipres, Dakar, Sénégal",
  logoUrl: "",
  facebookUrl: undefined,
  instagramUrl: undefined,
  linkedinUrl: undefined,
  youtubeUrl: undefined,
};

export default function AdminParametresPage() {
  const { data: settings, isLoading } = useCompanySettings();
  const contact = resolveContact(settings);
  const updateMutation = useAdminUpdateCompanySettings();
  const [form, setForm] = useState<CompanySettings>(EMPTY);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) {
      setForm({
        phone: settings.phone ?? "",
        whatsapp: settings.whatsapp ?? "",
        email: settings.email ?? "",
        address: settings.address ?? "",
        logoUrl: settings.logoUrl ?? "",
        facebookUrl: settings.facebookUrl,
        instagramUrl: settings.instagramUrl,
        linkedinUrl: settings.linkedinUrl,
        youtubeUrl: settings.youtubeUrl,
      });
    }
  }, [settings]);

  const set = (k: keyof CompanySettings, v: string) =>
    setForm((f) => ({ ...f, [k]: v || undefined }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim() || !form.email.trim()) {
      toast.error("Le téléphone et l'email sont obligatoires");
      return;
    }
    try {
      await updateMutation.mutateAsync(form);
      setSaved(true);
      toast.success("Paramètres enregistrés avec succès");
      setTimeout(() => setSaved(false), 3000);
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Paramètres">
        <div className="max-w-2xl flex flex-col gap-4">
          {["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"].map((sk) => (
            <Skeleton key={sk} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Paramètres">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl"
        data-ocid="settings-form"
      >
        {/* Contact */}
        <section className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="text-base font-semibold font-display text-foreground mb-4 flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            Coordonnées
          </h2>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Téléphone"
                required
                type="tel"
                value={form.phone ?? ""}
                onChange={(e) => set("phone", e.target.value)}
                placeholder={contact.phone || "+221 77 000 00 00"}
                data-ocid="settings-phone"
              />
              <InputField
                label="WhatsApp"
                type="tel"
                value={form.whatsapp ?? ""}
                onChange={(e) => set("whatsapp", e.target.value)}
                placeholder="221770000000"
                data-ocid="settings-whatsapp"
              />
            </div>
            <InputField
              label="Email"
              required
              type="email"
              value={form.email ?? ""}
              onChange={(e) => set("email", e.target.value)}
              placeholder="contact@sts-sofitrans.com"
              data-ocid="settings-email"
            />
            <InputField
              label="Adresse"
              value={form.address ?? ""}
              onChange={(e) => set("address", e.target.value)}
              placeholder="Zac Mbao Rond Point Sipres, Dakar, Sénégal"
              data-ocid="settings-address"
            />
          </div>
        </section>

        {/* Branding */}
        <section className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="text-base font-semibold font-display text-foreground mb-4 flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            Identité visuelle
          </h2>
          <InputField
            label="URL du logo"
            value={form.logoUrl ?? ""}
            onChange={(e) => set("logoUrl", e.target.value)}
            placeholder="https://..."
            hint="URL publique de l'image du logo"
          />
          {form.logoUrl && (
            <div className="mt-3 p-3 bg-muted/50 rounded-lg inline-block">
              <img
                src={form.logoUrl}
                alt="Aperçu du logo"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </section>

        {/* Social media */}
        <section className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="text-base font-semibold font-display text-foreground mb-4 flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            Réseaux sociaux
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Facebook className="h-4 w-4 text-muted-foreground mt-2.5 shrink-0" />
              <InputField
                label="Facebook"
                value={form.facebookUrl ?? ""}
                onChange={(e) => set("facebookUrl", e.target.value)}
                placeholder="https://facebook.com/..."
                className="flex-1"
                data-ocid="settings-facebook"
              />
            </div>
            <div className="flex items-start gap-2">
              <Instagram className="h-4 w-4 text-muted-foreground mt-2.5 shrink-0" />
              <InputField
                label="Instagram"
                value={form.instagramUrl ?? ""}
                onChange={(e) => set("instagramUrl", e.target.value)}
                placeholder="https://instagram.com/..."
                className="flex-1"
                data-ocid="settings-instagram"
              />
            </div>
            <div className="flex items-start gap-2">
              <Linkedin className="h-4 w-4 text-muted-foreground mt-2.5 shrink-0" />
              <InputField
                label="LinkedIn"
                value={form.linkedinUrl ?? ""}
                onChange={(e) => set("linkedinUrl", e.target.value)}
                placeholder="https://linkedin.com/..."
                className="flex-1"
                data-ocid="settings-linkedin"
              />
            </div>
            <div className="flex items-start gap-2">
              <Youtube className="h-4 w-4 text-muted-foreground mt-2.5 shrink-0" />
              <InputField
                label="YouTube"
                value={form.youtubeUrl ?? ""}
                onChange={(e) => set("youtubeUrl", e.target.value)}
                placeholder="https://youtube.com/..."
                className="flex-1"
                data-ocid="settings-youtube"
              />
            </div>
          </div>
        </section>

        <div className="flex items-center gap-3">
          <Button
            type="submit"
            disabled={updateMutation.isPending}
            className="min-w-[160px]"
            data-ocid="settings-save-btn"
          >
            {updateMutation.isPending ? (
              <>
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                Enregistrement…
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </>
            )}
          </Button>
          {saved && (
            <span className="text-sm text-primary font-medium">
              ✓ Paramètres enregistrés
            </span>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
