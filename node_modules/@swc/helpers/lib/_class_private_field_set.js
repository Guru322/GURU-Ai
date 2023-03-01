"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _classPrivateFieldSet;
var _classExtractFieldDescriptor = _interopRequireDefault(require("./_class_extract_field_descriptor"));
var _classApplyDescriptorSet = _interopRequireDefault(require("./_class_apply_descriptor_set"));
function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = (0, _classExtractFieldDescriptor).default(receiver, privateMap, "set");
    (0, _classApplyDescriptorSet).default(receiver, descriptor, value);
    return value;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
