"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _arrayWithoutHoles;
var _arrayLikeToArray = _interopRequireDefault(require("./_array_like_to_array"));
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return (0, _arrayLikeToArray).default(arr);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
