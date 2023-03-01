"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyServiceIdentifer = void 0;
class LazyServiceIdentifer {
    constructor(cb) {
        this._cb = cb;
    }
    unwrap() {
        return this._cb();
    }
}
exports.LazyServiceIdentifer = LazyServiceIdentifer;
//# sourceMappingURL=lazy_service_identifier.js.map