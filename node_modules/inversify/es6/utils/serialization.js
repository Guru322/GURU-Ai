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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSymbolDescription = exports.circularDependencyToException = exports.listMetadataForTarget = exports.listRegisteredBindingsForServiceIdentifier = exports.getServiceIdentifierAsString = exports.getFunctionName = void 0;
const ERROR_MSGS = __importStar(require("../constants/error_msgs"));
function getServiceIdentifierAsString(serviceIdentifier) {
    if (typeof serviceIdentifier === "function") {
        const _serviceIdentifier = serviceIdentifier;
        return _serviceIdentifier.name;
    }
    else if (typeof serviceIdentifier === "symbol") {
        return serviceIdentifier.toString();
    }
    else {
        const _serviceIdentifier = serviceIdentifier;
        return _serviceIdentifier;
    }
}
exports.getServiceIdentifierAsString = getServiceIdentifierAsString;
function listRegisteredBindingsForServiceIdentifier(container, serviceIdentifier, getBindings) {
    let registeredBindingsList = "";
    const registeredBindings = getBindings(container, serviceIdentifier);
    if (registeredBindings.length !== 0) {
        registeredBindingsList = "\nRegistered bindings:";
        registeredBindings.forEach((binding) => {
            let name = "Object";
            if (binding.implementationType !== null) {
                name = getFunctionName(binding.implementationType);
            }
            registeredBindingsList = `${registeredBindingsList}\n ${name}`;
            if (binding.constraint.metaData) {
                registeredBindingsList = `${registeredBindingsList} - ${binding.constraint.metaData}`;
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
    function _createStringArr(req, result = []) {
        const serviceIdentifier = getServiceIdentifierAsString(req.serviceIdentifier);
        result.push(serviceIdentifier);
        if (req.parentRequest !== null) {
            return _createStringArr(req.parentRequest, result);
        }
        return result;
    }
    const stringArr = _createStringArr(request);
    return stringArr.reverse().join(" --> ");
}
function circularDependencyToException(request) {
    request.childRequests.forEach((childRequest) => {
        if (alreadyDependencyChain(childRequest, childRequest.serviceIdentifier)) {
            const services = dependencyChainToString(childRequest);
            throw new Error(`${ERROR_MSGS.CIRCULAR_DEPENDENCY} ${services}`);
        }
        else {
            circularDependencyToException(childRequest);
        }
    });
}
exports.circularDependencyToException = circularDependencyToException;
function listMetadataForTarget(serviceIdentifierString, target) {
    if (target.isTagged() || target.isNamed()) {
        let m = "";
        const namedTag = target.getNamedTag();
        const otherTags = target.getCustomTags();
        if (namedTag !== null) {
            m += namedTag.toString() + "\n";
        }
        if (otherTags !== null) {
            otherTags.forEach((tag) => {
                m += tag.toString() + "\n";
            });
        }
        return ` ${serviceIdentifierString}\n ${serviceIdentifierString} - ${m}`;
    }
    else {
        return ` ${serviceIdentifierString}`;
    }
}
exports.listMetadataForTarget = listMetadataForTarget;
function getFunctionName(func) {
    if (func.name) {
        return func.name;
    }
    else {
        const name = func.toString();
        const match = name.match(/^function\s*([^\s(]+)/);
        return match ? match[1] : `Anonymous function: ${name}`;
    }
}
exports.getFunctionName = getFunctionName;
function getSymbolDescription(symbol) {
    return symbol.toString().slice(7, -1);
}
exports.getSymbolDescription = getSymbolDescription;
//# sourceMappingURL=serialization.js.map