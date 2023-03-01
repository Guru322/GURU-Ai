"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _classPrivateFieldUpdate;
var _classExtractFieldDescriptor = _interopRequireDefault(require("./_class_extract_field_descriptor"));
var _classApplyDescriptorUpdate = _interopRequireDefault(require("./_class_apply_descriptor_update"));
function _classPrivateFieldUpdate(receiver, privateMap) {
    var descriptor = (0, _classExtractFieldDescriptor).default(receiver, privateMap, "update");
    return (0, _classApplyDescriptorUpdate).default(receiver, descriptor);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
