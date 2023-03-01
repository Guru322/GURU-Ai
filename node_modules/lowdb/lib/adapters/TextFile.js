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
var _TextFile_filename, _TextFile_writer;
import fs from 'fs';
import { Writer } from 'steno';
export class TextFile {
    constructor(filename) {
        _TextFile_filename.set(this, void 0);
        _TextFile_writer.set(this, void 0);
        __classPrivateFieldSet(this, _TextFile_filename, filename, "f");
        __classPrivateFieldSet(this, _TextFile_writer, new Writer(filename), "f");
    }
    async read() {
        let data;
        try {
            data = await fs.promises.readFile(__classPrivateFieldGet(this, _TextFile_filename, "f"), 'utf-8');
        }
        catch (e) {
            if (e.code === 'ENOENT') {
                return null;
            }
            throw e;
        }
        return data;
    }
    write(str) {
        return __classPrivateFieldGet(this, _TextFile_writer, "f").write(str);
    }
}
_TextFile_filename = new WeakMap(), _TextFile_writer = new WeakMap();
