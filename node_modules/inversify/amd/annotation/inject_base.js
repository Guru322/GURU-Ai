define(["require", "exports", "../constants/error_msgs", "../planning/metadata", "./decorator_utils"], function (require, exports, error_msgs_1, metadata_1, decorator_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.injectBase = void 0;
    function injectBase(metadataKey) {
        return function (serviceIdentifier) {
            return function (target, targetKey, indexOrPropertyDescriptor) {
                if (serviceIdentifier === undefined) {
                    var className = typeof target === "function" ? target.name : target.constructor.name;
                    throw new Error((0, error_msgs_1.UNDEFINED_INJECT_ANNOTATION)(className));
                }
                return (0, decorator_utils_1.createTaggedDecorator)(new metadata_1.Metadata(metadataKey, serviceIdentifier))(target, targetKey, indexOrPropertyDescriptor);
            };
        };
    }
    exports.injectBase = injectBase;
});
//# sourceMappingURL=inject_base.js.map