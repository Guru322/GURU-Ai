define(["require", "exports", "../planning/metadata", "./decorator_utils"], function (require, exports, metadata_1, decorator_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tagged = void 0;
    function tagged(metadataKey, metadataValue) {
        return (0, decorator_utils_1.createTaggedDecorator)(new metadata_1.Metadata(metadataKey, metadataValue));
    }
    exports.tagged = tagged;
});
//# sourceMappingURL=tagged.js.map