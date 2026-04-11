var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { q as Subscribable, s as shallowEqualObjects, t as hashKey, v as getDefaultState, w as notifyManager, x as useQueryClient, r as reactExports, y as noop, z as shouldThrowError } from "./index-CtugyttR.js";
import { u as useQuery, a as useActor, c as createActor } from "./backend-gUdCIi-2.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function useBackendActor() {
  return useActor(createActor);
}
function useProperties(filter = {}) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["properties", filter],
    queryFn: () => actor.listProperties(filter),
    enabled: !!actor && !isFetching
  });
}
function useVehicles(filter = {}) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["vehicles", filter],
    queryFn: () => actor.listVehicles(filter),
    enabled: !!actor && !isFetching
  });
}
function useTrainings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["trainings"],
    queryFn: () => actor.listTrainings(),
    enabled: !!actor && !isFetching
  });
}
function useBlogPosts(page = 1n, pageSize = 9n) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["blogPosts", page.toString(), pageSize.toString()],
    queryFn: () => actor.listBlogPosts(page, pageSize),
    enabled: !!actor && !isFetching
  });
}
function useBlogPostBySlug(slug) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => actor.getBlogPostBySlug(slug),
    enabled: !!actor && !isFetching && !!slug
  });
}
function useCompanySettings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["companySettings"],
    queryFn: () => actor.getCompanySettings(),
    enabled: !!actor && !isFetching
  });
}
function useSubmitMessage() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: (input) => actor.submitMessage(input)
  });
}
function useSubmitQuote() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: (input) => actor.submitQuote(input)
  });
}
function useSubmitBooking() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: (input) => actor.submitBooking(input)
  });
}
function useEnrollInTraining() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: (input) => actor.enrollInTraining(input)
  });
}
function useSubscribeNewsletter() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: (email) => actor.subscribeNewsletter(email)
  });
}
function useAdminDashboardStats() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: () => actor.adminGetDashboardStats(),
    enabled: !!actor && !isFetching
  });
}
function useAdminProperties() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminProperties"],
    queryFn: () => actor.adminListProperties(),
    enabled: !!actor && !isFetching
  });
}
function useAdminVehicles() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminVehicles"],
    queryFn: () => actor.adminListVehicles(),
    enabled: !!actor && !isFetching
  });
}
function useAdminTrainings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminTrainings"],
    queryFn: () => actor.adminListTrainings(),
    enabled: !!actor && !isFetching
  });
}
function useAdminBlogPosts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminBlogPosts"],
    queryFn: () => actor.adminListBlogPosts(),
    enabled: !!actor && !isFetching
  });
}
function useAdminMessages() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminMessages"],
    queryFn: () => actor.adminListMessages(),
    enabled: !!actor && !isFetching
  });
}
function useAdminBookings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminBookings"],
    queryFn: () => actor.adminListBookings(),
    enabled: !!actor && !isFetching
  });
}
function useAdminQuotes() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminQuotes"],
    queryFn: () => actor.adminListQuotes(),
    enabled: !!actor && !isFetching
  });
}
function useAdminCreateProperty() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => actor.adminCreateProperty(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProperties"] })
  });
}
function useAdminUpdateProperty() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }) => actor.adminUpdateProperty(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProperties"] })
  });
}
function useAdminDeleteProperty() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => actor.adminDeleteProperty(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProperties"] })
  });
}
function useAdminCreateVehicle() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => actor.adminCreateVehicle(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminVehicles"] })
  });
}
function useAdminUpdateVehicle() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }) => actor.adminUpdateVehicle(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminVehicles"] })
  });
}
function useAdminDeleteVehicle() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => actor.adminDeleteVehicle(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminVehicles"] })
  });
}
function useAdminCreateTraining() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => actor.adminCreateTraining(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminTrainings"] })
  });
}
function useAdminUpdateTraining() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }) => actor.adminUpdateTraining(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminTrainings"] })
  });
}
function useAdminDeleteTraining() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => actor.adminDeleteTraining(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminTrainings"] })
  });
}
function useAdminCreateBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => actor.adminCreateBlogPost(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminBlogPosts"] })
  });
}
function useAdminUpdateBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }) => actor.adminUpdateBlogPost(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminBlogPosts"] })
  });
}
function useAdminDeleteBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => actor.adminDeleteBlogPost(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminBlogPosts"] })
  });
}
function useAdminUpdateMessageStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => actor.adminUpdateMessageStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminMessages"] })
  });
}
function useAdminUpdateBookingStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => actor.adminUpdateBookingStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminBookings"] })
  });
}
function useAdminUpdateQuoteStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => actor.adminUpdateQuoteStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminQuotes"] })
  });
}
function useAdminUpdateCompanySettings() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (settings) => actor.adminUpdateCompanySettings(settings),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["companySettings"] })
  });
}
export {
  useAdminDeleteBlogPost as A,
  useAdminMessages as B,
  useAdminUpdateMessageStatus as C,
  useAdminBookings as D,
  useAdminUpdateBookingStatus as E,
  useAdminQuotes as F,
  useAdminUpdateQuoteStatus as G,
  useCompanySettings as H,
  useAdminUpdateCompanySettings as I,
  useVehicles as a,
  useSubscribeNewsletter as b,
  useSubmitQuote as c,
  useSubmitBooking as d,
  useTrainings as e,
  useEnrollInTraining as f,
  useBlogPosts as g,
  useBlogPostBySlug as h,
  useSubmitMessage as i,
  useAdminDashboardStats as j,
  useAdminProperties as k,
  useAdminCreateProperty as l,
  useAdminUpdateProperty as m,
  useAdminDeleteProperty as n,
  useAdminVehicles as o,
  useAdminCreateVehicle as p,
  useAdminUpdateVehicle as q,
  useAdminDeleteVehicle as r,
  useAdminTrainings as s,
  useAdminCreateTraining as t,
  useProperties as u,
  useAdminUpdateTraining as v,
  useAdminDeleteTraining as w,
  useAdminBlogPosts as x,
  useAdminCreateBlogPost as y,
  useAdminUpdateBlogPost as z
};
