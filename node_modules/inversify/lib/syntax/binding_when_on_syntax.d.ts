import { interfaces } from "../interfaces/interfaces";
declare class BindingWhenOnSyntax<T> implements interfaces.BindingWhenSyntax<T>, interfaces.BindingOnSyntax<T> {
    private _bindingWhenSyntax;
    private _bindingOnSyntax;
    private _binding;
    constructor(binding: interfaces.Binding<T>);
    when(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
    whenTargetNamed(name: string): interfaces.BindingOnSyntax<T>;
    whenTargetIsDefault(): interfaces.BindingOnSyntax<T>;
    whenTargetTagged(tag: string, value: unknown): interfaces.BindingOnSyntax<T>;
    whenInjectedInto(parent: (NewableFunction | string)): interfaces.BindingOnSyntax<T>;
    whenParentNamed(name: string): interfaces.BindingOnSyntax<T>;
    whenParentTagged(tag: string, value: unknown): interfaces.BindingOnSyntax<T>;
    whenAnyAncestorIs(ancestor: (NewableFunction | string)): interfaces.BindingOnSyntax<T>;
    whenNoAncestorIs(ancestor: (NewableFunction | string)): interfaces.BindingOnSyntax<T>;
    whenAnyAncestorNamed(name: string): interfaces.BindingOnSyntax<T>;
    whenAnyAncestorTagged(tag: string, value: unknown): interfaces.BindingOnSyntax<T>;
    whenNoAncestorNamed(name: string): interfaces.BindingOnSyntax<T>;
    whenNoAncestorTagged(tag: string, value: unknown): interfaces.BindingOnSyntax<T>;
    whenAnyAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
    whenNoAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
    onActivation(handler: (context: interfaces.Context, injectable: T) => T): interfaces.BindingWhenSyntax<T>;
    onDeactivation(handler: (injectable: T) => Promise<void> | void): interfaces.BindingWhenSyntax<T>;
}
export { BindingWhenOnSyntax };
