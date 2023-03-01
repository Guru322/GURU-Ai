declare const preDestroy: () => (target: {
    constructor: NewableFunction;
}, propertyKey: string) => void;
export { preDestroy };
