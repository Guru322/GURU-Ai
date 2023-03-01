import { interfaces } from "../interfaces/interfaces";
declare class ContainerSnapshot implements interfaces.ContainerSnapshot {
    bindings: interfaces.Lookup<interfaces.Binding<unknown>>;
    activations: interfaces.Lookup<interfaces.BindingActivation<unknown>>;
    deactivations: interfaces.Lookup<interfaces.BindingDeactivation<unknown>>;
    middleware: interfaces.Next | null;
    moduleActivationStore: interfaces.ModuleActivationStore;
    static of(bindings: interfaces.Lookup<interfaces.Binding<unknown>>, middleware: interfaces.Next | null, activations: interfaces.Lookup<interfaces.BindingActivation<unknown>>, deactivations: interfaces.Lookup<interfaces.BindingDeactivation<unknown>>, moduleActivationStore: interfaces.ModuleActivationStore): ContainerSnapshot;
}
export { ContainerSnapshot };
