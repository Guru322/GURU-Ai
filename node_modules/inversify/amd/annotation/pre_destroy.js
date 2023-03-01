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
define(["require", "exports", "../constants/error_msgs", "../constants/metadata_keys", "./property_event_decorator"], function (require, exports, ERRORS_MSGS, METADATA_KEY, property_event_decorator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.preDestroy = void 0;
    ERRORS_MSGS = __importStar(ERRORS_MSGS);
    METADATA_KEY = __importStar(METADATA_KEY);
    var preDestroy = (0, property_event_decorator_1.propertyEventDecorator)(METADATA_KEY.PRE_DESTROY, ERRORS_MSGS.MULTIPLE_PRE_DESTROY_METHODS);
    exports.preDestroy = preDestroy;
});
//# sourceMappingURL=pre_destroy.js.map