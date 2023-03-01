define(["require", "exports", "./lookup"], function (require, exports, lookup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ModuleActivationStore = void 0;
    var ModuleActivationStore = (function () {
        function ModuleActivationStore() {
            this._map = new Map();
        }
        ModuleActivationStore.prototype.remove = function (moduleId) {
            if (this._map.has(moduleId)) {
                var handlers = this._map.get(moduleId);
                this._map.delete(moduleId);
                return handlers;
            }
            return this._getEmptyHandlersStore();
        };
        ModuleActivationStore.prototype.addDeactivation = function (moduleId, serviceIdentifier, onDeactivation) {
            this._getModuleActivationHandlers(moduleId)
                .onDeactivations.add(serviceIdentifier, onDeactivation);
        };
        ModuleActivationStore.prototype.addActivation = function (moduleId, serviceIdentifier, onActivation) {
            this._getModuleActivationHandlers(moduleId)
                .onActivations.add(serviceIdentifier, onActivation);
        };
        ModuleActivationStore.prototype.clone = function () {
            var clone = new ModuleActivationStore();
            this._map.forEach(function (handlersStore, moduleId) {
                clone._map.set(moduleId, {
                    onActivations: handlersStore.onActivations.clone(),
                    onDeactivations: handlersStore.onDeactivations.clone(),
                });
            });
            return clone;
        };
        ModuleActivationStore.prototype._getModuleActivationHandlers = function (moduleId) {
            var moduleActivationHandlers = this._map.get(moduleId);
            if (moduleActivationHandlers === undefined) {
                moduleActivationHandlers = this._getEmptyHandlersStore();
                this._map.set(moduleId, moduleActivationHandlers);
            }
            return moduleActivationHandlers;
        };
        ModuleActivationStore.prototype._getEmptyHandlersStore = function () {
            var handlersStore = {
                onActivations: new lookup_1.Lookup(),
                onDeactivations: new lookup_1.Lookup()
            };
            return handlersStore;
        };
        return ModuleActivationStore;
    }());
    exports.ModuleActivationStore = ModuleActivationStore;
});
//# sourceMappingURL=module_activation_store.js.map