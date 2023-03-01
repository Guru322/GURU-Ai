"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstArrayDuplicate = void 0;
function getFirstArrayDuplicate(array) {
    const seenValues = new Set();
    for (const entry of array) {
        if (seenValues.has(entry)) {
            return entry;
        }
        else {
            seenValues.add(entry);
        }
    }
    return undefined;
}
exports.getFirstArrayDuplicate = getFirstArrayDuplicate;
//# sourceMappingURL=js.js.map