"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmanaged = void 0;
const METADATA_KEY = __importStar(require("../constants/metadata_keys"));
const metadata_1 = require("../planning/metadata");
const decorator_utils_1 = require("./decorator_utils");
function unmanaged() {
    return function (target, targetKey, index) {
        const metadata = new metadata_1.Metadata(METADATA_KEY.UNMANAGED_TAG, true);
        (0, decorator_utils_1.tagParameter)(target, targetKey, index, metadata);
    };
}
exports.unmanaged = unmanaged;
//# sourceMappingURL=unmanaged.js.map