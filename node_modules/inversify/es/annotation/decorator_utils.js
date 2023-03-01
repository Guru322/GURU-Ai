import * as ERROR_MSGS from "../constants/error_msgs";
import * as METADATA_KEY from "../constants/metadata_keys";
import { getFirstArrayDuplicate } from "../utils/js";
function targetIsConstructorFunction(target) {
    return target.prototype !== undefined;
}
function _throwIfMethodParameter(parameterName) {
    if (parameterName !== undefined) {
        throw new Error(ERROR_MSGS.INVALID_DECORATOR_OPERATION);
    }
}
function tagParameter(annotationTarget, parameterName, parameterIndex, metadata) {
    _throwIfMethodParameter(parameterName);
    _tagParameterOrProperty(METADATA_KEY.TAGGED, annotationTarget, parameterIndex.toString(), metadata);
}
function tagProperty(annotationTarget, propertyName, metadata) {
    if (targetIsConstructorFunction(annotationTarget)) {
        throw new Error(ERROR_MSGS.INVALID_DECORATOR_OPERATION);
    }
    _tagParameterOrProperty(METADATA_KEY.TAGGED_PROP, annotationTarget.constructor, propertyName, metadata);
}
function _ensureNoMetadataKeyDuplicates(metadata) {
    var metadatas = [];
    if (Array.isArray(metadata)) {
        metadatas = metadata;
        var duplicate = getFirstArrayDuplicate(metadatas.map(function (md) { return md.key; }));
        if (duplicate !== undefined) {
            throw new Error(ERROR_MSGS.DUPLICATED_METADATA + " " + duplicate.toString());
        }
    }
    else {
        metadatas = [metadata];
    }
    return metadatas;
}
function _tagParameterOrProperty(metadataKey, annotationTarget, key, metadata) {
    var metadatas = _ensureNoMetadataKeyDuplicates(metadata);
    var paramsOrPropertiesMetadata = {};
    if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
        paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
    }
    var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];
    if (paramOrPropertyMetadata === undefined) {
        paramOrPropertyMetadata = [];
    }
    else {
        var _loop_1 = function (m) {
            if (metadatas.some(function (md) { return md.key === m.key; })) {
                throw new Error(ERROR_MSGS.DUPLICATED_METADATA + " " + m.key.toString());
            }
        };
        for (var _i = 0, paramOrPropertyMetadata_1 = paramOrPropertyMetadata; _i < paramOrPropertyMetadata_1.length; _i++) {
            var m = paramOrPropertyMetadata_1[_i];
            _loop_1(m);
        }
    }
    paramOrPropertyMetadata.push.apply(paramOrPropertyMetadata, metadatas);
    paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
    Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
}
function createTaggedDecorator(metadata) {
    return function (target, targetKey, indexOrPropertyDescriptor) {
        if (typeof indexOrPropertyDescriptor === "number") {
            tagParameter(target, targetKey, indexOrPropertyDescriptor, metadata);
        }
        else {
            tagProperty(target, targetKey, metadata);
        }
    };
}
function _decorate(decorators, target) {
    Reflect.decorate(decorators, target);
}
function _param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); };
}
function decorate(decorator, target, parameterIndexOrProperty) {
    if (typeof parameterIndexOrProperty === "number") {
        _decorate([_param(parameterIndexOrProperty, decorator)], target);
    }
    else if (typeof parameterIndexOrProperty === "string") {
        Reflect.decorate([decorator], target, parameterIndexOrProperty);
    }
    else {
        _decorate([decorator], target);
    }
}
export { decorate, tagParameter, tagProperty, createTaggedDecorator };
//# sourceMappingURL=decorator_utils.js.map