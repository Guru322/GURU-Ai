import { interfaces } from "../interfaces/interfaces";
declare class Request implements interfaces.Request {
    id: number;
    serviceIdentifier: interfaces.ServiceIdentifier;
    parentContext: interfaces.Context;
    parentRequest: interfaces.Request | null;
    bindings: interfaces.Binding<unknown>[];
    childRequests: interfaces.Request[];
    target: interfaces.Target;
    requestScope: interfaces.RequestScope | null;
    constructor(serviceIdentifier: interfaces.ServiceIdentifier, parentContext: interfaces.Context, parentRequest: interfaces.Request | null, bindings: (interfaces.Binding<any> | interfaces.Binding<any>[]), target: interfaces.Target);
    addChildRequest(serviceIdentifier: interfaces.ServiceIdentifier, bindings: (interfaces.Binding<unknown> | interfaces.Binding<unknown>[]), target: interfaces.Target): interfaces.Request;
}
export { Request };
