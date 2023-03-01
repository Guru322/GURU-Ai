import * as ERRORS_MSGS from "../constants/error_msgs";
import * as METADATA_KEY from "../constants/metadata_keys";
import { propertyEventDecorator } from "./property_event_decorator";
var preDestroy = propertyEventDecorator(METADATA_KEY.PRE_DESTROY, ERRORS_MSGS.MULTIPLE_PRE_DESTROY_METHODS);
export { preDestroy };
//# sourceMappingURL=pre_destroy.js.map