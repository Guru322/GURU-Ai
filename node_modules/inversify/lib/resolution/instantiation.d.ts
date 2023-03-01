import { interfaces } from "../interfaces/interfaces";
declare function resolveInstance<T>(binding: interfaces.Binding<T>, constr: interfaces.Newable<T>, childRequests: interfaces.Request[], resolveRequest: interfaces.ResolveRequestHandler): T | Promise<T>;
export { resolveInstance };
