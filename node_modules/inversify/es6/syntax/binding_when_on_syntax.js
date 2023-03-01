"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindingWhenOnSyntax = void 0;
const binding_on_syntax_1 = require("./binding_on_syntax");
const binding_when_syntax_1 = require("./binding_when_syntax");
class BindingWhenOnSyntax {
    constructor(binding) {
        this._binding = binding;
        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    when(constraint) {
        return this._bindingWhenSyntax.when(constraint);
    }
    whenTargetNamed(name) {
        return this._bindingWhenSyntax.whenTargetNamed(name);
    }
    whenTargetIsDefault() {
        return this._bindingWhenSyntax.whenTargetIsDefault();
    }
    whenTargetTagged(tag, value) {
        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
    }
    whenInjectedInto(parent) {
        return this._bindingWhenSyntax.whenInjectedInto(parent);
    }
    whenParentNamed(name) {
        return this._bindingWhenSyntax.whenParentNamed(name);
    }
    whenParentTagged(tag, value) {
        return this._bindingWhenSyntax.whenParentTagged(tag, value);
    }
    whenAnyAncestorIs(ancestor) {
        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
    }
    whenNoAncestorIs(ancestor) {
        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
    }
    whenAnyAncestorNamed(name) {
        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
    }
    whenAnyAncestorTagged(tag, value) {
        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
    }
    whenNoAncestorNamed(name) {
        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
    }
    whenNoAncestorTagged(tag, value) {
        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
    }
    whenAnyAncestorMatches(constraint) {
        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
    }
    whenNoAncestorMatches(constraint) {
        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
    }
    onActivation(handler) {
        return this._bindingOnSyntax.onActivation(handler);
    }
    onDeactivation(handler) {
        return this._bindingOnSyntax.onDeactivation(handler);
    }
}
exports.BindingWhenOnSyntax = BindingWhenOnSyntax;
//# sourceMappingURL=binding_when_on_syntax.js.map