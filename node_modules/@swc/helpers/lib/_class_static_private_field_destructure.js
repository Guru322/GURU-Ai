"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _classStaticPrivateFieldDestructureSet;
var _classCheckPrivateStaticAccess = _interopRequireDefault(require("./_class_check_private_static_access"));
var _classApplyDescriptorDestructure = _interopRequireDefault(require("./_class_apply_descriptor_destructure"));
function _classStaticPrivateFieldDestructureSet(receiver, classConstructor, descriptor) {
    (0, _classCheckPrivateStaticAccess).default(receiver, classConstructor);
    (0, _classCheckPrivateStaticAccess).default(descriptor, "set");
    return (0, _classApplyDescriptorDestructure).default(receiver, descriptor);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
