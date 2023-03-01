"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleton = void 0;
const singleton = (targetClass) => {
    return new Proxy(targetClass, {
        construct: (target, argumentsList, newTarget) => {
            if (target.prototype !== newTarget.prototype)
                return Reflect.construct(target, argumentsList, newTarget);
            if (!target.instance)
                target.instance = new target(...argumentsList);
            return target.instance;
        }
    });
};
exports.singleton = singleton;
