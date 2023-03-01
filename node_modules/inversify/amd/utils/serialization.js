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
define(["require", "exports", "../constants/error_msgs"], function (require, exports, ERROR_MSGS) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSymbolDescription = exports.circularDependencyToException = exports.listMetadataForTarget = exports.listRegisteredBindingsForServiceIdentifier = exports.getServiceIdentifierAsString = exports.getFunctionName = void 0;
    ERROR_MSGS = __importStar(ERROR_MSGS);
    function getServiceIdentifierAsString(serviceIdentifier) {
        if (typeof serviceIdentifier === "function") {
            var _serviceIdentifier = serviceIdentifier;
            return _serviceIdentifier.name;
        }
        else if (typeof serviceIdentifier === "symbol") {
            return serviceIdentifier.toString();
        }
        else {
            var _serviceIdentifier = serviceIdentifier;
            return _serviceIdentifier;
        }
    }
    exports.getServiceIdentifierAsString = getServiceIdentifierAsString;
    function listRegisteredBindingsForServiceIdentifier(container, serviceIdentifier, getBindings) {
        var registeredBindingsList = "";
        var registeredBindings = getBindings(container, serviceIdentifier);
        if (registeredBindings.length !== 0) {
            registeredBindingsList = "\nRegistered bindings:";
            registeredBindings.forEach(function (binding) {
                var name = "Object";
                if (binding.implementationType !== null) {
                    name = getFunctionName(binding.implementationType);
                }
                registeredBindingsList = registeredBindingsList + "\n " + name;
                if (binding.constraint.metaData) {
                    registeredBindingsList = registeredBindingsList + " - " + binding.constraint.metaData;
                }
            });
        }
        return registeredBindingsList;
    }
    exports.listRegisteredBindingsForServiceIdentifier = listRegisteredBindingsForServiceIdentifier;
    function alreadyDependencyChain(request, serviceIdentifier) {
        if (request.parentRequest === null) {
            return false;
        }
        else if (request.parentRequest.serviceIdentifier === serviceIdentifier) {
            return true;
        }
        else {
            return alreadyDependencyChain(request.parentRequest, serviceIdentifier);
        }
    }
    function dependencyChainToString(request) {
        function _createStringArr(req, result) {
            if (result === void 0) { result = []; }
            var serviceIdentifier = getServiceIdentifierAsString(req.serviceIdentifier);
            result.push(serviceIdentifier);
            if (req.parentRequest !== null) {
                return _createStringArr(req.parentRequest, result);
            }
            return result;
        }
        var stringArr = _createStringArr(request);
        return stringArr.reverse().join(" --> ");
    }
    function circularDependencyToException(request) {
        request.childRequests.forEach(function (childRequest) {
            if (alreadyDependencyChain(childRequest, childRequest.serviceIdentifier)) {
                var services = dependencyChainToString(childRequest);
                throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY + " " + services);
            }
            else {
                circularDependencyToException(childRequest);
            }
        });
    }
    exports.circularDependencyToException = circularDependencyToException;
    function listMetadataForTarget(serviceIdentifierString, target) {
        if (target.isTagged() || target.isNamed()) {
            var m_1 = "";
            var namedTag = target.getNamedTag();
            var otherTags = target.getCustomTags();
            if (namedTag !== null) {
                m_1 += namedTag.toString() + "\n";
            }
            if (otherTags !== null) {
                otherTags.forEach(function (tag) {
                    m_1 += tag.toString() + "\n";
                });
            }
            return " " + serviceIdentifierString + "\n " + serviceIdentifierString + " - " + m_1;
        }
        else {
            return " " + serviceIdentifierString;
        }
    }
    exports.listMetadataForTarget = listMetadataForTarget;
    function getFunctionName(func) {
        if (func.name) {
            return func.name;
        }
        else {
            var name_1 = func.toString();
            var match = name_1.match(/^function\s*([^\s(]+)/);
            return match ? match[1] : "Anonymous function: " + name_1;
        }
    }
    exports.getFunctionName = getFunctionName;
    function getSymbolDescription(symbol) {
        return symbol.toString().slice(7, -1);
    }
    exports.getSymbolDescription = getSymbolDescription;
});
//# sourceMappingURL=serialization.js.map