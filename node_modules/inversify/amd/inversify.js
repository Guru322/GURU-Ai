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
define(["require", "exports", "./constants/metadata_keys", "./container/container", "./constants/literal_types", "./container/container_module", "./annotation/decorator_utils", "./annotation/injectable", "./annotation/tagged", "./annotation/named", "./annotation/inject", "./annotation/lazy_service_identifier", "./annotation/optional", "./annotation/unmanaged", "./annotation/multi_inject", "./annotation/target_name", "./annotation/post_construct", "./annotation/pre_destroy", "./planning/metadata_reader", "./utils/id", "./interfaces/interfaces", "./annotation/decorator_utils", "./syntax/constraint_helpers", "./utils/serialization", "./utils/binding_utils"], function (require, exports, keys, container_1, literal_types_1, container_module_1, decorator_utils_1, injectable_1, tagged_1, named_1, inject_1, lazy_service_identifier_1, optional_1, unmanaged_1, multi_inject_1, target_name_1, post_construct_1, pre_destroy_1, metadata_reader_1, id_1, interfaces_1, decorator_utils_2, constraint_helpers_1, serialization_1, binding_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.multiBindToService = exports.getServiceIdentifierAsString = exports.typeConstraint = exports.namedConstraint = exports.taggedConstraint = exports.traverseAncerstors = exports.decorate = exports.interfaces = exports.id = exports.MetadataReader = exports.preDestroy = exports.postConstruct = exports.targetName = exports.multiInject = exports.unmanaged = exports.optional = exports.LazyServiceIdentifer = exports.inject = exports.named = exports.tagged = exports.injectable = exports.createTaggedDecorator = exports.ContainerModule = exports.AsyncContainerModule = exports.TargetTypeEnum = exports.BindingTypeEnum = exports.BindingScopeEnum = exports.Container = exports.METADATA_KEY = void 0;
    keys = __importStar(keys);
    exports.METADATA_KEY = keys;
    Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return container_1.Container; } });
    Object.defineProperty(exports, "BindingScopeEnum", { enumerable: true, get: function () { return literal_types_1.BindingScopeEnum; } });
    Object.defineProperty(exports, "BindingTypeEnum", { enumerable: true, get: function () { return literal_types_1.BindingTypeEnum; } });
    Object.defineProperty(exports, "TargetTypeEnum", { enumerable: true, get: function () { return literal_types_1.TargetTypeEnum; } });
    Object.defineProperty(exports, "AsyncContainerModule", { enumerable: true, get: function () { return container_module_1.AsyncContainerModule; } });
    Object.defineProperty(exports, "ContainerModule", { enumerable: true, get: function () { return container_module_1.ContainerModule; } });
    Object.defineProperty(exports, "createTaggedDecorator", { enumerable: true, get: function () { return decorator_utils_1.createTaggedDecorator; } });
    Object.defineProperty(exports, "injectable", { enumerable: true, get: function () { return injectable_1.injectable; } });
    Object.defineProperty(exports, "tagged", { enumerable: true, get: function () { return tagged_1.tagged; } });
    Object.defineProperty(exports, "named", { enumerable: true, get: function () { return named_1.named; } });
    Object.defineProperty(exports, "inject", { enumerable: true, get: function () { return inject_1.inject; } });
    Object.defineProperty(exports, "LazyServiceIdentifer", { enumerable: true, get: function () { return lazy_service_identifier_1.LazyServiceIdentifer; } });
    Object.defineProperty(exports, "optional", { enumerable: true, get: function () { return optional_1.optional; } });
    Object.defineProperty(exports, "unmanaged", { enumerable: true, get: function () { return unmanaged_1.unmanaged; } });
    Object.defineProperty(exports, "multiInject", { enumerable: true, get: function () { return multi_inject_1.multiInject; } });
    Object.defineProperty(exports, "targetName", { enumerable: true, get: function () { return target_name_1.targetName; } });
    Object.defineProperty(exports, "postConstruct", { enumerable: true, get: function () { return post_construct_1.postConstruct; } });
    Object.defineProperty(exports, "preDestroy", { enumerable: true, get: function () { return pre_destroy_1.preDestroy; } });
    Object.defineProperty(exports, "MetadataReader", { enumerable: true, get: function () { return metadata_reader_1.MetadataReader; } });
    Object.defineProperty(exports, "id", { enumerable: true, get: function () { return id_1.id; } });
    Object.defineProperty(exports, "interfaces", { enumerable: true, get: function () { return interfaces_1.interfaces; } });
    Object.defineProperty(exports, "decorate", { enumerable: true, get: function () { return decorator_utils_2.decorate; } });
    Object.defineProperty(exports, "traverseAncerstors", { enumerable: true, get: function () { return constraint_helpers_1.traverseAncerstors; } });
    Object.defineProperty(exports, "taggedConstraint", { enumerable: true, get: function () { return constraint_helpers_1.taggedConstraint; } });
    Object.defineProperty(exports, "namedConstraint", { enumerable: true, get: function () { return constraint_helpers_1.namedConstraint; } });
    Object.defineProperty(exports, "typeConstraint", { enumerable: true, get: function () { return constraint_helpers_1.typeConstraint; } });
    Object.defineProperty(exports, "getServiceIdentifierAsString", { enumerable: true, get: function () { return serialization_1.getServiceIdentifierAsString; } });
    Object.defineProperty(exports, "multiBindToService", { enumerable: true, get: function () { return binding_utils_1.multiBindToService; } });
});
//# sourceMappingURL=inversify.js.map