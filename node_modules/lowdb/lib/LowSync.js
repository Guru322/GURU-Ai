import { MissingAdapterError } from './MissingAdapterError.js';
export class LowSync {
    constructor(adapter) {
        Object.defineProperty(this, "adapter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        if (adapter) {
            this.adapter = adapter;
        }
        else {
            throw new MissingAdapterError();
        }
    }
    read() {
        this.data = this.adapter.read();
    }
    write() {
        if (this.data !== null) {
            this.adapter.write(this.data);
        }
    }
}
