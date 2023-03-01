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
define(["require", "exports", "../constants/metadata_keys", "./inject_base"], function (require, exports, METADATA_KEY, inject_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.multiInject = void 0;
    METADATA_KEY = __importStar(METADATA_KEY);
    var multiInject = (0, inject_base_1.injectBase)(METADATA_KEY.MULTI_INJECT_TAG);
    exports.multiInject = multiInject;
});
//# sourceMappingURL=multi_inject.js.map