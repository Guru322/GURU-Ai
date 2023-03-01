import { Metadata } from "../planning/metadata";
function propertyEventDecorator(eventKey, errorMessage) {
    return function () {
        return function (target, propertyKey) {
            var metadata = new Metadata(eventKey, propertyKey);
            if (Reflect.hasOwnMetadata(eventKey, target.constructor)) {
                throw new Error(errorMessage);
            }
            Reflect.defineMetadata(eventKey, metadata, target.constructor);
        };
    };
}
export { propertyEventDecorator };
//# sourceMappingURL=property_event_decorator.js.map