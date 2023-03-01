function isPromise(object) {
    var isObjectOrFunction = (typeof object === 'object' && object !== null) || typeof object === 'function';
    return isObjectOrFunction && typeof object.then === "function";
}
function isPromiseOrContainsPromise(object) {
    if (isPromise(object)) {
        return true;
    }
    return Array.isArray(object) && object.some(isPromise);
}
export { isPromise, isPromiseOrContainsPromise };
//# sourceMappingURL=async.js.map