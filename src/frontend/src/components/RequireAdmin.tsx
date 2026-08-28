import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "@tanstack/react-router";

interface RequireAdminProps {
  children: React.ReactNode;
}

/**
 * Route guard for /admin/*. Redirects to /admin/login if no identity,
 * shows a forbidden screen if the identity exists but is not an admin.
 *
 * This works as a Suspense-free wrapper because `useAuth` returns
 * synchronous `isInitializing` / `isAuthenticated` and a `useQuery`
 * for the role that has its own loading state.
 */
export function RequireAdmin({ children }: RequireAdminProps) {
  const { isInitializing, isAuthenticated, isCheckingAdmin, isAdmin } =
    useAuth();

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner
          size="lg"
          label="Vérification de l'authentification..."
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  if (isCheckingAdmin || isAdmin === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" label="Vérification des droits d'accès..." />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <div className="bg-card border border-border rounded-2xl shadow-elevated p-8 w-full max-w-md text-center">
          <p className="font-display text-xl font-bold text-foreground mb-2">
            Accès refusé
          </p>
          <p className="text-sm text-muted-foreground">
            Votre identité est connectée mais n'a pas les droits
            d'administration sur cette plateforme.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
