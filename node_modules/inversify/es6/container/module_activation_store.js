"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleActivationStore = void 0;
const lookup_1 = require("./lookup");
class ModuleActivationStore {
    constructor() {
        this._map = new Map();
    }
    remove(moduleId) {
        if (this._map.has(moduleId)) {
            const handlers = this._map.get(moduleId);
            this._map.delete(moduleId);
            return handlers;
        }
        return this._getEmptyHandlersStore();
    }
    addDeactivation(moduleId, serviceIdentifier, onDeactivation) {
        this._getModuleActivationHandlers(moduleId)
            .onDeactivations.add(serviceIdentifier, onDeactivation);
    }
    addActivation(moduleId, serviceIdentifier, onActivation) {
        this._getModuleActivationHandlers(moduleId)
            .onActivations.add(serviceIdentifier, onActivation);
    }
    clone() {
        const clone = new ModuleActivationStore();
        this._map.forEach((handlersStore, moduleId) => {
            clone._map.set(moduleId, {
                onActivations: handlersStore.onActivations.clone(),
                onDeactivations: handlersStore.onDeactivations.clone(),
            });
        });
        return clone;
    }
    _getModuleActivationHandlers(moduleId) {
        let moduleActivationHandlers = this._map.get(moduleId);
        if (moduleActivationHandlers === undefined) {
            moduleActivationHandlers = this._getEmptyHandlersStore();
            this._map.set(moduleId, moduleActivationHandlers);
        }
        return moduleActivationHandlers;
    }
    _getEmptyHandlersStore() {
        const handlersStore = {
            onActivations: new lookup_1.Lookup(),
            onDeactivations: new lookup_1.Lookup()
        };
        return handlersStore;
    }
}
exports.ModuleActivationStore = ModuleActivationStore;
//# sourceMappingURL=module_activation_store.js.map