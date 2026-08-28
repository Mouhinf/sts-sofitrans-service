// src/frontend/src/hooks/useAuth.ts
//
// JWT-based authentication backed by the Node + Prisma API.
// Replaces the previous Internet Identity flow used against the Motoko canister.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import {
  type AdminUser,
  type LoginResponse,
  type MessageStatus,
  type Property,
  type Vehicle,
} from "@/types";
import { ApiError, getToken, request, setToken } from "@/lib/apiClient";

interface MeResponse {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface LoginVars {
  email: string;
  password: string;
}

const TOKEN_STORAGE_EVENT = "sts-token-change";

function notifyTokenChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(TOKEN_STORAGE_EVENT));
}

export interface AuthState {
  /** Auth subsystem is still resolving the stored token / me call. */
  isInitializing: boolean;
  /** A valid JWT is present and `me` resolved successfully. */
  isAuthenticated: boolean;
  /** The user clicked "login" and the mutation is in flight. */
  isLoggingIn: boolean;
  /** Last login attempt failed. */
  isLoginError: boolean;
  /** Currently validating the stored token against `/api/auth/me`. */
  isCheckingAdmin: boolean;
  /** True once the backend confirms `admin` role for the current user. */
  isAdmin: boolean;
  /** Current logged-in user (or null). */
  user: AdminUser | null;
  /** Raw error from the latest login attempt. */
  loginError: Error | null | undefined;
  /** Trigger login against the API. */
  login: (vars: LoginVars) => Promise<void>;
  /** Clear the JWT locally and force re-render. */
  logout: () => void;
}

export function useAuth(): AuthState {
  const queryClient = useQueryClient();
  const [hasToken, setHasToken] = useState<boolean>(() => Boolean(getToken()));

  useEffect(() => {
    const handler = () => setHasToken(Boolean(getToken()));
    window.addEventListener(TOKEN_STORAGE_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(TOKEN_STORAGE_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const meQuery = useQuery<MeResponse | null>({
    queryKey: ["auth", "me", hasToken],
    queryFn: async () => {
      if (!getToken()) return null;
      try {
        return await request<MeResponse>("/api/auth/me", { auth: true });
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          setToken(null);
          notifyTokenChange();
        }
        return null;
      }
    },
    enabled: hasToken,
    staleTime: 60_000,
    retry: 0,
  });

  const loginMutation = useMutation<LoginResponse, Error, LoginVars>({
    mutationFn: async (vars) =>
      request<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: { email: vars.email, password: vars.password },
      }),
    onSuccess: (data) => {
      setToken(data.token);
      queryClient.setQueryData(["auth", "me", true], {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      });
      // Invalidate domain queries so the admin views refetch fresh data.
      queryClient.invalidateQueries();
      notifyTokenChange();
    },
  });

  const logout = useCallback(() => {
    setToken(null);
    queryClient.clear();
    notifyTokenChange();
  }, [queryClient]);

  const user: AdminUser | null = meQuery.data
    ? {
        id: meQuery.data.id,
        email: meQuery.data.email,
        name: meQuery.data.name,
        role: meQuery.data.role,
      }
    : null;

  const login = useCallback(
    async (vars: LoginVars) => {
      await loginMutation.mutateAsync(vars);
    },
    [loginMutation],
  );

  return {
    isInitializing: meQuery.isLoading,
    isAuthenticated: Boolean(user),
    isLoggingIn: loginMutation.isPending,
    isLoginError: loginMutation.isError,
    isCheckingAdmin: meQuery.isLoading,
    isAdmin: user?.role === "admin",
    user,
    loginError: loginMutation.error,
    login,
    logout,
  };
}

// Re-exports so consumers that imported from useBackend keep working.
export type { MessageStatus, Property, Vehicle };
