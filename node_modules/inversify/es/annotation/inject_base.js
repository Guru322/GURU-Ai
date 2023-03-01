import { UNDEFINED_INJECT_ANNOTATION } from "../constants/error_msgs";
import { Metadata } from "../planning/metadata";
import { createTaggedDecorator } from "./decorator_utils";
export function injectBase(metadataKey) {
    return function (serviceIdentifier) {
        return function (target, targetKey, indexOrPropertyDescriptor) {
            if (serviceIdentifier === undefined) {
                var className = typeof target === "function" ? target.name : target.constructor.name;
                throw new Error(UNDEFINED_INJECT_ANNOTATION(className));
            }
            return createTaggedDecorator(new Metadata(metadataKey, serviceIdentifier))(target, targetKey, indexOrPropertyDescriptor);
        };
    };
}
//# sourceMappingURL=inject_base.js.map