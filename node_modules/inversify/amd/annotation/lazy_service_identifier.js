define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LazyServiceIdentifer = void 0;
    var LazyServiceIdentifer = (function () {
        function LazyServiceIdentifer(cb) {
            this._cb = cb;
        }
        LazyServiceIdentifer.prototype.unwrap = function () {
            return this._cb();
        };
        return LazyServiceIdentifer;
    }());
    exports.LazyServiceIdentifer = LazyServiceIdentifer;
});
//# sourceMappingURL=lazy_service_identifier.js.map