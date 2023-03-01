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
define(["require", "exports", "../constants/error_msgs", "../constants/metadata_keys"], function (require, exports, ERRORS_MSGS, METADATA_KEY) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.injectable = void 0;
    ERRORS_MSGS = __importStar(ERRORS_MSGS);
    METADATA_KEY = __importStar(METADATA_KEY);
    function injectable() {
        return function (target) {
            if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
                throw new Error(ERRORS_MSGS.DUPLICATED_INJECTABLE_DECORATOR);
            }
            var types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
            Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);
            return target;
        };
    }
    exports.injectable = injectable;
});
//# sourceMappingURL=injectable.js.map