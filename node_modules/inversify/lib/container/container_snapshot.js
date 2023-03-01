"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerSnapshot = void 0;
var ContainerSnapshot = (function () {
    function ContainerSnapshot() {
    }
    ContainerSnapshot.of = function (bindings, middleware, activations, deactivations, moduleActivationStore) {
        var snapshot = new ContainerSnapshot();
        snapshot.bindings = bindings;
        snapshot.middleware = middleware;
        snapshot.deactivations = deactivations;
        snapshot.activations = activations;
        snapshot.moduleActivationStore = moduleActivationStore;
        return snapshot;
    };
    return ContainerSnapshot;
}());
exports.ContainerSnapshot = ContainerSnapshot;
//# sourceMappingURL=container_snapshot.js.map