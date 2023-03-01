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
exports.getFunctionName = exports.getBaseClassDependencyCount = exports.getDependencies = void 0;
const lazy_service_identifier_1 = require("../annotation/lazy_service_identifier");
const ERROR_MSGS = __importStar(require("../constants/error_msgs"));
const literal_types_1 = require("../constants/literal_types");
const METADATA_KEY = __importStar(require("../constants/metadata_keys"));
const serialization_1 = require("../utils/serialization");
Object.defineProperty(exports, "getFunctionName", { enumerable: true, get: function () { return serialization_1.getFunctionName; } });
const target_1 = require("./target");
function getDependencies(metadataReader, func) {
    const constructorName = (0, serialization_1.getFunctionName)(func);
    return getTargets(metadataReader, constructorName, func, false);
}
exports.getDependencies = getDependencies;
function getTargets(metadataReader, constructorName, func, isBaseClass) {
    const metadata = metadataReader.getConstructorMetadata(func);
    const serviceIdentifiers = metadata.compilerGeneratedMetadata;
    if (serviceIdentifiers === undefined) {
        const msg = `${ERROR_MSGS.MISSING_INJECTABLE_ANNOTATION} ${constructorName}.`;
        throw new Error(msg);
    }
    const constructorArgsMetadata = metadata.userGeneratedMetadata;
    const keys = Object.keys(constructorArgsMetadata);
    const hasUserDeclaredUnknownInjections = (func.length === 0 && keys.length > 0);
    const hasOptionalParameters = keys.length > func.length;
    const iterations = (hasUserDeclaredUnknownInjections || hasOptionalParameters) ? keys.length : func.length;
    const constructorTargets = getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations);
    const propertyTargets = getClassPropsAsTargets(metadataReader, func, constructorName);
    const targets = [
        ...constructorTargets,
        ...propertyTargets
    ];
    return targets;
}
function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
    const targetMetadata = constructorArgsMetadata[index.toString()] || [];
    const metadata = formatTargetMetadata(targetMetadata);
    const isManaged = metadata.unmanaged !== true;
    let serviceIdentifier = serviceIdentifiers[index];
    const injectIdentifier = (metadata.inject || metadata.multiInject);
    serviceIdentifier = (injectIdentifier) ? (injectIdentifier) : serviceIdentifier;
    if (serviceIdentifier instanceof lazy_service_identifier_1.LazyServiceIdentifer) {
        serviceIdentifier = serviceIdentifier.unwrap();
    }
    if (isManaged) {
        const isObject = serviceIdentifier === Object;
        const isFunction = serviceIdentifier === Function;
        const isUndefined = serviceIdentifier === undefined;
        const isUnknownType = (isObject || isFunction || isUndefined);
        if (!isBaseClass && isUnknownType) {
            const msg = `${ERROR_MSGS.MISSING_INJECT_ANNOTATION} argument ${index} in class ${constructorName}.`;
            throw new Error(msg);
        }
        const target = new target_1.Target(literal_types_1.TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIdentifier);
        target.metadata = targetMetadata;
        return target;
    }
    return null;
}
function getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations) {
    const targets = [];
    for (let i = 0; i < iterations; i++) {
        const index = i;
        const target = getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata);
        if (target !== null) {
            targets.push(target);
        }
    }
    return targets;
}
function _getServiceIdentifierForProperty(inject, multiInject, propertyName, className) {
    const serviceIdentifier = (inject || multiInject);
    if (serviceIdentifier === undefined) {
        const msg = `${ERROR_MSGS.MISSING_INJECTABLE_ANNOTATION} for property ${String(propertyName)} in class ${className}.`;
        throw new Error(msg);
    }
    return serviceIdentifier;
}
function getClassPropsAsTargets(metadataReader, constructorFunc, constructorName) {
    const classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc);
    let targets = [];
    const symbolKeys = Object.getOwnPropertySymbols(classPropsMetadata);
    const stringKeys = Object.keys(classPropsMetadata);
    const keys = stringKeys.concat(symbolKeys);
    for (const key of keys) {
        const targetMetadata = classPropsMetadata[key];
        const metadata = formatTargetMetadata(targetMetadata);
        const identifier = metadata.targetName || key;
        const serviceIdentifier = _getServiceIdentifierForProperty(metadata.inject, metadata.multiInject, key, constructorName);
        const target = new target_1.Target(literal_types_1.TargetTypeEnum.ClassProperty, identifier, serviceIdentifier);
        target.metadata = targetMetadata;
        targets.push(target);
    }
    const baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor;
    if (baseConstructor !== Object) {
        const baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor, constructorName);
        targets = [
            ...targets,
            ...baseTargets
        ];
    }
    return targets;
}
function getBaseClassDependencyCount(metadataReader, func) {
    const baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
    if (baseConstructor !== Object) {
        const baseConstructorName = (0, serialization_1.getFunctionName)(baseConstructor);
        const targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true);
        const metadata = targets.map((t) => t.metadata.filter(m => m.key === METADATA_KEY.UNMANAGED_TAG));
        const unmanagedCount = [].concat.apply([], metadata).length;
        const dependencyCount = targets.length - unmanagedCount;
        if (dependencyCount > 0) {
            return dependencyCount;
        }
        else {
            return getBaseClassDependencyCount(metadataReader, baseConstructor);
        }
    }
    else {
        return 0;
    }
}
exports.getBaseClassDependencyCount = getBaseClassDependencyCount;
function formatTargetMetadata(targetMetadata) {
    const targetMetadataMap = {};
    targetMetadata.forEach((m) => {
        targetMetadataMap[m.key.toString()] = m.value;
    });
    return {
        inject: targetMetadataMap[METADATA_KEY.INJECT_TAG],
        multiInject: targetMetadataMap[METADATA_KEY.MULTI_INJECT_TAG],
        targetName: targetMetadataMap[METADATA_KEY.NAME_TAG],
        unmanaged: targetMetadataMap[METADATA_KEY.UNMANAGED_TAG]
    };
}
//# sourceMappingURL=reflection_utils.js.map