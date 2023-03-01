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
exports.resolve = void 0;
const ERROR_MSGS = __importStar(require("../constants/error_msgs"));
const literal_types_1 = require("../constants/literal_types");
const planner_1 = require("../planning/planner");
const scope_1 = require("../scope/scope");
const async_1 = require("../utils/async");
const binding_utils_1 = require("../utils/binding_utils");
const exceptions_1 = require("../utils/exceptions");
const instantiation_1 = require("./instantiation");
const _resolveRequest = (requestScope) => (request) => {
    request.parentContext.setCurrentRequest(request);
    const bindings = request.bindings;
    const childRequests = request.childRequests;
    const targetIsAnArray = request.target && request.target.isArray();
    const targetParentIsNotAnArray = !request.parentRequest ||
        !request.parentRequest.target ||
        !request.target ||
        !request.parentRequest.target.matchesArray(request.target.serviceIdentifier);
    if (targetIsAnArray && targetParentIsNotAnArray) {
        return childRequests.map((childRequest) => {
            const _f = _resolveRequest(requestScope);
            return _f(childRequest);
        });
    }
    else {
        if (request.target.isOptional() && bindings.length === 0) {
            return undefined;
        }
        const binding = bindings[0];
        return _resolveBinding(requestScope, request, binding);
    }
};
const _resolveFactoryFromBinding = (binding, context) => {
    const factoryDetails = (0, binding_utils_1.getFactoryDetails)(binding);
    return (0, exceptions_1.tryAndThrowErrorIfStackOverflow)(() => factoryDetails.factory.bind(binding)(context), () => new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY_IN_FACTORY(factoryDetails.factoryType, context.currentRequest.serviceIdentifier.toString())));
};
const _getResolvedFromBinding = (requestScope, request, binding) => {
    let result;
    const childRequests = request.childRequests;
    (0, binding_utils_1.ensureFullyBound)(binding);
    switch (binding.type) {
        case literal_types_1.BindingTypeEnum.ConstantValue:
        case literal_types_1.BindingTypeEnum.Function:
            result = binding.cache;
            break;
        case literal_types_1.BindingTypeEnum.Constructor:
            result = binding.implementationType;
            break;
        case literal_types_1.BindingTypeEnum.Instance:
            result = (0, instantiation_1.resolveInstance)(binding, binding.implementationType, childRequests, _resolveRequest(requestScope));
            break;
        default:
            result = _resolveFactoryFromBinding(binding, request.parentContext);
    }
    return result;
};
const _resolveInScope = (requestScope, binding, resolveFromBinding) => {
    let result = (0, scope_1.tryGetFromScope)(requestScope, binding);
    if (result !== null) {
        return result;
    }
    result = resolveFromBinding();
    (0, scope_1.saveToScope)(requestScope, binding, result);
    return result;
};
const _resolveBinding = (requestScope, request, binding) => {
    return _resolveInScope(requestScope, binding, () => {
        let result = _getResolvedFromBinding(requestScope, request, binding);
        if ((0, async_1.isPromise)(result)) {
            result = result.then((resolved) => _onActivation(request, binding, resolved));
        }
        else {
            result = _onActivation(request, binding, result);
        }
        return result;
    });
};
function _onActivation(request, binding, resolved) {
    let result = _bindingActivation(request.parentContext, binding, resolved);
    const containersIterator = _getContainersIterator(request.parentContext.container);
    let container;
    let containersIteratorResult = containersIterator.next();
    do {
        container = containersIteratorResult.value;
        const context = request.parentContext;
        const serviceIdentifier = request.serviceIdentifier;
        const activationsIterator = _getContainerActivationsForService(container, serviceIdentifier);
        if ((0, async_1.isPromise)(result)) {
            result = _activateContainerAsync(activationsIterator, context, result);
        }
        else {
            result = _activateContainer(activationsIterator, context, result);
        }
        containersIteratorResult = containersIterator.next();
    } while (containersIteratorResult.done !== true && !(0, planner_1.getBindingDictionary)(container).hasKey(request.serviceIdentifier));
    return result;
}
const _bindingActivation = (context, binding, previousResult) => {
    let result;
    if (typeof binding.onActivation === "function") {
        result = binding.onActivation(context, previousResult);
    }
    else {
        result = previousResult;
    }
    return result;
};
const _activateContainer = (activationsIterator, context, result) => {
    let activation = activationsIterator.next();
    while (!activation.done) {
        result = activation.value(context, result);
        if ((0, async_1.isPromise)(result)) {
            return _activateContainerAsync(activationsIterator, context, result);
        }
        activation = activationsIterator.next();
    }
    return result;
};
const _activateContainerAsync = (activationsIterator, context, resultPromise) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield resultPromise;
    let activation = activationsIterator.next();
    while (!activation.done) {
        result = yield activation.value(context, result);
        activation = activationsIterator.next();
    }
    return result;
});
const _getContainerActivationsForService = (container, serviceIdentifier) => {
    const activations = container._activations;
    return activations.hasKey(serviceIdentifier) ? activations.get(serviceIdentifier).values() : [].values();
};
const _getContainersIterator = (container) => {
    const containersStack = [container];
    let parent = container.parent;
    while (parent !== null) {
        containersStack.push(parent);
        parent = parent.parent;
    }
    const getNextContainer = () => {
        const nextContainer = containersStack.pop();
        if (nextContainer !== undefined) {
            return { done: false, value: nextContainer };
        }
        else {
            return { done: true, value: undefined };
        }
    };
    const containersIterator = {
        next: getNextContainer,
    };
    return containersIterator;
};
function resolve(context) {
    const _f = _resolveRequest(context.plan.rootRequest.requestScope);
    return _f(context.plan.rootRequest);
}
exports.resolve = resolve;
//# sourceMappingURL=resolver.js.map