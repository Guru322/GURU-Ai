"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyEventDecorator = void 0;
var metadata_1 = require("../planning/metadata");
function propertyEventDecorator(eventKey, errorMessage) {
    return function () {
        return function (target, propertyKey) {
            var metadata = new metadata_1.Metadata(eventKey, propertyKey);
            if (Reflect.hasOwnMetadata(eventKey, target.constructor)) {
                throw new Error(errorMessage);
            }
            Reflect.defineMetadata(eventKey, metadata, target.constructor);
        };
    };
}
exports.propertyEventDecorator = propertyEventDecorator;
//# sourceMappingURL=property_event_decorator.js.map