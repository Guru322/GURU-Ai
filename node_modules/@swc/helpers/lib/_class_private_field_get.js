"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _classPrivateFieldGet;
var _classExtractFieldDescriptor = _interopRequireDefault(require("./_class_extract_field_descriptor"));
var _classApplyDescriptorGet = _interopRequireDefault(require("./_class_apply_descriptor_get"));
function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = (0, _classExtractFieldDescriptor).default(receiver, privateMap, "get");
    return (0, _classApplyDescriptorGet).default(receiver, descriptor);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
