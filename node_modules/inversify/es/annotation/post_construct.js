import * as ERRORS_MSGS from "../constants/error_msgs";
import * as METADATA_KEY from "../constants/metadata_keys";
import { propertyEventDecorator } from "./property_event_decorator";
var postConstruct = propertyEventDecorator(METADATA_KEY.POST_CONSTRUCT, ERRORS_MSGS.MULTIPLE_POST_CONSTRUCT_METHODS);
export { postConstruct };
//# sourceMappingURL=post_construct.js.map