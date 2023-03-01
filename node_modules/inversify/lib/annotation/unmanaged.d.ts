import { DecoratorTarget } from "./decorator_utils";
declare function unmanaged(): (target: DecoratorTarget, targetKey: string, index: number) => void;
export { unmanaged };
