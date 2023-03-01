import { interfaces } from "../inversify";
export declare const multiBindToService: (container: interfaces.Container) => (service: interfaces.ServiceIdentifier) => (...types: interfaces.ServiceIdentifier[]) => void;
export declare const ensureFullyBound: <T = unknown>(binding: interfaces.Binding<T>) => void;
export declare const getFactoryDetails: <T = unknown>(binding: interfaces.Binding<T>) => interfaces.FactoryDetails;
