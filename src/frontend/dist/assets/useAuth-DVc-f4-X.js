import { D as useInternetIdentity } from "./index-CtugyttR.js";
import { u as useQuery, a as useActor, c as createActor } from "./backend-gUdCIi-2.js";
function useBackendActor() {
  return useActor(createActor);
}
function useAuth() {
  const { identity, login, clear, loginStatus, isInitializing, isLoggingIn } = useInternetIdentity();
  const { actor, isFetching } = useBackendActor();
  const { data: isAdmin = false, isLoading: isCheckingAdmin } = useQuery({
    queryKey: ["isAdmin", identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching && !!identity
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
    logout: clear
  };
}
export {
  useAuth as u
};
