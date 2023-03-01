"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _classStaticPrivateFieldSpecSet;
var _classCheckPrivateStaticAccess = _interopRequireDefault(require("./_class_check_private_static_access"));
var _classApplyDescriptorSet = _interopRequireDefault(require("./_class_apply_descriptor_set"));
function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    (0, _classCheckPrivateStaticAccess).default(receiver, classConstructor);
    (0, _classCheckPrivateStaticAccess).default(descriptor, "set");
    (0, _classApplyDescriptorSet).default(receiver, descriptor, value);
    return value;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
