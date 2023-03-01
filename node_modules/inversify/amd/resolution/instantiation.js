var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define(["require", "exports", "../constants/error_msgs", "../constants/literal_types", "../constants/metadata_keys", "../utils/async"], function (require, exports, error_msgs_1, literal_types_1, METADATA_KEY, async_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resolveInstance = void 0;
    METADATA_KEY = __importStar(METADATA_KEY);
    function _resolveRequests(childRequests, resolveRequest) {
        return childRequests.reduce(function (resolvedRequests, childRequest) {
            var injection = resolveRequest(childRequest);
            var targetType = childRequest.target.type;
            if (targetType === literal_types_1.TargetTypeEnum.ConstructorArgument) {
                resolvedRequests.constructorInjections.push(injection);
            }
            else {
                resolvedRequests.propertyRequests.push(childRequest);
                resolvedRequests.propertyInjections.push(injection);
            }
            if (!resolvedRequests.isAsync) {
                resolvedRequests.isAsync = (0, async_1.isPromiseOrContainsPromise)(injection);
            }
            return resolvedRequests;
        }, { constructorInjections: [], propertyInjections: [], propertyRequests: [], isAsync: false });
    }
    function _createInstance(constr, childRequests, resolveRequest) {
        var result;
        if (childRequests.length > 0) {
            var resolved = _resolveRequests(childRequests, resolveRequest);
            var createInstanceWithInjectionsArg = __assign(__assign({}, resolved), { constr: constr });
            if (resolved.isAsync) {
                result = createInstanceWithInjectionsAsync(createInstanceWithInjectionsArg);
            }
            else {
                result = createInstanceWithInjections(createInstanceWithInjectionsArg);
            }
        }
        else {
            result = new constr();
        }
        return result;
    }
    function createInstanceWithInjections(args) {
        var _a;
        var instance = new ((_a = args.constr).bind.apply(_a, __spreadArray([void 0], args.constructorInjections, false)))();
        args.propertyRequests.forEach(function (r, index) {
            var property = r.target.identifier;
            var injection = args.propertyInjections[index];
            instance[property] = injection;
        });
        return instance;
    }
    function createInstanceWithInjectionsAsync(args) {
        return __awaiter(this, void 0, void 0, function () {
            var constructorInjections, propertyInjections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, possiblyWaitInjections(args.constructorInjections)];
                    case 1:
                        constructorInjections = _a.sent();
                        return [4, possiblyWaitInjections(args.propertyInjections)];
                    case 2:
                        propertyInjections = _a.sent();
                        return [2, createInstanceWithInjections(__assign(__assign({}, args), { constructorInjections: constructorInjections, propertyInjections: propertyInjections }))];
                }
            });
        });
    }
    function possiblyWaitInjections(possiblePromiseinjections) {
        return __awaiter(this, void 0, void 0, function () {
            var injections, _i, possiblePromiseinjections_1, injection;
            return __generator(this, function (_a) {
                injections = [];
                for (_i = 0, possiblePromiseinjections_1 = possiblePromiseinjections; _i < possiblePromiseinjections_1.length; _i++) {
                    injection = possiblePromiseinjections_1[_i];
                    if (Array.isArray(injection)) {
                        injections.push(Promise.all(injection));
                    }
                    else {
                        injections.push(injection);
                    }
                }
                return [2, Promise.all(injections)];
            });
        });
    }
    function _getInstanceAfterPostConstruct(constr, result) {
        var postConstructResult = _postConstruct(constr, result);
        if ((0, async_1.isPromise)(postConstructResult)) {
            return postConstructResult.then(function () { return result; });
        }
        else {
            return result;
        }
    }
    function _postConstruct(constr, instance) {
        var _a, _b;
        if (Reflect.hasMetadata(METADATA_KEY.POST_CONSTRUCT, constr)) {
            var data = Reflect.getMetadata(METADATA_KEY.POST_CONSTRUCT, constr);
            try {
                return (_b = (_a = instance)[data.value]) === null || _b === void 0 ? void 0 : _b.call(_a);
            }
            catch (e) {
                throw new Error((0, error_msgs_1.POST_CONSTRUCT_ERROR)(constr.name, e.message));
            }
        }
    }
    function _validateInstanceResolution(binding, constr) {
        if (binding.scope !== literal_types_1.BindingScopeEnum.Singleton) {
            _throwIfHandlingDeactivation(binding, constr);
        }
    }
    function _throwIfHandlingDeactivation(binding, constr) {
        var scopeErrorMessage = "Class cannot be instantiated in " + (binding.scope === literal_types_1.BindingScopeEnum.Request ?
            "request" :
            "transient") + " scope.";
        if (typeof binding.onDeactivation === "function") {
            throw new Error((0, error_msgs_1.ON_DEACTIVATION_ERROR)(constr.name, scopeErrorMessage));
        }
        if (Reflect.hasMetadata(METADATA_KEY.PRE_DESTROY, constr)) {
            throw new Error((0, error_msgs_1.PRE_DESTROY_ERROR)(constr.name, scopeErrorMessage));
        }
    }
    function resolveInstance(binding, constr, childRequests, resolveRequest) {
        _validateInstanceResolution(binding, constr);
        var result = _createInstance(constr, childRequests, resolveRequest);
        if ((0, async_1.isPromise)(result)) {
            return result.then(function (resolvedResult) { return _getInstanceAfterPostConstruct(constr, resolvedResult); });
        }
        else {
            return _getInstanceAfterPostConstruct(constr, result);
        }
    }
    exports.resolveInstance = resolveInstance;
});
//# sourceMappingURL=instantiation.js.map