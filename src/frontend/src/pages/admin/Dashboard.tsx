import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useAdminDashboardStats } from "@/hooks/useBackend";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  CalendarCheck,
  FileQuestion,
  FileText,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const STAT_CARDS = [
  {
    key: "totalProperties",
    label: "Propriétés",
    icon: Building2,
    href: "/admin/proprietes",
    color: "text-primary",
  },
  {
    key: "totalVehicles",
    label: "Véhicules",
    icon: Truck,
    href: "/admin/vehicules",
    color: "text-secondary",
  },
  {
    key: "totalTrainings",
    label: "Formations",
    icon: GraduationCap,
    href: "/admin/formations",
    color: "text-primary",
  },
  {
    key: "totalBlogPosts",
    label: "Articles",
    icon: FileText,
    href: "/admin/blog",
    color: "text-secondary",
  },
  {
    key: "totalMessages",
    label: "Messages",
    icon: MessageSquare,
    href: "/admin/messages",
    color: "text-primary",
  },
  {
    key: "totalBookings",
    label: "Réservations",
    icon: CalendarCheck,
    href: "/admin/reservations",
    color: "text-secondary",
  },
  {
    key: "totalQuotes",
    label: "Devis",
    icon: FileQuestion,
    href: "/admin/devis",
    color: "text-primary",
  },
  {
    key: "totalSubscribers",
    label: "Abonnés",
    icon: Users,
    href: "/admin/parametres",
    color: "text-secondary",
  },
] as const;

type StatKey = (typeof STAT_CARDS)[number]["key"];

export default function AdminDashboardPage() {
  const { isAuthenticated, isInitializing } = useAuth();
  const navigate = useNavigate();
  const { data: stats, isLoading } = useAdminDashboardStats();

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
          <p className="text-sm text-muted-foreground">Chargement…</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout title="Tableau de bord">
      <div className="flex flex-col gap-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-display text-2xl font-bold text-foreground">
            Bienvenue, Administrateur
          </h2>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre plateforme STS SOFITRANS SERVICE.
          </p>
        </motion.div>

        {/* Alert badges */}
        {stats && (
          <div className="flex flex-wrap gap-2">
            {Number(stats.unreadMessages) > 0 && (
              <Link
                to="/admin/messages"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium"
              >
                <MessageSquare className="h-3.5 w-3.5" />{" "}
                {Number(stats.unreadMessages)} message(s) non lu(s)
              </Link>
            )}
            {Number(stats.pendingBookings) > 0 && (
              <Link
                to="/admin/reservations"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium"
              >
                <CalendarCheck className="h-3.5 w-3.5" />{" "}
                {Number(stats.pendingBookings)} réservation(s) en attente
              </Link>
            )}
            {Number(stats.pendingQuotes) > 0 && (
              <Link
                to="/admin/devis"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium"
              >
                <FileQuestion className="h-3.5 w-3.5" />{" "}
                {Number(stats.pendingQuotes)} devis en attente
              </Link>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STAT_CARDS.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={card.href} data-ocid={`stat-card-${card.key}`}>
                <Card className="hover-lift cursor-pointer border border-border hover:border-primary/30">
                  <CardContent className="p-4 flex flex-col gap-2">
                    <div className="p-2 rounded-lg bg-muted w-fit">
                      <card.icon
                        className={["h-5 w-5", card.color].join(" ")}
                      />
                    </div>
                    {isLoading ? (
                      <Skeleton className="h-7 w-12" />
                    ) : (
                      <p className="font-display text-2xl font-bold text-foreground">
                        {Number(stats?.[card.key as StatKey] ?? 0n)}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {card.label}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Growth indicator */}
        <Card className="border border-border">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Plateforme active</p>
              <p className="text-sm text-muted-foreground">
                Toutes les sections sont opérationnelles. Continuez à enrichir
                votre contenu.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
