import { interfaces } from "../interfaces/interfaces";
declare function getBindingDictionary(cntnr: interfaces.Container): interfaces.Lookup<interfaces.Binding<unknown>>;
declare function plan(metadataReader: interfaces.MetadataReader, container: interfaces.Container, isMultiInject: boolean, targetType: interfaces.TargetType, serviceIdentifier: interfaces.ServiceIdentifier, key?: string | number | symbol, value?: unknown, avoidConstraints?: boolean): interfaces.Context;
declare function createMockRequest(container: interfaces.Container, serviceIdentifier: interfaces.ServiceIdentifier, key: string | number | symbol, value: unknown): interfaces.Request;
export { plan, createMockRequest, getBindingDictionary };
