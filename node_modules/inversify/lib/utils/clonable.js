"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClonable = void 0;
function isClonable(obj) {
    return (typeof obj === 'object')
        && (obj !== null)
        && ('clone' in obj)
        && typeof obj.clone === 'function';
}
exports.isClonable = isClonable;
//# sourceMappingURL=clonable.js.map