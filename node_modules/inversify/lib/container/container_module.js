"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncContainerModule = exports.ContainerModule = void 0;
var id_1 = require("../utils/id");
var ContainerModule = (function () {
    function ContainerModule(registry) {
        this.id = (0, id_1.id)();
        this.registry = registry;
    }
    return ContainerModule;
}());
exports.ContainerModule = ContainerModule;
var AsyncContainerModule = (function () {
    function AsyncContainerModule(registry) {
        this.id = (0, id_1.id)();
        this.registry = registry;
    }
    return AsyncContainerModule;
}());
exports.AsyncContainerModule = AsyncContainerModule;
//# sourceMappingURL=container_module.js.map