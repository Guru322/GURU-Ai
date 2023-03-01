"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Collection extends Map {
    find(fn) {
        let found;
        for (const item of this.entries()) {
            found = fn(item[1], item[0]);
            if (found)
                return item[1];
        }
    }
    findOne(arg) {
        return this.find((data) => Object.values(data).includes(arg));
    }
}
exports.default = Collection;
