"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _classStaticPrivateFieldSpecGet;
var _classCheckPrivateStaticAccess = _interopRequireDefault(require("./_class_check_private_static_access"));
var _classApplyDescriptorGet = _interopRequireDefault(require("./_class_apply_descriptor_get"));
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    (0, _classCheckPrivateStaticAccess).default(receiver, classConstructor);
    (0, _classCheckPrivateStaticAccess).default(descriptor, "get");
    return (0, _classApplyDescriptorGet).default(receiver, descriptor);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
