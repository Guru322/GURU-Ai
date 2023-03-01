"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagged = void 0;
const metadata_1 = require("../planning/metadata");
const decorator_utils_1 = require("./decorator_utils");
function tagged(metadataKey, metadataValue) {
    return (0, decorator_utils_1.createTaggedDecorator)(new metadata_1.Metadata(metadataKey, metadataValue));
}
exports.tagged = tagged;
//# sourceMappingURL=tagged.js.map