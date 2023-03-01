import { MissingAdapterError } from './MissingAdapterError.js';
export class Low {
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
    async read() {
        this.data = await this.adapter.read();
    }
    async write() {
        if (this.data) {
            await this.adapter.write(this.data);
        }
    }
}
