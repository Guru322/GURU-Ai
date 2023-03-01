import { interfaces } from "../interfaces/interfaces";
declare type Prototype<T> = {
    [Property in keyof T]: T[Property] extends NewableFunction ? T[Property] : T[Property] | undefined;
} & {
    constructor: NewableFunction;
};
interface ConstructorFunction<T = Record<string, unknown>> {
    new (...args: unknown[]): T;
    prototype: Prototype<T>;
}
export declare type DecoratorTarget<T = unknown> = ConstructorFunction<T> | Prototype<T>;
declare function tagParameter(annotationTarget: DecoratorTarget, parameterName: string | symbol | undefined, parameterIndex: number, metadata: interfaces.MetadataOrMetadataArray): void;
declare function tagProperty(annotationTarget: DecoratorTarget, propertyName: string | symbol, metadata: interfaces.MetadataOrMetadataArray): void;
declare function createTaggedDecorator(metadata: interfaces.MetadataOrMetadataArray): <T>(target: DecoratorTarget, targetKey?: string | symbol | undefined, indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<T> | undefined) => void;
declare function decorate(decorator: (DecoratorTarget | ParameterDecorator | MethodDecorator), target: any, parameterIndexOrProperty?: number | string): void;
export { decorate, tagParameter, tagProperty, createTaggedDecorator };
