var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(["require", "exports", "../constants/error_msgs", "../utils/clonable"], function (require, exports, ERROR_MSGS, clonable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Lookup = void 0;
    ERROR_MSGS = __importStar(ERROR_MSGS);
    var Lookup = (function () {
        function Lookup() {
            this._map = new Map();
        }
        Lookup.prototype.getMap = function () {
            return this._map;
        };
        Lookup.prototype.add = function (serviceIdentifier, value) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(ERROR_MSGS.NULL_ARGUMENT);
            }
            if (value === null || value === undefined) {
                throw new Error(ERROR_MSGS.NULL_ARGUMENT);
            }
            var entry = this._map.get(serviceIdentifier);
            if (entry !== undefined) {
                entry.push(value);
            }
            else {
                this._map.set(serviceIdentifier, [value]);
            }
        };
        Lookup.prototype.get = function (serviceIdentifier) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(ERROR_MSGS.NULL_ARGUMENT);
            }
            var entry = this._map.get(serviceIdentifier);
            if (entry !== undefined) {
                return entry;
            }
            else {
                throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
            }
        };
        Lookup.prototype.remove = function (serviceIdentifier) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(ERROR_MSGS.NULL_ARGUMENT);
            }
            if (!this._map.delete(serviceIdentifier)) {
                throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
            }
        };
        Lookup.prototype.removeIntersection = function (lookup) {
            var _this = this;
            this.traverse(function (serviceIdentifier, value) {
                var lookupActivations = lookup.hasKey(serviceIdentifier) ? lookup.get(serviceIdentifier) : undefined;
                if (lookupActivations !== undefined) {
                    var filteredValues = value.filter(function (lookupValue) {
                        return !lookupActivations.some(function (moduleActivation) { return lookupValue === moduleActivation; });
                    });
                    _this._setValue(serviceIdentifier, filteredValues);
                }
            });
        };
        Lookup.prototype.removeByCondition = function (condition) {
            var _this = this;
            var removals = [];
            this._map.forEach(function (entries, key) {
                var updatedEntries = [];
                for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                    var entry = entries_1[_i];
                    var remove = condition(entry);
                    if (remove) {
                        removals.push(entry);
                    }
                    else {
                        updatedEntries.push(entry);
                    }
                }
                _this._setValue(key, updatedEntries);
            });
            return removals;
        };
        Lookup.prototype.hasKey = function (serviceIdentifier) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(ERROR_MSGS.NULL_ARGUMENT);
            }
            return this._map.has(serviceIdentifier);
        };
        Lookup.prototype.clone = function () {
            var copy = new Lookup();
            this._map.forEach(function (value, key) {
                value.forEach(function (b) { return copy.add(key, (0, clonable_1.isClonable)(b) ? b.clone() : b); });
            });
            return copy;
        };
        Lookup.prototype.traverse = function (func) {
            this._map.forEach(function (value, key) {
                func(key, value);
            });
        };
        Lookup.prototype._setValue = function (serviceIdentifier, value) {
            if (value.length > 0) {
                this._map.set(serviceIdentifier, value);
            }
            else {
                this._map.delete(serviceIdentifier);
            }
        };
        return Lookup;
    }());
    exports.Lookup = Lookup;
});
//# sourceMappingURL=lookup.js.map