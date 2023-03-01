var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LocalStorage_key;
export class LocalStorage {
    constructor(key) {
        _LocalStorage_key.set(this, void 0);
        __classPrivateFieldSet(this, _LocalStorage_key, key, "f");
    }
    read() {
        const value = localStorage.getItem(__classPrivateFieldGet(this, _LocalStorage_key, "f"));
        if (value === null) {
            return null;
        }
        return JSON.parse(value);
    }
    write(obj) {
        localStorage.setItem(__classPrivateFieldGet(this, _LocalStorage_key, "f"), JSON.stringify(obj));
    }
}
_LocalStorage_key = new WeakMap();
