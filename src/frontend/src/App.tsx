import { Layout } from "@/components/Layout";
import { RequireAdmin } from "@/components/RequireAdmin";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import {
  Outlet,
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded public pages
const HomePage = lazy(() => import("@/pages/Home"));
const AboutPage = lazy(() => import("@/pages/About"));
const ServicesPage = lazy(() => import("@/pages/Services"));
const ImmobilierPage = lazy(() => import("@/pages/services/Immobilier"));
const TransportPage = lazy(() => import("@/pages/services/Transport"));
const AgrobusinessPage = lazy(() => import("@/pages/services/Agrobusiness"));
const FormationPage = lazy(() => import("@/pages/services/Formation"));
const BlogPage = lazy(() => import("@/pages/Blog"));
const BlogDetailPage = lazy(() => import("@/pages/BlogDetail"));
const ContactPage = lazy(() => import("@/pages/Contact"));

// Lazy-loaded admin pages
const AdminLoginPage = lazy(() => import("@/pages/admin/Login"));
const AdminDashboardPage = lazy(() => import("@/pages/admin/Dashboard"));
const AdminProprietesPage = lazy(() => import("@/pages/admin/Proprietes"));
const AdminVehiculesPage = lazy(() => import("@/pages/admin/Vehicules"));
const AdminFormationsPage = lazy(() => import("@/pages/admin/Formations"));
const AdminBlogPage = lazy(() => import("@/pages/admin/Blog"));
const AdminMessagesPage = lazy(() => import("@/pages/admin/Messages"));
const AdminReservationsPage = lazy(() => import("@/pages/admin/Reservations"));
const AdminDevisPage = lazy(() => import("@/pages/admin/Devis"));
const AdminParametresPage = lazy(() => import("@/pages/admin/Parametres"));

function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-6xl font-bold text-primary">404</p>
      <h1 className="font-display text-2xl font-bold text-foreground">
        Page introuvable
      </h1>
      <p className="text-muted-foreground max-w-md">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <a
        href="/"
        className="inline-flex items-center justify-center h-10 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Retour à l'accueil
      </a>
    </div>
  );
}

// Root route — owns layout slot, global fallback for unknown URLs.
const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
});

// Public layout wrapper
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public-layout",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

// Admin layout wrapper: protected by RequireAdmin, no public header/footer.
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin-layout",
  component: () => (
    <RequireAdmin>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </RequireAdmin>
  ),
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: () => <HomePage />,
});

const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/a-propos",
  component: () => <AboutPage />,
});

const servicesRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/services",
  component: () => <ServicesPage />,
});

const immobilierRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/services/immobilier",
  component: () => <ImmobilierPage />,
});

const transportRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/services/transport",
  component: () => <TransportPage />,
});

const agrobusinessRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/services/agrobusiness",
  component: () => <AgrobusinessPage />,
});

const formationRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/services/formation",
  component: () => <FormationPage />,
});

const blogRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/blog",
  component: () => <BlogPage />,
});

const blogDetailRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/blog/$slug",
  component: () => <BlogDetailPage />,
});

const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/contact",
  component: () => <ContactPage />,
});

// Admin routes
const adminRedirectRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin",
  beforeLoad: () => {
    throw redirect({ to: "/admin/dashboard" });
  },
  component: () => null,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/login",
  component: () => <AdminLoginPage />,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/dashboard",
  component: () => <AdminDashboardPage />,
});

const adminProprietesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/proprietes",
  component: () => <AdminProprietesPage />,
});

const adminVehiculesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/vehicules",
  component: () => <AdminVehiculesPage />,
});

const adminFormationsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/formations",
  component: () => <AdminFormationsPage />,
});

const adminBlogRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/blog",
  component: () => <AdminBlogPage />,
});

const adminMessagesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/messages",
  component: () => <AdminMessagesPage />,
});

const adminReservationsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/reservations",
  component: () => <AdminReservationsPage />,
});

const adminDevisRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/devis",
  component: () => <AdminDevisPage />,
});

const adminParametresRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/parametres",
  component: () => <AdminParametresPage />,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    aboutRoute,
    servicesRoute,
    immobilierRoute,
    transportRoute,
    agrobusinessRoute,
    formationRoute,
    blogRoute,
    blogDetailRoute,
    contactRoute,
  ]),
  adminLayoutRoute.addChildren([
    adminRedirectRoute,
    adminLoginRoute,
    adminDashboardRoute,
    adminProprietesRoute,
    adminVehiculesRoute,
    adminFormationsRoute,
    adminBlogRoute,
    adminMessagesRoute,
    adminReservationsRoute,
    adminDevisRoute,
    adminParametresRoute,
  ]),
]);

const hashHistory = createHashHistory();
const router = createRouter({ routeTree, history: hashHistory });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
