var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a;
import { E as ProtocolError, T as TimeoutWaitingForResponseErrorCode, F as utf8ToBytes, G as ExternalError, H as MissingRootKeyErrorCode, I as Certificate, J as lookupResultToBuffer, K as RequestStatusResponseStatus, U as UnknownError, N as RequestStatusDoneNoReplyErrorCode, O as RejectError, Q as CertifiedRejectErrorCode, V as UNREACHABLE_ERROR, W as InputError, Y as InvalidReadStateRequestErrorCode, Z as ReadRequestType, _ as Principal, $ as IDL, a0 as MissingCanisterIdErrorCode, a1 as HttpAgent, a2 as encode, a3 as QueryResponseStatus, a4 as UncertifiedRejectErrorCode, a5 as isV3ResponseBody, a6 as isV2ResponseBody, a7 as UncertifiedRejectUpdateErrorCode, a8 as UnexpectedErrorCode, a9 as decode, q as Subscribable, aa as pendingThenable, ab as resolveEnabled, s as shallowEqualObjects, ac as resolveStaleTime, y as noop, ad as environmentManager, ae as isValidTimeout, af as timeUntilStale, ag as timeoutManager, ah as focusManager, ai as fetchState, aj as replaceData, w as notifyManager, r as reactExports, z as shouldThrowError, x as useQueryClient, D as useInternetIdentity, ak as createActorWithConfig, al as Record, am as Opt, an as Vec, ao as Variant, ap as Service, aq as Func, ar as Nat, as as Text, at as Nat8, au as Bool, av as Null, aw as Int, ax as Principal$1 } from "./index-CtugyttR.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a2;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a2 = agent.createReadStateRequest) == null ? void 0 : _a2.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a2, _b;
      options = {
        ...options,
        ...(_b = (_a2 = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a2, _b;
      options = {
        ...options,
        ...(_b = (_a2 = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout2 = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout2));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
function hasAccessControl(actor) {
  return typeof actor === "object" && actor !== null && "_initializeAccessControl" in actor;
}
const ACTOR_QUERY_KEY = "actor";
function useActor(createActor2) {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      const isAuthenticated = !!identity;
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actorOptions = {
        agentOptions: {
          identity
        }
      };
      const actor = await createActorWithConfig(createActor2, actorOptions);
      if (hasAccessControl(actor)) {
        await actor._initializeAccessControl();
      }
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
const _ImmutableObjectStorageCreateCertificateResult = Record({
  "method": Text,
  "blob_hash": Text
});
const _ImmutableObjectStorageRefillInformation = Record({
  "proposed_top_up_amount": Opt(Nat)
});
const _ImmutableObjectStorageRefillResult = Record({
  "success": Opt(Bool),
  "topped_up_amount": Opt(Nat)
});
const Timestamp = Int;
const ExternalBlob$1 = Vec(Nat8);
const PostStatus = Variant({
  "published": Null,
  "draft": Null
});
const BlogPostInput = Record({
  "title": Text,
  "content": Text,
  "categoryTags": Vec(Text),
  "publishDate": Opt(Timestamp),
  "featuredImage": ExternalBlob$1,
  "slug": Text,
  "postStatus": PostStatus,
  "description": Text,
  "author": Text
});
const Id = Nat;
const BlogPost = Record({
  "id": Id,
  "title": Text,
  "content": Text,
  "categoryTags": Vec(Text),
  "publishDate": Opt(Timestamp),
  "featuredImage": ExternalBlob$1,
  "createdAt": Timestamp,
  "slug": Text,
  "postStatus": PostStatus,
  "description": Text,
  "author": Text,
  "updatedAt": Timestamp
});
const PropertyType = Variant({
  "house": Null,
  "land": Null,
  "apartment": Null,
  "office": Null
});
const PropertyInput = Record({
  "title": Text,
  "featured": Bool,
  "propertyType": PropertyType,
  "bedrooms": Nat,
  "description": Text,
  "areaSqm": Nat,
  "bathrooms": Nat,
  "price": Nat,
  "location": Text,
  "images": Vec(ExternalBlob$1)
});
const Property = Record({
  "id": Id,
  "title": Text,
  "featured": Bool,
  "propertyType": PropertyType,
  "bedrooms": Nat,
  "createdAt": Timestamp,
  "description": Text,
  "updatedAt": Timestamp,
  "areaSqm": Nat,
  "bathrooms": Nat,
  "price": Nat,
  "location": Text,
  "images": Vec(ExternalBlob$1)
});
const TrainingInput = Record({
  "durationDays": Nat,
  "title": Text,
  "maxCapacity": Nat,
  "description": Text,
  "image": ExternalBlob$1,
  "price": Nat
});
const TrainingEnrollment = Record({
  "dateRegistered": Timestamp,
  "name": Text,
  "email": Text,
  "phone": Text
});
const Training = Record({
  "id": Id,
  "durationDays": Nat,
  "title": Text,
  "maxCapacity": Nat,
  "createdAt": Timestamp,
  "description": Text,
  "updatedAt": Timestamp,
  "image": ExternalBlob$1,
  "price": Nat,
  "enrollments": Vec(TrainingEnrollment)
});
const VehicleType = Variant({
  "bus": Null,
  "car": Null,
  "truck": Null,
  "minibus": Null
});
const VehicleInput = Record({
  "model": Text,
  "vehicleType": VehicleType,
  "title": Text,
  "featured": Bool,
  "description": Text,
  "pricePerDay": Nat,
  "capacity": Nat,
  "images": Vec(ExternalBlob$1)
});
const Vehicle = Record({
  "id": Id,
  "model": Text,
  "vehicleType": VehicleType,
  "title": Text,
  "featured": Bool,
  "createdAt": Timestamp,
  "description": Text,
  "pricePerDay": Nat,
  "updatedAt": Timestamp,
  "capacity": Nat,
  "images": Vec(ExternalBlob$1)
});
const BookingStatus$1 = Variant({
  "cancelled": Null,
  "pending": Null,
  "confirmed": Null
});
const Booking = Record({
  "id": Id,
  "customerName": Text,
  "status": BookingStatus$1,
  "endDate": Text,
  "specialRequests": Text,
  "createdAt": Timestamp,
  "email": Text,
  "updatedAt": Timestamp,
  "phone": Text,
  "vehicleId": Id,
  "startDate": Text
});
const DashboardStats = Record({
  "pendingBookings": Nat,
  "totalProperties": Nat,
  "totalTrainings": Nat,
  "totalVehicles": Nat,
  "totalBlogPosts": Nat,
  "unreadMessages": Nat,
  "totalBookings": Nat,
  "totalMessages": Nat,
  "totalQuotes": Nat,
  "totalSubscribers": Nat,
  "pendingQuotes": Nat
});
const QuoteStatus$1 = Variant({
  "pending": Null,
  "sent": Null,
  "accepted": Null,
  "declined": Null
});
const Quote = Record({
  "id": Id,
  "customerName": Text,
  "status": QuoteStatus$1,
  "serviceType": Text,
  "createdAt": Timestamp,
  "email": Text,
  "updatedAt": Timestamp,
  "phone": Text,
  "requirements": Text,
  "budgetRange": Text
});
const MessageStatus$1 = Variant({
  "read": Null,
  "unread": Null,
  "archived": Null
});
const Message = Record({
  "id": Id,
  "customerName": Text,
  "status": MessageStatus$1,
  "createdAt": Timestamp,
  "email": Text,
  "message": Text,
  "phone": Text
});
const NewsletterSubscriber = Record({
  "id": Id,
  "unsubscribedAt": Opt(Timestamp),
  "verified": Bool,
  "subscribedAt": Timestamp,
  "email": Text
});
const CompanySettings = Record({
  "whatsapp": Text,
  "instagramUrl": Opt(Text),
  "email": Text,
  "logoUrl": Text,
  "address": Text,
  "phone": Text,
  "youtubeUrl": Opt(Text),
  "facebookUrl": Opt(Text),
  "linkedinUrl": Opt(Text)
});
const UserRole = Variant({
  "admin": Null,
  "user": Null,
  "guest": Null
});
const EnrollmentInput = Record({
  "name": Text,
  "email": Text,
  "trainingId": Id,
  "phone": Text
});
const BlogPage = Record({
  "total": Nat,
  "page": Nat,
  "pageSize": Nat,
  "posts": Vec(BlogPost)
});
const PropertyFilter = Record({
  "propertyType": Opt(PropertyType),
  "maxPrice": Opt(Nat),
  "minPrice": Opt(Nat)
});
const VehicleFilter = Record({
  "vehicleType": Opt(VehicleType)
});
const BookingInput = Record({
  "customerName": Text,
  "endDate": Text,
  "specialRequests": Text,
  "email": Text,
  "phone": Text,
  "vehicleId": Id,
  "startDate": Text
});
const MessageInput = Record({
  "customerName": Text,
  "email": Text,
  "message": Text,
  "phone": Text
});
const QuoteInput = Record({
  "customerName": Text,
  "serviceType": Text,
  "email": Text,
  "phone": Text,
  "requirements": Text,
  "budgetRange": Text
});
Service({
  "_immutableObjectStorageBlobsAreLive": Func(
    [Vec(Vec(Nat8))],
    [Vec(Bool)],
    ["query"]
  ),
  "_immutableObjectStorageBlobsToDelete": Func(
    [],
    [Vec(Vec(Nat8))],
    ["query"]
  ),
  "_immutableObjectStorageConfirmBlobDeletion": Func(
    [Vec(Vec(Nat8))],
    [],
    []
  ),
  "_immutableObjectStorageCreateCertificate": Func(
    [Text],
    [_ImmutableObjectStorageCreateCertificateResult],
    []
  ),
  "_immutableObjectStorageRefillCashier": Func(
    [Opt(_ImmutableObjectStorageRefillInformation)],
    [_ImmutableObjectStorageRefillResult],
    []
  ),
  "_immutableObjectStorageUpdateGatewayPrincipals": Func([], [], []),
  "_initializeAccessControl": Func([], [], []),
  "adminCreateBlogPost": Func([BlogPostInput], [BlogPost], []),
  "adminCreateProperty": Func([PropertyInput], [Property], []),
  "adminCreateTraining": Func([TrainingInput], [Training], []),
  "adminCreateVehicle": Func([VehicleInput], [Vehicle], []),
  "adminDeleteBlogPost": Func([Id], [Bool], []),
  "adminDeleteProperty": Func([Id], [Bool], []),
  "adminDeleteTraining": Func([Id], [Bool], []),
  "adminDeleteVehicle": Func([Id], [Bool], []),
  "adminGetActiveSubscriberCount": Func([], [Nat], ["query"]),
  "adminGetBookingById": Func([Id], [Opt(Booking)], ["query"]),
  "adminGetDashboardStats": Func([], [DashboardStats], ["query"]),
  "adminGetEnrollmentsList": Func(
    [Id],
    [Vec(TrainingEnrollment)],
    ["query"]
  ),
  "adminGetPendingBookingCount": Func([], [Nat], ["query"]),
  "adminGetPendingQuoteCount": Func([], [Nat], ["query"]),
  "adminGetQuoteById": Func([Id], [Opt(Quote)], ["query"]),
  "adminGetUnreadMessageCount": Func([], [Nat], ["query"]),
  "adminListBlogPosts": Func([], [Vec(BlogPost)], ["query"]),
  "adminListBookings": Func([], [Vec(Booking)], ["query"]),
  "adminListMessages": Func([], [Vec(Message)], ["query"]),
  "adminListProperties": Func([], [Vec(Property)], ["query"]),
  "adminListQuotes": Func([], [Vec(Quote)], ["query"]),
  "adminListSubscribers": Func(
    [],
    [Vec(NewsletterSubscriber)],
    ["query"]
  ),
  "adminListTrainings": Func([], [Vec(Training)], ["query"]),
  "adminListVehicles": Func([], [Vec(Vehicle)], ["query"]),
  "adminUpdateBlogPost": Func(
    [Id, BlogPostInput],
    [Opt(BlogPost)],
    []
  ),
  "adminUpdateBookingStatus": Func(
    [Id, BookingStatus$1],
    [Opt(Booking)],
    []
  ),
  "adminUpdateCompanySettings": Func([CompanySettings], [], []),
  "adminUpdateMessageStatus": Func(
    [Id, MessageStatus$1],
    [Opt(Message)],
    []
  ),
  "adminUpdateProperty": Func(
    [Id, PropertyInput],
    [Opt(Property)],
    []
  ),
  "adminUpdateQuoteStatus": Func([Id, QuoteStatus$1], [Opt(Quote)], []),
  "adminUpdateTraining": Func(
    [Id, TrainingInput],
    [Opt(Training)],
    []
  ),
  "adminUpdateVehicle": Func([Id, VehicleInput], [Opt(Vehicle)], []),
  "assignCallerUserRole": Func([Principal$1, UserRole], [], []),
  "enrollInTraining": Func([EnrollmentInput], [Bool], []),
  "getBlogPostById": Func([Id], [Opt(BlogPost)], ["query"]),
  "getBlogPostBySlug": Func([Text], [Opt(BlogPost)], ["query"]),
  "getCallerUserRole": Func([], [UserRole], ["query"]),
  "getCompanySettings": Func([], [CompanySettings], ["query"]),
  "getProperty": Func([Id], [Opt(Property)], ["query"]),
  "getTraining": Func([Id], [Opt(Training)], ["query"]),
  "getVehicle": Func([Id], [Opt(Vehicle)], ["query"]),
  "isCallerAdmin": Func([], [Bool], ["query"]),
  "listBlogPosts": Func([Nat, Nat], [BlogPage], ["query"]),
  "listProperties": Func([PropertyFilter], [Vec(Property)], ["query"]),
  "listTrainings": Func([], [Vec(Training)], ["query"]),
  "listVehicles": Func([VehicleFilter], [Vec(Vehicle)], ["query"]),
  "submitBooking": Func([BookingInput], [Booking], []),
  "submitMessage": Func([MessageInput], [Message], []),
  "submitQuote": Func([QuoteInput], [Quote], []),
  "subscribeNewsletter": Func([Text], [NewsletterSubscriber], []),
  "unsubscribeNewsletter": Func([Text], [Bool], [])
});
const idlFactory = ({ IDL: IDL2 }) => {
  const _ImmutableObjectStorageCreateCertificateResult2 = IDL2.Record({
    "method": IDL2.Text,
    "blob_hash": IDL2.Text
  });
  const _ImmutableObjectStorageRefillInformation2 = IDL2.Record({
    "proposed_top_up_amount": IDL2.Opt(IDL2.Nat)
  });
  const _ImmutableObjectStorageRefillResult2 = IDL2.Record({
    "success": IDL2.Opt(IDL2.Bool),
    "topped_up_amount": IDL2.Opt(IDL2.Nat)
  });
  const Timestamp2 = IDL2.Int;
  const ExternalBlob2 = IDL2.Vec(IDL2.Nat8);
  const PostStatus2 = IDL2.Variant({
    "published": IDL2.Null,
    "draft": IDL2.Null
  });
  const BlogPostInput2 = IDL2.Record({
    "title": IDL2.Text,
    "content": IDL2.Text,
    "categoryTags": IDL2.Vec(IDL2.Text),
    "publishDate": IDL2.Opt(Timestamp2),
    "featuredImage": ExternalBlob2,
    "slug": IDL2.Text,
    "postStatus": PostStatus2,
    "description": IDL2.Text,
    "author": IDL2.Text
  });
  const Id2 = IDL2.Nat;
  const BlogPost2 = IDL2.Record({
    "id": Id2,
    "title": IDL2.Text,
    "content": IDL2.Text,
    "categoryTags": IDL2.Vec(IDL2.Text),
    "publishDate": IDL2.Opt(Timestamp2),
    "featuredImage": ExternalBlob2,
    "createdAt": Timestamp2,
    "slug": IDL2.Text,
    "postStatus": PostStatus2,
    "description": IDL2.Text,
    "author": IDL2.Text,
    "updatedAt": Timestamp2
  });
  const PropertyType2 = IDL2.Variant({
    "house": IDL2.Null,
    "land": IDL2.Null,
    "apartment": IDL2.Null,
    "office": IDL2.Null
  });
  const PropertyInput2 = IDL2.Record({
    "title": IDL2.Text,
    "featured": IDL2.Bool,
    "propertyType": PropertyType2,
    "bedrooms": IDL2.Nat,
    "description": IDL2.Text,
    "areaSqm": IDL2.Nat,
    "bathrooms": IDL2.Nat,
    "price": IDL2.Nat,
    "location": IDL2.Text,
    "images": IDL2.Vec(ExternalBlob2)
  });
  const Property2 = IDL2.Record({
    "id": Id2,
    "title": IDL2.Text,
    "featured": IDL2.Bool,
    "propertyType": PropertyType2,
    "bedrooms": IDL2.Nat,
    "createdAt": Timestamp2,
    "description": IDL2.Text,
    "updatedAt": Timestamp2,
    "areaSqm": IDL2.Nat,
    "bathrooms": IDL2.Nat,
    "price": IDL2.Nat,
    "location": IDL2.Text,
    "images": IDL2.Vec(ExternalBlob2)
  });
  const TrainingInput2 = IDL2.Record({
    "durationDays": IDL2.Nat,
    "title": IDL2.Text,
    "maxCapacity": IDL2.Nat,
    "description": IDL2.Text,
    "image": ExternalBlob2,
    "price": IDL2.Nat
  });
  const TrainingEnrollment2 = IDL2.Record({
    "dateRegistered": Timestamp2,
    "name": IDL2.Text,
    "email": IDL2.Text,
    "phone": IDL2.Text
  });
  const Training2 = IDL2.Record({
    "id": Id2,
    "durationDays": IDL2.Nat,
    "title": IDL2.Text,
    "maxCapacity": IDL2.Nat,
    "createdAt": Timestamp2,
    "description": IDL2.Text,
    "updatedAt": Timestamp2,
    "image": ExternalBlob2,
    "price": IDL2.Nat,
    "enrollments": IDL2.Vec(TrainingEnrollment2)
  });
  const VehicleType2 = IDL2.Variant({
    "bus": IDL2.Null,
    "car": IDL2.Null,
    "truck": IDL2.Null,
    "minibus": IDL2.Null
  });
  const VehicleInput2 = IDL2.Record({
    "model": IDL2.Text,
    "vehicleType": VehicleType2,
    "title": IDL2.Text,
    "featured": IDL2.Bool,
    "description": IDL2.Text,
    "pricePerDay": IDL2.Nat,
    "capacity": IDL2.Nat,
    "images": IDL2.Vec(ExternalBlob2)
  });
  const Vehicle2 = IDL2.Record({
    "id": Id2,
    "model": IDL2.Text,
    "vehicleType": VehicleType2,
    "title": IDL2.Text,
    "featured": IDL2.Bool,
    "createdAt": Timestamp2,
    "description": IDL2.Text,
    "pricePerDay": IDL2.Nat,
    "updatedAt": Timestamp2,
    "capacity": IDL2.Nat,
    "images": IDL2.Vec(ExternalBlob2)
  });
  const BookingStatus2 = IDL2.Variant({
    "cancelled": IDL2.Null,
    "pending": IDL2.Null,
    "confirmed": IDL2.Null
  });
  const Booking2 = IDL2.Record({
    "id": Id2,
    "customerName": IDL2.Text,
    "status": BookingStatus2,
    "endDate": IDL2.Text,
    "specialRequests": IDL2.Text,
    "createdAt": Timestamp2,
    "email": IDL2.Text,
    "updatedAt": Timestamp2,
    "phone": IDL2.Text,
    "vehicleId": Id2,
    "startDate": IDL2.Text
  });
  const DashboardStats2 = IDL2.Record({
    "pendingBookings": IDL2.Nat,
    "totalProperties": IDL2.Nat,
    "totalTrainings": IDL2.Nat,
    "totalVehicles": IDL2.Nat,
    "totalBlogPosts": IDL2.Nat,
    "unreadMessages": IDL2.Nat,
    "totalBookings": IDL2.Nat,
    "totalMessages": IDL2.Nat,
    "totalQuotes": IDL2.Nat,
    "totalSubscribers": IDL2.Nat,
    "pendingQuotes": IDL2.Nat
  });
  const QuoteStatus2 = IDL2.Variant({
    "pending": IDL2.Null,
    "sent": IDL2.Null,
    "accepted": IDL2.Null,
    "declined": IDL2.Null
  });
  const Quote2 = IDL2.Record({
    "id": Id2,
    "customerName": IDL2.Text,
    "status": QuoteStatus2,
    "serviceType": IDL2.Text,
    "createdAt": Timestamp2,
    "email": IDL2.Text,
    "updatedAt": Timestamp2,
    "phone": IDL2.Text,
    "requirements": IDL2.Text,
    "budgetRange": IDL2.Text
  });
  const MessageStatus2 = IDL2.Variant({
    "read": IDL2.Null,
    "unread": IDL2.Null,
    "archived": IDL2.Null
  });
  const Message2 = IDL2.Record({
    "id": Id2,
    "customerName": IDL2.Text,
    "status": MessageStatus2,
    "createdAt": Timestamp2,
    "email": IDL2.Text,
    "message": IDL2.Text,
    "phone": IDL2.Text
  });
  const NewsletterSubscriber2 = IDL2.Record({
    "id": Id2,
    "unsubscribedAt": IDL2.Opt(Timestamp2),
    "verified": IDL2.Bool,
    "subscribedAt": Timestamp2,
    "email": IDL2.Text
  });
  const CompanySettings2 = IDL2.Record({
    "whatsapp": IDL2.Text,
    "instagramUrl": IDL2.Opt(IDL2.Text),
    "email": IDL2.Text,
    "logoUrl": IDL2.Text,
    "address": IDL2.Text,
    "phone": IDL2.Text,
    "youtubeUrl": IDL2.Opt(IDL2.Text),
    "facebookUrl": IDL2.Opt(IDL2.Text),
    "linkedinUrl": IDL2.Opt(IDL2.Text)
  });
  const UserRole2 = IDL2.Variant({
    "admin": IDL2.Null,
    "user": IDL2.Null,
    "guest": IDL2.Null
  });
  const EnrollmentInput2 = IDL2.Record({
    "name": IDL2.Text,
    "email": IDL2.Text,
    "trainingId": Id2,
    "phone": IDL2.Text
  });
  const BlogPage2 = IDL2.Record({
    "total": IDL2.Nat,
    "page": IDL2.Nat,
    "pageSize": IDL2.Nat,
    "posts": IDL2.Vec(BlogPost2)
  });
  const PropertyFilter2 = IDL2.Record({
    "propertyType": IDL2.Opt(PropertyType2),
    "maxPrice": IDL2.Opt(IDL2.Nat),
    "minPrice": IDL2.Opt(IDL2.Nat)
  });
  const VehicleFilter2 = IDL2.Record({ "vehicleType": IDL2.Opt(VehicleType2) });
  const BookingInput2 = IDL2.Record({
    "customerName": IDL2.Text,
    "endDate": IDL2.Text,
    "specialRequests": IDL2.Text,
    "email": IDL2.Text,
    "phone": IDL2.Text,
    "vehicleId": Id2,
    "startDate": IDL2.Text
  });
  const MessageInput2 = IDL2.Record({
    "customerName": IDL2.Text,
    "email": IDL2.Text,
    "message": IDL2.Text,
    "phone": IDL2.Text
  });
  const QuoteInput2 = IDL2.Record({
    "customerName": IDL2.Text,
    "serviceType": IDL2.Text,
    "email": IDL2.Text,
    "phone": IDL2.Text,
    "requirements": IDL2.Text,
    "budgetRange": IDL2.Text
  });
  return IDL2.Service({
    "_immutableObjectStorageBlobsAreLive": IDL2.Func(
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      [IDL2.Vec(IDL2.Bool)],
      ["query"]
    ),
    "_immutableObjectStorageBlobsToDelete": IDL2.Func(
      [],
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      ["query"]
    ),
    "_immutableObjectStorageConfirmBlobDeletion": IDL2.Func(
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      [],
      []
    ),
    "_immutableObjectStorageCreateCertificate": IDL2.Func(
      [IDL2.Text],
      [_ImmutableObjectStorageCreateCertificateResult2],
      []
    ),
    "_immutableObjectStorageRefillCashier": IDL2.Func(
      [IDL2.Opt(_ImmutableObjectStorageRefillInformation2)],
      [_ImmutableObjectStorageRefillResult2],
      []
    ),
    "_immutableObjectStorageUpdateGatewayPrincipals": IDL2.Func([], [], []),
    "_initializeAccessControl": IDL2.Func([], [], []),
    "adminCreateBlogPost": IDL2.Func([BlogPostInput2], [BlogPost2], []),
    "adminCreateProperty": IDL2.Func([PropertyInput2], [Property2], []),
    "adminCreateTraining": IDL2.Func([TrainingInput2], [Training2], []),
    "adminCreateVehicle": IDL2.Func([VehicleInput2], [Vehicle2], []),
    "adminDeleteBlogPost": IDL2.Func([Id2], [IDL2.Bool], []),
    "adminDeleteProperty": IDL2.Func([Id2], [IDL2.Bool], []),
    "adminDeleteTraining": IDL2.Func([Id2], [IDL2.Bool], []),
    "adminDeleteVehicle": IDL2.Func([Id2], [IDL2.Bool], []),
    "adminGetActiveSubscriberCount": IDL2.Func([], [IDL2.Nat], ["query"]),
    "adminGetBookingById": IDL2.Func([Id2], [IDL2.Opt(Booking2)], ["query"]),
    "adminGetDashboardStats": IDL2.Func([], [DashboardStats2], ["query"]),
    "adminGetEnrollmentsList": IDL2.Func(
      [Id2],
      [IDL2.Vec(TrainingEnrollment2)],
      ["query"]
    ),
    "adminGetPendingBookingCount": IDL2.Func([], [IDL2.Nat], ["query"]),
    "adminGetPendingQuoteCount": IDL2.Func([], [IDL2.Nat], ["query"]),
    "adminGetQuoteById": IDL2.Func([Id2], [IDL2.Opt(Quote2)], ["query"]),
    "adminGetUnreadMessageCount": IDL2.Func([], [IDL2.Nat], ["query"]),
    "adminListBlogPosts": IDL2.Func([], [IDL2.Vec(BlogPost2)], ["query"]),
    "adminListBookings": IDL2.Func([], [IDL2.Vec(Booking2)], ["query"]),
    "adminListMessages": IDL2.Func([], [IDL2.Vec(Message2)], ["query"]),
    "adminListProperties": IDL2.Func([], [IDL2.Vec(Property2)], ["query"]),
    "adminListQuotes": IDL2.Func([], [IDL2.Vec(Quote2)], ["query"]),
    "adminListSubscribers": IDL2.Func(
      [],
      [IDL2.Vec(NewsletterSubscriber2)],
      ["query"]
    ),
    "adminListTrainings": IDL2.Func([], [IDL2.Vec(Training2)], ["query"]),
    "adminListVehicles": IDL2.Func([], [IDL2.Vec(Vehicle2)], ["query"]),
    "adminUpdateBlogPost": IDL2.Func(
      [Id2, BlogPostInput2],
      [IDL2.Opt(BlogPost2)],
      []
    ),
    "adminUpdateBookingStatus": IDL2.Func(
      [Id2, BookingStatus2],
      [IDL2.Opt(Booking2)],
      []
    ),
    "adminUpdateCompanySettings": IDL2.Func([CompanySettings2], [], []),
    "adminUpdateMessageStatus": IDL2.Func(
      [Id2, MessageStatus2],
      [IDL2.Opt(Message2)],
      []
    ),
    "adminUpdateProperty": IDL2.Func(
      [Id2, PropertyInput2],
      [IDL2.Opt(Property2)],
      []
    ),
    "adminUpdateQuoteStatus": IDL2.Func(
      [Id2, QuoteStatus2],
      [IDL2.Opt(Quote2)],
      []
    ),
    "adminUpdateTraining": IDL2.Func(
      [Id2, TrainingInput2],
      [IDL2.Opt(Training2)],
      []
    ),
    "adminUpdateVehicle": IDL2.Func([Id2, VehicleInput2], [IDL2.Opt(Vehicle2)], []),
    "assignCallerUserRole": IDL2.Func([IDL2.Principal, UserRole2], [], []),
    "enrollInTraining": IDL2.Func([EnrollmentInput2], [IDL2.Bool], []),
    "getBlogPostById": IDL2.Func([Id2], [IDL2.Opt(BlogPost2)], ["query"]),
    "getBlogPostBySlug": IDL2.Func([IDL2.Text], [IDL2.Opt(BlogPost2)], ["query"]),
    "getCallerUserRole": IDL2.Func([], [UserRole2], ["query"]),
    "getCompanySettings": IDL2.Func([], [CompanySettings2], ["query"]),
    "getProperty": IDL2.Func([Id2], [IDL2.Opt(Property2)], ["query"]),
    "getTraining": IDL2.Func([Id2], [IDL2.Opt(Training2)], ["query"]),
    "getVehicle": IDL2.Func([Id2], [IDL2.Opt(Vehicle2)], ["query"]),
    "isCallerAdmin": IDL2.Func([], [IDL2.Bool], ["query"]),
    "listBlogPosts": IDL2.Func([IDL2.Nat, IDL2.Nat], [BlogPage2], ["query"]),
    "listProperties": IDL2.Func(
      [PropertyFilter2],
      [IDL2.Vec(Property2)],
      ["query"]
    ),
    "listTrainings": IDL2.Func([], [IDL2.Vec(Training2)], ["query"]),
    "listVehicles": IDL2.Func([VehicleFilter2], [IDL2.Vec(Vehicle2)], ["query"]),
    "submitBooking": IDL2.Func([BookingInput2], [Booking2], []),
    "submitMessage": IDL2.Func([MessageInput2], [Message2], []),
    "submitQuote": IDL2.Func([QuoteInput2], [Quote2], []),
    "subscribeNewsletter": IDL2.Func([IDL2.Text], [NewsletterSubscriber2], []),
    "unsubscribeNewsletter": IDL2.Func([IDL2.Text], [IDL2.Bool], [])
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
class ExternalBlob {
  constructor(directURL, blob) {
    __publicField(this, "_blob");
    __publicField(this, "directURL");
    __publicField(this, "onProgress");
    if (blob) {
      this._blob = blob;
    }
    this.directURL = directURL;
  }
  static fromURL(url) {
    return new ExternalBlob(url, null);
  }
  static fromBytes(blob) {
    const url = URL.createObjectURL(new Blob([
      new Uint8Array(blob)
    ], {
      type: "application/octet-stream"
    }));
    return new ExternalBlob(url, blob);
  }
  async getBytes() {
    if (this._blob) {
      return this._blob;
    }
    const response = await fetch(this.directURL);
    const blob = await response.blob();
    this._blob = new Uint8Array(await blob.arrayBuffer());
    return this._blob;
  }
  getDirectURL() {
    return this.directURL;
  }
  withUploadProgress(onProgress) {
    this.onProgress = onProgress;
    return this;
  }
}
var BookingStatus = /* @__PURE__ */ ((BookingStatus2) => {
  BookingStatus2["cancelled"] = "cancelled";
  BookingStatus2["pending"] = "pending";
  BookingStatus2["confirmed"] = "confirmed";
  return BookingStatus2;
})(BookingStatus || {});
var MessageStatus = /* @__PURE__ */ ((MessageStatus2) => {
  MessageStatus2["read"] = "read";
  MessageStatus2["unread"] = "unread";
  MessageStatus2["archived"] = "archived";
  return MessageStatus2;
})(MessageStatus || {});
var QuoteStatus = /* @__PURE__ */ ((QuoteStatus2) => {
  QuoteStatus2["pending"] = "pending";
  QuoteStatus2["sent"] = "sent";
  QuoteStatus2["accepted"] = "accepted";
  QuoteStatus2["declined"] = "declined";
  return QuoteStatus2;
})(QuoteStatus || {});
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async _immutableObjectStorageBlobsAreLive(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageBlobsAreLive(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageBlobsAreLive(arg0);
      return result;
    }
  }
  async _immutableObjectStorageBlobsToDelete() {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageBlobsToDelete();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageBlobsToDelete();
      return result;
    }
  }
  async _immutableObjectStorageConfirmBlobDeletion(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
      return result;
    }
  }
  async _immutableObjectStorageCreateCertificate(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageCreateCertificate(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageCreateCertificate(arg0);
      return result;
    }
  }
  async _immutableObjectStorageRefillCashier(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
        return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
      return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
    }
  }
  async _immutableObjectStorageUpdateGatewayPrincipals() {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
      return result;
    }
  }
  async _initializeAccessControl() {
    if (this.processError) {
      try {
        const result = await this.actor._initializeAccessControl();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._initializeAccessControl();
      return result;
    }
  }
  async adminCreateBlogPost(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminCreateBlogPost(await to_candid_BlogPostInput_n8(this._uploadFile, this._downloadFile, arg0));
        return from_candid_BlogPost_n13(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminCreateBlogPost(await to_candid_BlogPostInput_n8(this._uploadFile, this._downloadFile, arg0));
      return from_candid_BlogPost_n13(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminCreateProperty(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminCreateProperty(await to_candid_PropertyInput_n19(this._uploadFile, this._downloadFile, arg0));
        return from_candid_Property_n24(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminCreateProperty(await to_candid_PropertyInput_n19(this._uploadFile, this._downloadFile, arg0));
      return from_candid_Property_n24(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminCreateTraining(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminCreateTraining(await to_candid_TrainingInput_n29(this._uploadFile, this._downloadFile, arg0));
        return from_candid_Training_n31(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminCreateTraining(await to_candid_TrainingInput_n29(this._uploadFile, this._downloadFile, arg0));
      return from_candid_Training_n31(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminCreateVehicle(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminCreateVehicle(await to_candid_VehicleInput_n33(this._uploadFile, this._downloadFile, arg0));
        return from_candid_Vehicle_n37(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminCreateVehicle(await to_candid_VehicleInput_n33(this._uploadFile, this._downloadFile, arg0));
      return from_candid_Vehicle_n37(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminDeleteBlogPost(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminDeleteBlogPost(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminDeleteBlogPost(arg0);
      return result;
    }
  }
  async adminDeleteProperty(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminDeleteProperty(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminDeleteProperty(arg0);
      return result;
    }
  }
  async adminDeleteTraining(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminDeleteTraining(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminDeleteTraining(arg0);
      return result;
    }
  }
  async adminDeleteVehicle(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminDeleteVehicle(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminDeleteVehicle(arg0);
      return result;
    }
  }
  async adminGetActiveSubscriberCount() {
    if (this.processError) {
      try {
        const result = await this.actor.adminGetActiveSubscriberCount();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGetActiveSubscriberCount();
      return result;
    }
  }
  async adminGetBookingById(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminGetBookingById(arg0);
        return from_candid_opt_n41(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGetBookingById(arg0);
      return from_candid_opt_n41(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminGetDashboardStats() {
    if (this.processError) {
      try {
        const result = await this.actor.adminGetDashboardStats();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGetDashboardStats();
      return result;
    }
  }
  async adminGetEnrollmentsList(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminGetEnrollmentsList(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGetEnrollmentsList(arg0);
      return result;
    }
  }
  async adminGetPendingBookingCount() {
    if (this.processError) {
      try {
        const result = await this.actor.adminGetPendingBookingCount();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGetPendingBookingCount();
      return result;
    }
  }
  async adminGetPendingQuoteCount() {
    if (this.processError) {
      try {
        const result = await this.actor.adminGetPendingQuoteCount();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGetPendingQuoteCount();
      return result;
    }
  }
  async adminGetQuoteById(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminGetQuoteById(arg0);
        return from_candid_opt_n46(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGetQuoteById(arg0);
      return from_candid_opt_n46(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminGetUnreadMessageCount() {
    if (this.processError) {
      try {
        const result = await this.actor.adminGetUnreadMessageCount();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGetUnreadMessageCount();
      return result;
    }
  }
  async adminListBlogPosts() {
    if (this.processError) {
      try {
        const result = await this.actor.adminListBlogPosts();
        return from_candid_vec_n51(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminListBlogPosts();
      return from_candid_vec_n51(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminListBookings() {
    if (this.processError) {
      try {
        const result = await this.actor.adminListBookings();
        return from_candid_vec_n52(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminListBookings();
      return from_candid_vec_n52(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminListMessages() {
    if (this.processError) {
      try {
        const result = await this.actor.adminListMessages();
        return from_candid_vec_n53(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminListMessages();
      return from_candid_vec_n53(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminListProperties() {
    if (this.processError) {
      try {
        const result = await this.actor.adminListProperties();
        return from_candid_vec_n58(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminListProperties();
      return from_candid_vec_n58(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminListQuotes() {
    if (this.processError) {
      try {
        const result = await this.actor.adminListQuotes();
        return from_candid_vec_n59(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminListQuotes();
      return from_candid_vec_n59(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminListSubscribers() {
    if (this.processError) {
      try {
        const result = await this.actor.adminListSubscribers();
        return from_candid_vec_n60(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminListSubscribers();
      return from_candid_vec_n60(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminListTrainings() {
    if (this.processError) {
      try {
        const result = await this.actor.adminListTrainings();
        return from_candid_vec_n63(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminListTrainings();
      return from_candid_vec_n63(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminListVehicles() {
    if (this.processError) {
      try {
        const result = await this.actor.adminListVehicles();
        return from_candid_vec_n64(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminListVehicles();
      return from_candid_vec_n64(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminUpdateBlogPost(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateBlogPost(arg0, await to_candid_BlogPostInput_n8(this._uploadFile, this._downloadFile, arg1));
        return from_candid_opt_n65(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateBlogPost(arg0, await to_candid_BlogPostInput_n8(this._uploadFile, this._downloadFile, arg1));
      return from_candid_opt_n65(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminUpdateBookingStatus(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateBookingStatus(arg0, to_candid_BookingStatus_n66(this._uploadFile, this._downloadFile, arg1));
        return from_candid_opt_n41(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateBookingStatus(arg0, to_candid_BookingStatus_n66(this._uploadFile, this._downloadFile, arg1));
      return from_candid_opt_n41(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminUpdateCompanySettings(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateCompanySettings(to_candid_CompanySettings_n68(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateCompanySettings(to_candid_CompanySettings_n68(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async adminUpdateMessageStatus(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateMessageStatus(arg0, to_candid_MessageStatus_n70(this._uploadFile, this._downloadFile, arg1));
        return from_candid_opt_n72(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateMessageStatus(arg0, to_candid_MessageStatus_n70(this._uploadFile, this._downloadFile, arg1));
      return from_candid_opt_n72(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminUpdateProperty(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateProperty(arg0, await to_candid_PropertyInput_n19(this._uploadFile, this._downloadFile, arg1));
        return from_candid_opt_n73(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateProperty(arg0, await to_candid_PropertyInput_n19(this._uploadFile, this._downloadFile, arg1));
      return from_candid_opt_n73(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminUpdateQuoteStatus(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateQuoteStatus(arg0, to_candid_QuoteStatus_n74(this._uploadFile, this._downloadFile, arg1));
        return from_candid_opt_n46(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateQuoteStatus(arg0, to_candid_QuoteStatus_n74(this._uploadFile, this._downloadFile, arg1));
      return from_candid_opt_n46(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminUpdateTraining(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateTraining(arg0, await to_candid_TrainingInput_n29(this._uploadFile, this._downloadFile, arg1));
        return from_candid_opt_n76(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateTraining(arg0, await to_candid_TrainingInput_n29(this._uploadFile, this._downloadFile, arg1));
      return from_candid_opt_n76(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminUpdateVehicle(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateVehicle(arg0, await to_candid_VehicleInput_n33(this._uploadFile, this._downloadFile, arg1));
        return from_candid_opt_n77(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateVehicle(arg0, await to_candid_VehicleInput_n33(this._uploadFile, this._downloadFile, arg1));
      return from_candid_opt_n77(this._uploadFile, this._downloadFile, result);
    }
  }
  async assignCallerUserRole(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n78(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n78(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async enrollInTraining(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.enrollInTraining(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.enrollInTraining(arg0);
      return result;
    }
  }
  async getBlogPostById(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getBlogPostById(arg0);
        return from_candid_opt_n65(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getBlogPostById(arg0);
      return from_candid_opt_n65(this._uploadFile, this._downloadFile, result);
    }
  }
  async getBlogPostBySlug(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getBlogPostBySlug(arg0);
        return from_candid_opt_n65(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getBlogPostBySlug(arg0);
      return from_candid_opt_n65(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCallerUserRole() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserRole();
        return from_candid_UserRole_n80(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserRole();
      return from_candid_UserRole_n80(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCompanySettings() {
    if (this.processError) {
      try {
        const result = await this.actor.getCompanySettings();
        return from_candid_CompanySettings_n82(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCompanySettings();
      return from_candid_CompanySettings_n82(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProperty(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProperty(arg0);
        return from_candid_opt_n73(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProperty(arg0);
      return from_candid_opt_n73(this._uploadFile, this._downloadFile, result);
    }
  }
  async getTraining(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getTraining(arg0);
        return from_candid_opt_n76(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getTraining(arg0);
      return from_candid_opt_n76(this._uploadFile, this._downloadFile, result);
    }
  }
  async getVehicle(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getVehicle(arg0);
        return from_candid_opt_n77(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getVehicle(arg0);
      return from_candid_opt_n77(this._uploadFile, this._downloadFile, result);
    }
  }
  async isCallerAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.isCallerAdmin();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isCallerAdmin();
      return result;
    }
  }
  async listBlogPosts(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.listBlogPosts(arg0, arg1);
        return from_candid_BlogPage_n85(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listBlogPosts(arg0, arg1);
      return from_candid_BlogPage_n85(this._uploadFile, this._downloadFile, result);
    }
  }
  async listProperties(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listProperties(to_candid_PropertyFilter_n87(this._uploadFile, this._downloadFile, arg0));
        return from_candid_vec_n58(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listProperties(to_candid_PropertyFilter_n87(this._uploadFile, this._downloadFile, arg0));
      return from_candid_vec_n58(this._uploadFile, this._downloadFile, result);
    }
  }
  async listTrainings() {
    if (this.processError) {
      try {
        const result = await this.actor.listTrainings();
        return from_candid_vec_n63(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listTrainings();
      return from_candid_vec_n63(this._uploadFile, this._downloadFile, result);
    }
  }
  async listVehicles(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listVehicles(to_candid_VehicleFilter_n89(this._uploadFile, this._downloadFile, arg0));
        return from_candid_vec_n64(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listVehicles(to_candid_VehicleFilter_n89(this._uploadFile, this._downloadFile, arg0));
      return from_candid_vec_n64(this._uploadFile, this._downloadFile, result);
    }
  }
  async submitBooking(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.submitBooking(arg0);
        return from_candid_Booking_n42(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.submitBooking(arg0);
      return from_candid_Booking_n42(this._uploadFile, this._downloadFile, result);
    }
  }
  async submitMessage(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.submitMessage(arg0);
        return from_candid_Message_n54(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.submitMessage(arg0);
      return from_candid_Message_n54(this._uploadFile, this._downloadFile, result);
    }
  }
  async submitQuote(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.submitQuote(arg0);
        return from_candid_Quote_n47(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.submitQuote(arg0);
      return from_candid_Quote_n47(this._uploadFile, this._downloadFile, result);
    }
  }
  async subscribeNewsletter(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.subscribeNewsletter(arg0);
        return from_candid_NewsletterSubscriber_n61(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.subscribeNewsletter(arg0);
      return from_candid_NewsletterSubscriber_n61(this._uploadFile, this._downloadFile, result);
    }
  }
  async unsubscribeNewsletter(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.unsubscribeNewsletter(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.unsubscribeNewsletter(arg0);
      return result;
    }
  }
}
async function from_candid_BlogPage_n85(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n86(_uploadFile, _downloadFile, value);
}
async function from_candid_BlogPost_n13(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n14(_uploadFile, _downloadFile, value);
}
function from_candid_BookingStatus_n44(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n45(_uploadFile, _downloadFile, value);
}
function from_candid_Booking_n42(_uploadFile, _downloadFile, value) {
  return from_candid_record_n43(_uploadFile, _downloadFile, value);
}
function from_candid_CompanySettings_n82(_uploadFile, _downloadFile, value) {
  return from_candid_record_n83(_uploadFile, _downloadFile, value);
}
async function from_candid_ExternalBlob_n16(_uploadFile, _downloadFile, value) {
  return await _downloadFile(value);
}
function from_candid_MessageStatus_n56(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n57(_uploadFile, _downloadFile, value);
}
function from_candid_Message_n54(_uploadFile, _downloadFile, value) {
  return from_candid_record_n55(_uploadFile, _downloadFile, value);
}
function from_candid_NewsletterSubscriber_n61(_uploadFile, _downloadFile, value) {
  return from_candid_record_n62(_uploadFile, _downloadFile, value);
}
function from_candid_PostStatus_n17(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n18(_uploadFile, _downloadFile, value);
}
function from_candid_PropertyType_n26(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n27(_uploadFile, _downloadFile, value);
}
async function from_candid_Property_n24(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n25(_uploadFile, _downloadFile, value);
}
function from_candid_QuoteStatus_n49(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n50(_uploadFile, _downloadFile, value);
}
function from_candid_Quote_n47(_uploadFile, _downloadFile, value) {
  return from_candid_record_n48(_uploadFile, _downloadFile, value);
}
async function from_candid_Training_n31(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n32(_uploadFile, _downloadFile, value);
}
function from_candid_UserRole_n80(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n81(_uploadFile, _downloadFile, value);
}
function from_candid_VehicleType_n39(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n40(_uploadFile, _downloadFile, value);
}
async function from_candid_Vehicle_n37(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n38(_uploadFile, _downloadFile, value);
}
function from_candid__ImmutableObjectStorageRefillResult_n4(_uploadFile, _downloadFile, value) {
  return from_candid_record_n5(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n15(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n41(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Booking_n42(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n46(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Quote_n47(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n6(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
async function from_candid_opt_n65(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : await from_candid_BlogPost_n13(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n7(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n72(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Message_n54(_uploadFile, _downloadFile, value[0]);
}
async function from_candid_opt_n73(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : await from_candid_Property_n24(_uploadFile, _downloadFile, value[0]);
}
async function from_candid_opt_n76(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : await from_candid_Training_n31(_uploadFile, _downloadFile, value[0]);
}
async function from_candid_opt_n77(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : await from_candid_Vehicle_n37(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n84(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
async function from_candid_record_n14(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    title: value.title,
    content: value.content,
    categoryTags: value.categoryTags,
    publishDate: record_opt_to_undefined(from_candid_opt_n15(_uploadFile, _downloadFile, value.publishDate)),
    featuredImage: await from_candid_ExternalBlob_n16(_uploadFile, _downloadFile, value.featuredImage),
    createdAt: value.createdAt,
    slug: value.slug,
    postStatus: from_candid_PostStatus_n17(_uploadFile, _downloadFile, value.postStatus),
    description: value.description,
    author: value.author,
    updatedAt: value.updatedAt
  };
}
async function from_candid_record_n25(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    title: value.title,
    featured: value.featured,
    propertyType: from_candid_PropertyType_n26(_uploadFile, _downloadFile, value.propertyType),
    bedrooms: value.bedrooms,
    createdAt: value.createdAt,
    description: value.description,
    updatedAt: value.updatedAt,
    areaSqm: value.areaSqm,
    bathrooms: value.bathrooms,
    price: value.price,
    location: value.location,
    images: await from_candid_vec_n28(_uploadFile, _downloadFile, value.images)
  };
}
async function from_candid_record_n32(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    durationDays: value.durationDays,
    title: value.title,
    maxCapacity: value.maxCapacity,
    createdAt: value.createdAt,
    description: value.description,
    updatedAt: value.updatedAt,
    image: await from_candid_ExternalBlob_n16(_uploadFile, _downloadFile, value.image),
    price: value.price,
    enrollments: value.enrollments
  };
}
async function from_candid_record_n38(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    model: value.model,
    vehicleType: from_candid_VehicleType_n39(_uploadFile, _downloadFile, value.vehicleType),
    title: value.title,
    featured: value.featured,
    createdAt: value.createdAt,
    description: value.description,
    pricePerDay: value.pricePerDay,
    updatedAt: value.updatedAt,
    capacity: value.capacity,
    images: await from_candid_vec_n28(_uploadFile, _downloadFile, value.images)
  };
}
function from_candid_record_n43(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    customerName: value.customerName,
    status: from_candid_BookingStatus_n44(_uploadFile, _downloadFile, value.status),
    endDate: value.endDate,
    specialRequests: value.specialRequests,
    createdAt: value.createdAt,
    email: value.email,
    updatedAt: value.updatedAt,
    phone: value.phone,
    vehicleId: value.vehicleId,
    startDate: value.startDate
  };
}
function from_candid_record_n48(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    customerName: value.customerName,
    status: from_candid_QuoteStatus_n49(_uploadFile, _downloadFile, value.status),
    serviceType: value.serviceType,
    createdAt: value.createdAt,
    email: value.email,
    updatedAt: value.updatedAt,
    phone: value.phone,
    requirements: value.requirements,
    budgetRange: value.budgetRange
  };
}
function from_candid_record_n5(_uploadFile, _downloadFile, value) {
  return {
    success: record_opt_to_undefined(from_candid_opt_n6(_uploadFile, _downloadFile, value.success)),
    topped_up_amount: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.topped_up_amount))
  };
}
function from_candid_record_n55(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    customerName: value.customerName,
    status: from_candid_MessageStatus_n56(_uploadFile, _downloadFile, value.status),
    createdAt: value.createdAt,
    email: value.email,
    message: value.message,
    phone: value.phone
  };
}
function from_candid_record_n62(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    unsubscribedAt: record_opt_to_undefined(from_candid_opt_n15(_uploadFile, _downloadFile, value.unsubscribedAt)),
    verified: value.verified,
    subscribedAt: value.subscribedAt,
    email: value.email
  };
}
function from_candid_record_n83(_uploadFile, _downloadFile, value) {
  return {
    whatsapp: value.whatsapp,
    instagramUrl: record_opt_to_undefined(from_candid_opt_n84(_uploadFile, _downloadFile, value.instagramUrl)),
    email: value.email,
    logoUrl: value.logoUrl,
    address: value.address,
    phone: value.phone,
    youtubeUrl: record_opt_to_undefined(from_candid_opt_n84(_uploadFile, _downloadFile, value.youtubeUrl)),
    facebookUrl: record_opt_to_undefined(from_candid_opt_n84(_uploadFile, _downloadFile, value.facebookUrl)),
    linkedinUrl: record_opt_to_undefined(from_candid_opt_n84(_uploadFile, _downloadFile, value.linkedinUrl))
  };
}
async function from_candid_record_n86(_uploadFile, _downloadFile, value) {
  return {
    total: value.total,
    page: value.page,
    pageSize: value.pageSize,
    posts: await from_candid_vec_n51(_uploadFile, _downloadFile, value.posts)
  };
}
function from_candid_variant_n18(_uploadFile, _downloadFile, value) {
  return "published" in value ? "published" : "draft" in value ? "draft" : value;
}
function from_candid_variant_n27(_uploadFile, _downloadFile, value) {
  return "house" in value ? "house" : "land" in value ? "land" : "apartment" in value ? "apartment" : "office" in value ? "office" : value;
}
function from_candid_variant_n40(_uploadFile, _downloadFile, value) {
  return "bus" in value ? "bus" : "car" in value ? "car" : "truck" in value ? "truck" : "minibus" in value ? "minibus" : value;
}
function from_candid_variant_n45(_uploadFile, _downloadFile, value) {
  return "cancelled" in value ? "cancelled" : "pending" in value ? "pending" : "confirmed" in value ? "confirmed" : value;
}
function from_candid_variant_n50(_uploadFile, _downloadFile, value) {
  return "pending" in value ? "pending" : "sent" in value ? "sent" : "accepted" in value ? "accepted" : "declined" in value ? "declined" : value;
}
function from_candid_variant_n57(_uploadFile, _downloadFile, value) {
  return "read" in value ? "read" : "unread" in value ? "unread" : "archived" in value ? "archived" : value;
}
function from_candid_variant_n81(_uploadFile, _downloadFile, value) {
  return "admin" in value ? "admin" : "user" in value ? "user" : "guest" in value ? "guest" : value;
}
async function from_candid_vec_n28(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_ExternalBlob_n16(_uploadFile, _downloadFile, x)));
}
async function from_candid_vec_n51(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_BlogPost_n13(_uploadFile, _downloadFile, x)));
}
function from_candid_vec_n52(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Booking_n42(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n53(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Message_n54(_uploadFile, _downloadFile, x));
}
async function from_candid_vec_n58(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_Property_n24(_uploadFile, _downloadFile, x)));
}
function from_candid_vec_n59(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Quote_n47(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n60(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_NewsletterSubscriber_n61(_uploadFile, _downloadFile, x));
}
async function from_candid_vec_n63(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_Training_n31(_uploadFile, _downloadFile, x)));
}
async function from_candid_vec_n64(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_Vehicle_n37(_uploadFile, _downloadFile, x)));
}
async function to_candid_BlogPostInput_n8(_uploadFile, _downloadFile, value) {
  return await to_candid_record_n9(_uploadFile, _downloadFile, value);
}
function to_candid_BookingStatus_n66(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n67(_uploadFile, _downloadFile, value);
}
function to_candid_CompanySettings_n68(_uploadFile, _downloadFile, value) {
  return to_candid_record_n69(_uploadFile, _downloadFile, value);
}
async function to_candid_ExternalBlob_n10(_uploadFile, _downloadFile, value) {
  return await _uploadFile(value);
}
function to_candid_MessageStatus_n70(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n71(_uploadFile, _downloadFile, value);
}
function to_candid_PostStatus_n11(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n12(_uploadFile, _downloadFile, value);
}
function to_candid_PropertyFilter_n87(_uploadFile, _downloadFile, value) {
  return to_candid_record_n88(_uploadFile, _downloadFile, value);
}
async function to_candid_PropertyInput_n19(_uploadFile, _downloadFile, value) {
  return await to_candid_record_n20(_uploadFile, _downloadFile, value);
}
function to_candid_PropertyType_n21(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n22(_uploadFile, _downloadFile, value);
}
function to_candid_QuoteStatus_n74(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n75(_uploadFile, _downloadFile, value);
}
async function to_candid_TrainingInput_n29(_uploadFile, _downloadFile, value) {
  return await to_candid_record_n30(_uploadFile, _downloadFile, value);
}
function to_candid_UserRole_n78(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n79(_uploadFile, _downloadFile, value);
}
function to_candid_VehicleFilter_n89(_uploadFile, _downloadFile, value) {
  return to_candid_record_n90(_uploadFile, _downloadFile, value);
}
async function to_candid_VehicleInput_n33(_uploadFile, _downloadFile, value) {
  return await to_candid_record_n34(_uploadFile, _downloadFile, value);
}
function to_candid_VehicleType_n35(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n36(_uploadFile, _downloadFile, value);
}
function to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value) {
  return to_candid_record_n3(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n1(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value));
}
async function to_candid_record_n20(_uploadFile, _downloadFile, value) {
  return {
    title: value.title,
    featured: value.featured,
    propertyType: to_candid_PropertyType_n21(_uploadFile, _downloadFile, value.propertyType),
    bedrooms: value.bedrooms,
    description: value.description,
    areaSqm: value.areaSqm,
    bathrooms: value.bathrooms,
    price: value.price,
    location: value.location,
    images: await to_candid_vec_n23(_uploadFile, _downloadFile, value.images)
  };
}
function to_candid_record_n3(_uploadFile, _downloadFile, value) {
  return {
    proposed_top_up_amount: value.proposed_top_up_amount ? candid_some(value.proposed_top_up_amount) : candid_none()
  };
}
async function to_candid_record_n30(_uploadFile, _downloadFile, value) {
  return {
    durationDays: value.durationDays,
    title: value.title,
    maxCapacity: value.maxCapacity,
    description: value.description,
    image: await to_candid_ExternalBlob_n10(_uploadFile, _downloadFile, value.image),
    price: value.price
  };
}
async function to_candid_record_n34(_uploadFile, _downloadFile, value) {
  return {
    model: value.model,
    vehicleType: to_candid_VehicleType_n35(_uploadFile, _downloadFile, value.vehicleType),
    title: value.title,
    featured: value.featured,
    description: value.description,
    pricePerDay: value.pricePerDay,
    capacity: value.capacity,
    images: await to_candid_vec_n23(_uploadFile, _downloadFile, value.images)
  };
}
function to_candid_record_n69(_uploadFile, _downloadFile, value) {
  return {
    whatsapp: value.whatsapp,
    instagramUrl: value.instagramUrl ? candid_some(value.instagramUrl) : candid_none(),
    email: value.email,
    logoUrl: value.logoUrl,
    address: value.address,
    phone: value.phone,
    youtubeUrl: value.youtubeUrl ? candid_some(value.youtubeUrl) : candid_none(),
    facebookUrl: value.facebookUrl ? candid_some(value.facebookUrl) : candid_none(),
    linkedinUrl: value.linkedinUrl ? candid_some(value.linkedinUrl) : candid_none()
  };
}
function to_candid_record_n88(_uploadFile, _downloadFile, value) {
  return {
    propertyType: value.propertyType ? candid_some(to_candid_PropertyType_n21(_uploadFile, _downloadFile, value.propertyType)) : candid_none(),
    maxPrice: value.maxPrice ? candid_some(value.maxPrice) : candid_none(),
    minPrice: value.minPrice ? candid_some(value.minPrice) : candid_none()
  };
}
async function to_candid_record_n9(_uploadFile, _downloadFile, value) {
  return {
    title: value.title,
    content: value.content,
    categoryTags: value.categoryTags,
    publishDate: value.publishDate ? candid_some(value.publishDate) : candid_none(),
    featuredImage: await to_candid_ExternalBlob_n10(_uploadFile, _downloadFile, value.featuredImage),
    slug: value.slug,
    postStatus: to_candid_PostStatus_n11(_uploadFile, _downloadFile, value.postStatus),
    description: value.description,
    author: value.author
  };
}
function to_candid_record_n90(_uploadFile, _downloadFile, value) {
  return {
    vehicleType: value.vehicleType ? candid_some(to_candid_VehicleType_n35(_uploadFile, _downloadFile, value.vehicleType)) : candid_none()
  };
}
function to_candid_variant_n12(_uploadFile, _downloadFile, value) {
  return value == "published" ? {
    published: null
  } : value == "draft" ? {
    draft: null
  } : value;
}
function to_candid_variant_n22(_uploadFile, _downloadFile, value) {
  return value == "house" ? {
    house: null
  } : value == "land" ? {
    land: null
  } : value == "apartment" ? {
    apartment: null
  } : value == "office" ? {
    office: null
  } : value;
}
function to_candid_variant_n36(_uploadFile, _downloadFile, value) {
  return value == "bus" ? {
    bus: null
  } : value == "car" ? {
    car: null
  } : value == "truck" ? {
    truck: null
  } : value == "minibus" ? {
    minibus: null
  } : value;
}
function to_candid_variant_n67(_uploadFile, _downloadFile, value) {
  return value == "cancelled" ? {
    cancelled: null
  } : value == "pending" ? {
    pending: null
  } : value == "confirmed" ? {
    confirmed: null
  } : value;
}
function to_candid_variant_n71(_uploadFile, _downloadFile, value) {
  return value == "read" ? {
    read: null
  } : value == "unread" ? {
    unread: null
  } : value == "archived" ? {
    archived: null
  } : value;
}
function to_candid_variant_n75(_uploadFile, _downloadFile, value) {
  return value == "pending" ? {
    pending: null
  } : value == "sent" ? {
    sent: null
  } : value == "accepted" ? {
    accepted: null
  } : value == "declined" ? {
    declined: null
  } : value;
}
function to_candid_variant_n79(_uploadFile, _downloadFile, value) {
  return value == "admin" ? {
    admin: null
  } : value == "user" ? {
    user: null
  } : value == "guest" ? {
    guest: null
  } : value;
}
async function to_candid_vec_n23(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await to_candid_ExternalBlob_n10(_uploadFile, _downloadFile, x)));
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
export {
  BookingStatus as B,
  ExternalBlob as E,
  MessageStatus as M,
  QuoteStatus as Q,
  useActor as a,
  createActor as c,
  useQuery as u
};
