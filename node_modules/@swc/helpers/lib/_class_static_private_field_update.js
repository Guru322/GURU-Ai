"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _classStaticPrivateFieldUpdate;
var _classCheckPrivateStaticAccess = _interopRequireDefault(require("./_class_check_private_static_access"));
var _classApplyDescriptorUpdate = _interopRequireDefault(require("./_class_apply_descriptor_update"));
function _classStaticPrivateFieldUpdate(receiver, classConstructor, descriptor) {
    (0, _classCheckPrivateStaticAccess).default(receiver, classConstructor);
    (0, _classCheckPrivateStaticAccess).default(descriptor, "update");
    return (0, _classApplyDescriptorUpdate).default(receiver, descriptor);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
