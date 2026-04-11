import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Building2,
  CalendarCheck,
  ChevronRight,
  FileQuestion,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Truck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const ADMIN_NAV = [
  { label: "Tableau de bord", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Propriétés", href: "/admin/proprietes", icon: Building2 },
  { label: "Véhicules", href: "/admin/vehicules", icon: Truck },
  { label: "Formations", href: "/admin/formations", icon: GraduationCap },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Réservations", href: "/admin/reservations", icon: CalendarCheck },
  { label: "Devis", href: "/admin/devis", icon: FileQuestion },
  { label: "Paramètres", href: "/admin/parametres", icon: Settings },
];

function NavItem({
  href,
  label,
  icon: Icon,
}: { href: string; label: string; icon: React.ElementType }) {
  const routerState = useRouterState();
  const isActive =
    routerState.location.pathname === href ||
    routerState.location.pathname.startsWith(`${href}/`);

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        isActive ? "bg-primary/10 text-primary" : "text-sidebar-foreground/70",
      )}
      data-ocid={`admin-nav-${href.replace("/admin/", "")}`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
      {isActive && (
        <ChevronRight className="ml-auto h-3.5 w-3.5 text-primary" />
      )}
    </Link>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar — Desktop */}
      <aside
        className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border shrink-0 sticky top-0 h-screen overflow-y-auto"
        aria-label="Navigation admin"
        data-ocid="admin-sidebar"
      >
        {/* Brand */}
        <div className="p-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/assets/logo.jpg"
              alt="STS SOFITRANS"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div>
              <p className="text-xs font-bold text-sidebar-foreground font-display leading-tight">
                SOFITRANS
              </p>
              <p className="text-[10px] text-sidebar-foreground/50">
                Administration
              </p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {ADMIN_NAV.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={logout}
            data-ocid="admin-logout-btn"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col overflow-y-auto lg:hidden"
              data-ocid="admin-sidebar-mobile"
            >
              <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
                <Link
                  to="/"
                  className="flex items-center gap-2"
                  onClick={() => setSidebarOpen(false)}
                >
                  <img
                    src="/assets/logo.jpg"
                    alt="STS SOFITRANS"
                    className="h-8 w-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <p className="text-xs font-bold font-display text-sidebar-foreground">
                    SOFITRANS
                  </p>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Fermer le menu"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <nav className="flex-1 p-3 flex flex-col gap-1">
                {ADMIN_NAV.map((item) => (
                  <div
                    key={item.href}
                    onClick={() => setSidebarOpen(false)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setSidebarOpen(false)
                    }
                  >
                    <NavItem {...item} />
                  </div>
                ))}
              </nav>
              <div className="p-3 border-t border-sidebar-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-destructive"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center gap-3"
          data-ocid="admin-header"
        >
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Ouvrir le menu"
            data-ocid="admin-mobile-menu-btn"
          >
            <Menu className="h-5 w-5" />
          </Button>
          {title && (
            <h1 className="text-lg font-semibold font-display text-foreground truncate">
              {title}
            </h1>
          )}
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/" className="text-xs">
                ← Voir le site
              </Link>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
