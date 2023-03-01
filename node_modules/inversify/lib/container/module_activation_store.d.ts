import { interfaces } from "../interfaces/interfaces";
export declare class ModuleActivationStore implements interfaces.ModuleActivationStore {
    private _map;
    remove(moduleId: number): interfaces.ModuleActivationHandlers;
    addDeactivation(moduleId: number, serviceIdentifier: interfaces.ServiceIdentifier<unknown>, onDeactivation: interfaces.BindingDeactivation<unknown>): void;
    addActivation(moduleId: number, serviceIdentifier: interfaces.ServiceIdentifier<unknown>, onActivation: interfaces.BindingActivation<unknown>): void;
    clone(): interfaces.ModuleActivationStore;
    private _getModuleActivationHandlers;
    private _getEmptyHandlersStore;
}
