import { c as createLucideIcon, b as useNavigate, r as reactExports, j as jsxRuntimeExports, d as LoadingSpinner, m as motion, B as Button } from "./index-CtugyttR.js";
import { u as useAuth } from "./useAuth-DVc-f4-X.js";
import { S as Shield } from "./shield-Bi8eJdUN.js";
import "./backend-gUdCIi-2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
function AdminLoginPage() {
  const {
    isAuthenticated,
    isAdmin,
    isCheckingAdmin,
    isInitializing,
    isLoggingIn,
    login
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [isAuthenticated, isAdmin, navigate]);
  if (isInitializing || isCheckingAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoadingSpinner,
      {
        size: "lg",
        label: "Vérification de l'authentification..."
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-muted/30 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      className: "bg-card border border-border rounded-2xl shadow-elevated p-8 w-full max-w-sm text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-full bg-primary/10 w-fit mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-8 w-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/logo.jpg",
            alt: "STS SOFITRANS",
            className: "h-12 w-auto object-contain mx-auto mb-4",
            onError: (e) => {
              e.target.style.display = "none";
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Administration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8", children: "Connectez-vous avec Internet Identity pour accéder au tableau de bord." }),
        isAuthenticated && !isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-sm bg-destructive/10 rounded-lg p-3", children: "Accès refusé. Votre compte n'a pas les droits d'administration." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full bg-primary text-primary-foreground",
            onClick: login,
            disabled: isLoggingIn,
            "data-ocid": "admin-login-btn",
            children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm", className: "mr-2" }),
              " Connexion..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4 mr-2" }),
              " Se connecter"
            ] })
          }
        )
      ]
    }
  ) });
}
export {
  AdminLoginPage as default
};
