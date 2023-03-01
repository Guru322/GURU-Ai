import * as ERROR_MSGS from "../constants/error_msgs";
export function isStackOverflowExeption(error) {
    return (error instanceof RangeError ||
        error.message === ERROR_MSGS.STACK_OVERFLOW);
}
export var tryAndThrowErrorIfStackOverflow = function (fn, errorCallback) {
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
//# sourceMappingURL=exceptions.js.map