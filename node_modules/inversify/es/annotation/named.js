import * as METADATA_KEY from "../constants/metadata_keys";
import { Metadata } from "../planning/metadata";
import { createTaggedDecorator } from "./decorator_utils";
function named(name) {
    return createTaggedDecorator(new Metadata(METADATA_KEY.NAMED_TAG, name));
}
export { named };
//# sourceMappingURL=named.js.map