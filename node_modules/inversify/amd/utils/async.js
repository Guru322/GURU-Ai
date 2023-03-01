define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isPromiseOrContainsPromise = exports.isPromise = void 0;
    function isPromise(object) {
        var isObjectOrFunction = (typeof object === 'object' && object !== null) || typeof object === 'function';
        return isObjectOrFunction && typeof object.then === "function";
    }
    exports.isPromise = isPromise;
    function isPromiseOrContainsPromise(object) {
        if (isPromise(object)) {
            return true;
        }
        return Array.isArray(object) && object.some(isPromise);
    }
    exports.isPromiseOrContainsPromise = isPromiseOrContainsPromise;
});
//# sourceMappingURL=async.js.map