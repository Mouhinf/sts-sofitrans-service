import { Button } from "@/components/ui/button";
import { useCompanySettings } from "@/hooks/useBackend";
import { resolveContact } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Immobilier", href: "/services/immobilier" },
      { label: "Transport", href: "/services/transport" },
      { label: "Agrobusiness", href: "/services/agrobusiness" },
      { label: "Formation", href: "/services/formation" },
    ],
  },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function NavLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children?: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  if (!children) {
    return (
      <Link
        to={href}
        className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 px-2 py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        activeProps={{ className: "text-primary font-semibold" }}
      >
        {label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 px-2 py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-elevated z-50 overflow-hidden"
          >
            {children.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-muted transition-colors duration-150"
                activeProps={{
                  className: "text-primary bg-primary/5 font-medium",
                }}
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Header() {
  const { data: settings } = useCompanySettings();
  const contact = resolveContact(settings);

  const headerPhoneHref = contact.phoneHref;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-card border-b border-border transition-shadow duration-300",
        scrolled ? "shadow-corporate" : "",
      )}
      data-ocid="header"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          aria-label="STS SOFITRANS SERVICE — Accueil"
        >
          <img
            src="/assets/logo-mark.svg"
            alt="STS SOFITRANS SERVICE"
            className="h-10 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-primary leading-tight font-display">
              SOFITRANS SERVICE
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Pour Mieux Vous Servir!
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Navigation principale"
          data-ocid="nav"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            data-ocid="header-contact-btn"
          >
            <a href={headerPhoneHref} aria-label="Appeler STS SOFITRANS">
              <Phone className="h-4 w-4 mr-1.5" />
              Contact
            </a>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-ocid="header-devis-btn"
          >
            <Link to="/contact">Demander un devis</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
          data-ocid="mobile-menu-btn"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-border bg-card"
            data-ocid="mobile-nav"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.href}>
                  <Link
                    to={item.href}
                    className="block px-3 py-2.5 text-sm font-medium text-foreground rounded-md hover:bg-muted hover:text-primary transition-colors"
                    activeProps={{
                      className: "bg-primary/10 text-primary font-semibold",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 flex flex-col gap-0.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-3 py-2 text-sm text-muted-foreground rounded-md hover:bg-muted hover:text-primary transition-colors"
                          activeProps={{
                            className: "text-primary font-medium",
                          }}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
                <Button variant="outline" asChild className="w-full">
                  <a href={headerPhoneHref}>
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler maintenant
                  </a>
                </Button>
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground"
                  data-ocid="mobile-devis-btn"
                >
                  <Link to="/contact" onClick={() => setMobileOpen(false)}>
                    Demander un devis
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const { data: settings } = useCompanySettings();
  const contact = resolveContact(settings);
  const footerPhoneHref = contact.phoneHref;
  return (
    <footer className="bg-foreground text-background" data-ocid="footer">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/logo-mark.svg"
                alt="STS SOFITRANS SERVICE"
                className="h-12 w-auto object-contain bg-background rounded-md p-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div>
                <p className="font-display font-bold text-lg text-background leading-tight">
                  SOFITRANS SERVICE
                </p>
                <p className="text-sm text-background/70 italic">
                  Pour Mieux Vous Servir!
                </p>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed max-w-sm">
              Votre partenaire logistique d'excellence au Sénégal. Solutions de
              transport, de transit et de logistique intégrées pour les
              entreprises exigeantes.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-background mb-4">Navigation</h3>
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-background mb-4">Contact</h3>
            <address className="not-italic flex flex-col gap-3">
              <div>
                <p className="text-sm text-background/70 leading-relaxed">
                  Zac Mbao, Rond Point Sipres
                  <br />
                  Dakar, Sénégal
                </p>
              </div>
              <a
                href={footerPhoneHref}
                className="flex items-center gap-2 text-sm text-background/70 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {contact.phone}
              </a>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-background/70 hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                WhatsApp
              </a>
            </address>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/50">
          <p>© {year} STS SOFITRANS SERVICE. Tous droits réservés.</p>
          <p>
            <Link
              to="/contact"
              className="hover:text-background/80 underline transition-colors"
            >
              Mentions légales
            </Link>
            <span className="mx-2 opacity-50">·</span>
            <Link
              to="/contact"
              className="hover:text-background/80 underline transition-colors"
            >
              Nous contacter
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FloatingButtons() {
  const { data: settings } = useCompanySettings();
  const contact = resolveContact(settings);
  if (!contact.isConfigured) return null;
  return (
    <div
      className="fixed bottom-5 right-4 z-50 flex flex-col gap-3"
      aria-label="Contacts rapides"
    >
      <a
        href={contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-12 w-12 rounded-full shadow-elevated transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ backgroundColor: "#25D366" }}
        aria-label="Contacter via WhatsApp"
        data-ocid="whatsapp-float-btn"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </a>
      <a
        href={contact.phoneHref}
        className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary shadow-elevated transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Appeler STS SOFITRANS"
        data-ocid="call-float-btn"
      >
        <Phone className="h-6 w-6 text-secondary-foreground" />
      </a>
    </div>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:shadow-elevated focus:outline-none"
      >
        Aller au contenu principal
      </a>
      <Header />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
