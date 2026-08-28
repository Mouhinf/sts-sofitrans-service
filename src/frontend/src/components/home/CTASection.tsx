import { Button } from "@/components/ui/button";
import { useCompanySettings } from "@/hooks/useBackend";
import { resolveContact } from "@/lib/contact";
import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";

export function CTASection() {
  const { data: settings } = useCompanySettings();
  const contact = resolveContact(settings);

  return (
    <section className="bg-background py-20" data-ocid="cta-section">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-semibold uppercase tracking-widest text-xs mb-4">
            Travaillons ensemble
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Prêt à travailler avec nous ?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Notre équipe d'experts est disponible pour répondre à toutes vos
            questions et vous accompagner dans vos projets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {contact.whatsappHref && (
              <Button
                size="lg"
                className="bg-[#25D366] text-white hover:bg-[#25D366]/90 font-semibold gap-2 shadow-corporate px-8"
                asChild
                data-ocid="cta-whatsapp"
              >
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/5 gap-2 px-8"
              asChild
              data-ocid="cta-devis"
            >
              <Link to="/contact">
                <Phone className="w-5 h-5" />
                Demander un devis
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
