"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const id_1 = require("../utils/id");
class Context {
    constructor(container) {
        this.id = (0, id_1.id)();
        this.container = container;
    }
    addPlan(plan) {
        this.plan = plan;
    }
    setCurrentRequest(currentRequest) {
        this.currentRequest = currentRequest;
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map