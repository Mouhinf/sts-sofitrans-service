import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { LogIn, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function AdminLoginPage() {
  const {
    isAuthenticated,
    isAdmin,
    isCheckingAdmin,
    isInitializing,
    isLoggingIn,
    login,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (isInitializing || isCheckingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner
          size="lg"
          label="Vérification de l'authentification..."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl shadow-elevated p-8 w-full max-w-sm text-center"
      >
        <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-6">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <img
          src="/assets/logo.jpg"
          alt="STS SOFITRANS"
          className="h-12 w-auto object-contain mx-auto mb-4"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Administration
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Connectez-vous avec Internet Identity pour accéder au tableau de bord.
        </p>
        {isAuthenticated && !isAdmin ? (
          <p className="text-destructive text-sm bg-destructive/10 rounded-lg p-3">
            Accès refusé. Votre compte n'a pas les droits d'administration.
          </p>
        ) : (
          <Button
            className="w-full bg-primary text-primary-foreground"
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="admin-login-btn"
          >
            {isLoggingIn ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" /> Connexion...
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-2" /> Se connecter
              </>
            )}
          </Button>
        )}
      </motion.div>
    </div>
  );
}
