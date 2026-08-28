import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, LogIn, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function AdminLoginPage() {
  const { isAuthenticated, isAdmin, isInitializing, isLoggingIn, isLoginError, login, loginError } =
    useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" label="Vérification de l'authentification..." />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      await login({ email, password });
    } catch {
      /* error surfaced via loginError */
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl shadow-elevated p-8 w-full max-w-sm"
      >
        <div className="text-center mb-6">
          <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <img
            src="/assets/logo-mark.svg"
            alt="STS SOFITRANS"
            className="h-12 w-auto object-contain mx-auto mb-4"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            Administration
          </h1>
          <p className="text-muted-foreground text-sm">
            Connectez-vous pour accéder au tableau de bord.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2 text-left">
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sts-sofitrans.sn"
              data-ocid="admin-login-email-input"
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-ocid="admin-login-password-input"
            />
          </div>

          {isLoginError && (
            <p
              className="text-destructive text-sm bg-destructive/10 rounded-lg p-3 flex items-start gap-2"
              data-ocid="admin-login-error"
              role="alert"
            >
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                {loginError?.message || "Identifiants invalides. Veuillez réessayer."}
              </span>
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground"
            disabled={isLoggingIn || !email || !password}
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
        </form>
      </motion.div>
    </div>
  );
}
