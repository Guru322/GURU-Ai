"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindingWhenSyntax = void 0;
const binding_on_syntax_1 = require("./binding_on_syntax");
const constraint_helpers_1 = require("./constraint_helpers");
class BindingWhenSyntax {
    constructor(binding) {
        this._binding = binding;
    }
    when(constraint) {
        this._binding.constraint = constraint;
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    whenTargetNamed(name) {
        this._binding.constraint = (0, constraint_helpers_1.namedConstraint)(name);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    whenTargetIsDefault() {
        this._binding.constraint = (request) => {
            if (request === null) {
                return false;
            }
            const targetIsDefault = (request.target !== null) &&
                (!request.target.isNamed()) &&
                (!request.target.isTagged());
            return targetIsDefault;
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    whenTargetTagged(tag, value) {
        this._binding.constraint = (0, constraint_helpers_1.taggedConstraint)(tag)(value);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    whenInjectedInto(parent) {
        this._binding.constraint = (request) => request !== null && (0, constraint_helpers_1.typeConstraint)(parent)(request.parentRequest);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    whenParentNamed(name) {
        this._binding.constraint = (request) => request !== null && (0, constraint_helpers_1.namedConstraint)(name)(request.parentRequest);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    whenParentTagged(tag, value) {
        this._binding.constraint = (request) => request !== null && (0, constraint_helpers_1.taggedConstraint)(tag)(value)(request.parentRequest);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    whenAnyAncestorIs(ancestor) {
        this._binding.constraint = (request) => request !== null && (0, constraint_helpers_1.traverseAncerstors)(request, (0, constraint_helpers_1.typeConstraint)(ancestor));
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    whenNoAncestorIs(ancestor) {
        this._binding.constraint = (request) => request !== null && !(0, constraint_helpers_1.traverseAncerstors)(request, (0, constraint_helpers_1.typeConstraint)(ancestor));
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    whenAnyAncestorNamed(name) {
        this._binding.constraint = (request) => request !== null && (0, constraint_helpers_1.traverseAncerstors)(request, (0, constraint_helpers_1.namedConstraint)(name));
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    whenNoAncestorNamed(name) {
        this._binding.constraint = (request) => request !== null && !(0, constraint_helpers_1.traverseAncerstors)(request, (0, constraint_helpers_1.namedConstraint)(name));
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    whenAnyAncestorTagged(tag, value) {
        this._binding.constraint = (request) => request !== null && (0, constraint_helpers_1.traverseAncerstors)(request, (0, constraint_helpers_1.taggedConstraint)(tag)(value));
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    whenNoAncestorTagged(tag, value) {
        this._binding.constraint = (request) => request !== null && !(0, constraint_helpers_1.traverseAncerstors)(request, (0, constraint_helpers_1.taggedConstraint)(tag)(value));
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    whenAnyAncestorMatches(constraint) {
        this._binding.constraint = (request) => request !== null && (0, constraint_helpers_1.traverseAncerstors)(request, constraint);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    whenNoAncestorMatches(constraint) {
        this._binding.constraint = (request) => request !== null && !(0, constraint_helpers_1.traverseAncerstors)(request, constraint);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
}
exports.BindingWhenSyntax = BindingWhenSyntax;
//# sourceMappingURL=binding_when_syntax.js.map