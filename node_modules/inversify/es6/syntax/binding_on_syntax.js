"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindingOnSyntax = void 0;
const binding_when_syntax_1 = require("./binding_when_syntax");
class BindingOnSyntax {
    constructor(binding) {
        this._binding = binding;
    }
    onActivation(handler) {
        this._binding.onActivation = handler;
        return new binding_when_syntax_1.BindingWhenSyntax(this._binding);
    }
    onDeactivation(handler) {
        this._binding.onDeactivation = handler;
        return new binding_when_syntax_1.BindingWhenSyntax(this._binding);
    }
}
exports.BindingOnSyntax = BindingOnSyntax;
//# sourceMappingURL=binding_on_syntax.js.map