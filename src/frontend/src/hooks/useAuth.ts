import { UserRole, createActor } from "@/backend";
import {
  type InternetIdentityContext,
  useActor,
  useInternetIdentity,
} from "@caffeineai/core-infrastructure";
import type { Identity } from "@icp-sdk/core/agent";
import { useQuery } from "@tanstack/react-query";

type Role = "admin" | "user" | "guest" | "unknown";

interface AuthState {
  /** II has finished restoring the saved identity (or has none). */
  isInitializing: boolean;
  /** A signed-in identity is available. */
  isAuthenticated: boolean;
  /** The user clicked "login" and is going through the II popup. */
  isLoggingIn: boolean;
  /** Last login attempt failed. */
  isLoginError: boolean;
  /** Currently fetching the user's role from the backend. */
  isCheckingAdmin: boolean;
  /** True once the backend confirms `UserRole.admin` for the caller. */
  isAdmin: boolean;
  /** Raw resolved role from the backend. */
  userRole: Role;
  /** The Internet Identity principal behind the session (string form). */
  principal: string | null;
  identity: Identity | undefined;
  loginError: Error | undefined;
  login: InternetIdentityContext["login"];
  logout: () => void;
}

const ROLE_MAP: Record<UserRole, Role> = {
  [UserRole.admin]: "admin",
  [UserRole.user]: "user",
  [UserRole.guest]: "guest",
};

function deriveRole(role: UserRole | null | undefined): Role {
  if (role === null || role === undefined) return "unknown";
  return ROLE_MAP[role] ?? "unknown";
}

export function useAuth(): AuthState {
  const {
    identity,
    login,
    clear,
    loginStatus,
    isInitializing,
    isLoggingIn,
    isLoginError,
    loginError,
  } = useInternetIdentity();

  const isAuthenticated = loginStatus === "success" && Boolean(identity);
  const principal = identity?.getPrincipal().toString() ?? null;

  // Resolve the caller's role only when we have a valid identity.
  // Query stays dormant for guests so we don't pollute logs with 401 noise.
  const { actor } = useActor(createActor);
  const roleQuery = useQuery<UserRole | null>({
    queryKey: ["callerUserRole", principal],
    queryFn: async () => {
      if (!actor || !identity) return null;
      try {
        return await actor.getCallerUserRole();
      } catch {
        return null;
      }
    },
    enabled: Boolean(actor) && isAuthenticated,
    staleTime: 60_000,
    retry: 1,
  });

  const userRole = deriveRole(roleQuery.data);
  const isAdmin = userRole === "admin";
  const isCheckingAdmin = isAuthenticated && roleQuery.isLoading;

  return {
    isInitializing,
    isAuthenticated,
    isLoggingIn,
    isLoginError,
    isCheckingAdmin,
    isAdmin,
    userRole,
    principal,
    identity,
    loginError,
    login,
    logout: clear,
  };
}
