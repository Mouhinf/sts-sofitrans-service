import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";

function useBackendActor() {
  return useActor(createActor);
}

export function useAuth() {
  const { identity, login, clear, loginStatus, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const { actor, isFetching } = useBackendActor();

  const { data: isAdmin = false, isLoading: isCheckingAdmin } = useQuery({
    queryKey: ["isAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching && !!identity,
  });

  const isAuthenticated = !!identity;

  return {
    identity,
    isAuthenticated,
    isAdmin,
    isCheckingAdmin,
    isInitializing,
    isLoggingIn,
    loginStatus,
    login,
    logout: clear,
  };
}
