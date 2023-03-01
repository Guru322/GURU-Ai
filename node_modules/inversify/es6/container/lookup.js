"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lookup = void 0;
const ERROR_MSGS = __importStar(require("../constants/error_msgs"));
const clonable_1 = require("../utils/clonable");
class Lookup {
    constructor() {
        this._map = new Map();
    }
    getMap() {
        return this._map;
    }
    add(serviceIdentifier, value) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        if (value === null || value === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        const entry = this._map.get(serviceIdentifier);
        if (entry !== undefined) {
            entry.push(value);
        }
        else {
            this._map.set(serviceIdentifier, [value]);
        }
    }
    get(serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        const entry = this._map.get(serviceIdentifier);
        if (entry !== undefined) {
            return entry;
        }
        else {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }
    }
    remove(serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        if (!this._map.delete(serviceIdentifier)) {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }
    }
    removeIntersection(lookup) {
        this.traverse((serviceIdentifier, value) => {
            const lookupActivations = lookup.hasKey(serviceIdentifier) ? lookup.get(serviceIdentifier) : undefined;
            if (lookupActivations !== undefined) {
                const filteredValues = value.filter((lookupValue) => !lookupActivations.some((moduleActivation) => lookupValue === moduleActivation));
                this._setValue(serviceIdentifier, filteredValues);
            }
        });
    }
    removeByCondition(condition) {
        const removals = [];
        this._map.forEach((entries, key) => {
            const updatedEntries = [];
            for (const entry of entries) {
                const remove = condition(entry);
                if (remove) {
                    removals.push(entry);
                }
                else {
                    updatedEntries.push(entry);
                }
            }
            this._setValue(key, updatedEntries);
        });
        return removals;
    }
    hasKey(serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        return this._map.has(serviceIdentifier);
    }
    clone() {
        const copy = new Lookup();
        this._map.forEach((value, key) => {
            value.forEach((b) => copy.add(key, (0, clonable_1.isClonable)(b) ? b.clone() : b));
        });
        return copy;
    }
    traverse(func) {
        this._map.forEach((value, key) => {
            func(key, value);
        });
    }
    _setValue(serviceIdentifier, value) {
        if (value.length > 0) {
            this._map.set(serviceIdentifier, value);
        }
        else {
            this._map.delete(serviceIdentifier);
        }
    }
}
exports.Lookup = Lookup;
//# sourceMappingURL=lookup.js.map