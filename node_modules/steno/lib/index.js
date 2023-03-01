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
var _Writer_instances, _Writer_filename, _Writer_tempFilename, _Writer_locked, _Writer_prev, _Writer_next, _Writer_nextPromise, _Writer_nextData, _Writer_add, _Writer_write;
import fs from 'fs';
import path from 'path';
// Returns a temporary file
// Example: for /some/file will return /some/.file.tmp
function getTempFilename(file) {
    return path.join(path.dirname(file), '.' + path.basename(file) + '.tmp');
}
export class Writer {
    constructor(filename) {
        _Writer_instances.add(this);
        _Writer_filename.set(this, void 0);
        _Writer_tempFilename.set(this, void 0);
        _Writer_locked.set(this, false);
        _Writer_prev.set(this, null);
        _Writer_next.set(this, null);
        _Writer_nextPromise.set(this, null);
        _Writer_nextData.set(this, null
        // File is locked, add data for later
        );
        __classPrivateFieldSet(this, _Writer_filename, filename, "f");
        __classPrivateFieldSet(this, _Writer_tempFilename, getTempFilename(filename), "f");
    }
    async write(data) {
        return __classPrivateFieldGet(this, _Writer_locked, "f") ? __classPrivateFieldGet(this, _Writer_instances, "m", _Writer_add).call(this, data) : __classPrivateFieldGet(this, _Writer_instances, "m", _Writer_write).call(this, data);
    }
}
_Writer_filename = new WeakMap(), _Writer_tempFilename = new WeakMap(), _Writer_locked = new WeakMap(), _Writer_prev = new WeakMap(), _Writer_next = new WeakMap(), _Writer_nextPromise = new WeakMap(), _Writer_nextData = new WeakMap(), _Writer_instances = new WeakSet(), _Writer_add = function _Writer_add(data) {
    // Only keep most recent data
    __classPrivateFieldSet(this, _Writer_nextData, data, "f");
    // Create a singleton promise to resolve all next promises once next data is written
    __classPrivateFieldSet(this, _Writer_nextPromise, __classPrivateFieldGet(this, _Writer_nextPromise, "f") || new Promise((resolve, reject) => {
        __classPrivateFieldSet(this, _Writer_next, [resolve, reject], "f");
    }), "f");
    // Return a promise that will resolve at the same time as next promise
    return new Promise((resolve, reject) => {
        var _a;
        (_a = __classPrivateFieldGet(this, _Writer_nextPromise, "f")) === null || _a === void 0 ? void 0 : _a.then(resolve).catch(reject);
    });
}, _Writer_write = 
// File isn't locked, write data
async function _Writer_write(data) {
    var _a, _b;
    // Lock file
    __classPrivateFieldSet(this, _Writer_locked, true, "f");
    try {
        // Atomic write
        await fs.promises.writeFile(__classPrivateFieldGet(this, _Writer_tempFilename, "f"), data, 'utf-8');
        await fs.promises.rename(__classPrivateFieldGet(this, _Writer_tempFilename, "f"), __classPrivateFieldGet(this, _Writer_filename, "f"));
        // Call resolve
        (_a = __classPrivateFieldGet(this, _Writer_prev, "f")) === null || _a === void 0 ? void 0 : _a[0]();
    }
    catch (err) {
        // Call reject
        (_b = __classPrivateFieldGet(this, _Writer_prev, "f")) === null || _b === void 0 ? void 0 : _b[1](err);
        throw err;
    }
    finally {
        // Unlock file
        __classPrivateFieldSet(this, _Writer_locked, false, "f");
        __classPrivateFieldSet(this, _Writer_prev, __classPrivateFieldGet(this, _Writer_next, "f"), "f");
        __classPrivateFieldSet(this, _Writer_next, __classPrivateFieldSet(this, _Writer_nextPromise, null, "f"), "f");
        if (__classPrivateFieldGet(this, _Writer_nextData, "f") !== null) {
            const nextData = __classPrivateFieldGet(this, _Writer_nextData, "f");
            __classPrivateFieldSet(this, _Writer_nextData, null, "f");
            await this.write(nextData);
        }
    }
};
