import { interfaces } from "../interfaces/interfaces";
declare const traverseAncerstors: (request: interfaces.Request, constraint: interfaces.ConstraintFunction) => boolean;
declare const taggedConstraint: (key: string | number | symbol) => (value: unknown) => interfaces.ConstraintFunction;
declare const namedConstraint: (value: unknown) => interfaces.ConstraintFunction;
declare const typeConstraint: (type: (NewableFunction | string)) => (request: interfaces.Request | null) => boolean;
export { traverseAncerstors, taggedConstraint, namedConstraint, typeConstraint };
