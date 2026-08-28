import { Button } from "@/components/ui/button";
import { useSubscribeNewsletter } from "@/hooks/useBackend";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess, isError } = useSubscribeNewsletter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) mutate({ email: email.trim() });
  };

  return (
    <section className="bg-muted/40 py-16 border-t border-border">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Restez informé
          </h2>
          <p className="text-muted-foreground mb-8">
            Recevez nos dernières offres immobilières et actualités directement
            dans votre boîte mail.
          </p>

          {isSuccess ? (
            <output className="flex items-center justify-center gap-2 text-primary font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Inscription réussie ! Merci de votre confiance.</span>
            </output>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
              noValidate
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                aria-label="Adresse email"
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                data-ocid="newsletter-email"
              />
              <Button
                type="submit"
                disabled={isPending}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
                data-ocid="newsletter-submit"
              >
                {isPending ? "Inscription..." : "S'inscrire"}
              </Button>
            </form>
          )}

          {isError && (
            <p
              className="text-destructive text-sm mt-3"
              role="alert"
              aria-live="polite"
            >
              Une erreur s'est produite. Veuillez réessayer.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
