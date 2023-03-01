define(["require", "exports", "../constants/literal_types", "../utils/id"], function (require, exports, literal_types_1, id_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Binding = void 0;
    var Binding = (function () {
        function Binding(serviceIdentifier, scope) {
            this.id = (0, id_1.id)();
            this.activated = false;
            this.serviceIdentifier = serviceIdentifier;
            this.scope = scope;
            this.type = literal_types_1.BindingTypeEnum.Invalid;
            this.constraint = function (request) { return true; };
            this.implementationType = null;
            this.cache = null;
            this.factory = null;
            this.provider = null;
            this.onActivation = null;
            this.onDeactivation = null;
            this.dynamicValue = null;
        }
        Binding.prototype.clone = function () {
            var clone = new Binding(this.serviceIdentifier, this.scope);
            clone.activated = (clone.scope === literal_types_1.BindingScopeEnum.Singleton) ? this.activated : false;
            clone.implementationType = this.implementationType;
            clone.dynamicValue = this.dynamicValue;
            clone.scope = this.scope;
            clone.type = this.type;
            clone.factory = this.factory;
            clone.provider = this.provider;
            clone.constraint = this.constraint;
            clone.onActivation = this.onActivation;
            clone.onDeactivation = this.onDeactivation;
            clone.cache = this.cache;
            return clone;
        };
        return Binding;
    }());
    exports.Binding = Binding;
});
//# sourceMappingURL=binding.js.map