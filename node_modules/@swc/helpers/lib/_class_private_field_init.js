"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _classPrivateFieldInit;
var _checkPrivateRedeclaration = _interopRequireDefault(require("./_check_private_redeclaration"));
function _classPrivateFieldInit(obj, privateMap, value) {
    (0, _checkPrivateRedeclaration).default(obj, privateMap);
    privateMap.set(obj, value);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
