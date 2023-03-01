"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindingInSyntax = void 0;
const literal_types_1 = require("../constants/literal_types");
const binding_when_on_syntax_1 = require("./binding_when_on_syntax");
class BindingInSyntax {
    constructor(binding) {
        this._binding = binding;
    }
    inRequestScope() {
        this._binding.scope = literal_types_1.BindingScopeEnum.Request;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    }
    inSingletonScope() {
        this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    }
    inTransientScope() {
        this._binding.scope = literal_types_1.BindingScopeEnum.Transient;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    }
}
exports.BindingInSyntax = BindingInSyntax;
//# sourceMappingURL=binding_in_syntax.js.map