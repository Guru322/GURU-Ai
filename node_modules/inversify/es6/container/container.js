"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const binding_1 = require("../bindings/binding");
const ERROR_MSGS = __importStar(require("../constants/error_msgs"));
const literal_types_1 = require("../constants/literal_types");
const METADATA_KEY = __importStar(require("../constants/metadata_keys"));
const metadata_reader_1 = require("../planning/metadata_reader");
const planner_1 = require("../planning/planner");
const resolver_1 = require("../resolution/resolver");
const binding_to_syntax_1 = require("../syntax/binding_to_syntax");
const async_1 = require("../utils/async");
const id_1 = require("../utils/id");
const serialization_1 = require("../utils/serialization");
const container_snapshot_1 = require("./container_snapshot");
const lookup_1 = require("./lookup");
const module_activation_store_1 = require("./module_activation_store");
class Container {
    constructor(containerOptions) {
        const options = containerOptions || {};
        if (typeof options !== "object") {
            throw new Error(`${ERROR_MSGS.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT}`);
        }
        if (options.defaultScope === undefined) {
            options.defaultScope = literal_types_1.BindingScopeEnum.Transient;
        }
        else if (options.defaultScope !== literal_types_1.BindingScopeEnum.Singleton &&
            options.defaultScope !== literal_types_1.BindingScopeEnum.Transient &&
            options.defaultScope !== literal_types_1.BindingScopeEnum.Request) {
            throw new Error(`${ERROR_MSGS.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE}`);
        }
        if (options.autoBindInjectable === undefined) {
            options.autoBindInjectable = false;
        }
        else if (typeof options.autoBindInjectable !== "boolean") {
            throw new Error(`${ERROR_MSGS.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE}`);
        }
        if (options.skipBaseClassChecks === undefined) {
            options.skipBaseClassChecks = false;
        }
        else if (typeof options.skipBaseClassChecks !== "boolean") {
            throw new Error(`${ERROR_MSGS.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK}`);
        }
        this.options = {
            autoBindInjectable: options.autoBindInjectable,
            defaultScope: options.defaultScope,
            skipBaseClassChecks: options.skipBaseClassChecks
        };
        this.id = (0, id_1.id)();
        this._bindingDictionary = new lookup_1.Lookup();
        this._snapshots = [];
        this._middleware = null;
        this._activations = new lookup_1.Lookup();
        this._deactivations = new lookup_1.Lookup();
        this.parent = null;
        this._metadataReader = new metadata_reader_1.MetadataReader();
        this._moduleActivationStore = new module_activation_store_1.ModuleActivationStore();
    }
    static merge(container1, container2, ...containers) {
        const container = new Container();
        const targetContainers = [container1, container2, ...containers]
            .map((targetContainer) => (0, planner_1.getBindingDictionary)(targetContainer));
        const bindingDictionary = (0, planner_1.getBindingDictionary)(container);
        function copyDictionary(origin, destination) {
            origin.traverse((_key, value) => {
                value.forEach((binding) => {
                    destination.add(binding.serviceIdentifier, binding.clone());
                });
            });
        }
        targetContainers.forEach((targetBindingDictionary) => {
            copyDictionary(targetBindingDictionary, bindingDictionary);
        });
        return container;
    }
    load(...modules) {
        const getHelpers = this._getContainerModuleHelpersFactory();
        for (const currentModule of modules) {
            const containerModuleHelpers = getHelpers(currentModule.id);
            currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction, containerModuleHelpers.unbindAsyncFunction, containerModuleHelpers.onActivationFunction, containerModuleHelpers.onDeactivationFunction);
        }
    }
    loadAsync(...modules) {
        return __awaiter(this, void 0, void 0, function* () {
            const getHelpers = this._getContainerModuleHelpersFactory();
            for (const currentModule of modules) {
                const containerModuleHelpers = getHelpers(currentModule.id);
                yield currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction, containerModuleHelpers.unbindAsyncFunction, containerModuleHelpers.onActivationFunction, containerModuleHelpers.onDeactivationFunction);
            }
        });
    }
    unload(...modules) {
        modules.forEach((module) => {
            const deactivations = this._removeModuleBindings(module.id);
            this._deactivateSingletons(deactivations);
            this._removeModuleHandlers(module.id);
        });
    }
    unloadAsync(...modules) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const module of modules) {
                const deactivations = this._removeModuleBindings(module.id);
                yield this._deactivateSingletonsAsync(deactivations);
                this._removeModuleHandlers(module.id);
            }
        });
    }
    bind(serviceIdentifier) {
        const scope = this.options.defaultScope || literal_types_1.BindingScopeEnum.Transient;
        const binding = new binding_1.Binding(serviceIdentifier, scope);
        this._bindingDictionary.add(serviceIdentifier, binding);
        return new binding_to_syntax_1.BindingToSyntax(binding);
    }
    rebind(serviceIdentifier) {
        this.unbind(serviceIdentifier);
        return this.bind(serviceIdentifier);
    }
    rebindAsync(serviceIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.unbindAsync(serviceIdentifier);
            return this.bind(serviceIdentifier);
        });
    }
    unbind(serviceIdentifier) {
        if (this._bindingDictionary.hasKey(serviceIdentifier)) {
            const bindings = this._bindingDictionary.get(serviceIdentifier);
            this._deactivateSingletons(bindings);
        }
        this._removeServiceFromDictionary(serviceIdentifier);
    }
    unbindAsync(serviceIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._bindingDictionary.hasKey(serviceIdentifier)) {
                const bindings = this._bindingDictionary.get(serviceIdentifier);
                yield this._deactivateSingletonsAsync(bindings);
            }
            this._removeServiceFromDictionary(serviceIdentifier);
        });
    }
    unbindAll() {
        this._bindingDictionary.traverse((_key, value) => {
            this._deactivateSingletons(value);
        });
        this._bindingDictionary = new lookup_1.Lookup();
    }
    unbindAllAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            this._bindingDictionary.traverse((_key, value) => {
                promises.push(this._deactivateSingletonsAsync(value));
            });
            yield Promise.all(promises);
            this._bindingDictionary = new lookup_1.Lookup();
        });
    }
    onActivation(serviceIdentifier, onActivation) {
        this._activations.add(serviceIdentifier, onActivation);
    }
    onDeactivation(serviceIdentifier, onDeactivation) {
        this._deactivations.add(serviceIdentifier, onDeactivation);
    }
    isBound(serviceIdentifier) {
        let bound = this._bindingDictionary.hasKey(serviceIdentifier);
        if (!bound && this.parent) {
            bound = this.parent.isBound(serviceIdentifier);
        }
        return bound;
    }
    isCurrentBound(serviceIdentifier) {
        return this._bindingDictionary.hasKey(serviceIdentifier);
    }
    isBoundNamed(serviceIdentifier, named) {
        return this.isBoundTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    }
    isBoundTagged(serviceIdentifier, key, value) {
        let bound = false;
        if (this._bindingDictionary.hasKey(serviceIdentifier)) {
            const bindings = this._bindingDictionary.get(serviceIdentifier);
            const request = (0, planner_1.createMockRequest)(this, serviceIdentifier, key, value);
            bound = bindings.some((b) => b.constraint(request));
        }
        if (!bound && this.parent) {
            bound = this.parent.isBoundTagged(serviceIdentifier, key, value);
        }
        return bound;
    }
    snapshot() {
        this._snapshots.push(container_snapshot_1.ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware, this._activations.clone(), this._deactivations.clone(), this._moduleActivationStore.clone()));
    }
    restore() {
        const snapshot = this._snapshots.pop();
        if (snapshot === undefined) {
            throw new Error(ERROR_MSGS.NO_MORE_SNAPSHOTS_AVAILABLE);
        }
        this._bindingDictionary = snapshot.bindings;
        this._activations = snapshot.activations;
        this._deactivations = snapshot.deactivations;
        this._middleware = snapshot.middleware;
        this._moduleActivationStore = snapshot.moduleActivationStore;
    }
    createChild(containerOptions) {
        const child = new Container(containerOptions || this.options);
        child.parent = this;
        return child;
    }
    applyMiddleware(...middlewares) {
        const initial = (this._middleware) ? this._middleware : this._planAndResolve();
        this._middleware = middlewares.reduce((prev, curr) => curr(prev), initial);
    }
    applyCustomMetadataReader(metadataReader) {
        this._metadataReader = metadataReader;
    }
    get(serviceIdentifier) {
        const getArgs = this._getNotAllArgs(serviceIdentifier, false);
        return this._getButThrowIfAsync(getArgs);
    }
    getAsync(serviceIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const getArgs = this._getNotAllArgs(serviceIdentifier, false);
            return this._get(getArgs);
        });
    }
    getTagged(serviceIdentifier, key, value) {
        const getArgs = this._getNotAllArgs(serviceIdentifier, false, key, value);
        return this._getButThrowIfAsync(getArgs);
    }
    getTaggedAsync(serviceIdentifier, key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const getArgs = this._getNotAllArgs(serviceIdentifier, false, key, value);
            return this._get(getArgs);
        });
    }
    getNamed(serviceIdentifier, named) {
        return this.getTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    }
    getNamedAsync(serviceIdentifier, named) {
        return this.getTaggedAsync(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    }
    getAll(serviceIdentifier) {
        const getArgs = this._getAllArgs(serviceIdentifier);
        return this._getButThrowIfAsync(getArgs);
    }
    getAllAsync(serviceIdentifier) {
        const getArgs = this._getAllArgs(serviceIdentifier);
        return this._getAll(getArgs);
    }
    getAllTagged(serviceIdentifier, key, value) {
        const getArgs = this._getNotAllArgs(serviceIdentifier, true, key, value);
        return this._getButThrowIfAsync(getArgs);
    }
    getAllTaggedAsync(serviceIdentifier, key, value) {
        const getArgs = this._getNotAllArgs(serviceIdentifier, true, key, value);
        return this._getAll(getArgs);
    }
    getAllNamed(serviceIdentifier, named) {
        return this.getAllTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    }
    getAllNamedAsync(serviceIdentifier, named) {
        return this.getAllTaggedAsync(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    }
    resolve(constructorFunction) {
        const isBound = this.isBound(constructorFunction);
        if (!isBound) {
            this.bind(constructorFunction).toSelf();
        }
        const resolved = this.get(constructorFunction);
        if (!isBound) {
            this.unbind(constructorFunction);
        }
        return resolved;
    }
    _preDestroy(constructor, instance) {
        if (Reflect.hasMetadata(METADATA_KEY.PRE_DESTROY, constructor)) {
            const data = Reflect.getMetadata(METADATA_KEY.PRE_DESTROY, constructor);
            return instance[data.value]();
        }
    }
    _removeModuleHandlers(moduleId) {
        const moduleActivationsHandlers = this._moduleActivationStore.remove(moduleId);
        this._activations.removeIntersection(moduleActivationsHandlers.onActivations);
        this._deactivations.removeIntersection(moduleActivationsHandlers.onDeactivations);
    }
    _removeModuleBindings(moduleId) {
        return this._bindingDictionary.removeByCondition(binding => binding.moduleId === moduleId);
    }
    _deactivate(binding, instance) {
        const constructor = Object.getPrototypeOf(instance).constructor;
        try {
            if (this._deactivations.hasKey(binding.serviceIdentifier)) {
                const result = this._deactivateContainer(instance, this._deactivations.get(binding.serviceIdentifier).values());
                if ((0, async_1.isPromise)(result)) {
                    return this._handleDeactivationError(result.then(() => this._propagateContainerDeactivationThenBindingAndPreDestroyAsync(binding, instance, constructor)), constructor);
                }
            }
            const propagateDeactivationResult = this._propagateContainerDeactivationThenBindingAndPreDestroy(binding, instance, constructor);
            if ((0, async_1.isPromise)(propagateDeactivationResult)) {
                return this._handleDeactivationError(propagateDeactivationResult, constructor);
            }
        }
        catch (ex) {
            throw new Error(ERROR_MSGS.ON_DEACTIVATION_ERROR(constructor.name, ex.message));
        }
    }
    _handleDeactivationError(asyncResult, constructor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield asyncResult;
            }
            catch (ex) {
                throw new Error(ERROR_MSGS.ON_DEACTIVATION_ERROR(constructor.name, ex.message));
            }
        });
    }
    _deactivateContainer(instance, deactivationsIterator) {
        let deactivation = deactivationsIterator.next();
        while (deactivation.value) {
            const result = deactivation.value(instance);
            if ((0, async_1.isPromise)(result)) {
                return result.then(() => this._deactivateContainerAsync(instance, deactivationsIterator));
            }
            deactivation = deactivationsIterator.next();
        }
    }
    _deactivateContainerAsync(instance, deactivationsIterator) {
        return __awaiter(this, void 0, void 0, function* () {
            let deactivation = deactivationsIterator.next();
            while (deactivation.value) {
                yield deactivation.value(instance);
                deactivation = deactivationsIterator.next();
            }
        });
    }
    _getContainerModuleHelpersFactory() {
        const setModuleId = (bindingToSyntax, moduleId) => {
            bindingToSyntax._binding.moduleId = moduleId;
        };
        const getBindFunction = (moduleId) => (serviceIdentifier) => {
            const bindingToSyntax = this.bind(serviceIdentifier);
            setModuleId(bindingToSyntax, moduleId);
            return bindingToSyntax;
        };
        const getUnbindFunction = () => (serviceIdentifier) => {
            return this.unbind(serviceIdentifier);
        };
        const getUnbindAsyncFunction = () => (serviceIdentifier) => {
            return this.unbindAsync(serviceIdentifier);
        };
        const getIsboundFunction = () => (serviceIdentifier) => {
            return this.isBound(serviceIdentifier);
        };
        const getRebindFunction = (moduleId) => (serviceIdentifier) => {
            const bindingToSyntax = this.rebind(serviceIdentifier);
            setModuleId(bindingToSyntax, moduleId);
            return bindingToSyntax;
        };
        const getOnActivationFunction = (moduleId) => (serviceIdentifier, onActivation) => {
            this._moduleActivationStore.addActivation(moduleId, serviceIdentifier, onActivation);
            this.onActivation(serviceIdentifier, onActivation);
        };
        const getOnDeactivationFunction = (moduleId) => (serviceIdentifier, onDeactivation) => {
            this._moduleActivationStore.addDeactivation(moduleId, serviceIdentifier, onDeactivation);
            this.onDeactivation(serviceIdentifier, onDeactivation);
        };
        return (mId) => ({
            bindFunction: getBindFunction(mId),
            isboundFunction: getIsboundFunction(),
            onActivationFunction: getOnActivationFunction(mId),
            onDeactivationFunction: getOnDeactivationFunction(mId),
            rebindFunction: getRebindFunction(mId),
            unbindFunction: getUnbindFunction(),
            unbindAsyncFunction: getUnbindAsyncFunction()
        });
    }
    _getAll(getArgs) {
        return Promise.all(this._get(getArgs));
    }
    _get(getArgs) {
        const planAndResolveArgs = Object.assign(Object.assign({}, getArgs), { contextInterceptor: (context) => context, targetType: literal_types_1.TargetTypeEnum.Variable });
        if (this._middleware) {
            const middlewareResult = this._middleware(planAndResolveArgs);
            if (middlewareResult === undefined || middlewareResult === null) {
                throw new Error(ERROR_MSGS.INVALID_MIDDLEWARE_RETURN);
            }
            return middlewareResult;
        }
        return this._planAndResolve()(planAndResolveArgs);
    }
    _getButThrowIfAsync(getArgs) {
        const result = this._get(getArgs);
        if ((0, async_1.isPromiseOrContainsPromise)(result)) {
            throw new Error(ERROR_MSGS.LAZY_IN_SYNC(getArgs.serviceIdentifier));
        }
        return result;
    }
    _getAllArgs(serviceIdentifier) {
        const getAllArgs = {
            avoidConstraints: true,
            isMultiInject: true,
            serviceIdentifier,
        };
        return getAllArgs;
    }
    _getNotAllArgs(serviceIdentifier, isMultiInject, key, value) {
        const getNotAllArgs = {
            avoidConstraints: false,
            isMultiInject,
            serviceIdentifier,
            key,
            value,
        };
        return getNotAllArgs;
    }
    _planAndResolve() {
        return (args) => {
            let context = (0, planner_1.plan)(this._metadataReader, this, args.isMultiInject, args.targetType, args.serviceIdentifier, args.key, args.value, args.avoidConstraints);
            context = args.contextInterceptor(context);
            const result = (0, resolver_1.resolve)(context);
            return result;
        };
    }
    _deactivateIfSingleton(binding) {
        if (!binding.activated) {
            return;
        }
        if ((0, async_1.isPromise)(binding.cache)) {
            return binding.cache.then((resolved) => this._deactivate(binding, resolved));
        }
        return this._deactivate(binding, binding.cache);
    }
    _deactivateSingletons(bindings) {
        for (const binding of bindings) {
            const result = this._deactivateIfSingleton(binding);
            if ((0, async_1.isPromise)(result)) {
                throw new Error(ERROR_MSGS.ASYNC_UNBIND_REQUIRED);
            }
        }
    }
    _deactivateSingletonsAsync(bindings) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(bindings.map(b => this._deactivateIfSingleton(b)));
        });
    }
    _propagateContainerDeactivationThenBindingAndPreDestroy(binding, instance, constructor) {
        if (this.parent) {
            return this._deactivate.bind(this.parent)(binding, instance);
        }
        else {
            return this._bindingDeactivationAndPreDestroy(binding, instance, constructor);
        }
    }
    _propagateContainerDeactivationThenBindingAndPreDestroyAsync(binding, instance, constructor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.parent) {
                yield this._deactivate.bind(this.parent)(binding, instance);
            }
            else {
                yield this._bindingDeactivationAndPreDestroyAsync(binding, instance, constructor);
            }
        });
    }
    _removeServiceFromDictionary(serviceIdentifier) {
        try {
            this._bindingDictionary.remove(serviceIdentifier);
        }
        catch (e) {
            throw new Error(`${ERROR_MSGS.CANNOT_UNBIND} ${(0, serialization_1.getServiceIdentifierAsString)(serviceIdentifier)}`);
        }
    }
    _bindingDeactivationAndPreDestroy(binding, instance, constructor) {
        if (typeof binding.onDeactivation === "function") {
            const result = binding.onDeactivation(instance);
            if ((0, async_1.isPromise)(result)) {
                return result.then(() => this._preDestroy(constructor, instance));
            }
        }
        return this._preDestroy(constructor, instance);
    }
    _bindingDeactivationAndPreDestroyAsync(binding, instance, constructor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof binding.onDeactivation === "function") {
                yield binding.onDeactivation(instance);
            }
            yield this._preDestroy(constructor, instance);
        });
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map