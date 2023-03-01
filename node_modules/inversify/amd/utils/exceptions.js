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
define(["require", "exports", "../constants/error_msgs"], function (require, exports, ERROR_MSGS) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tryAndThrowErrorIfStackOverflow = exports.isStackOverflowExeption = void 0;
    ERROR_MSGS = __importStar(ERROR_MSGS);
    function isStackOverflowExeption(error) {
        return (error instanceof RangeError ||
            error.message === ERROR_MSGS.STACK_OVERFLOW);
    }
    exports.isStackOverflowExeption = isStackOverflowExeption;
    var tryAndThrowErrorIfStackOverflow = function (fn, errorCallback) {
        try {
            return fn();
        }
        catch (error) {
            if (isStackOverflowExeption(error)) {
                error = errorCallback();
            }
            throw error;
        }
    };
    exports.tryAndThrowErrorIfStackOverflow = tryAndThrowErrorIfStackOverflow;
});
//# sourceMappingURL=exceptions.js.map